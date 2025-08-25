/**
 * @fileoverview Project Relationships Widget for Article-Project Linkage
 * @module static/admin/widgets/project-relationships-widget
 * 
 * @description
 * Custom CMS widget for managing complex relationships between articles and projects
 * in the getHarsh ecosystem. This widget enables content creators to establish
 * semantic connections between blog posts and project repositories, supporting
 * the documentation and announcement workflow for open-source projects.
 * 
 * The widget implements the ProjectRelationships protobuf message from project.proto,
 * providing an intuitive interface for linking content to multiple projects.
 * 
 * @architecture
 * The project relationship system uses a many-to-many model:
 * 1. **Uses Projects**: Articles can reference multiple projects
 * 2. **Updates Project**: Articles can be primary updates for one project
 * 3. **Project Status**: Categorizes the relationship type
 * 4. **Discovery Integration**: Dynamic project detection across domains
 * 5. **Cross-Domain Support**: Projects from any domain can be linked
 * 
 * @proto-integration
 * Maps to ProjectRelationships message in project.proto:
 * ```protobuf
 * message ProjectRelationships {
 *   repeated string uses_projects = 1;
 *   optional string updates_project = 2;
 *   optional ProjectStatus project_status = 3;
 *   repeated string relates_to_projects = 4;
 * }
 * 
 * enum ProjectStatus {
 *   PROJECT_STATUS_UNKNOWN = 0;
 *   PROJECT_STATUS_ANNOUNCEMENT = 1;
 *   PROJECT_STATUS_UPDATE = 2;
 *   PROJECT_STATUS_DOCUMENTATION = 3;
 *   PROJECT_STATUS_TUTORIAL = 4;
 * }
 * ```
 * 
 * @ecosystem-integration
 * - Discovery System: Reads projects from __DECAP_DISCOVERY__
 * - Project Structure: Follows [domain]/PROJECTS/[name] pattern
 * - Build System: Links resolved during Phase 6 build
 * - CMS System: Integrated as custom widget in Decap CMS
 * - Navigation: Project links appear in article metadata
 * - Search: Project relationships indexed for discovery
 * - Analytics: Project engagement tracked via GTM
 * 
 * @features
 * - **Multi-Select Projects**: Link to multiple project repositories
 * - **Primary Update**: Designate article as project changelog
 * - **Status Categorization**: Classify relationship type
 * - **Domain Grouping**: Projects organized by parent domain
 * - **Discovery Integration**: Auto-populate from build manifest
 * - **Visual Feedback**: Chips show selected projects
 * - **Validation**: Ensures consistency in relationships
 * 
 * @data-structure
 * ```typescript
 * interface ProjectRelationshipsData {
 *   uses_projects?: string[]       // Projects referenced/used
 *   updates_project?: string        // Primary project updated
 *   project_status?: string         // Relationship type
 * }
 * ```
 * 
 * @project-discovery
 * Projects are discovered using path-utils.sh patterns:
 * 1. find_all_projects scans filesystem
 * 2. Looks for [domain]/PROJECTS/*/config.yml
 * 3. Validates project has required structure
 * 4. Adds to discovery manifest during build
 * 5. Widget loads manifest at runtime
 * 
 * @ui-behavior
 * - **Uses Projects**: Chip array for multi-selection
 * - **Updates Project**: Dropdown for single selection
 * - **Project Status**: Button group for type selection
 * - **Domain Groups**: Projects grouped by parent domain
 * - **Visual States**: Selected/unselected clearly indicated
 * - **Fallback Data**: Hardcoded list if discovery fails
 * 
 * @content-workflow
 * 1. Author writes about project(s)
 * 2. Selects referenced projects (uses_projects)
 * 3. Optionally marks as update (updates_project)
 * 4. Chooses relationship type (project_status)
 * 5. Article links to project pages
 * 6. Project pages show related articles
 * 7. Bidirectional discovery enabled
 * 
 * @dos
 * - Select all projects referenced in article
 * - Mark primary project for changelogs
 * - Use appropriate status type
 * - Verify project paths are correct
 * - Test relationships in preview
 * 
 * @donts
 * - Don't hardcode project paths
 * - Don't skip status selection
 * - Don't mix announcement and update
 * - Don't ignore discovery data
 * - Don't select non-existent projects
 * 
 * @example-usage
 * ```yaml
 * # Article frontmatter after widget configuration
 * project_relationships:
 *   uses_projects:
 *     - "causality.in/PROJECTS/HENA"
 *     - "getHarsh.in/PROJECTS/website"
 *   updates_project: "causality.in/PROJECTS/HENA"
 *   project_status: "update"
 * ```
 * 
 * @see {@link file://./CMS.md#project-relationships} - Relationship documentation
 * @see {@link file://./BUILD.md#project-discovery} - Discovery system
 * @see {@link file://./config/schema/project.proto} - ProjectRelationships proto
 * @see {@link file://./config/CONFIG.md#projects} - Project configuration
 * @see {@link file://./path-utils.sh#find_all_projects} - Discovery function
 * @see {@link file://./src/USE-CASE.md#project-documentation} - Use cases
 * 
 * @since 1.0.0
 */

import React, { useState, useEffect } from "react"
import { CmsWidgetControlProps as WidgetProps } from "decap-cms-core"
import { Card, CardContent, CardHeader, CardTitle } from "../../../src/components/ui/Card"
import { Chip } from "../../../src/components/ui/Chip"
import { Button } from "../../../src/components/ui/Button"

/**
 * @interface ProjectRelationshipsData
 * @description Data structure for project relationships
 * 
 * @property {string[]} [uses_projects] - Array of project paths referenced in the article
 * @property {string} [updates_project] - Single project path being primarily updated
 * @property {string} [project_status] - Type of project content (announcement|update|documentation|tutorial)
 */
interface ProjectRelationshipsData {
  uses_projects?: string[]
  updates_project?: string
  project_status?: string
}

/**
 * Get projects from discovery data if available, fallback to defaults
 * 
 * This function attempts to load the dynamic project list from the discovery
 * manifest generated during build. If unavailable (e.g., in development),
 * it falls back to a hardcoded list of known projects.
 * 
 * @returns {Array<{key: string, label: string, domain: string}>} Project list
 * @returns {string} returns[].key - Full project path (domain.in/PROJECTS/name)
 * @returns {string} returns[].label - Display name of the project
 * @returns {string} returns[].domain - Domain name without .in suffix
 */
const getProjectsFromDiscovery = (): Array<{key: string, label: string, domain: string}> => {
  if (typeof window !== 'undefined' && (window as any).__DECAP_DISCOVERY__) {
    const discovery = (window as any).__DECAP_DISCOVERY__;
    if (discovery.projects && Array.isArray(discovery.projects)) {
      /**
       * Parse project paths from discovery data
       * Projects come as "domain.in/PROJECTS/project-name"
       * We extract domain and project name for display
       */
      return discovery.projects.map((p: string) => {
        const parts = p.split('/');
        const projectName = parts[parts.length - 1];
        const domain = parts[0].replace('.in', '');
        return {
          key: p,  // Full path as key
          label: projectName,
          domain: domain
        };
      });
    }
  }
  /**
   * Fallback to hardcoded list if discovery not available
   * This ensures the widget works during development or if discovery fails.
   * The list should be kept in sync with actual projects in the ecosystem.
   */
  return [
    { key: "causality.in/PROJECTS/HENA", label: "HENA", domain: "causality" },
    { key: "causality.in/PROJECTS/JARVIS-kernel", label: "JARVIS-kernel", domain: "causality" },
    { key: "rawThoughts.in/PROJECTS/AIPM", label: "AIPM", domain: "rawThoughts" },
    { key: "rawThoughts.in/PROJECTS/jarvisMCP", label: "jarvisMCP", domain: "rawThoughts" },
    { key: "rawThoughts.in/PROJECTS/rteplMCP", label: "rteplMCP", domain: "rawThoughts" },
    { key: "daostudio.in/PROJECTS/DAOnet", label: "DAOnet", domain: "daostudio" },
    { key: "daostudio.in/PROJECTS/yojnAI", label: "yojnAI", domain: "daostudio" },
    { key: "daostudio.in/PROJECTS/yojnCare", label: "yojnCare", domain: "daostudio" },
    { key: "daostudio.in/PROJECTS/yojnProtocol", label: "yojnProtocol", domain: "daostudio" },
    { key: "getHarsh.in/PROJECTS/claude-code", label: "claude-code", domain: "getHarsh" },
    { key: "getHarsh.in/PROJECTS/website", label: "website", domain: "getHarsh" }
  ];
}

/**
 * @constant PROJECT_STATUS_OPTIONS
 * @description Available project status types for categorizing content
 * 
 * - announcement: Initial project announcements or major milestones
 * - update: Regular project updates and progress reports
 * - documentation: Technical documentation and guides
 * - tutorial: Step-by-step tutorials and how-tos
 */
const PROJECT_STATUS_OPTIONS = [
  { value: "announcement", label: "Announcement" },
  { value: "update", label: "Update" },
  { value: "documentation", label: "Documentation" },
  { value: "tutorial", label: "Tutorial" }
]

/**
 * ProjectRelationshipsWidget component
 * 
 * @param {WidgetProps<ProjectRelationshipsData>} props - Widget props from CMS
 * @param {ProjectRelationshipsData} props.value - Current field value
 * @param {function} props.onChange - Callback to update field value
 * @param {object} props.field - Field configuration from CMS config
 * @returns {JSX.Element} Rendered project relationships widget
 */
export const ProjectRelationshipsWidget: React.FC<WidgetProps<ProjectRelationshipsData>> = ({
  value = {},
  onChange,
  field
}) => {
  const [data, setData] = useState<ProjectRelationshipsData>(value)
  const [projects, setProjects] = useState<Array<{key: string, label: string, domain: string}>>([])
  
  useEffect(() => {
    /**
     * Load projects from discovery data on mount
     * This ensures we have the latest project list from the build system
     */
    setProjects(getProjectsFromDiscovery())
  }, [])
  
  useEffect(() => {
    /**
     * Notify CMS of data changes
     * This ensures the form state stays in sync with our local state
     */
    onChange(data)
  }, [data, onChange])
  
  /**
   * Toggle project selection in uses_projects array
   * @param {string} project - Project path to toggle
   */
  const toggleProject = (project: string) => {
    const current = data.uses_projects || []
    const updated = current.includes(project)
      ? current.filter(p => p !== project)
      : [...current, project]
    setData({ ...data, uses_projects: updated })
  }
  
  /**
   * Handle primary project selection for updates
   * @param {React.ChangeEvent<HTMLInputElement>} e - Change event
   */
  const handleUpdatesProject = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, updates_project: e.target.value })
  }
  
  /**
   * Handle project status type selection
   * @param {string} status - Status value (announcement|update|documentation|tutorial)
   */
  const handleStatusChange = (status: string) => {
    setData({ ...data, project_status: status })
  }
  
  return (
    <Card variant="glass" depth={1}>
      <CardHeader>
        <CardTitle className="text-lg">Project Relationships</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Uses Projects - Multi-select project associations */}
        <div className="space-y-2">
          <label className="text-sm font-mono text-text-secondary">
            Uses Projects
          </label>
          <div className="space-y-2">
            {/* Group projects by domain for better organization */}
            {Array.from(new Set(projects.map(p => p.domain))).map(domain => {
              const domainProjects = projects.filter(p => p.domain === domain);
              if (domainProjects.length === 0) return null;
              
              return (
                <div key={domain} className="space-y-1">
                  <div className="text-xs font-mono text-text-secondary/70">{domain}</div>
                  <div className="flex flex-wrap gap-2">
                    {domainProjects.map(project => (
                      <Chip
                        key={project.key}
                        variant={data.uses_projects?.includes(project.key) ? "primary" : "secondary"}
                        size="sm"
                        onClick={() => toggleProject(project.key)}
                        className="cursor-pointer"
                        title={project.key}
                      >
                        {project.label}
                      </Chip>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Updates Project - Single project being primarily updated */}
        <div className="space-y-2">
          <label htmlFor="updates-project-select" className="text-sm font-mono text-text-secondary">
            Updates Project
          </label>
          <select
            id="updates-project-select"
            value={data.updates_project || ""}
            onChange={(e) => setData({ ...data, updates_project: e.target.value })}
            className="w-full px-3 py-2 bg-bg-glass border border-accent-primary/20 rounded-terminal 
                     text-text-primary placeholder-text-secondary/50 font-mono text-sm
                     focus:outline-none focus:border-accent-primary transition-colors"
          >
            <option value="">Select project...</option>
            {projects.map(project => (
              <option key={project.key} value={project.key}>
                {project.label} ({project.domain})
              </option>
            ))}
          </select>
        </div>
        
        {/* Project Status - Content type categorization */}
        <div className="space-y-2">
          <label className="text-sm font-mono text-text-secondary">
            Project Status
          </label>
          <div className="flex flex-wrap gap-2">
            {PROJECT_STATUS_OPTIONS.map(option => (
              <Button
                key={option.value}
                variant={data.project_status === option.value ? "primary" : "outline"}
                size="sm"
                onClick={() => handleStatusChange(option.value)}
                type="button"
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Preview Summary - Shows current selections in readable format */}
        {(data.uses_projects?.length || data.updates_project || data.project_status) && (
          <div className="mt-4 pt-4 border-t border-accent-primary/20">
            <div className="text-sm font-mono space-y-1">
              {data.uses_projects?.length && (
                <div>
                  <span className="text-accent-secondary">Uses:</span>{" "}
                  <span className="text-text-primary">
                    {data.uses_projects.map(key => {
                      const project = projects.find(p => p.key === key);
                      return project ? project.label : key;
                    }).join(", ")}
                  </span>
                </div>
              )}
              {data.updates_project && (
                <div>
                  <span className="text-accent-secondary">Updates:</span>{" "}
                  <span className="text-text-primary">
                    {projects.find(p => p.key === data.updates_project)?.label || data.updates_project}
                  </span>
                </div>
              )}
              {data.project_status && (
                <div>
                  <span className="text-accent-secondary">Type:</span>{" "}
                  <span className="text-text-primary">
                    {PROJECT_STATUS_OPTIONS.find(o => o.value === data.project_status)?.label}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}