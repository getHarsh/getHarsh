#!/usr/bin/env node
/**
 * process-policy-templates.js - Process policy templates for entity-based legal pages
 * 
 * This tool processes smart policy templates (privacy, cookies, terms) with:
 * - Variable substitution: {ENTITY_NAME}, {CURRENT_DOMAIN}, etc.
 * - Conditional sections: {IF_GA_ENABLED}...{/IF_GA_ENABLED}
 * - Loops: {FOR_EACH_ENTITY_DOMAIN}...{/FOR_EACH_ENTITY_DOMAIN}
 * - GTM-driven cookie tables with accurate specifications
 * - Cross-domain consent language for GDPR compliance
 * 
 * The tool reads policy templates from master_posts/pages/[ENTITY]/ and
 * processes them with domain-specific variables for Gatsby to render.
 * 
 * Usage:
 *   node process-policy-templates.js <template-file> <output-file> <variables-json>
 * 
 * Example:
 *   node process-policy-templates.js privacy-policy.md privacy-processed.md variables.json
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// Parse command line arguments
function parseArgs() {
    const args = process.argv.slice(2);
    if (args.length < 3) {
        console.error('Usage: node process-policy-templates.js <template-file> <output-file> <variables-json>');
        process.exit(1);
    }
    
    return {
        templateFile: args[0],
        outputFile: args[1],
        variablesFile: args[2]
    };
}

// Read template file
function readTemplate(filePath) {
    try {
        return fs.readFileSync(filePath, 'utf8');
    } catch (error) {
        console.error(`Error reading template file: ${error.message}`);
        process.exit(1);
    }
}

// Read variables from JSON file
function readVariables(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(content);
    } catch (error) {
        console.error(`Error reading variables file: ${error.message}`);
        process.exit(1);
    }
}

// Process simple variable substitution
function processVariables(template, variables) {
    let result = template;
    
    // Replace {VARIABLE} patterns
    Object.keys(variables).forEach(key => {
        const value = variables[key];
        const pattern = new RegExp(`\\{${key}\\}`, 'g');
        result = result.replace(pattern, value);
    });
    
    return result;
}

// Process conditional sections
function processConditionals(template, variables) {
    let result = template;
    
    // Process {IF_CONDITION}...{/IF_CONDITION} blocks
    const ifPattern = /\{IF_([A-Z_]+)\}([\s\S]*?)\{\/IF_\1\}/g;
    
    result = result.replace(ifPattern, (match, condition, content) => {
        // Check if condition is true in variables
        const conditionVar = condition;
        const conditionValue = variables[conditionVar];
        
        // Handle boolean conditions
        if (conditionValue === true || conditionValue === 'true' || conditionValue === 'True') {
            return content;
        }
        
        // Handle existence checks
        if (conditionValue && conditionValue !== '' && conditionValue !== 'false' && conditionValue !== 'False') {
            return content;
        }
        
        // Condition is false, remove the block
        return '';
    });
    
    // Process nested conditions like {IF_GTM.ENHANCED_MEASUREMENT.ENABLED}
    const nestedIfPattern = /\{IF_([A-Z_\.]+)\}([\s\S]*?)\{\/IF_\1\}/g;
    
    result = result.replace(nestedIfPattern, (match, condition, content) => {
        // Navigate nested object path
        const parts = condition.split('.');
        let value = variables;
        
        for (const part of parts) {
            if (value && typeof value === 'object' && part in value) {
                value = value[part];
            } else {
                value = null;
                break;
            }
        }
        
        // Check if final value is truthy
        if (value === true || value === 'true' || (value && value !== 'false')) {
            return content;
        }
        
        return '';
    });
    
    return result;
}

// Process loops
function processLoops(template, variables) {
    let result = template;
    
    // Process {FOR_EACH_ENTITY_DOMAIN}...{/FOR_EACH_ENTITY_DOMAIN}
    const forEachPattern = /\{FOR_EACH_ENTITY_DOMAIN\}([\s\S]*?)\{\/FOR_EACH_ENTITY_DOMAIN\}/g;
    
    result = result.replace(forEachPattern, (match, content) => {
        const domains = variables.ENTITY_DOMAINS || [];
        const currentDomain = variables.CURRENT_DOMAIN || '';
        
        return domains.map((domain, index) => {
            let itemContent = content;
            
            // Replace loop variables
            itemContent = itemContent.replace(/\{DOMAIN_NAME\}/g, domain);
            itemContent = itemContent.replace(/\{DOMAIN_BASE_URL\}/g, 
                variables.MODE === 'LOCAL' ? `http://${domain}` : `https://${domain}`);
            
            // Handle {IF_NOT_LAST} condition
            if (index === domains.length - 1) {
                itemContent = itemContent.replace(/\{IF_NOT_LAST\}.*?\{\/IF_NOT_LAST\}/g, '');
                itemContent = itemContent.replace(/\{IF_LAST\}(.*?)\{\/IF_LAST\}/g, '$1');
            } else {
                itemContent = itemContent.replace(/\{IF_NOT_LAST\}(.*?)\{\/IF_NOT_LAST\}/g, '$1');
                itemContent = itemContent.replace(/\{IF_LAST\}.*?\{\/IF_LAST\}/g, '');
            }
            
            // Handle {IF_NOT_CURRENT_DOMAIN}
            if (domain === currentDomain) {
                itemContent = itemContent.replace(/\{IF_NOT_CURRENT_DOMAIN\}.*?\{\/IF_NOT_CURRENT_DOMAIN\}/g, '');
            } else {
                itemContent = itemContent.replace(/\{IF_NOT_CURRENT_DOMAIN\}(.*?)\{\/IF_NOT_CURRENT_DOMAIN\}/g, '$1');
            }
            
            // Determine Schema.org relationship
            const schemaRelationship = determineSchemaRelationship(domain, currentDomain, variables);
            itemContent = itemContent.replace(/\{SCHEMA_RELATIONSHIP\}/g, schemaRelationship);
            
            return itemContent;
        }).join('');
    });
    
    return result;
}

// Determine Schema.org relationship between domains
function determineSchemaRelationship(domain, currentDomain, variables) {
    // If same domain, use sameAs
    if (domain === currentDomain) {
        return 'same-as';
    }
    
    // If both are under same entity, use sameAs
    const currentEntity = variables.ENTITY_ABBREVIATION;
    const domainEntity = getDomainEntity(domain, variables);
    
    if (currentEntity === domainEntity) {
        return 'same-as';
    }
    
    // Otherwise, use related
    return 'related';
}

// Get entity for a domain - DYNAMIC lookup from configuration
function getDomainEntity(domain, variables) {
    // Dynamic entity lookup from brands catalog or entity domain mapping
    // This makes the system work with ANY entities, not just RTEPL/DSPL
    
    // First, check if we have a brands catalog with entity mappings
    if (variables.BRANDS_CATALOG) {
        for (const brand of Object.values(variables.BRANDS_CATALOG)) {
            if (brand.domain_keys && brand.domain_keys.includes(domain)) {
                return brand.legal_entity_key || variables.ENTITY_ABBREVIATION;
            }
        }
    }
    
    // Second, check if we have entity domain mappings
    if (variables.ENTITY_DOMAIN_MAPPINGS) {
        for (const [entity, domains] of Object.entries(variables.ENTITY_DOMAIN_MAPPINGS)) {
            if (domains.includes(domain)) {
                return entity;
            }
        }
    }
    
    // Third, check if current entity owns this domain
    if (variables.ENTITY_DOMAINS && variables.ENTITY_DOMAINS.includes(domain)) {
        return variables.ENTITY_ABBREVIATION;
    }
    
    // Finally, return current entity as fallback (not UNKNOWN)
    // This ensures the system works even with incomplete configuration
    return variables.ENTITY_ABBREVIATION || 'ENTITY';
}

// Process GTM cookie table variables
function processGTMVariables(template, variables) {
    let result = template;
    
    // Replace GTM cookie purpose placeholders
    result = result.replace(/\{GTM\.GA\.COOKIE_GA_PURPOSE\}/g, 
        'Distinguishes unique users by assigning a randomly generated number');
    result = result.replace(/\{GTM\.GA\.COOKIE_GID_PURPOSE\}/g, 
        'Distinguishes unique users');
    
    // Replace GTM container ID - handle both nested formats
    if (variables.GTM && variables.GTM.CONTAINER_ID) {
        result = result.replace(/\{GTM\.CONTAINER_ID\}/g, variables.GTM.CONTAINER_ID);
    } else if (variables.GTM_CONFIG && variables.GTM_CONFIG.container) {
        result = result.replace(/\{GTM\.CONTAINER_ID\}/g, 
            variables.GTM_CONFIG.container.container_id || 'GTM-XXXXXX');
    } else {
        result = result.replace(/\{GTM\.CONTAINER_ID\}/g, 'GTM-XXXXXX');
    }
    
    // Replace engagement thresholds - handle both formats
    if (variables.ENGAGEMENT_THRESHOLD) {
        result = result.replace(/\{ENGAGEMENT_THRESHOLD\}/g, variables.ENGAGEMENT_THRESHOLD);
    } else if (variables.GTM_CONFIG && variables.GTM_CONFIG.events && 
        variables.GTM_CONFIG.events.standard_events && 
        variables.GTM_CONFIG.events.standard_events.engagement) {
        const engagement = variables.GTM_CONFIG.events.standard_events.engagement;
        result = result.replace(/\{ENGAGEMENT_THRESHOLD\}/g, 
            engagement.time_threshold || '10');
    } else {
        result = result.replace(/\{ENGAGEMENT_THRESHOLD\}/g, '10');
    }
    
    // Replace scroll thresholds - handle both formats
    if (variables.SCROLL_THRESHOLDS) {
        result = result.replace(/\{SCROLL_THRESHOLDS\}/g, variables.SCROLL_THRESHOLDS);
    } else if (variables.GTM_CONFIG && variables.GTM_CONFIG.events && 
        variables.GTM_CONFIG.events.standard_events && 
        variables.GTM_CONFIG.events.standard_events.engagement) {
        const engagement = variables.GTM_CONFIG.events.standard_events.engagement;
        result = result.replace(/\{SCROLL_THRESHOLDS\}/g, 
            engagement.scroll_thresholds ? engagement.scroll_thresholds.join(', ') : '25, 50, 75, 100');
    } else {
        result = result.replace(/\{SCROLL_THRESHOLDS\}/g, '25, 50, 75, 100');
    }
    
    return result;
}

// Main processing function
function processTemplate(templateContent, variables) {
    let result = templateContent;
    
    // Process in order:
    // 1. Simple variable substitution
    result = processVariables(result, variables);
    
    // 2. GTM-specific variables
    result = processGTMVariables(result, variables);
    
    // 3. Loops (before conditionals to handle loop-specific conditions)
    result = processLoops(result, variables);
    
    // 4. Conditional sections
    result = processConditionals(result, variables);
    
    // Clean up any empty lines from removed sections
    result = result.replace(/\n\n\n+/g, '\n\n');
    
    return result;
}

// Write output file
function writeOutput(filePath, content) {
    try {
        const dir = path.dirname(filePath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(filePath, content, 'utf8');
    } catch (error) {
        console.error(`Error writing output file: ${error.message}`);
        process.exit(1);
    }
}

// Main execution
function main() {
    const args = parseArgs();
    
    // Read inputs
    const templateContent = readTemplate(args.templateFile);
    const variables = readVariables(args.variablesFile);
    
    // Process template
    const processedContent = processTemplate(templateContent, variables);
    
    // Write output
    writeOutput(args.outputFile, processedContent);
    
    console.log(`✓ Processed template: ${args.templateFile} -> ${args.outputFile}`);
}

// Run main function
main();