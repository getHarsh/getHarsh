#!/usr/bin/env node

/**
 * generate-federated-manifest.js - Cross-domain search federation manifest generator
 * 
 * This script generates a federated search manifest that enables cross-domain
 * search capabilities across the entire getHarsh ecosystem.
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

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
  'domain': currentDomain,
  'output': outputPath,
  'mode': mode = 'LOCAL'
} = argMap;

console.log('=== Federated Search Manifest Generation ===');
console.log('Current domain:', currentDomain);
console.log('Mode:', mode);

// Load ecosystem configuration
function loadEcosystemConfig() {
  if (!ecosystemConfigPath || !fs.existsSync(ecosystemConfigPath)) {
    throw new Error('Ecosystem config not found');
  }
  return yaml.load(fs.readFileSync(ecosystemConfigPath, 'utf8'));
}

// Load discovery data
function loadDiscoveryData() {
  if (!discoveryDataPath || !fs.existsSync(discoveryDataPath)) {
    throw new Error('Discovery data not found');
  }
  return JSON.parse(fs.readFileSync(discoveryDataPath, 'utf8'));
}

/**
 * Determine entity type from domain configuration
 */
function determineEntityType(domainName, config) {
  // Check if it's a person domain
  const personDomains = ['getharsh.in', 'sleepwalker.in'];
  if (personDomains.includes(domainName)) {
    return 'Person';
  }
  
  // Check if it's an organization domain
  const orgDomains = ['daostudio.in', 'rawthoughts.in'];
  if (orgDomains.includes(domainName)) {
    return 'Organization';
  }
  
  // Check if it's a research domain
  if (domainName === 'causality.in') {
    return 'ResearchOrganization';
  }
  
  return 'WebSite';
}

/**
 * Get projects for a domain
 */
function getProjectsForDomain(domainName, discoveryData) {
  const projects = discoveryData.projects || [];
  return projects.filter(project => project.startsWith(domainName));
}

/**
 * Determine relationship between domains
 */
function getDomainRelationship(domain1, domain2, config) {
  // Define relationships based on ecosystem knowledge
  const relationships = {
    'getharsh.in': {
      'causality.in': 'founder',
      'rawthoughts.in': 'founder',
      'sleepwalker.in': 'alter-ego',
      'daostudio.in': 'co-founder'
    },
    'rawthoughts.in': {
      'getharsh.in': 'owned-by',
      'causality.in': 'subsidiary',
      'sleepwalker.in': 'subsidiary'
    },
    'daostudio.in': {
      'getharsh.in': 'co-founded-by'
    }
  };
  
  return relationships[domain1]?.[domain2] || 'related';
}

/**
 * Build federated search manifest
 */
async function buildFederatedManifest() {
  const ecosystemConfig = loadEcosystemConfig();
  const discoveryData = loadDiscoveryData();
  
  const manifest = {
    version: '1.0.0',
    generated: new Date().toISOString(),
    mode: mode,
    
    // Ecosystem metadata
    ecosystem: {
      name: 'getHarsh Multi-Domain Ecosystem',
      description: 'A constellation of interconnected domains exploring technology, philosophy, and human potential',
      owner: {
        name: 'Harsh Vardhan',
        entity: 'Individual',
        domains: ['getharsh.in', 'sleepwalker.in']
      },
      legal_entities: [
        {
          name: 'RawThoughts Enterprises Private Limited',
          abbreviation: 'RTEPL',
          domains: ['rawthoughts.in', 'causality.in'],
          type: 'PrivateLimited'
        },
        {
          name: 'DAO Studio Private Limited',
          abbreviation: 'DSPL',
          domains: ['daostudio.in'],
          type: 'PrivateLimited'
        }
      ]
    },
    
    // Current domain information
    currentDomain: {
      domain: currentDomain,
      type: determineEntityType(currentDomain, ecosystemConfig),
      title: ecosystemConfig.domain_info?.title || currentDomain,
      description: ecosystemConfig.domain_info?.tagline,
      searchCapabilities: {
        version: '1.0.0',
        engine: 'flexsearch',
        indexes: ['unified', 'posts', 'pages', 'projects'],
        features: {
          suggestions: true,
          fuzzy: true,
          filters: true,
          crossDomain: true,
          schemaAware: true,
          multiLanguage: false,
          realtimeUpdates: false
        }
      },
      endpoints: {
        searchIndex: `https://${currentDomain}/search-index.json`,
        searchManifest: `https://${currentDomain}/search-manifest.json`,
        federatedManifest: `https://${currentDomain}/federated-search.json`
      }
    },
    
    // Related domains in the ecosystem
    relatedDomains: [],
    
    // Cross-domain search endpoints
    searchEndpoints: {},
    
    // Domain relationships graph
    relationships: {},
    
    // Search federation capabilities
    federation: {
      enabled: true,
      protocol: 'https',
      authentication: 'none',
      rateLimit: {
        requests: 100,
        window: '1m'
      },
      cache: {
        ttl: 3600,
        strategy: 'stale-while-revalidate'
      }
    }
  };
  
  // Build related domains list
  const allDomains = discoveryData.domains || [];
  const allBlogs = discoveryData.blogs || [];
  
  // Process each domain
  for (const domain of allDomains) {
    if (domain === currentDomain) continue;
    
    const projects = getProjectsForDomain(domain, discoveryData);
    const hasBlog = allBlogs.includes(`blog.${domain}`);
    
    const domainInfo = {
      domain: domain,
      type: determineEntityType(domain, ecosystemConfig),
      relationship: getDomainRelationship(currentDomain, domain, ecosystemConfig),
      capabilities: {
        hasProjects: projects.length > 0,
        projectCount: projects.length,
        hasBlog: hasBlog,
        searchEnabled: true,
        federationEnabled: true
      },
      endpoints: {
        searchIndex: `https://${domain}/search-index.json`,
        searchManifest: `https://${domain}/search-manifest.json`,
        federatedManifest: `https://${domain}/federated-search.json`
      }
    };
    
    // Add blog endpoint if exists
    if (hasBlog) {
      domainInfo.endpoints.blogSearchIndex = `https://blog.${domain}/search-index.json`;
    }
    
    manifest.relatedDomains.push(domainInfo);
    
    // Add to search endpoints
    manifest.searchEndpoints[domain] = domainInfo.endpoints;
  }
  
  // Build relationship graph
  manifest.relationships = {
    'getharsh.in': {
      type: 'Person',
      owns: ['sleepwalker.in'],
      founded: ['causality.in', 'rawthoughts.in'],
      coFounded: ['daostudio.in']
    },
    'rawthoughts.in': {
      type: 'Organization',
      parent: 'RTEPL',
      subsidiaries: ['causality.in'],
      founder: 'getharsh.in'
    },
    'causality.in': {
      type: 'ResearchOrganization',
      parent: 'RTEPL',
      parentOrg: 'rawthoughts.in',
      founder: 'getharsh.in'
    },
    'sleepwalker.in': {
      type: 'Person',
      alterEgoOf: 'getharsh.in',
      parent: 'RTEPL'
    },
    'daostudio.in': {
      type: 'Organization',
      parent: 'DSPL',
      coFounders: ['getharsh.in']
    }
  };
  
  // Add CORS and federation policies
  manifest.policies = {
    cors: {
      allowedOrigins: [
        'https://getharsh.in',
        'https://causality.in',
        'https://rawthoughts.in',
        'https://sleepwalker.in',
        'https://daostudio.in',
        'https://blog.getharsh.in',
        'https://blog.causality.in',
        'https://blog.rawthoughts.in',
        'https://blog.sleepwalker.in',
        'https://blog.daostudio.in'
      ],
      allowedMethods: ['GET', 'OPTIONS'],
      maxAge: 86400
    },
    consent: {
      required: true,
      scope: 'cross-domain-search',
      legalBasis: 'legitimate-interest'
    }
  };
  
  // Write manifest
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  fs.writeFileSync(outputPath, JSON.stringify(manifest, null, 2));
  console.log(`✓ Federated search manifest generated: ${outputPath}`);
  
  // Also generate a compact version for production
  if (mode === 'PRODUCTION') {
    const compactPath = outputPath.replace('.json', '.min.json');
    fs.writeFileSync(compactPath, JSON.stringify(manifest));
    console.log(`✓ Compact manifest generated: ${compactPath}`);
  }
}

// Main execution
async function main() {
  try {
    await buildFederatedManifest();
    console.log('✓ Federated search manifest generation complete!');
  } catch (error) {
    console.error('Error generating federated manifest:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}