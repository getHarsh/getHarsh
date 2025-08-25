#!/usr/bin/env node

/**
 * generate-search-index.js - FlexSearch index generator
 * 
 * This script generates search indexes from content managed by Decap CMS.
 * It creates schema-aware indexes that leverage the 300+ enum-to-Schema.org mappings
 * for intelligent search functionality.
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const matter = require('gray-matter');
const FlexSearch = require('flexsearch');

// Parse command line arguments
const args = process.argv.slice(2);
const argMap = {};
args.forEach(arg => {
  const [key, value] = arg.split('=');
  argMap[key.replace('--', '')] = value;
});

const {
  'master-posts': masterPostsPath,
  'build-dir': buildDir,
  'output': outputPath,
  'mode': mode = 'LOCAL',
  'schema-mappings': schemaMappingsPath,
  'ecosystem-config': ecosystemConfigPath,
  'domain': domain = 'all',
  'sitemap-path': sitemapPath,
  'graphql-cache': graphqlCachePath
} = argMap;

console.log('=== FlexSearch Index Generation ===');
console.log('Master posts:', masterPostsPath);
console.log('Build dir:', buildDir);
console.log('Output:', outputPath);
console.log('Mode:', mode);
console.log('Domain:', domain);

// Load schema mappings
function loadSchemaMappings() {
  if (!schemaMappingsPath || !fs.existsSync(schemaMappingsPath)) {
    console.warn('Schema mappings not found, using defaults');
    return {};
  }
  return yaml.load(fs.readFileSync(schemaMappingsPath, 'utf8'));
}

// Load ecosystem config
function loadEcosystemConfig() {
  if (!ecosystemConfigPath || !fs.existsSync(ecosystemConfigPath)) {
    console.warn('Ecosystem config not found');
    return {};
  }
  return yaml.load(fs.readFileSync(ecosystemConfigPath, 'utf8'));
}

// Calculate content priorities based on type and metadata
function calculateContentPriorities(documents, schemaMappings) {
  const priorities = {};
  
  // Priority rules based on schema types and content characteristics
  const typePriorities = {
    'HowTo': 0.8,
    'TechArticle': 0.8,
    'ScholarlyArticle': 0.9,
    'APIReference': 0.7,
    'LearningResource': 0.8,
    'Review': 0.6,
    'NewsArticle': 0.7,
    'BlogPosting': 0.5,
    'Article': 0.5,
    'Opinion': 0.4,
    'FAQPage': 0.7
  };
  
  documents.forEach(doc => {
    // Base priority from schema type
    let priority = typePriorities[doc.schema_org_type] || 0.5;
    
    // Boost featured content
    if (doc.is_featured) {
      priority = Math.min(priority * 1.3, 1.0);
    }
    
    // Boost recent content (within 90 days)
    if (doc.date_published) {
      const publishDate = new Date(doc.date_published);
      const daysSincePublish = (Date.now() - publishDate.getTime()) / (1000 * 60 * 60 * 24);
      if (daysSincePublish < 30) {
        priority = Math.min(priority * 1.2, 1.0);
      } else if (daysSincePublish < 90) {
        priority = Math.min(priority * 1.1, 1.0);
      }
    }
    
    // Store priority by URL path
    priorities[doc.url_path] = priority;
  });
  
  console.log(`Calculated priorities for ${Object.keys(priorities).length} documents`);
  return priorities;
}

// Load GraphQL relationship data
function loadGraphQLData(graphqlCachePath) {
  if (!graphqlCachePath || !fs.existsSync(graphqlCachePath)) {
    console.warn('GraphQL cache not found, skipping relationship data');
    return { relationships: {}, metadata: {} };
  }
  
  // Look for gatsby data cache
  const dataPath = path.join(graphqlCachePath, 'redux.state');
  if (fs.existsSync(dataPath)) {
    try {
      const cacheData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
      // Extract useful relationship data from nodes
      const relationships = {};
      const metadata = {};
      
      // Process nodes if available
      if (cacheData.nodes) {
        Object.entries(cacheData.nodes).forEach(([nodeId, node]) => {
          if (node.internal && node.internal.type === 'MarkdownRemark') {
            // Extract relationships from frontmatter
            if (node.frontmatter) {
              const { slug, cross_posting, uses_project_keys, updates_project_keys } = node.frontmatter;
              if (slug) {
                relationships[slug] = {
                  crossPosting: cross_posting || [],
                  projects: [...(uses_project_keys || []), ...(updates_project_keys || [])]
                };
              }
            }
          }
        });
      }
      
      console.log(`Loaded GraphQL data with ${Object.keys(relationships).length} relationships`);
      return { relationships, metadata };
    } catch (err) {
      console.warn('Error parsing GraphQL cache:', err.message);
      return { relationships: {}, metadata: {} };
    }
  }
  
  return { relationships: {}, metadata: {} };
}

/**
 * Create schema-aware FlexSearch configuration based on entity type
 */
function createSchemaAwareConfig(entityType, schemaMappings) {
  // Enhanced presets for Schema.org types matching our schema-mappings.yml
  const schemaPresets = {
    // How-to content (HowTo in our mappings, not HowToArticle)
    'HowTo': {
      tokenize: 'strict',
      encode: 'advanced',
      threshold: 7,
      depth: 4,
      resolution: 9,
      stemmer: 'en',
      filter: 'en',
      matcher: 'en',
      context: {
        depth: 3,
        bidirectional: true,
        resolution: 9
      },
      doc: {
        id: 'id',
        field: ['title', 'summary', 'steps', 'tools', 'duration', 'keywords', 'tags']
      }
    },
    // FAQ content needs question matching
    'FAQPage': {
      tokenize: 'forward',
      encode: 'balance',
      threshold: 5,
      depth: 3,
      resolution: 7,
      stemmer: 'en',
      context: {
        depth: 2,
        bidirectional: false
      },
      doc: {
        id: 'id',
        field: ['title', 'questions', 'answers', 'keywords', 'tags']
      }
    },
    // Opinion pieces (Opinion in our mappings)
    'Opinion': {
      tokenize: 'forward',
      encode: 'balance',
      threshold: 5,
      depth: 3,
      resolution: 6,
      context: {
        depth: 2,
        bidirectional: false
      }
    },
    // Review content
    'Review': {
      tokenize: 'forward',
      encode: 'balance',
      threshold: 5,
      depth: 3,
      resolution: 7,
      doc: {
        id: 'id',
        field: ['title', 'summary', 'content', 'rating', 'pros', 'cons', 'keywords']
      }
    },
    // News articles (NewsArticle in our mappings)
    'NewsArticle': {
      tokenize: 'forward',
      encode: 'balance',
      threshold: 4,
      depth: 2,
      resolution: 6
    },
    // Research articles (ScholarlyArticle in our mappings)
    'ScholarlyArticle': {
      tokenize: 'full',
      encode: 'advanced',
      threshold: 6,
      depth: 5,
      resolution: 11,
      stemmer: 'en',
      filter: 'en',
      matcher: 'en',
      context: {
        depth: 5,
        bidirectional: true,
        resolution: 13
      }
    },
    // Technical articles with code
    'TechArticle': {
      tokenize: 'full',
      encode: 'advanced',
      threshold: 6,
      depth: 5,
      resolution: 9,
      stemmer: 'en',
      filter: 'en',
      matcher: 'en',
      context: {
        depth: 5,
        bidirectional: true,
        resolution: 11
      }
    },
    // Blog posts - balanced for general content
    'BlogPosting': {
      tokenize: 'forward',
      encode: 'balance',
      threshold: 4,
      depth: 3,
      resolution: 6,
      stemmer: 'en',
      context: {
        depth: 2,
        bidirectional: false
      }
    },
    // Software/API documentation
    'SoftwareApplication': {
      tokenize: 'reverse',  // Better for API names
      encode: 'simple',
      threshold: 8,
      depth: 2,
      resolution: 5,
      context: {
        depth: 1,
        bidirectional: false
      },
      doc: {
        id: 'id',
        field: ['title', 'version', 'apis', 'dependencies', 'keywords']
      }
    },
    // API documentation (APIReference in our mappings)
    'APIReference': {
      tokenize: 'strict',
      encode: 'simple',
      threshold: 9,
      depth: 2,
      resolution: 5
    },
    // Educational content (LearningResource in our mappings)
    'LearningResource': {
      tokenize: 'strict',
      encode: 'balance',
      threshold: 6,
      depth: 4,
      resolution: 8,
      stemmer: 'en',
      context: {
        depth: 3,
        bidirectional: true
      }
    }
  };
  
  // Fallback to general presets if specific schema type not found
  const generalPresets = {
    'Article': schemaPresets.BlogPosting,
    'WebPage': {
      tokenize: 'forward',
      encode: 'balance',
      threshold: 5,
      depth: 3,
      resolution: 7
    }
  };
  
  // Get the best matching preset
  const preset = schemaPresets[entityType] || generalPresets[entityType] || schemaPresets.BlogPosting;
  
  // Create custom tokenizer using schema mappings
  const schemaTokenizer = createSchemaAwareTokenizer(schemaMappings);
  
  // Merge preset with base configuration
  return {
    ...preset,
    tokenize: preset.tokenize === 'strict' || preset.tokenize === 'full' || preset.tokenize === 'reverse' 
      ? preset.tokenize 
      : schemaTokenizer,
    language: 'en',
    cache: true,
    doc: preset.doc || {
      id: 'id',
      field: [
        'title',
        'summary',
        'content',
        'tags',
        'keywords',
        'author_names',
        'project_names',
        'content_type_label',
        'schema_org_type'
      ]
    }
  };
}

/**
 * Custom tokenizer that applies schema mappings
 */
function createSchemaAwareTokenizer(mappings) {
  return function(str) {
    if (!str) return [];
    
    let tokens = str.toString();
    
    // Apply enum mappings for intelligent tokenization
    if (mappings.content_types) {
      Object.entries(mappings.content_types).forEach(([enumValue, label]) => {
        tokens = tokens.replace(
          new RegExp(`\\b${enumValue}\\b`, 'gi'), 
          label
        );
      });
    }
    
    // Handle technical terms
    tokens = tokens
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/_/g, ' ')
      .replace(/-/g, ' ')
      .replace(/v(\d+\.\d+\.\d+)/g, 'version $1')
      .replace(/\bAPI\b/g, 'Application Programming Interface API')
      .replace(/\bUI\b/g, 'User Interface UI')
      .replace(/\bAI\b/g, 'Artificial Intelligence AI')
      .replace(/\bML\b/g, 'Machine Learning ML');
    
    // Standard tokenization
    return tokens.toLowerCase().split(/[\s\-,;:#!?@\[\](){}'"]+/).filter(Boolean);
  };
}

/**
 * Process content files and extract metadata with boost factors
 */
async function processContent(contentDir, ecosystemConfig, schemaMappings, domain, graphqlData) {
  const documents = [];
  
  // Determine entity type
  const isBlogDomain = domain.includes('blog.');
  const isProject = domain.includes('/PROJECTS/');
  
  // For projects in LOCAL mode, content would be in site branch
  // But search index generation happens in main branch during build
  // The actual content is already processed by Gatsby and available in build artifacts
  
  // For now, we'll process content from master_posts which is the source of truth
  // In PRODUCTION mode, this doesn't matter as everything is deployed
  
  const postsDir = path.join(contentDir, 'posts');
  const pagesDir = path.join(contentDir, 'pages');
  
  // Only process blog posts for blog subdomains
  if (isBlogDomain && fs.existsSync(postsDir)) {
    const postFiles = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));
    
    for (const file of postFiles) {
      const filePath = path.join(postsDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContent);
      
      // Skip drafts unless in LOCAL mode
      if (data.is_draft && mode !== 'LOCAL') continue;
      
      // Apply schema mappings to content type
      const contentTypeLabel = schemaMappings.content_types?.[data.content_type] || 'Article';
      
      // Resolve author names
      const authorNames = (data.author_keys || []).map(key => {
        const author = ecosystemConfig.persons?.[key];
        return author?.full_name || author?.name || key;
      });
      
      // Extract project names
      const projectNames = [
        ...(data.uses_project_keys || []),
        ...(data.updates_project_keys || [])
      ].map(key => key.split('/').pop());
      
      // Calculate URL path respecting multi-domain architecture
      const slug = data.slug || file.replace('.md', '');
      let urlPath;
      
      // Blog posts ONLY exist on blog subdomains
      // Structure: blog.domain.in/[slug]/
      urlPath = `/${slug}/`;
      
      // Calculate initial boost factor based on content type
      // Will be refined after all documents are processed
      let boostFactor = 1.0;
      
      // Additional boost for featured content
      if (data.is_featured) {
        boostFactor *= 1.2;
      }
      
      // Boost for recent content (within 30 days)
      if (data.date_published) {
        const publishDate = new Date(data.date_published);
        const daysSincePublish = (Date.now() - publishDate.getTime()) / (1000 * 60 * 60 * 24);
        if (daysSincePublish < 30) {
          boostFactor *= 1.1;
        }
      }
      
      // Get GraphQL relationships if available
      const relationships = graphqlData.relationships[slug] || {};
      
      documents.push({
        id: slug,
        type: 'post',
        title: data.title,
        summary: data.summary || '',
        content: content.substring(0, 5000), // Limit content for performance
        tags: data.tags || [],
        keywords: data.keywords || [],
        author_names: authorNames,
        project_names: projectNames,
        content_type: data.content_type,
        content_type_label: contentTypeLabel,
        schema_org_type: contentTypeLabel, // Add Schema.org type
        date_published: data.date_published,
        featured_image_url: data.featured_image_url,
        cross_posting: data.cross_posting,
        discussion_urls: data.discussion_urls,
        language: data.language || 'en',
        is_featured: data.is_featured || false,
        reading_time_minutes: data.reading_time_minutes || calculateReadingTime(content),
        boost: boostFactor, // Add boost factor
        relationships: relationships, // Add GraphQL relationships
        url_path: urlPath // Add URL path for reference
      });
    }
  }
  
  // Process pages for main domains (not blog subdomains)
  if (!isBlogDomain && fs.existsSync(pagesDir)) {
    // Marketing pages exist in pages/[entity]/ directories
    const entityPagesDir = path.join(pagesDir, domain);
    
    if (fs.existsSync(entityPagesDir)) {
      const pageFiles = fs.readdirSync(entityPagesDir).filter(f => f.endsWith('.md'));
      
      for (const file of pageFiles) {
        const filePath = path.join(entityPagesDir, file);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContent);
        
        // Skip drafts unless in LOCAL mode
        if (data.is_draft && mode !== 'LOCAL') continue;
        
        // Pages use WebPage schema type
        const contentTypeLabel = 'WebPage';
        
        // Calculate URL path for pages
        const slug = data.slug || file.replace('.md', '');
        const urlPath = `/${slug}/`;
        
        documents.push({
          id: `page-${slug}`,
          type: 'page',
          title: data.title,
          summary: data.summary || '',
          content: content.substring(0, 5000), // Limit content for performance
          tags: data.tags || [],
          keywords: data.keywords || [],
          author_names: [],
          project_names: [],
          content_type: 'page',
          content_type_label: contentTypeLabel,
          schema_org_type: contentTypeLabel,
          date_published: data.date_published,
          featured_image_url: data.featured_image_url,
          language: data.language || 'en',
          is_featured: data.is_featured || false,
          boost: 1.0, // Base boost for pages
          relationships: {},
          url_path: urlPath
        });
      }
    }
  }
  
  // TODO: Process project documentation if needed
  
  return documents;
}

/**
 * Calculate reading time in minutes
 */
function calculateReadingTime(content) {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

/**
 * Generate language and schema-aware search indexes
 */
async function generateIndexes(documents, schemaMappings) {
  // Group documents by language and schema type
  const docsByLangAndType = {};
  
  documents.forEach(doc => {
    const lang = doc.language || 'en';
    const schemaType = doc.schema_org_type || 'Article';
    const key = `${lang}-${schemaType}`;
    
    if (!docsByLangAndType[key]) {
      docsByLangAndType[key] = [];
    }
    docsByLangAndType[key].push(doc);
  });
  
  // Create language-specific and type-specific indexes
  const indexes = {
    // Main indexes by language
    'en': {
      unified: new FlexSearch.Document(createSchemaAwareConfig('Article', schemaMappings)),
      posts: new FlexSearch.Document(createSchemaAwareConfig('BlogPosting', schemaMappings)),
      pages: new FlexSearch.Document(createSchemaAwareConfig('WebPage', schemaMappings)),
      projects: new FlexSearch.Document(createSchemaAwareConfig('SoftwareApplication', schemaMappings))
    },
    'hi': { // Hindi language support
      unified: new FlexSearch.Document({
        ...createSchemaAwareConfig('Article', schemaMappings),
        stemmer: 'hi', // Hindi stemmer if available
        filter: false
      }),
      posts: new FlexSearch.Document({
        ...createSchemaAwareConfig('BlogPosting', schemaMappings),
        stemmer: 'hi',
        filter: false
      })
    }
  };
  
  // Create specialized indexes for each schema type
  const specializedIndexes = {};
  
  Object.entries(docsByLangAndType).forEach(([key, docs]) => {
    const [lang, schemaType] = key.split('-');
    
    // Only create specialized index if we have multiple documents of this type
    if (docs.length > 5) {
      const config = createSchemaAwareConfig(schemaType, schemaMappings);
      
      // Adjust config for language
      if (lang !== 'en') {
        config.stemmer = lang;
        config.filter = false;
      }
      
      specializedIndexes[key] = new FlexSearch.Document(config);
      
      // Add documents to specialized index
      docs.forEach(doc => {
        specializedIndexes[key].add(doc);
      });
    }
  });
  
  // Add documents to language-based indexes
  for (const doc of documents) {
    const lang = doc.language || 'en';
    
    // Add to language-specific unified index
    if (indexes[lang] && indexes[lang].unified) {
      indexes[lang].unified.add(doc);
    } else if (!indexes[lang]) {
      // Create new language index on demand
      indexes[lang] = {
        unified: new FlexSearch.Document({
          ...createSchemaAwareConfig('Article', schemaMappings),
          stemmer: lang,
          filter: false
        })
      };
      indexes[lang].unified.add(doc);
    }
    
    // Add to type-specific index within language
    if (doc.type === 'post' && indexes[lang].posts) {
      indexes[lang].posts.add(doc);
    } else if (doc.type === 'page' && indexes[lang].pages) {
      indexes[lang].pages.add(doc);
    } else if (doc.type === 'project' && indexes[lang].projects) {
      indexes[lang].projects.add(doc);
    }
  }
  
  // Return both regular and specialized indexes
  return {
    languageIndexes: indexes,
    specializedIndexes: specializedIndexes,
    stats: {
      languages: Object.keys(indexes),
      specializedTypes: Object.keys(specializedIndexes),
      totalDocuments: documents.length
    }
  };
}

/**
 * Chunk documents for performance optimization
 */
function chunkDocuments(documents, chunkSize = 100) {
  const chunks = [];
  for (let i = 0; i < documents.length; i += chunkSize) {
    chunks.push({
      id: Math.floor(i / chunkSize),
      start: i,
      end: Math.min(i + chunkSize, documents.length),
      documents: documents.slice(i, Math.min(i + chunkSize, documents.length))
    });
  }
  return chunks;
}

/**
 * Export indexes to JSON format with performance optimizations
 */
async function exportIndexes(indexResult, documents, outputPath) {
  const outputDir = path.dirname(outputPath);
  const searchDir = path.join(outputDir, 'search');
  
  // Ensure directories exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  if (!fs.existsSync(searchDir)) {
    fs.mkdirSync(searchDir, { recursive: true });
  }
  
  // Performance optimization: chunk large document sets
  const CHUNK_SIZE = mode === 'PRODUCTION' ? 100 : 50;
  const chunkedDocuments = chunkDocuments(documents, CHUNK_SIZE);
  
  // Extract language stats
  const languageStats = {};
  documents.forEach(doc => {
    const lang = doc.language || 'en';
    languageStats[lang] = (languageStats[lang] || 0) + 1;
  });
  
  // Extract schema type stats
  const schemaTypeStats = {};
  documents.forEach(doc => {
    const type = doc.schema_org_type || 'Article';
    schemaTypeStats[type] = (schemaTypeStats[type] || 0) + 1;
  });
  
  // Create enhanced manifest for progressive loading
  const manifest = {
    version: '2.0.0', // Bumped for new features
    generated: new Date().toISOString(),
    mode: mode,
    stats: {
      total_documents: documents.length,
      posts: documents.filter(d => d.type === 'post').length,
      pages: documents.filter(d => d.type === 'page').length,
      projects: documents.filter(d => d.type === 'project').length,
      languages: languageStats,
      schemaTypes: schemaTypeStats
    },
    chunks: {
      total: chunkedDocuments.length,
      size: CHUNK_SIZE,
      files: chunkedDocuments.map(chunk => ({
        id: chunk.id,
        file: `documents-chunk-${chunk.id}.json`,
        start: chunk.start,
        end: chunk.end,
        count: chunk.documents.length
      }))
    },
    indexes: {
      // Language-based indexes
      languages: indexResult.stats.languages,
      byLanguage: {},
      // Specialized indexes
      specialized: indexResult.stats.specializedTypes
    },
    features: {
      boost: true, // Documents have boost factors
      relationships: true, // GraphQL relationships included
      multilingual: indexResult.stats.languages.length > 1,
      schemaAware: true, // Schema.org type-specific configs
      chunking: true,
      compression: mode === 'PRODUCTION'
    },
    performance: {
      chunking: true,
      compression: mode === 'PRODUCTION',
      caching: {
        strategy: 'stale-while-revalidate',
        maxAge: 3600
      }
    }
  };
  
  // Map language indexes in manifest
  indexResult.stats.languages.forEach(lang => {
    manifest.indexes.byLanguage[lang] = {
      unified: `${lang}-unified-index.json`,
      posts: `${lang}-posts-index.json`,
      pages: `${lang}-pages-index.json`,
      projects: `${lang}-projects-index.json`
    };
  });
  
  // Write manifest
  fs.writeFileSync(
    path.join(searchDir, 'manifest.json'),
    JSON.stringify(manifest, null, mode === 'PRODUCTION' ? 0 : 2)
  );
  
  // Write document chunks
  console.log(`Writing ${chunkedDocuments.length} document chunks...`);
  for (const chunk of chunkedDocuments) {
    const chunkPath = path.join(searchDir, `documents-chunk-${chunk.id}.json`);
    fs.writeFileSync(
      chunkPath,
      JSON.stringify(chunk.documents, null, mode === 'PRODUCTION' ? 0 : 2)
    );
  }
  
  // Export and write language-based indexes
  console.log('Exporting FlexSearch indexes...');
  
  // Export language indexes
  for (const [lang, langIndexes] of Object.entries(indexResult.languageIndexes)) {
    for (const [type, index] of Object.entries(langIndexes)) {
      const exported = await index.export();
      const indexPath = path.join(searchDir, `${lang}-${type}-index.json`);
      fs.writeFileSync(
        indexPath,
        JSON.stringify(exported, null, mode === 'PRODUCTION' ? 0 : 2)
      );
    }
  }
  
  // Export specialized indexes
  for (const [key, index] of Object.entries(indexResult.specializedIndexes)) {
    const exported = await index.export();
    const indexPath = path.join(searchDir, `specialized-${key}-index.json`);
    fs.writeFileSync(
      indexPath,
      JSON.stringify(exported, null, mode === 'PRODUCTION' ? 0 : 2)
    );
  }
  
  // Create main search index file (lightweight entry point)
  const searchIndex = {
    version: manifest.version,
    generated: manifest.generated,
    mode: manifest.mode,
    manifestUrl: './search/manifest.json',
    stats: manifest.stats
  };
  
  fs.writeFileSync(outputPath, JSON.stringify(searchIndex, null, 2));
  
  console.log(`✓ Search index generated with enhanced features`);
  console.log(`  Output directory: ${outputDir}`);
  console.log(`  Total documents: ${manifest.stats.total_documents}`);
  console.log(`  Languages: ${indexResult.stats.languages.join(', ')}`);
  console.log(`  Chunks: ${manifest.chunks.total} × ${CHUNK_SIZE} documents`);
  console.log(`  Language indexes: ${indexResult.stats.languages.length}`);
  console.log(`  Specialized indexes: ${indexResult.stats.specializedTypes.length}`);
  
  // Calculate total size
  const files = fs.readdirSync(searchDir);
  let totalSize = 0;
  for (const file of files) {
    totalSize += fs.statSync(path.join(searchDir, file)).size;
  }
  console.log(`  Total size: ${(totalSize / 1024).toFixed(2)} KB`);
}

// Main execution
async function main() {
  try {
    // Load configurations
    const schemaMappings = loadSchemaMappings();
    const ecosystemConfig = loadEcosystemConfig();
    
    // Load GraphQL data if available
    const graphqlData = loadGraphQLData(graphqlCachePath);
    
    // Process content with all data sources
    console.log('Processing content...');
    const documents = await processContent(
      masterPostsPath, 
      ecosystemConfig, 
      schemaMappings,
      domain,
      graphqlData
    );
    
    // Calculate content priorities after processing all documents
    const contentPriorities = calculateContentPriorities(documents, schemaMappings);
    
    // Update document boost factors based on calculated priorities
    documents.forEach(doc => {
      const priority = contentPriorities[doc.url_path] || 0.5;
      doc.boost = doc.boost * priority * 2.0; // Scale to 0-2 range
    });
    
    // Generate language and schema-aware indexes
    console.log('Generating FlexSearch indexes...');
    const indexResult = await generateIndexes(documents, schemaMappings);
    
    // Export to JSON with enhanced structure
    console.log('Exporting search index...');
    await exportIndexes(indexResult, documents, outputPath);
    
    console.log('✓ FlexSearch index generation complete!');
    console.log(`  Boost factors: Enabled (content-type based)`);
    console.log(`  Relationships: ${Object.keys(graphqlData.relationships).length} loaded`);
    console.log(`  Schema-aware configs: Active for ${Object.keys(indexResult.specializedIndexes).length} types`);
  } catch (error) {
    console.error('Error generating search index:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}