#!/usr/bin/env node

/**
 * generate-decap-config.js - Dynamic Decap CMS configuration generator
 * 
 * This script generates Decap CMS configuration that:
 * 1. Uses pattern discovery data from generate-decap-config.sh
 * 2. Aligns with proto schemas for type-safe content
 * 3. Creates rich metadata fields for FlexSearch integration
 * 4. Supports both LOCAL and PRODUCTION modes
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const SchemaLoader = require('./schema-loader');

// Parse command line arguments
const args = process.argv.slice(2);
const argMap = {};
args.forEach(arg => {
  const [key, value] = arg.split('=');
  argMap[key.replace('--', '')] = value;
});

const {
  'ecosystem-config': ecosystemConfigPath,
  'discovery-data': discoveryDataPath,
  'schema-mappings': schemaMappingsPath,
  'schemas-dir': schemasDir,  // NEW: Directory containing JSON schemas
  'domain-config': domainConfigPath,
  'domain': specificDomain,
  'output': outputPath,
  'mode': mode = 'LOCAL'
} = argMap;

// Get entity type from environment variable (set by wrapper.sh)
const entityType = process.env.WEBSITE_ENTITY_TYPE || 'domain';
const entityName = process.env.WEBSITE_ENTITY || process.env.WEBSITE_DOMAIN || 'unknown';
const projectPath = process.env.WEBSITE_PROJECT_PATH; // For projects
const masterPostsDir = process.env.MASTER_POSTS_DIR || argMap['master-posts'] || 'master_posts';

// Load required data
const ecosystemConfig = yaml.load(fs.readFileSync(ecosystemConfigPath, 'utf8'));
const discoveryData = JSON.parse(fs.readFileSync(discoveryDataPath, 'utf8'));

// Load schema mappings if available
let schemaMappings = {};
if (schemaMappingsPath && fs.existsSync(schemaMappingsPath)) {
  schemaMappings = yaml.load(fs.readFileSync(schemaMappingsPath, 'utf8'));
}

// Load domain config if provided
let domainConfig = null;
if (domainConfigPath && fs.existsSync(domainConfigPath)) {
  domainConfig = yaml.load(fs.readFileSync(domainConfigPath, 'utf8'));
}

// Initialize schema loader if schemas directory provided
let schemaLoader = null;
if (schemasDir) {
  const buildDir = path.dirname(schemasDir); // Get build directory from schemas path
  schemaLoader = new SchemaLoader(buildDir, schemaMappingsPath);
  console.log('✓ Schema loader initialized with', Object.keys(schemaLoader.getAllSchemas()).length, 'schemas');
}

/**
 * Get content path based on entity type
 */
function getContentPath() {
  if (entityType === 'blog') {
    // Blogs use shared posts directory with tags
    return `${masterPostsDir}/posts`;
  } else if (entityType === 'project') {
    // Projects have their own docs directory
    return projectPath ? `${projectPath}/docs` : 'docs';
  } else {
    // Domains use entity-specific pages
    return `${masterPostsDir}/pages/${entityName}`;
  }
}

/**
 * Generate entity-aware cross-posting options
 */
function generateCrossPostingOptions() {
  const options = [];
  
  if (entityType === 'blog') {
    // For blogs: can cross-post to other blogs and their parent domain
    const currentBlog = entityName;
    const parentDomain = currentBlog.replace(/^blog\./, '');
    
    // Add parent domain
    options.push({ label: `Main site (${parentDomain})`, value: parentDomain });
    
    // Add other blogs
    discoveryData.domains.forEach(domain => {
      if (domain !== parentDomain) {
        options.push({ label: `Blog (blog.${domain})`, value: `blog.${domain}` });
      }
    });
  } else if (entityType === 'project') {
    // For projects: can cross-post to parent domain and its blog
    if (projectPath) {
      const parentDomain = projectPath.split('/')[0];
      options.push({ label: `Parent (${parentDomain})`, value: parentDomain });
      options.push({ label: `Blog (blog.${parentDomain})`, value: `blog.${parentDomain}` });
    }
  } else {
    // For domains: can cross-post to any blog
    discoveryData.domains.forEach(domain => {
      options.push({ label: `Blog (blog.${domain})`, value: `blog.${domain}` });
    });
  }
  
  return options.length > 0 ? options : generateDomainOptions();
}

/**
 * Generate author options from persons catalog
 */
function generateAuthorOptions() {
  const persons = ecosystemConfig.persons || {};
  return Object.entries(persons).map(([key, person]) => ({
    label: person.full_name || person.name || key,
    value: key
  }));
}

/**
 * Generate domain options from discovery data
 */
function generateDomainOptions() {
  const domains = discoveryData.domains || [];
  return domains.map(domain => ({
    label: domain,
    value: domain
  }));
}

/**
 * Generate project options from discovery data
 */
function generateProjectOptions() {
  const projects = discoveryData.projects || [];
  return projects.map(project => {
    // Extract project name from path like "domain.in/PROJECTS/project-name"
    const parts = project.split('/');
    const projectName = parts[parts.length - 1];
    const domain = parts[0];
    return {
      label: `${projectName} (${domain})`,
      value: project
    };
  });
}

/**
 * Generate content type options from proto enum
 */
function generateContentTypeOptions() {
  // Load from build/mappings (Highway 2) - the correct source for enum names
  const mappingsPath = path.join(
    path.dirname(schemasDir || path.join(__dirname, '../../build/schemas')), // Go up from schemas/ to build/
    'mappings',
    'schema-mappings.json'
  );
  
  if (fs.existsSync(mappingsPath)) {
    try {
      const mappings = JSON.parse(fs.readFileSync(mappingsPath, 'utf8'));
      if (mappings.content_types) {
        const options = [];
        for (const [enumName, schemaOrgType] of Object.entries(mappings.content_types)) {
          if (!enumName.includes('UNSPECIFIED')) {
            const label = enumName.replace('CONTENT_TYPE_', '')
              .split('_')
              .map(word => word.charAt(0) + word.slice(1).toLowerCase())
              .join(' ');
            options.push({
              label: label,
              value: enumName,
              hint: schemaOrgType ? `Schema.org: ${schemaOrgType}` : undefined
            });
          }
        }
        console.log(`✓ Generated ${options.length} content type options from mappings`);
        return options;
      }
    } catch (err) {
      console.warn(`⚠ Could not load mappings: ${err.message}`);
    }
  }
  
  // Minimal fallback if mappings not available
  console.warn('⚠ Mappings not found, using minimal fallback');
  return [
    { label: "Tutorial", value: "CONTENT_TYPE_TUTORIAL" },
    { label: "Deep Dive", value: "CONTENT_TYPE_DEEP_DIVE" },
    { label: "Update", value: "CONTENT_TYPE_UPDATE" }
  ];
}

/**
 * Generate discussion platform options from proto enum
 */
function generateDiscussionPlatformOptions() {
  // Load from build/mappings (Highway 2) - the correct source for enum names
  const mappingsPath = path.join(
    path.dirname(schemasDir || path.join(__dirname, '../../build/schemas')), // Go up from schemas/ to build/
    'mappings',
    'schema-mappings.json'
  );
  
  if (fs.existsSync(mappingsPath)) {
    try {
      const mappings = JSON.parse(fs.readFileSync(mappingsPath, 'utf8'));
      if (mappings.discussion_platforms) {
        const options = [];
        for (const [enumName, schemaOrgType] of Object.entries(mappings.discussion_platforms)) {
          if (!enumName.includes('UNSPECIFIED')) {
            const label = enumName.replace('DISCUSSION_PLATFORM_', '')
              .replace(/_/g, ' ')
              .split(' ')
              .map(word => word.charAt(0) + word.slice(1).toLowerCase())
              .join(' ');
            options.push({
              label: label,
              value: enumName,
              hint: schemaOrgType ? `Schema.org: ${schemaOrgType}` : undefined
            });
          }
        }
        console.log(`✓ Generated ${options.length} discussion platform options from mappings`);
        return options;
      }
    } catch (err) {
      console.warn(`⚠ Could not load mappings: ${err.message}`);
    }
  }
  
  // Minimal fallback if mappings not available
  console.warn('⚠ Mappings not found, using minimal fallback');
  return [
    { label: "GitHub Issue", value: "DISCUSSION_PLATFORM_GITHUB_ISSUE" },
    { label: "Twitter Thread", value: "DISCUSSION_PLATFORM_TWITTER_THREAD" }
  ];
}

/**
 * Generate media type options from proto enum
 */
function generateMediaTypeOptions() {
  // Load from build/mappings (Highway 2) - the correct source for enum names
  const mappingsPath = path.join(
    path.dirname(schemasDir || path.join(__dirname, '../../build/schemas')), // Go up from schemas/ to build/
    'mappings',
    'schema-mappings.json'
  );
  
  if (fs.existsSync(mappingsPath)) {
    try {
      const mappings = JSON.parse(fs.readFileSync(mappingsPath, 'utf8'));
      if (mappings.media_types) {
        const options = [];
        for (const [enumName, schemaOrgType] of Object.entries(mappings.media_types)) {
          if (!enumName.includes('UNSPECIFIED')) {
            const label = enumName.replace('MEDIA_TYPE_', '')
              .replace(/_/g, ' ')
              .split(' ')
              .map(word => word.charAt(0) + word.slice(1).toLowerCase())
              .join(' ');
            options.push({
              label: label,
              value: enumName,
              hint: schemaOrgType ? `Schema.org: ${schemaOrgType}` : undefined
            });
          }
        }
        console.log(`✓ Generated ${options.length} media type options from mappings`);
        return options;
      }
    } catch (err) {
      console.warn(`⚠ Could not load mappings: ${err.message}`);
    }
  }
  
  console.warn('⚠ Mappings not found, no media type options');
  return [];
}

/**
 * Generate fields aligned with ArticleConfig proto
 */
function generateArticleFields() {
  const authorOptions = generateAuthorOptions();
  const domainOptions = generateDomainOptions();
  const projectOptions = generateProjectOptions();
  const contentTypeOptions = generateContentTypeOptions();
  const discussionPlatformOptions = generateDiscussionPlatformOptions();
  
  return [
    // ===== BASIC METADATA =====
    {
      label: "Title",
      name: "title",
      widget: "string",
      required: true
    },
    {
      label: "Slug",
      name: "slug",
      widget: "string",
      required: false,
      hint: "URL-friendly version of the title (auto-generated if empty)"
    },
    {
      label: "Summary",
      name: "summary",
      widget: "text",
      required: true,
      hint: "2-3 line summary for meta description and previews"
    },
    {
      label: "Content Type",
      name: "content_type",
      widget: "select",
      options: contentTypeOptions,
      default: "CONTENT_TYPE_TUTORIAL",
      required: true
    },
    
    // ===== AUTHORS & ATTRIBUTION =====
    {
      label: "Authors",
      name: "author_keys",
      widget: "select",
      multiple: true,
      options: authorOptions,
      required: false,
      hint: "Select one or more authors from the persons catalog"
    },
    
    // ===== DATES =====
    {
      label: "Date Published",
      name: "date_published",
      widget: "datetime",
      required: true
    },
    {
      label: "Date Modified",
      name: "date_modified",
      widget: "datetime",
      required: false,
      hint: "Leave empty for new posts, update when editing"
    },
    
    // ===== CROSS-POSTING =====
    {
      label: "Cross-Posting Configuration",
      name: "cross_posting",
      widget: "object",
      required: false,
      fields: [
        {
          label: "Canonical Domain",
          name: "canonical_domain",
          widget: "select",
          options: domainOptions,
          required: true,
          hint: "Original domain where this was first published"
        },
        {
          label: "Published Domains",
          name: "published_domains",
          widget: "select",
          multiple: true,
          options: domainOptions,
          hint: "All domains where this article appears"
        },
        {
          label: "Show Cross-Post Chips",
          name: "show_cross_post_chips",
          widget: "boolean",
          default: true
        },
        {
          label: "Cross-Post Date",
          name: "cross_post_date",
          widget: "datetime",
          required: false,
          hint: "If different from original publish date"
        },
        {
          label: "Import Source",
          name: "import_source",
          widget: "string",
          required: false,
          hint: "If imported from external source (e.g., Medium, Dev.to)"
        }
      ]
    },
    
    // ===== DISCUSSION PLATFORMS =====
    {
      label: "Discussion URLs",
      name: "discussion_urls",
      widget: "list",
      required: false,
      fields: [
        {
          label: "Platform",
          name: "platform",
          widget: "select",
          options: discussionPlatformOptions
        },
        {
          label: "URL",
          name: "url",
          widget: "string",
          pattern: ["^https?://.*", "Must be a valid URL"]
        }
      ]
    },
    
    // ===== PROJECT RELATIONSHIPS =====
    {
      label: "Uses Projects",
      name: "uses_project_keys",
      widget: "select",
      multiple: true,
      options: projectOptions,
      required: false,
      hint: "Projects this article uses or relates to"
    },
    {
      label: "Updates Projects",
      name: "updates_project_keys",
      widget: "select",
      multiple: true,
      options: projectOptions,
      required: false,
      hint: "Projects this article provides updates for"
    },
    
    // ===== SPONSORSHIP =====
    {
      label: "Article Sponsor",
      name: "sponsor",
      widget: "object",
      required: false,
      fields: [
        { label: "Name", name: "name", widget: "string" },
        { label: "Website", name: "url", widget: "string" },
        { label: "Logo URL", name: "logo_url", widget: "image", required: false },
        { label: "Message", name: "message", widget: "text", required: false }
      ]
    },
    
    // ===== MEDIA ATTACHMENTS =====
    {
      label: "Media",
      name: "media",
      widget: "object",
      required: false,
      fields: [
        {
          label: "Audio Files",
          name: "audio",
          widget: "list",
          fields: [
            { label: "Title", name: "title", widget: "string" },
            { label: "URL", name: "url", widget: "string" },
            { label: "Duration (seconds)", name: "duration_seconds", widget: "number" },
            { label: "Transcript URL", name: "transcript_url", widget: "string", required: false }
          ]
        },
        {
          label: "Video Files",
          name: "video",
          widget: "list",
          fields: [
            { label: "Title", name: "title", widget: "string" },
            { label: "URL", name: "url", widget: "string" },
            { label: "Platform", name: "platform", widget: "select", options: ["YouTube", "Vimeo", "Custom"] },
            { label: "Duration (seconds)", name: "duration_seconds", widget: "number" },
            { label: "Thumbnail URL", name: "thumbnail_url", widget: "image" }
          ]
        },
        {
          label: "Code Snippets",
          name: "code_snippets",
          widget: "list",
          fields: [
            { label: "Title", name: "title", widget: "string" },
            { label: "Language", name: "language", widget: "string" },
            { label: "Gist URL", name: "gist_url", widget: "string", required: false },
            { label: "Inline Code", name: "code", widget: "code", required: false }
          ]
        },
        {
          label: "Diagrams",
          name: "diagrams",
          widget: "list",
          fields: [
            { label: "Title", name: "title", widget: "string" },
            { label: "Type", name: "type", widget: "select", options: ["Mermaid", "GraphViz", "PlantUML", "Image"] },
            { label: "Source", name: "source", widget: "text" },
            { label: "Rendered URL", name: "rendered_url", widget: "string", required: false }
          ]
        }
      ]
    },
    
    // ===== SEO & DISCOVERY =====
    {
      label: "Keywords",
      name: "keywords",
      widget: "list",
      required: false,
      hint: "SEO keywords for search engines"
    },
    {
      label: "Tags",
      name: "tags",
      widget: "list",
      required: false,
      hint: "Content tags/categories for organization"
    },
    {
      label: "Featured Image URL",
      name: "featured_image_url",
      widget: "image",
      required: false,
      hint: "Hero image for social sharing (OG image)"
    },
    
    // ===== SERIES INFORMATION =====
    {
      label: "Series",
      name: "series",
      widget: "object",
      required: false,
      collapsed: true,
      fields: [
        { label: "Series Name", name: "name", widget: "string" },
        { label: "Part Number", name: "part", widget: "number" },
        { label: "Total Parts", name: "total", widget: "number", required: false }
      ]
    },
    
    // ===== LANGUAGE & LOCALIZATION =====
    {
      label: "Language",
      name: "language",
      widget: "select",
      options: [
        { label: "English", value: "en" },
        { label: "Spanish", value: "es" },
        { label: "French", value: "fr" },
        { label: "German", value: "de" },
        { label: "Portuguese", value: "pt" },
        { label: "Hindi", value: "hi" }
      ],
      default: "en",
      required: false
    },
    {
      label: "Translations",
      name: "translations",
      widget: "list",
      required: false,
      fields: [
        { label: "Language", name: "lang", widget: "string" },
        { label: "URL", name: "url", widget: "string" }
      ]
    },
    
    // ===== DISPLAY SETTINGS =====
    {
      label: "Display Settings",
      name: "display",
      widget: "object",
      required: false,
      collapsed: true,
      fields: [
        { label: "Show Table of Contents", name: "show_toc", widget: "boolean", default: true },
        { label: "Show Author Bio", name: "show_author_bio", widget: "boolean", default: true },
        { label: "Show Related Posts", name: "show_related", widget: "boolean", default: true },
        { label: "Enable Comments", name: "enable_comments", widget: "boolean", default: true },
        { label: "Show Share Buttons", name: "show_share_buttons", widget: "boolean", default: true },
        { label: "Show Reading Time", name: "show_reading_time", widget: "boolean", default: true }
      ]
    },
    
    // ===== FEATURE OVERRIDES =====
    {
      label: "Feature Overrides",
      name: "feature_overrides",
      widget: "object",
      required: false,
      collapsed: true,
      fields: [
        { label: "Disable Syntax Highlighting", name: "disable_syntax_highlighting", widget: "boolean", default: false },
        { label: "Disable Math Rendering", name: "disable_math", widget: "boolean", default: false },
        { label: "Disable Mermaid Diagrams", name: "disable_mermaid", widget: "boolean", default: false },
        { label: "Disable Code Copy Button", name: "disable_code_copy", widget: "boolean", default: false }
      ]
    },
    
    // ===== STATUS FLAGS =====
    {
      label: "Draft",
      name: "is_draft",
      widget: "boolean",
      default: true,
      hint: "Draft posts are not published"
    },
    {
      label: "Featured",
      name: "is_featured",
      widget: "boolean",
      default: false,
      hint: "Featured posts appear in hero sections"
    },
    {
      label: "No Index",
      name: "no_index",
      widget: "boolean",
      default: false,
      hint: "Prevent search engines from indexing this page"
    },
    
    // ===== CONTENT WARNINGS =====
    {
      label: "Content Warnings",
      name: "content_warnings",
      widget: "list",
      required: false,
      hint: "Add content warnings if applicable"
    },
    
    // ===== ADVANCED SEO =====
    {
      label: "Canonical URL",
      name: "canonical_url",
      widget: "string",
      required: false,
      hint: "Override the generated canonical URL"
    },
    {
      label: "Reading Time Override",
      name: "reading_time_minutes",
      widget: "number",
      required: false,
      hint: "Override auto-calculated reading time"
    },
    
    // ===== SCHEMA.ORG OVERRIDES =====
    {
      label: "Schema.org Configuration",
      name: "article_schema",
      widget: "object",
      required: false,
      collapsed: true,
      hint: "Override default Schema.org properties for this article",
      fields: [
        { label: "Type", name: "@type", widget: "select", options: ["BlogPosting", "Article", "TechArticle", "ScholarlyArticle", "NewsArticle"], default: "BlogPosting" },
        { label: "Headline Override", name: "headline", widget: "string", required: false },
        { label: "Alternative Headline", name: "alternativeHeadline", widget: "string", required: false },
        { label: "Abstract", name: "abstract", widget: "text", required: false }
      ]
    },
    
    // ===== CUSTOM METADATA =====
    {
      label: "Custom Metadata",
      name: "custom_meta",
      widget: "object",
      required: false,
      collapsed: true,
      hint: "Additional key-value pairs for custom functionality"
    },
    
    // ===== MAIN CONTENT =====
    {
      label: "Content",
      name: "body",
      widget: "markdown",
      required: true,
      hint: "The main article content in Markdown format"
    }
  ];
}

/**
 * Generate backend configuration based on mode
 */
function generateBackend() {
  if (mode === 'LOCAL') {
    return {
      name: 'test-repo',
      branch: 'main'
    };
  } else {
    return {
      name: 'git-gateway',
      branch: 'main',
      commit_messages: {
        create: 'Create {{collection}} "{{slug}}"',
        update: 'Update {{collection}} "{{slug}}"',
        delete: 'Delete {{collection}} "{{slug}}"',
        uploadMedia: '[skip ci] Upload "{{path}}"',
        deleteMedia: '[skip ci] Delete "{{path}}"'
      }
    };
  }
}

/**
 * Generate collections configuration
 */
function generateCollections() {
  const collections = [];
  
  // Get entity-aware content path
  const contentPath = getContentPath();
  
  // Generate collections based on entity type
  if (entityType === 'blog') {
    // Blog posts collection
    collections.push({
      name: 'posts',
      label: 'Blog Posts',
      folder: contentPath,  // Uses master_posts/posts
    create: true,
    slug: '{{year}}-{{month}}-{{day}}-{{slug}}',
    editor: {
      preview: true
    },
    fields: generateArticleFields()
    });
  } else if (entityType === 'project') {
    // Project documentation collection
    collections.push({
      name: 'docs',
      label: 'Documentation',
      folder: contentPath,  // Uses project/docs
      create: true,
      slug: '{{slug}}',
      editor: {
        preview: true
      },
      fields: [
        { label: "Title", name: "title", widget: "string" },
        { label: "Slug", name: "slug", widget: "string" },
        { label: "Order", name: "order", widget: "number", default: 0 },
        { label: "Category", name: "category", widget: "string" },
        { label: "Summary", name: "summary", widget: "text" },
        { label: "Body", name: "body", widget: "markdown" }
      ]
    });
  } else {
    // Domain pages collection
    collections.push({
      name: 'pages',
      label: 'Pages',
      folder: contentPath,  // Uses master_posts/pages/[entity]
      create: true,
      slug: '{{slug}}',
      editor: {
        preview: true
      },
      fields: [
        { label: "Title", name: "title", widget: "string" },
        { label: "Slug", name: "slug", widget: "string" },
        { label: "Summary", name: "summary", widget: "text" },
        { label: "Body", name: "body", widget: "markdown" },
        { label: "Template", name: "template", widget: "select", options: ["page", "landing", "about", "contact"], default: "page" },
        { label: "SEO", name: "seo", widget: "object", fields: [
          { label: "Title", name: "title", widget: "string", required: false },
          { label: "Description", name: "description", widget: "text", required: false }
        ]}
      ]
    });
    
    // For domains, also add a posts collection for occasional blog posts
    collections.push({
      name: 'posts',
      label: 'Blog Posts',
      folder: `${masterPostsDir}/posts`,
      create: true,
      slug: '{{year}}-{{month}}-{{day}}-{{slug}}',
      editor: {
        preview: true
      },
      fields: generateArticleFields()
    });
  }
  
  return collections;
}

/**
 * Generate complete Decap configuration
 */
function generateDecapConfig() {
  const config = {
    backend: generateBackend(),
    
    // Media configuration
    media_folder: 'static/images/uploads',
    public_folder: '/images/uploads',
    
    // Publishing configuration
    publish_mode: 'editorial_workflow',
    
    // Site URL for previews
    site_url: mode === 'LOCAL' ? 'http://localhost:8000' : `https://${specificDomain || 'getharsh.in'}`,
    display_url: mode === 'LOCAL' ? 'http://localhost:8000' : `https://${specificDomain || 'getharsh.in'}`,
    
    // Logo
    logo_url: '/images/logo.png',
    
    // Locale
    locale: 'en',
    
    // Collections
    collections: generateCollections(),
    
    // Editor configuration
    editor: {
      preview: true,
      frame: true
    },
    
    // Slug configuration
    slug: {
      encoding: 'unicode',
      clean_accents: true,
      sanitize_replacement: '-'
    }
  };
  
  // Add search configuration if in production
  if (mode === 'PRODUCTION') {
    config.search = {
      provider: 'algolia',
      algolia: {
        appId: '${ALGOLIA_APP_ID}',
        apiKey: '${ALGOLIA_SEARCH_KEY}',
        indexName: `${specificDomain || 'getharsh'}_content`
      }
    };
  }
  
  return config;
}

// Generate and write the configuration
const decapConfig = generateDecapConfig();
const outputDir = path.dirname(outputPath);

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Write YAML configuration
fs.writeFileSync(outputPath, yaml.dump(decapConfig, {
  indent: 2,
  lineWidth: 120,
  noRefs: true
}));

console.log(`✓ Generated Decap CMS configuration: ${outputPath}`);
console.log(`  Mode: ${mode}`);
console.log(`  Domains: ${discoveryData.domains.length}`);
console.log(`  Projects: ${discoveryData.projects.length}`);
console.log(`  Collections: ${decapConfig.collections.length}`);