#!/usr/bin/env node

/**
 * Schema Loader Utility for Decap CMS
 * 
 * Loads all JSON schemas from build/schemas/ and provides utilities for:
 * - Mapping proto field types to CMS widget types
 * - Generating CMS field configurations from schema properties
 * - Creating enum options with Schema.org mappings
 * 
 * This is the foundation for dynamic CMS field generation.
 */

const fs = require('fs-extra');
const path = require('path');
const yaml = require('js-yaml');

class SchemaLoader {
  constructor(buildDir, schemaMappingsPath) {
    this.schemaDir = path.join(buildDir, 'schemas');
    this.schemas = new Map();
    this.schemaMappings = {};
    
    // Load schema mappings if provided
    if (schemaMappingsPath && fs.existsSync(schemaMappingsPath)) {
      try {
        const mappingsContent = fs.readFileSync(schemaMappingsPath, 'utf8');
        this.schemaMappings = yaml.load(mappingsContent) || {};
        console.log(`✓ Loaded schema mappings from ${schemaMappingsPath}`);
      } catch (err) {
        console.warn(`⚠ Could not load schema mappings: ${err.message}`);
      }
    }
    
    // Load all JSON schemas
    this.loadAllSchemas();
  }
  
  /**
   * Load all JSON schemas from the build directory
   */
  loadAllSchemas() {
    if (!fs.existsSync(this.schemaDir)) {
      throw new Error(`Schemas directory not found: ${this.schemaDir}\nRun proto2schema.sh first!`);
    }
    
    const files = fs.readdirSync(this.schemaDir);
    let loadedCount = 0;
    
    files.forEach(file => {
      if (file.endsWith('.schema.json')) {
        const name = file.replace('.schema.json', '');
        const filePath = path.join(this.schemaDir, file);
        
        try {
          const content = require(filePath);
          this.schemas.set(name, content);
          loadedCount++;
        } catch (err) {
          console.warn(`⚠ Could not load schema ${file}: ${err.message}`);
        }
      }
    });
    
    console.log(`✓ Loaded ${loadedCount} schemas for CMS generation`);
  }
  
  /**
   * Get a specific schema by name
   */
  getSchema(name) {
    const schema = this.schemas.get(name);
    
    // Handle schemas with top-level $ref to definitions
    if (schema && schema.$ref && schema.definitions) {
      const refName = schema.$ref.split('/').pop();
      if (schema.definitions[refName]) {
        // Return the actual definition, but keep the full schema context
        return {
          ...schema.definitions[refName],
          _fullSchema: schema
        };
      }
    }
    
    return schema;
  }
  
  /**
   * Get all loaded schemas
   */
  getAllSchemas() {
    return Object.fromEntries(this.schemas);
  }
  
  /**
   * Determine CMS widget type from proto field definition
   */
  getWidgetType(fieldDef) {
    // Check for enums first (most specific)
    if (fieldDef.enum) {
      return 'select';
    }
    
    // Check for arrays
    if (fieldDef.type === 'array') {
      // Check if it's an array of objects (needs list widget)
      if (fieldDef.items && fieldDef.items.$ref) {
        return 'list';
      }
      // Simple array (tags, categories)
      return 'list';
    }
    
    // Check for objects/references
    if (fieldDef.$ref || fieldDef.type === 'object') {
      return 'object';
    }
    
    // Check basic types
    if (fieldDef.type === 'boolean') {
      return 'boolean';
    }
    
    if (fieldDef.type === 'integer' || fieldDef.type === 'number') {
      return 'number';
    }
    
    // Check description hints for special widgets
    const description = fieldDef.description || '';
    
    if (description.toLowerCase().includes('markdown')) {
      return 'markdown';
    }
    
    if (description.toLowerCase().includes('image')) {
      return 'image';
    }
    
    if (description.toLowerCase().includes('file')) {
      return 'file';
    }
    
    if (description.toLowerCase().includes('date')) {
      return 'datetime';
    }
    
    if (description.toLowerCase().includes('url') || 
        description.toLowerCase().includes('link')) {
      return 'string'; // URL validation via pattern
    }
    
    if (description.toLowerCase().includes('color')) {
      return 'color';
    }
    
    if (description.toLowerCase().includes('code')) {
      return 'code';
    }
    
    // Default to string for everything else
    return 'string';
  }
  
  /**
   * Generate enum options with Schema.org mappings
   */
  generateEnumOptions(enumValues, mappingKey) {
    if (!enumValues || !Array.isArray(enumValues)) {
      return [];
    }
    
    const mappings = this.schemaMappings[mappingKey] || {};
    
    return enumValues
      .filter(value => {
        // Filter out UNSPECIFIED values
        return typeof value === 'string' && 
               !value.includes('UNSPECIFIED') &&
               !value.includes('UNKNOWN');
      })
      .map(value => {
        const label = this.formatEnumLabel(value);
        const schemaOrgType = mappings[value] || null;
        
        const option = {
          label: label,
          value: value
        };
        
        // Include Schema.org mapping if available
        if (schemaOrgType) {
          option.hint = `Schema.org: ${schemaOrgType}`;
        }
        
        return option;
      });
  }
  
  /**
   * Format enum value to human-readable label
   */
  formatEnumLabel(enumValue) {
    // Remove common prefixes
    let label = enumValue
      .replace(/^(CONTENT_TYPE_|MEDIA_TYPE_|DISCUSSION_PLATFORM_|PROJECT_TYPE_|SERVICE_TYPE_|LICENSE_TYPE_|PERSON_ROLE_)/, '');
    
    // Convert to title case
    label = label
      .toLowerCase()
      .replace(/_/g, ' ')
      .replace(/\b\w/g, char => char.toUpperCase());
    
    return label;
  }
  
  /**
   * Generate CMS field configuration from schema property
   */
  generateFieldConfig(name, propertyDef, required = false) {
    const widgetType = this.getWidgetType(propertyDef);
    
    const config = {
      label: this.formatFieldLabel(name),
      name: name,
      widget: widgetType,
      required: required || propertyDef.required || false
    };
    
    // Add description as hint
    if (propertyDef.description) {
      config.hint = propertyDef.description;
    }
    
    // Add default value if specified
    if (propertyDef.default !== undefined) {
      config.default = propertyDef.default;
    }
    
    // Handle enum options
    if (propertyDef.enum) {
      // Try to find mapping key based on field name
      const mappingKey = this.findMappingKey(name);
      config.options = this.generateEnumOptions(propertyDef.enum, mappingKey);
    }
    
    // Handle pattern validation
    if (propertyDef.pattern) {
      config.pattern = [
        propertyDef.pattern,
        propertyDef.patternError || 'Invalid format'
      ];
    }
    
    // Handle min/max for numbers
    if (propertyDef.minimum !== undefined) {
      config.min = propertyDef.minimum;
    }
    if (propertyDef.maximum !== undefined) {
      config.max = propertyDef.maximum;
    }
    
    // Handle arrays
    if (widgetType === 'list' && propertyDef.items) {
      if (propertyDef.items.$ref) {
        // Complex object array - needs field definitions
        const refName = propertyDef.items.$ref.split('/').pop();
        const refSchema = this.getSchema(refName);
        
        if (refSchema && refSchema.properties) {
          config.fields = Object.entries(refSchema.properties).map(([fieldName, fieldDef]) => {
            return this.generateFieldConfig(
              fieldName,
              fieldDef,
              refSchema.required && refSchema.required.includes(fieldName)
            );
          });
        }
      } else if (propertyDef.items.type === 'string') {
        // Simple string array
        config.allow_add = true;
        config.collapsed = false;
      }
    }
    
    // Handle objects
    if (widgetType === 'object' && propertyDef.properties) {
      config.fields = Object.entries(propertyDef.properties).map(([fieldName, fieldDef]) => {
        return this.generateFieldConfig(
          fieldName,
          fieldDef,
          propertyDef.required && propertyDef.required.includes(fieldName)
        );
      });
    }
    
    return config;
  }
  
  /**
   * Format field name to human-readable label
   */
  formatFieldLabel(fieldName) {
    return fieldName
      .replace(/_/g, ' ')
      .replace(/\b\w/g, char => char.toUpperCase());
  }
  
  /**
   * Find mapping key for a field name
   */
  findMappingKey(fieldName) {
    // Map field names to mapping keys
    const fieldToMappingKey = {
      'content_type': 'ContentType',
      'media_type': 'MediaType',
      'discussion_platform': 'DiscussionPlatform',
      'project_type': 'ProjectType',
      'service_type': 'ServiceType',
      'license_type': 'LicenseType',
      'person_role': 'PersonRole',
      'relationship_type': 'RelationshipType',
      'development_status': 'ProjectDevelopmentStatus',
      'comic_type': 'ComicType',
      'book_structure': 'BookStructure'
    };
    
    return fieldToMappingKey[fieldName] || fieldName;
  }
  
  /**
   * Generate all fields for a schema
   */
  generateSchemaFields(schemaName) {
    const schema = this.getSchema(schemaName);
    
    if (!schema || !schema.properties) {
      console.warn(`⚠ Schema ${schemaName} not found or has no properties`);
      return [];
    }
    
    return Object.entries(schema.properties).map(([fieldName, fieldDef]) => {
      return this.generateFieldConfig(
        fieldName,
        fieldDef,
        schema.required && schema.required.includes(fieldName)
      );
    });
  }
  
  /**
   * Generate collection configuration from schema
   */
  generateCollectionFromSchema(schemaName, collectionDefaults = {}) {
    const fields = this.generateSchemaFields(schemaName);
    
    if (fields.length === 0) {
      return null;
    }
    
    return {
      ...collectionDefaults,
      fields: fields
    };
  }
}

// Export for use in other scripts
module.exports = SchemaLoader;

// If run directly, demonstrate functionality
if (require.main === module) {
  const buildDir = process.argv[2] || path.resolve(__dirname, '../../build');
  const schemaMappingsPath = process.argv[3] || path.resolve(__dirname, '../schema/schema-mappings.yml');
  
  console.log('Schema Loader Utility Demo');
  console.log('==========================');
  console.log(`Build directory: ${buildDir}`);
  console.log(`Schema mappings: ${schemaMappingsPath}`);
  console.log('');
  
  try {
    const loader = new SchemaLoader(buildDir, schemaMappingsPath);
    
    // Demo: Generate fields for ArticleConfig
    console.log('\nGenerating fields for ArticleConfig:');
    console.log('=====================================');
    const articleFields = loader.generateSchemaFields('ArticleConfig');
    console.log(JSON.stringify(articleFields.slice(0, 5), null, 2));
    console.log(`... and ${articleFields.length - 5} more fields`);
    
    // Demo: Show enum handling
    const contentTypeSchema = loader.getSchema('ContentTypeMappings');
    if (contentTypeSchema && contentTypeSchema.properties && contentTypeSchema.properties.ContentType) {
      console.log('\nContent Type enum options:');
      console.log('==========================');
      const options = loader.generateEnumOptions(
        contentTypeSchema.properties.ContentType.enum,
        'ContentType'
      );
      console.log(JSON.stringify(options.slice(0, 3), null, 2));
    }
    
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
}