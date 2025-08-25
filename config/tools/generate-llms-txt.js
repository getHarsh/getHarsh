#!/usr/bin/env node

/**
 * generate-llms-txt.js - Content analysis engine for LLM summaries
 * 
 * This script analyzes structured content from Decap CMS to generate
 * dynamic sections for llms.txt files, leveraging the rich frontmatter
 * defined in blog.proto and ecosystem Schema.org types.
 * 
 * Features:
 * - Uses structured frontmatter from Decap CMS
 * - Leverages content_type enums for categorization
 * - Uses is_featured and discussion_urls for popularity
 * - Extracts project relationships from frontmatter
 * - Respects cross-posting configuration
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const matter = require('gray-matter');

// Command line arguments
const args = process.argv.slice(2);
const argMap = {};
args.forEach(arg => {
    const [key, value] = arg.split('=');
    argMap[key.replace('--', '')] = value;
});

const entityName = argMap.entity || '';
const entityType = argMap.type || 'domain';
const configPath = argMap.config || '';
const masterPostsPath = argMap['master-posts'] || '';
const mode = argMap.mode || 'PRODUCTION';
const outputPath = argMap.output || '';

// Validate required arguments
if (!entityName || !configPath || !masterPostsPath || !outputPath) {
    console.error('Missing required arguments');
    process.exit(1);
}

// Load config
let config = {};
try {
    const configContent = fs.readFileSync(configPath, 'utf8');
    config = yaml.load(configContent);
} catch (error) {
    console.error('Failed to load config:', error.message);
    process.exit(1);
}

// Extract domain-specific context
const domainContext = {
    established: config.domain_info?.established || null,
    primaryFocus: config.domain_info?.primary_focus || null,
    tagline: config.domain_info?.tagline || null,
    aliases: config.domain_info?.aliases || [],
    parentDomain: config.domain_info?.parent_domain || null,
    social: config.social || {},
    contact: config.contact || {},
    theme: {
        primaryColor: config.theme?.colors?.primary || null,
        brandFont: config.theme?.typography?.heading_font || null
    },
    features: config.features || {},
    seo: {
        keywords: config.seo?.keywords || [],
        description: config.seo?.description || config.domain_info?.description
    }
};

// Load ecosystem defaults for content type mappings
const ecosystemDefaultsPath = path.join(path.dirname(configPath), '../../../ecosystem-defaults.yml');
let contentTypeLabels = {};
try {
    if (fs.existsSync(ecosystemDefaultsPath)) {
        const ecosystemContent = fs.readFileSync(ecosystemDefaultsPath, 'utf8');
        const ecosystem = yaml.load(ecosystemContent);
        contentTypeLabels = ecosystem.ecosystem_defaults?.ui_labels?.content_types || {};
    }
} catch (error) {
    console.warn('Could not load ecosystem defaults:', error.message);
}

// Initialize results
const results = {
    key_topics_section: '',
    recent_content_section: '',
    popular_content_section: '',
    featured_projects_section: '',
    expertise_areas_section: '',
    content_philosophy_section: '',
    projects_list: '',
    sibling_entities_list: '',
    content_update_frequency: 'Regular updates',
    stats: {
        total_pages: 0,
        total_posts: 0,
        total_projects: 0,
        last_update: 'N/A',
        content_types: 'Articles, Documentation'
    }
};

// Helper function to extract entity name for path
function getEntityPathName(entity) {
    // For blogs: blog.domain.in -> domain.in
    if (entity.startsWith('blog.')) {
        return entity.substring(5);
    }
    // For projects: domain.in_project -> domain.in/project
    if (entity.includes('_')) {
        const [domain, project] = entity.split('_');
        return `${domain}/${project}`;
    }
    // For domains: use as is
    return entity;
}

// Helper function to read markdown files with structured frontmatter
function readMarkdownFiles(dirPath, isProject = false) {
    const files = [];
    
    if (!fs.existsSync(dirPath)) {
        return files;
    }
    
    try {
        const entries = fs.readdirSync(dirPath, { withFileTypes: true });
        
        for (const entry of entries) {
            const fullPath = path.join(dirPath, entry.name);
            
            if (entry.isDirectory()) {
                // Recursively read subdirectories
                files.push(...readMarkdownFiles(fullPath, isProject));
            } else if (entry.isFile() && (entry.name.endsWith('.md') || entry.name.endsWith('.mdx'))) {
                try {
                    const content = fs.readFileSync(fullPath, 'utf8');
                    const parsed = matter(content);
                    
                    // For projects, include all docs; for content, check draft status
                    if (isProject || (!parsed.data.is_draft && !parsed.data.no_index)) {
                        files.push({
                            path: fullPath,
                            filename: entry.name,
                            frontmatter: parsed.data,
                            content: parsed.content,
                            excerpt: parsed.data.summary || parsed.excerpt || parsed.content.substring(0, 200),
                            isProject: isProject
                        });
                    }
                } catch (err) {
                    console.error(`Error reading ${fullPath}:`, err.message);
                }
            }
        }
    } catch (err) {
        console.error(`Error reading directory ${dirPath}:`, err.message);
    }
    
    return files;
}

// Helper function to read project data
function readProjectData(projectKey) {
    const projectData = {
        info: null,
        docs: []
    };
    
    // Extract domain and project name from key (e.g., "causality.in_HENA")
    const [domain, projectName] = projectKey.split('_');
    if (!domain || !projectName) return projectData;
    
    // Try to read project config
    const projectConfigPath = path.join(configPath.replace(entityName, domain), 'PROJECTS', projectName, 'config.yml');
    if (fs.existsSync(projectConfigPath)) {
        try {
            const projectConfig = yaml.load(fs.readFileSync(projectConfigPath, 'utf8'));
            projectData.info = projectConfig.project_info || {};
            
            // Add tech stack and tools stack to enrich content
            if (projectConfig.tech_stack) {
                projectData.techStack = {
                    languages: projectConfig.tech_stack.languages || [],
                    frameworks: projectConfig.tech_stack.frameworks || [],
                    infrastructure: projectConfig.tech_stack.infrastructure || []
                };
            }
            
            // Add showcase info if available
            if (projectConfig.showcase) {
                projectData.showcase = projectConfig.showcase;
            }
        } catch (err) {
            console.error(`Error reading project config ${projectConfigPath}:`, err.message);
        }
    }
    
    // Try to read project documentation
    const docsPath = path.join(path.dirname(projectConfigPath), 'docs');
    if (fs.existsSync(docsPath)) {
        projectData.docs = readMarkdownFiles(docsPath, true);
    }
    
    return projectData;
}

// Extract key topics from structured data
function extractKeyTopics(files, projectsData = {}, context = {}) {
    const topicCounts = {};
    const topics = [];
    
    // Add SEO keywords from domain context
    if (context.seo?.keywords && context.seo.keywords.length > 0) {
        context.seo.keywords.forEach(keyword => {
            topicCounts[keyword] = (topicCounts[keyword] || 0) + 3; // Weight SEO keywords
        });
    }
    
    // Count tags and keywords from frontmatter
    files.forEach(file => {
        if (file.isProject) {
            // Handle project documentation differently
            // Extract topics from doc titles and headings
            const title = file.frontmatter.title || '';
            if (title) {
                // Weight documentation categories
                if (title.includes('API')) topicCounts['API Documentation'] = (topicCounts['API Documentation'] || 0) + 3;
                if (title.includes('Guide') || title.includes('Tutorial')) topicCounts['Tutorials'] = (topicCounts['Tutorials'] || 0) + 3;
                if (title.includes('Architecture')) topicCounts['Architecture'] = (topicCounts['Architecture'] || 0) + 3;
                if (title.includes('Setup') || title.includes('Installation')) topicCounts['Setup Guides'] = (topicCounts['Setup Guides'] || 0) + 2;
            }
        } else {
            // Process tags
            const tags = file.frontmatter.tags || [];
            tags.forEach(tag => {
                if (tag && typeof tag === 'string') {
                    topicCounts[tag] = (topicCounts[tag] || 0) + 2; // Weight tags
                }
            });
            
            // Process keywords
            const keywords = file.frontmatter.keywords || [];
            keywords.forEach(keyword => {
                if (keyword && typeof keyword === 'string') {
                    topicCounts[keyword] = (topicCounts[keyword] || 0) + 1;
                }
            });
            
            // Process content type
            const contentType = file.frontmatter.content_type;
            if (contentType) {
                const label = contentTypeLabels[contentType] || contentType;
                topicCounts[label] = (topicCounts[label] || 0) + 3; // Weight content types higher
            }
            
            // Process project relationships
            const usesProjects = file.frontmatter.uses_project_keys || [];
            const updatesProjects = file.frontmatter.updates_project_keys || [];
            [...usesProjects, ...updatesProjects].forEach(projectKey => {
                if (projectKey) {
                    topicCounts[`Project: ${projectKey}`] = (topicCounts[`Project: ${projectKey}`] || 0) + 2;
                }
            });
        }
    });
    
    // Add project tech stack topics
    Object.values(projectsData).forEach(project => {
        if (project.techStack) {
            project.techStack.languages?.forEach(lang => {
                topicCounts[`Language: ${lang}`] = (topicCounts[`Language: ${lang}`] || 0) + 3;
            });
            project.techStack.frameworks?.forEach(fw => {
                topicCounts[`Framework: ${fw}`] = (topicCounts[`Framework: ${fw}`] || 0) + 2;
            });
            project.techStack.infrastructure?.forEach(infra => {
                topicCounts[`Infrastructure: ${infra}`] = (topicCounts[`Infrastructure: ${infra}`] || 0) + 1;
            });
        }
    });
    
    // Sort by count and take top topics
    const sortedTopics = Object.entries(topicCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 15);
    
    // Group by type
    const contentTypes = [];
    const projectTopics = [];
    const languageTopics = [];
    const frameworkTopics = [];
    const infrastructureTopics = [];
    const generalTopics = [];
    
    sortedTopics.forEach(([topic, count]) => {
        if (contentTypeLabels[topic] || topic.includes('Tutorial') || topic.includes('Guide') || 
            topic === 'API Documentation' || topic === 'Architecture' || topic === 'Setup Guides') {
            contentTypes.push(topic);
        } else if (topic.startsWith('Project:')) {
            projectTopics.push(topic.replace('Project: ', ''));
        } else if (topic.startsWith('Language:')) {
            languageTopics.push(topic.replace('Language: ', ''));
        } else if (topic.startsWith('Framework:')) {
            frameworkTopics.push(topic.replace('Framework: ', ''));
        } else if (topic.startsWith('Infrastructure:')) {
            infrastructureTopics.push(topic.replace('Infrastructure: ', ''));
        } else {
            generalTopics.push(topic);
        }
    });
    
    // Format output
    if (contentTypes.length > 0) {
        topics.push(`**Content Focus**: ${contentTypes.slice(0, 5).join(', ')}`);
    }
    if (projectTopics.length > 0) {
        topics.push(`**Project Coverage**: ${projectTopics.slice(0, 5).join(', ')}`);
    }
    if (languageTopics.length > 0 || frameworkTopics.length > 0) {
        const techStack = [];
        if (languageTopics.length > 0) techStack.push(...languageTopics.slice(0, 3));
        if (frameworkTopics.length > 0) techStack.push(...frameworkTopics.slice(0, 3));
        topics.push(`**Tech Stack**: ${techStack.join(', ')}`);
    }
    if (infrastructureTopics.length > 0) {
        topics.push(`**Infrastructure**: ${infrastructureTopics.slice(0, 3).join(', ')}`);
    }
    if (generalTopics.length > 0) {
        topics.push(`**Key Topics**: ${generalTopics.slice(0, 10).join(', ')}`);
    }
    
    return topics.length > 0 ? topics.join('\n\n') : '**Primary Focus**: Technology, Software Development, System Architecture';
}

// Generate recent content section using structured data
function generateRecentContent(files) {
    const recent = [];
    
    // Sort by date_published or date
    const sortedFiles = files
        .filter(f => f.frontmatter.date_published || f.frontmatter.date)
        .sort((a, b) => {
            const dateA = new Date(a.frontmatter.date_published || a.frontmatter.date);
            const dateB = new Date(b.frontmatter.date_published || b.frontmatter.date);
            return dateB - dateA;
        })
        .slice(0, 10);
    
    sortedFiles.forEach((file, index) => {
        const title = file.frontmatter.title || 'Untitled';
        const date = file.frontmatter.date_published || file.frontmatter.date;
        const formattedDate = date ? new Date(date).toISOString().split('T')[0] : 'N/A';
        const summary = file.frontmatter.summary || file.excerpt;
        const contentType = file.frontmatter.content_type;
        const typeLabel = contentType ? ` [${contentTypeLabels[contentType] || contentType}]` : '';
        
        recent.push(`${index + 1}. **"${title}"**${typeLabel} - ${formattedDate}\n   ${summary}`);
    });
    
    return recent.length > 0 ? recent.join('\n\n') : 'No recent content found.';
}

// Generate popular content based on structured signals
function generatePopularContent(files) {
    const popular = [];
    
    // Score content based on structured data
    const scoredFiles = files.map(file => {
        let score = 0;
        
        // Featured flag from Decap CMS
        if (file.frontmatter.is_featured) {
            score += 100;
        }
        
        // Discussion activity (more URLs = more engagement)
        const discussionUrls = file.frontmatter.discussion_urls || {};
        score += Object.keys(discussionUrls).length * 20;
        
        // Cross-posting reach
        const crossPosting = file.frontmatter.cross_posting;
        if (crossPosting?.published_domains?.length > 0) {
            score += crossPosting.published_domains.length * 15;
        }
        
        // Sponsorship (sponsored content often high quality)
        if (file.frontmatter.sponsor) {
            score += 25;
        }
        
        // Media richness
        if (file.frontmatter.media?.videos?.length > 0) score += 30;
        if (file.frontmatter.media?.code_snippets?.length > 0) score += 20;
        if (file.frontmatter.media?.diagrams?.length > 0) score += 15;
        
        // Series content (comprehensive coverage)
        if (file.frontmatter.series) {
            score += 40;
        }
        
        // Recently modified (actively maintained)
        if (file.frontmatter.date_modified) {
            const daysSinceModified = (Date.now() - new Date(file.frontmatter.date_modified)) / (1000 * 60 * 60 * 24);
            if (daysSinceModified < 30) score += 30;
            else if (daysSinceModified < 90) score += 15;
        }
        
        // Reading time (comprehensive content)
        const readingTime = file.frontmatter.reading_time_minutes || 0;
        if (readingTime > 10) score += 20;
        else if (readingTime > 5) score += 10;
        
        return { file, score };
    });
    
    const topContent = scoredFiles
        .sort((a, b) => b.score - a.score)
        .slice(0, 5)
        .filter(item => item.score > 30); // Only include content with meaningful engagement
    
    topContent.forEach((item, index) => {
        const file = item.file;
        const title = file.frontmatter.title || 'Untitled';
        const summary = file.frontmatter.summary || 'Comprehensive guide';
        const signals = [];
        
        if (file.frontmatter.is_featured) signals.push('Featured');
        if (file.frontmatter.discussion_urls && Object.keys(file.frontmatter.discussion_urls).length > 0) {
            signals.push(`${Object.keys(file.frontmatter.discussion_urls).length} discussions`);
        }
        if (file.frontmatter.cross_posting?.published_domains?.length > 0) {
            signals.push(`${file.frontmatter.cross_posting.published_domains.length} platforms`);
        }
        if (file.frontmatter.series) signals.push('Series');
        
        const signalText = signals.length > 0 ? ` (${signals.join(', ')})` : '';
        
        popular.push(`${index + 1}. **"${title}"**${signalText}\n   ${summary}`);
    });
    
    return popular.length > 0 ? popular.join('\n\n') : 'Featured content coming soon.';
}

// Extract expertise areas from content types and projects
function extractExpertiseAreas(files, projectsData = {}, context = {}) {
    const contentTypeStats = {};
    const projectStats = {};
    const languageStats = {};
    const frameworkStats = {};
    const areas = [];
    
    // Add domain-specific expertise if available
    if (context.primaryFocus) {
        areas.push(`**Domain Focus**: ${context.primaryFocus}`);
    }
    
    // Analyze content types
    files.forEach(file => {
        if (!file.isProject) {
            const contentType = file.frontmatter.content_type;
            if (contentType) {
                contentTypeStats[contentType] = (contentTypeStats[contentType] || 0) + 1;
            }
            
            // Analyze project relationships
            const projects = [
                ...(file.frontmatter.uses_project_keys || []),
                ...(file.frontmatter.updates_project_keys || [])
            ];
            projects.forEach(project => {
                if (project) {
                    projectStats[project] = (projectStats[project] || 0) + 1;
                }
            });
        }
    });
    
    // Analyze project tech stacks
    Object.entries(projectsData).forEach(([key, project]) => {
        if (project.techStack) {
            project.techStack.languages?.forEach(lang => {
                languageStats[lang] = (languageStats[lang] || 0) + 1;
            });
            project.techStack.frameworks?.forEach(fw => {
                frameworkStats[fw] = (frameworkStats[fw] || 0) + 1;
            });
        }
    });
    
    // Format expertise based on content types
    const topContentTypes = Object.entries(contentTypeStats)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);
    
    if (topContentTypes.length > 0) {
        areas.push('**Content Expertise**:');
        topContentTypes.forEach(([type, count]) => {
            const label = contentTypeLabels[type] || type;
            areas.push(`- ${label} (${count} pieces)`);
        });
    }
    
    // Add project expertise with details
    const topProjects = Object.entries(projectStats)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);
    
    if (topProjects.length > 0) {
        areas.push('\n**Project Expertise**:');
        topProjects.forEach(([projectKey, count]) => {
            const projectData = projectsData[projectKey];
            if (projectData?.info) {
                const status = projectData.info.status || 'Active';
                const type = projectData.info.type || 'Software';
                areas.push(`- ${projectData.info.name || projectKey} (${type}, ${status}) - ${count} articles`);
            } else {
                areas.push(`- ${projectKey} (${count} articles)`);
            }
        });
    }
    
    // Add programming language expertise
    const topLanguages = Object.entries(languageStats)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);
    
    if (topLanguages.length > 0) {
        areas.push('\n**Programming Languages**:');
        topLanguages.forEach(([lang, count]) => {
            areas.push(`- ${lang}`);
        });
    }
    
    // Add framework expertise
    const topFrameworks = Object.entries(frameworkStats)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);
    
    if (topFrameworks.length > 0) {
        areas.push('\n**Frameworks & Tools**:');
        topFrameworks.forEach(([fw, count]) => {
            areas.push(`- ${fw}`);
        });
    }
    
    // Add technology areas from tags
    const techTags = new Set();
    files.forEach(file => {
        (file.frontmatter.tags || []).forEach(tag => {
            if (tag && !contentTypeLabels[tag]) {
                techTags.add(tag);
            }
        });
    });
    
    if (techTags.size > 0) {
        areas.push('\n**Technology Areas**:');
        Array.from(techTags).slice(0, 10).forEach(tag => {
            areas.push(`- ${tag}`);
        });
    }
    
    return areas.length > 0 ? areas.join('\n') : '**Core Expertise**: Software Engineering, Technical Writing, System Architecture';
}

// Generate content philosophy from actual content characteristics and domain context
function generateContentPhilosophy(files, context = {}) {
    // Analyze content patterns from structured data
    const stats = {
        tutorials: 0,
        deepDives: 0,
        updates: 0,
        opinions: 0,
        hasMedia: 0,
        hasSeries: 0,
        hasDiscussions: 0,
        crossPosted: 0,
        totalReadingTime: 0
    };
    
    files.forEach(file => {
        const contentType = file.frontmatter.content_type;
        if (contentType === 'tutorial') stats.tutorials++;
        else if (contentType === 'deep_dive') stats.deepDives++;
        else if (contentType === 'update' || contentType === 'release_notes') stats.updates++;
        else if (contentType === 'opinion' || contentType === 'editorial') stats.opinions++;
        
        if (file.frontmatter.media && Object.keys(file.frontmatter.media).some(key => file.frontmatter.media[key]?.length > 0)) {
            stats.hasMedia++;
        }
        if (file.frontmatter.series) stats.hasSeries++;
        if (file.frontmatter.discussion_urls && Object.keys(file.frontmatter.discussion_urls).length > 0) {
            stats.hasDiscussions++;
        }
        if (file.frontmatter.cross_posting?.published_domains?.length > 0) {
            stats.crossPosted++;
        }
        
        stats.totalReadingTime += (file.frontmatter.reading_time_minutes || 0);
    });
    
    const philosophyParts = [];
    
    // Start with domain-specific focus if available
    if (context.primaryFocus) {
        philosophyParts.push(`Our primary focus on ${context.primaryFocus} drives our content strategy`);
    }
    
    // Add tagline if available
    if (context.tagline) {
        philosophyParts.push(`"${context.tagline}"`);
    }
    
    // Build philosophy based on actual content
    if (stats.tutorials > files.length * 0.3) {
        philosophyParts.push('We believe in hands-on learning through comprehensive tutorials');
    }
    if (stats.deepDives > files.length * 0.2) {
        philosophyParts.push('Our deep-dive articles explore topics thoroughly, leaving no stone unturned');
    }
    if (stats.hasMedia > files.length * 0.4) {
        philosophyParts.push('We enrich our content with videos, code examples, and visual diagrams');
    }
    if (stats.hasSeries > 0) {
        philosophyParts.push('We create multi-part series for comprehensive topic coverage');
    }
    if (stats.hasDiscussions > files.length * 0.3) {
        philosophyParts.push('We foster community engagement through active discussions across platforms');
    }
    if (stats.crossPosted > files.length * 0.2) {
        philosophyParts.push('Our content reaches audiences across multiple platforms and communities');
    }
    
    // Add average reading time insight
    if (files.length > 0) {
        const avgReadingTime = Math.round(stats.totalReadingTime / files.length);
        if (avgReadingTime > 10) {
            philosophyParts.push(`With an average reading time of ${avgReadingTime} minutes, we provide in-depth coverage`);
        }
    }
    
    // Add established context
    if (context.established) {
        philosophyParts.push(`Established in ${context.established}, we've been sharing knowledge and insights with our community`);
    }
    
    if (philosophyParts.length === 0) {
        return 'We are committed to creating high-quality technical content that educates, inspires, and empowers our community.';
    }
    
    return philosophyParts.join('. ') + '.';
}

// Get featured projects from config
function getFeaturedProjects(projectsData = {}) {
    const projects = [];
    
    // For project entities, describe the project itself
    if (entityType === 'project' && config.project_info) {
        const projectInfo = config.project_info;
        const details = [];
        
        details.push(`**${projectInfo.name || entityName}**`);
        if (projectInfo.type) details.push(`Type: ${projectInfo.type}`);
        if (projectInfo.status) details.push(`Status: ${projectInfo.status}`);
        if (projectInfo.version) details.push(`Version: ${projectInfo.version}`);
        if (projectInfo.license) details.push(`License: ${projectInfo.license}`);
        
        if (projectInfo.description) {
            details.push(`\n${projectInfo.description}`);
        }
        
        if (projectInfo.tech_stack && projectInfo.tech_stack.length > 0) {
            details.push(`\nTech Stack: ${projectInfo.tech_stack.join(', ')}`);
        }
        
        return details.join('\n');
    }
    
    // Check for featured projects in content
    const projectMap = {};
    
    // Aggregate project mentions across content
    const allFiles = [];
    const pagesPath = path.join(masterPostsPath, 'pages', getEntityPathName(entityName));
    allFiles.push(...readMarkdownFiles(pagesPath));
    
    if (entityType === 'blog') {
        const postsPath = path.join(masterPostsPath, 'posts');
        const allPosts = readMarkdownFiles(postsPath);
        const domainName = entityName.replace('blog.', '');
        const filteredPosts = allPosts.filter(post => {
            const domains = post.frontmatter.cross_posting?.published_domains || [];
            return domains.includes(entityName) || domains.includes(domainName);
        });
        allFiles.push(...filteredPosts);
    }
    
    // Count project mentions
    allFiles.forEach(file => {
        const usesProjects = file.frontmatter.uses_project_keys || [];
        const updatesProjects = file.frontmatter.updates_project_keys || [];
        [...usesProjects, ...updatesProjects].forEach(projectKey => {
            if (projectKey) {
                projectMap[projectKey] = (projectMap[projectKey] || 0) + 1;
            }
        });
    });
    
    // Sort by mention count
    const featuredProjects = Object.entries(projectMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([key, count]) => `- **${key}** (${count} articles)`);
    
    return featuredProjects.length > 0 ? featuredProjects.join('\n') : '';
}

// Main analysis function
async function analyzeContent() {
    const entityPath = getEntityPathName(entityName);
    
    // Read pages for the entity
    const pagesPath = path.join(masterPostsPath, 'pages', entityPath);
    const pages = readMarkdownFiles(pagesPath);
    results.stats.total_pages = pages.length;
    
    // Read posts (for blogs)
    let posts = [];
    if (entityType === 'blog') {
        const postsPath = path.join(masterPostsPath, 'posts');
        const allPosts = readMarkdownFiles(postsPath);
        
        // Filter posts by cross-posting configuration
        const domainName = entityName.replace('blog.', '');
        posts = allPosts.filter(post => {
            const crossPosting = post.frontmatter.cross_posting;
            if (!crossPosting) return false;
            
            const publishedDomains = crossPosting.published_domains || [];
            return publishedDomains.includes(entityName) || publishedDomains.includes(domainName);
        });
    }
    results.stats.total_posts = posts.length;
    
    // Read project data (for projects)
    let projectContent = [];
    let projectsData = {};
    if (entityType === 'project') {
        // This is a specific project entity
        const projectData = readProjectData(entityName);
        if (projectData.docs.length > 0) {
            projectContent = projectData.docs;
            projectsData[entityName] = projectData;
            results.stats.total_projects = 1;
        }
    } else {
        // For domains and blogs, collect all related projects
        const relatedProjects = new Set();
        
        // Find projects mentioned in content
        [...pages, ...posts].forEach(file => {
            const usesProjects = file.frontmatter.uses_project_keys || [];
            const updatesProjects = file.frontmatter.updates_project_keys || [];
            [...usesProjects, ...updatesProjects].forEach(projectKey => {
                if (projectKey) relatedProjects.add(projectKey);
            });
        });
        
        // Read project data for all related projects
        relatedProjects.forEach(projectKey => {
            const projectData = readProjectData(projectKey);
            if (projectData.info || projectData.docs.length > 0) {
                projectsData[projectKey] = projectData;
                projectContent.push(...projectData.docs);
            }
        });
        
        results.stats.total_projects = Object.keys(projectsData).length;
    }
    
    // Combine all content
    const allContent = [...pages, ...posts, ...projectContent];
    
    // Get last update date from structured data
    if (allContent.length > 0) {
        const dates = allContent
            .map(f => f.frontmatter.date_modified || f.frontmatter.date_published || f.frontmatter.date)
            .filter(d => d)
            .map(d => new Date(d))
            .sort((a, b) => b - a);
        
        if (dates.length > 0) {
            results.stats.last_update = dates[0].toISOString().split('T')[0];
        }
    }
    
    // Determine content types from structured data
    const contentTypes = new Set();
    allContent.forEach(file => {
        if (file.isProject) {
            // Add documentation as a content type for projects
            contentTypes.add('Documentation');
            // Check for specific doc types
            const title = file.frontmatter.title || '';
            if (title.includes('API')) contentTypes.add('API Reference');
            if (title.includes('Guide') || title.includes('Tutorial')) contentTypes.add('Tutorials');
        } else {
            const type = file.frontmatter.content_type;
            if (type && contentTypeLabels[type]) {
                contentTypes.add(contentTypeLabels[type]);
            }
        }
    });
    if (contentTypes.size > 0) {
        results.stats.content_types = Array.from(contentTypes).join(', ');
    }
    
    // Generate dynamic sections using structured data
    results.key_topics_section = extractKeyTopics(allContent, projectsData, domainContext);
    results.recent_content_section = generateRecentContent(allContent);
    results.popular_content_section = generatePopularContent(allContent);
    results.expertise_areas_section = extractExpertiseAreas(allContent, projectsData, domainContext);
    results.content_philosophy_section = generateContentPhilosophy(allContent, domainContext);
    
    // Handle featured projects
    const featuredProjects = getFeaturedProjects(projectsData);
    if (featuredProjects) {
        if (entityType === 'project') {
            results.featured_projects_section = `Project Details:\n\n${featuredProjects}`;
        } else {
            results.featured_projects_section = `Key projects covered in our content:\n\n${featuredProjects}`;
        }
        results.projects_list = featuredProjects;
    }
    
    // Get sibling entities from config
    if (entityType === 'blog' && config.domain_info?.parent_domain) {
        // For blogs, siblings are other blogs under same parent
        results.sibling_entities_list = `See also: ${config.domain_info.parent_domain}`;
    }
    
    // Add social media presence to results if available
    if (domainContext.social && Object.keys(domainContext.social).length > 0) {
        const socialLinks = [];
        Object.entries(domainContext.social).forEach(([platform, handle]) => {
            if (handle) {
                socialLinks.push(`${platform}: ${handle}`);
            }
        });
        if (socialLinks.length > 0) {
            results.social_media_section = `Connect with us:\n${socialLinks.join('\n')}`;
        }
    }
    
    // Determine update frequency based on recent content and domain features
    if (allContent.length > 0) {
        const recentCount = allContent.filter(f => {
            const date = new Date(f.frontmatter.date_published || f.frontmatter.date || 0);
            const daysSince = (Date.now() - date) / (1000 * 60 * 60 * 24);
            return daysSince < 30;
        }).length;
        
        if (recentCount >= 20) {
            results.content_update_frequency = 'Daily updates';
        } else if (recentCount >= 8) {
            results.content_update_frequency = 'Weekly updates';
        } else if (recentCount >= 2) {
            results.content_update_frequency = 'Monthly updates';
        } else {
            results.content_update_frequency = 'Periodic updates';
        }
        
        // Add note about RSS if enabled
        if (domainContext.features?.rss_enabled || config.blog_content?.rss_enabled) {
            results.content_update_frequency += ' (RSS feed available)';
        }
    }
    
    // Write results
    try {
        fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
        process.exit(0);
    } catch (error) {
        console.error('Failed to write output:', error.message);
        process.exit(1);
    }
}

// Run analysis
analyzeContent().catch(error => {
    console.error('Analysis failed:', error);
    process.exit(1);
});