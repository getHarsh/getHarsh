#!/usr/bin/env node

/**
 * TypeScript Type Generation from JSON Schemas
 * 
 * Generates TypeScript type definitions from all JSON schemas in build/schemas/
 * This enables full type safety and IntelliSense support in the IDE.
 * 
 * Usage:
 *   node proto2ts.js [schemas-dir] [output-dir]
 * 
 * Example:
 *   node proto2ts.js ../../build/schemas ../../src/types/generated
 */

const fs = require('fs-extra');
const path = require('path');
const { compile } = require('json-schema-to-typescript');
const $RefParser = require('@apidevtools/json-schema-ref-parser');

// Parse command line arguments
const schemasDir = process.argv[2] || path.resolve(__dirname, '../../build/schemas');
const outputDir = process.argv[3] || path.resolve(__dirname, '../../src/types/generated');

// Compile options for better TypeScript output
const compileOptions = {
  bannerComment: '',  // We'll add custom banner per file
  style: {
    singleQuote: true,
    semi: true,
    trailingComma: 'es5',
    bracketSpacing: true,
    printWidth: 100
  },
  // Don't generate additional properties by default
  additionalProperties: false,
  // Enable strict null checks
  strictNullChecks: true,
  // Format the output
  format: true,
  // Don't add index signatures
  unknownAny: false,
  // Use interface instead of type for objects
  declareExternallyReferenced: true,
  // Enable refs
  $refOptions: {
    resolve: {
      // Resolve local references
      local: 'json-schema-to-typescript#/definitions/'
    }
  }
};

/**
 * Check if a schema has circular references
 */
function hasCircularReference(schema) {
  if (!schema.definitions) return false;
  
  // Check each definition for self-references
  for (const [defName, def] of Object.entries(schema.definitions)) {
    if (def.properties) {
      for (const prop of Object.values(def.properties)) {
        // Check for array items with self-reference
        if (prop.items && prop.items.$ref === `#/definitions/${defName}`) {
          return true;
        }
        // Check for direct self-reference
        if (prop.$ref === `#/definitions/${defName}`) {
          return true;
        }
      }
    }
  }
  
  return false;
}

/**
 * Resolve all $ref references in a schema
 */
async function resolveSchemaRefs(schema, schemasDir) {
  try {
    // Don't try to dereference schemas with circular references
    if (hasCircularReference(schema)) {
      return simplifySchema(schema);
    }
    
    // Create a custom resolver that can find schemas in our directory
    const resolver = {
      order: 1,
      canRead: /^[^#]/,
      read: async (file) => {
        const schemaName = path.basename(file.url || file);
        const schemaPath = path.join(schemasDir, schemaName);
        if (fs.existsSync(schemaPath)) {
          return JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
        }
        throw new Error(`Schema not found: ${schemaName}`);
      }
    };

    // Clone the schema to avoid modifying the original
    const clonedSchema = JSON.parse(JSON.stringify(schema));
    
    // Dereference all $refs with circular option enabled
    const resolved = await $RefParser.dereference(clonedSchema, {
      resolve: {
        file: resolver,
        http: false
      },
      dereference: {
        circular: 'ignore'  // Ignore circular references
      }
    });
    
    return resolved;
  } catch (err) {
    // If dereferencing fails, try a simpler approach
    return simplifySchema(schema);
  }
}

/**
 * Simplify schema by resolving internal references manually
 */
function simplifySchema(schema) {
  // If the schema has a top-level $ref pointing to a nested property path,
  // extract just the definition it points to
  if (schema.$ref && schema.$ref.startsWith('#/definitions/')) {
    const refPath = schema.$ref.replace('#/definitions/', '').split('/');
    
    // If it's a simple reference to a definition
    if (refPath.length === 1 && schema.definitions && schema.definitions[refPath[0]]) {
      return {
        ...schema.definitions[refPath[0]],
        definitions: schema.definitions
      };
    }
    
    // If it's a deep reference like ABTesting/properties/variants/items
    if (refPath.length > 1 && schema.definitions) {
      let current = schema.definitions;
      for (const segment of refPath) {
        if (current[segment]) {
          current = current[segment];
        } else {
          break;
        }
      }
      
      // Return the found schema fragment with definitions preserved
      if (current && typeof current === 'object') {
        return {
          ...current,
          definitions: schema.definitions
        };
      }
    }
  }
  
  // Return schema as-is if no special handling needed
  return schema;
}

/**
 * Generate TypeScript definitions from JSON schemas
 */
async function generateTypeScriptDefinitions() {
  console.log('TypeScript Type Generation');
  console.log('==========================');
  console.log(`Schemas directory: ${schemasDir}`);
  console.log(`Output directory: ${outputDir}`);
  console.log('');
  
  // Check if schemas directory exists
  if (!fs.existsSync(schemasDir)) {
    console.error(`Error: Schemas directory not found: ${schemasDir}`);
    console.error('Run proto2schema.sh first to generate JSON schemas!');
    process.exit(1);
  }
  
  // Create output directory
  await fs.ensureDir(outputDir);
  console.log(`✓ Created output directory: ${outputDir}`);
  
  // Get all schema files
  const schemaFiles = fs.readdirSync(schemasDir).filter(f => f.endsWith('.schema.json'));
  console.log(`✓ Found ${schemaFiles.length} schema files to process`);
  console.log('');
  
  // Track generated types
  const generatedTypes = [];
  let successCount = 0;
  let errorCount = 0;
  
  // Process each schema file
  for (const schemaFile of schemaFiles) {
    const schemaPath = path.join(schemasDir, schemaFile);
    const typeName = schemaFile.replace('.schema.json', '');
    const outputFile = path.join(outputDir, `${typeName}.d.ts`);
    
    try {
      // Read schema
      const rawSchema = require(schemaPath);
      
      // Resolve references
      const schema = await resolveSchemaRefs(rawSchema, schemasDir);
      
      // Generate custom banner
      const banner = `/**
 * TypeScript definitions for ${typeName}
 * 
 * Generated from: ${schemaFile}
 * Generated on: ${new Date().toISOString()}
 * 
 * DO NOT EDIT - This file is auto-generated from proto schemas
 * To make changes, edit the proto file and regenerate
 */

`;
      
      // Compile schema to TypeScript
      const ts = await compile(schema, typeName, {
        ...compileOptions,
        bannerComment: banner
      });
      
      // Write TypeScript file
      await fs.writeFile(outputFile, ts);
      
      // Track for index generation
      generatedTypes.push(typeName);
      successCount++;
      
      console.log(`✓ Generated ${typeName}.d.ts`);
      
    } catch (err) {
      console.error(`✗ Failed to generate ${typeName}.d.ts: ${err.message}`);
      errorCount++;
    }
  }
  
  console.log('');
  
  // Generate index.d.ts file
  if (generatedTypes.length > 0) {
    const indexContent = `/**
 * TypeScript Type Definitions Index
 * 
 * Generated on: ${new Date().toISOString()}
 * 
 * This file exports all generated type definitions
 * Import from this file for convenience:
 * 
 * Example:
 *   import { ArticleConfig, DomainConfig } from '@/types/generated';
 */

${generatedTypes.map(type => `export * from './${type}';`).join('\n')}

// Re-export commonly used types for convenience
export type {
  ArticleConfig,
  DomainConfig,
  BlogConfig,
  ProjectConfig,
  ServicesConfig,
  ContentType,
  MediaType,
  DiscussionPlatform,
  ProjectType,
  LicenseType
} from './index';
`;
    
    const indexFile = path.join(outputDir, 'index.d.ts');
    await fs.writeFile(indexFile, indexContent);
    console.log('✓ Generated index.d.ts');
  }
  
  // Generate tsconfig.json for the types directory if it doesn't exist
  const tsconfigPath = path.join(outputDir, 'tsconfig.json');
  if (!fs.existsSync(tsconfigPath)) {
    const tsconfig = {
      compilerOptions: {
        target: 'ES2020',
        module: 'ESNext',
        lib: ['ES2020'],
        declaration: true,
        declarationMap: true,
        strict: true,
        esModuleInterop: true,
        skipLibCheck: true,
        forceConsistentCasingInFileNames: true,
        moduleResolution: 'node',
        resolveJsonModule: true,
        types: ['node']
      },
      include: ['**/*.d.ts'],
      exclude: ['node_modules']
    };
    
    await fs.writeJSON(tsconfigPath, tsconfig, { spaces: 2 });
    console.log('✓ Generated tsconfig.json for type definitions');
  }
  
  // Summary
  console.log('');
  console.log('Summary');
  console.log('=======');
  console.log(`✓ Successfully generated: ${successCount} type definitions`);
  if (errorCount > 0) {
    console.log(`✗ Failed to generate: ${errorCount} type definitions`);
  }
  console.log(`✓ Output directory: ${outputDir}`);
  console.log('');
  console.log('Usage in TypeScript/JavaScript:');
  console.log('--------------------------------');
  console.log("import { ArticleConfig } from '@/types/generated';");
  console.log("// or");
  console.log("import * as Types from '@/types/generated';");
  console.log('');
  console.log('Configure path alias in gatsby-config.ts:');
  console.log('------------------------------------------');
  console.log('resolve: {');
  console.log("  alias: {");
  console.log("    '@/types/generated': path.resolve(__dirname, 'src/types/generated'),");
  console.log("  }");
  console.log('}');
}

// Run if called directly
if (require.main === module) {
  generateTypeScriptDefinitions().catch(err => {
    console.error('Fatal error:', err);
    process.exit(1);
  });
}

// Export for use in other scripts
module.exports = { generateTypeScriptDefinitions };