/**
 * @fileoverview ProjectCard - Project showcase and grid components
 * @module components/project/ProjectCard
 * 
 * @description
 * A versatile project card component system for showcasing open-source projects,
 * internal tools, and portfolio items. Supports multiple display variants,
 * GitHub statistics, and responsive grid layouts.
 * 
 * @architecture
 * ```
 * ┌──────────────────────────────────────────────────────────┐
 * │                ProjectCard Architecture                   │
 * ├──────────────────────────────────────────────────────────┤
 * │                                                          │
 * │  Project Data Input                                     │
 * │  ┌──────────────────────────────────────────────────┐   │
 * │  │  project: {                                     │   │
 * │  │    slug, title, description                     │   │
 * │  │    category?, status?                           │   │
 * │  │    technologies?: string[]                      │   │
 * │  │    github?, demo?, docs?                        │   │
 * │  │    stats?: { stars, forks, contributors }       │   │
 * │  │    featured?, coverImage?                       │   │
 * │  │  }                                               │   │
 * │  └──────────────────────────────────────────────────┘   │
 * │                        ▼                                 │
 * │  Variant Selection                                      │
 * │  ┌──────────────────────────────────────────────────┐   │
 * │  │  variant === 'compact'?                         │   │
 * │  │    ├── Minimal card                            │   │
 * │  │    ├── Title + category badge                  │   │
 * │  │    ├── 2-line description                      │   │
 * │  │    └── 3 tech badges max                       │   │
 * │  │                                                  │   │
 * │  │  variant === 'featured'?                        │   │
 * │  │    ├── Large card with cover image             │   │
 * │  │    ├── Full description                        │   │
 * │  │    ├── All tech badges                         │   │
 * │  │    └── Action buttons                          │   │
 * │  │                                                  │   │
 * │  │  variant === 'default'?                         │   │
 * │  │    ├── Standard card                           │   │
 * │  │    ├── Full description                        │   │
 * │  │    ├── All tech badges                         │   │
 * │  │    └── Ghost buttons                           │   │
 * │  └──────────────────────────────────────────────────┘   │
 * │                        ▼                                 │
 * │  Status Configuration                                   │
 * │  ┌──────────────────────────────────────────────────┐   │
 * │  │  Status    | Icon    | Color     | Meaning     │   │
 * │  │  ----------|---------|-----------|------------- │   │
 * │  │  active    | Zap     | green-500 | In dev      │   │
 * │  │  maintained| Package | blue-500  | Bug fixes   │   │
 * │  │  experimental| Code  | yellow-500| Early stage │   │
 * │  │  archived  | Calendar| gray      | No updates  │   │
 * │  └──────────────────────────────────────────────────┘   │
 * │                        ▼                                 │
 * │  SEO & Analytics                                        │
 * │  ┌──────────────────────────────────────────────────┐   │
 * │  │  Schema.org:                                    │   │
 * │  │  - SoftwareApplication type                     │   │
 * │  │  - applicationCategory                          │   │
 * │  │  - offers (free pricing)                        │   │
 * │  │                                                  │   │
 * │  │  GTM Tracking:                                  │   │
 * │  │  - project_click event                          │   │
 * │  │  - Link type: card|github|demo|docs             │   │
 * │  │  - Project metadata                             │   │
 * │  └──────────────────────────────────────────────────┘   │
 * │                        ▼                                 │
 * │  ProjectGrid Layout                                     │
 * │  ┌──────────────────────────────────────────────────┐   │
 * │  │  columns: 1 | 2 | 3 | 4                        │   │
 * │  │                                                  │   │
 * │  │  Responsive breakpoints:                        │   │
 * │  │  1: Always 1 column                             │   │
 * │  │  2: 1 → md:2                                    │   │
 * │  │  3: 1 → md:2 → lg:3                            │   │
 * │  │  4: 1 → md:2 → lg:3 → xl:4                    │   │
 * │  └──────────────────────────────────────────────────┘   │
 * │                                                          │
 * └──────────────────────────────────────────────────────────┘
 * ```
 * 
 * @proto-integration
 * Maps to protobuf configurations:
 * - `config/proto/content/project_config.proto` - Project data structure
 * - `config/proto/ui/card_variants.proto` - Card display variants
 * - `config/proto/ui/grid_layouts.proto` - Grid column configurations
 * - `config/proto/analytics/project_tracking.proto` - Click tracking
 * 
 * @hook-integration
 * - `useGTM()` - Project interaction tracking
 * - `useSchema()` - SoftwareApplication schema generation
 * 
 * @ecosystem-integration
 * - Used by: Projects page, portfolio sections, homepage
 * - Data flow: Project data → card display → navigation
 * - Links: Internal (Gatsby Link) and external
 * - UI components: Card, Badge, Button from UI library
 * - Analytics: GTM tracking for all project interactions
 * 
 * @features
 * - 🎨 Three card variants for different contexts
 * - 📊 GitHub statistics display
 * - 🏷️ Status indicators with icons
 * - 🔧 Technology stack badges
 * - 📷 Cover image support
 * - 🌐 Multiple link types
 * - 📱 Responsive grid layouts
 * - 🔍 SEO-optimized with Schema.org
 * 
 * @status-specifications
 * ```
 * Status       | Icon     | Color      | Description
 * -------------|----------|------------|------------------
 * active       | Zap      | green-500  | Actively developed
 * maintained   | Package  | blue-500   | Bug fixes only
 * experimental | Code     | yellow-500 | Early stage
 * archived     | Calendar | gray       | No longer maintained
 * ```
 * 
 * @variant-specifications
 * ```
 * Variant  | Size    | Content                | Use Case
 * ---------|---------|------------------------|------------------
 * compact  | Small   | Title, desc (2 lines)  | Dense grids
 * default  | Medium  | Full desc, tech, stats | Standard display
 * featured | Large   | Cover, full content    | Showcase
 * ```
 * 
 * @responsive-behavior
 * - **Mobile**: Single column, touch-optimized
 * - **Tablet**: 2 columns, medium cards
 * - **Desktop**: 3-4 columns based on config
 * - **Wide**: Up to 4 columns maximum
 * 
 * @accessibility
 * - Semantic HTML structure
 * - Alt text for cover images
 * - Keyboard navigation support
 * - External link indicators
 * - Screen reader friendly labels
 * 
 * @performance
 * - Memoized schema generation
 * - Conditional rendering by variant
 * - Optimized image loading
 * - Single GTM hook instance
 * 
 * @dos
 * - ✅ Use appropriate variant for context
 * - ✅ Include meaningful descriptions
 * - ✅ Provide GitHub stats when available
 * - ✅ Use cover images for featured projects
 * - ✅ Track all project interactions
 * 
 * @donts
 * - ❌ Don't show too many technologies
 * - ❌ Don't use featured variant in dense grids
 * - ❌ Don't forget alt text for images
 * - ❌ Don't mix variant types in same grid
 * - ❌ Don't skip GTM tracking
 * 
 * @example
 * ```tsx
 * // Single project card
 * <ProjectCard
 *   project={{
 *     slug: 'awesome-tool',
 *     title: 'Awesome Tool',
 *     description: 'A tool that does awesome things',
 *     category: 'Developer Tools',
 *     status: 'active',
 *     technologies: ['TypeScript', 'React', 'Node.js'],
 *     github: 'https://github.com/user/awesome-tool',
 *     demo: 'https://awesome-tool.com',
 *     stats: { stars: 1234, forks: 56 }
 *   }}
 *   variant="default"
 *   showStats={true}
 * />
 * 
 * // Featured project with cover
 * <ProjectCard
 *   project={{
 *     ...projectData,
 *     featured: true,
 *     coverImage: '/images/project-cover.jpg'
 *   }}
 *   variant="featured"
 * />
 * 
 * // Project grid
 * <ProjectGrid
 *   projects={projects}
 *   columns={3}
 *   variant="compact"
 * />
 * 
 * // Complete implementation
 * const ProjectsPage = () => {
 *   const featuredProjects = projects.filter(p => p.featured)
 *   const otherProjects = projects.filter(p => !p.featured)
 *   
 *   return (
 *     <>
 *       <ProjectGrid
 *         projects={featuredProjects}
 *         variant="featured"
 *         columns={2}
 *         className="mb-12"
 *       />
 *       <ProjectGrid
 *         projects={otherProjects}
 *         variant="default"
 *         columns={3}
 *       />
 *     </>
 *   )
 * }
 * ```
 * 
 * @see {@link ../../../USE-CASE.md#project-showcase} - Project showcase spec
 * @see {@link ../../pages/projects.tsx} - Projects page implementation
 * @see {@link ../ui/Card.tsx} - Card component base
 * @see {@link ../../../BUILD.md#project-pages} - Project page architecture
 * @see {@link ../../../README.md#projects} - Project documentation
 * 
 * @since 1.0.0
 */

import * as React from 'react'
import { Link } from 'gatsby'
import { cn } from '@/lib/utils'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { 
  Github, 
  ExternalLink, 
  Star, 
  GitFork,
  Code,
  Package,
  Zap,
  Users,
  Calendar,
  ArrowRight
} from 'lucide-react'
import { useGTM } from '@/hooks/useGTM'
import { useSchema } from '@/hooks/useSchema'

/**
 * @interface ProjectCardProps
 * @description Props for ProjectCard component with project data and display options
 * 
 * @property {Object} project - Project data object
 * @property {'default' | 'compact' | 'featured'} [variant='default'] - Card display variant
 * @property {boolean} [showStats=true] - Whether to show GitHub statistics
 * @property {string} [className] - Additional CSS classes
 */
interface ProjectCardProps {
  /** Project data object */
  project: {
    /** URL slug for project page */
    slug: string
    /** Project title */
    title: string
    /** Project description */
    description: string
    /** Project category/type */
    category?: string
    /** Development status */
    status?: 'active' | 'maintained' | 'experimental' | 'archived'
    /** Technology stack */
    technologies?: string[]
    /** GitHub repository URL */
    github?: string
    /** Live demo URL */
    demo?: string
    /** Documentation URL */
    docs?: string
    /** GitHub statistics */
    stats?: {
      /** Star count */
      stars?: number
      /** Fork count */
      forks?: number
      /** Contributor count */
      contributors?: number
    }
    /** Last update date */
    lastUpdated?: string
    /** Featured flag */
    featured?: boolean
    /** Cover image URL */
    coverImage?: string
  }
  /** Display variant */
  variant?: 'default' | 'compact' | 'featured'
  /** Show GitHub statistics */
  showStats?: boolean
  /** Additional CSS classes */
  className?: string
}

/**
 * ProjectCard component - Project showcase card
 * 
 * @component
 * @param {ProjectCardProps} props - Component props
 * @param {Object} props.project - Project data object
 * @param {'default' | 'compact' | 'featured'} [props.variant='default'] - Display variant
 * @param {boolean} [props.showStats=true] - Show GitHub statistics
 * @param {string} [props.className] - Additional CSS classes
 * 
 * @returns {JSX.Element} Project card with variant-based rendering
 * 
 * @example
 * ```tsx
 * // Standard project card
 * <ProjectCard
 *   project={projectData}
 *   variant="default"
 *   showStats={true}
 * />
 * ```
 */
export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  variant = 'default',
  showStats = true,
  className
}) => {
  const { trackEvent } = useGTM()
  const { buildSoftwareApplicationSchema, renderJsonLd } = useSchema()
  
  const statusConfig = {
    active: { label: 'Active', color: 'text-green-500', icon: Zap },
    maintained: { label: 'Maintained', color: 'text-blue-500', icon: Package },
    experimental: { label: 'Experimental', color: 'text-yellow-500', icon: Code },
    archived: { label: 'Archived', color: 'text-text-tertiary', icon: Calendar }
  }
  
  // Build SoftwareApplication schema for the project
  const projectSchema = React.useMemo(() => {
    return buildSoftwareApplicationSchema({
      name: project.title,
      description: project.description,
      url: project.demo || project.docs || `/projects/${project.slug}`,
      applicationCategory: project.category || 'DeveloperApplication',
      dateModified: project.lastUpdated,
      downloadUrl: project.github,
      screenshot: project.coverImage,
      offers: {
        price: '0',
        priceCurrency: 'USD'
      }
    })
  }, [project, buildSoftwareApplicationSchema])

  const status = project.status ? statusConfig[project.status] : null
  const StatusIcon = status?.icon

  const handleProjectClick = (linkType: 'card' | 'github' | 'demo' | 'docs') => {
    trackEvent({
      event: 'project_click',
      category: 'Project',
      action: 'click',
      label: project.title,
      project_slug: project.slug,
      project_title: project.title,
      project_category: project.category || '',
      project_status: project.status || '',
      project_variant: variant,
      project_link_type: linkType,
      project_has_stats: showStats && !!project.stats,
      project_technologies: project.technologies?.join(',') || '',
      component: 'ProjectCard'
    })
  }

  if (variant === 'compact') {
    return (
      <>
        {/* Inject SoftwareApplication Schema.org JSON-LD for SEO */}
        {renderJsonLd(projectSchema)}
        
        <Card 
          variant="glass" 
          depth={1}
          className={cn('group hover:depth-2 transition-all', className)}
        >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-lg group-hover:text-accent-secondary transition-colors">
                <Link 
                  to={`/projects/${project.slug}`} 
                  className="hover:underline"
                  onClick={() => handleProjectClick('card')}
                >
                  {project.title}
                </Link>
              </CardTitle>
              {project.category && (
                <Badge variant="outline" className="mt-1 text-xs">
                  {project.category}
                </Badge>
              )}
            </div>
            {status && StatusIcon && (
              <StatusIcon className={cn('w-4 h-4', status.color)} />
            )}
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="line-clamp-2 text-sm">
            {project.description}
          </CardDescription>
          {project.technologies && project.technologies.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-3">
              {project.technologies.slice(0, 3).map((tech, index) => (
                <span
                  key={index}
                  className="text-xs px-2 py-0.5 bg-bg-tertiary rounded-full text-text-tertiary"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 3 && (
                <span className="text-xs text-text-tertiary">
                  +{project.technologies.length - 3}
                </span>
              )}
            </div>
          )}
        </CardContent>
      </Card>
      </>
    )
  }

  if (variant === 'featured') {
    return (
      <>
        {/* Inject SoftwareApplication Schema.org JSON-LD for SEO */}
        {renderJsonLd(projectSchema)}
        
        <Card 
          variant="glass" 
          depth={2}
          className={cn('group overflow-hidden', className)}
        >
        {project.coverImage && (
          <div className="relative h-48 -mt-px -mx-px overflow-hidden">
            <img
              src={project.coverImage}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-base group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/50 to-transparent" />
            {project.featured && (
              <Badge variant="accent" className="absolute top-4 left-4 glass">
                Featured
              </Badge>
            )}
          </div>
        )}
        
        <CardHeader className={project.coverImage ? 'pt-4' : ''}>
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              {project.category && (
                <Badge variant="outline" className="mb-2">
                  {project.category}
                </Badge>
              )}
              <CardTitle className="text-2xl group-hover:text-accent-secondary transition-colors">
                <Link 
                  to={`/projects/${project.slug}`}
                  onClick={() => handleProjectClick('card')}
                >
                  {project.title}
                </Link>
              </CardTitle>
            </div>
            {status && StatusIcon && (
              <div className="flex items-center gap-1">
                <StatusIcon className={cn('w-4 h-4', status.color)} />
                <span className={cn('text-xs', status.color)}>
                  {status.label}
                </span>
              </div>
            )}
          </div>
          
          <CardDescription className="text-base">
            {project.description}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {project.technologies && project.technologies.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <Badge key={index} variant="outline">
                  {tech}
                </Badge>
              ))}
            </div>
          )}
          
          {showStats && project.stats && (
            <div className="flex gap-4 text-sm text-text-tertiary">
              {project.stats.stars !== undefined && (
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4" />
                  {project.stats.stars}
                </span>
              )}
              {project.stats.forks !== undefined && (
                <span className="flex items-center gap-1">
                  <GitFork className="w-4 h-4" />
                  {project.stats.forks}
                </span>
              )}
              {project.stats.contributors !== undefined && (
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {project.stats.contributors}
                </span>
              )}
            </div>
          )}
          
          <div className="flex gap-2 pt-2">
            <Button asChild size="sm" variant="primary">
              <Link 
                to={`/projects/${project.slug}`}
                onClick={() => handleProjectClick('card')}
              >
                View Project
                <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </Button>
            {project.github && (
              <Button asChild size="sm" variant="outline">
                <a 
                  href={project.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={() => handleProjectClick('github')}
                >
                  <Github className="mr-1 h-3 w-3" />
                  Code
                </a>
              </Button>
            )}
            {project.demo && (
              <Button asChild size="sm" variant="outline">
                <a 
                  href={project.demo} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={() => handleProjectClick('demo')}
                >
                  <ExternalLink className="mr-1 h-3 w-3" />
                  Demo
                </a>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
      </>
    )
  }

  // Default variant
  return (
    <>
      {/* Inject SoftwareApplication Schema.org JSON-LD for SEO */}
      {renderJsonLd(projectSchema)}
      
      <Card 
        variant="glass" 
      depth={1}
      className={cn('group hover:depth-2 transition-all', className)}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            {project.category && (
              <Badge variant="outline" className="mb-2">
                {project.category}
              </Badge>
            )}
            <CardTitle className="group-hover:text-accent-secondary transition-colors">
              <Link 
                to={`/projects/${project.slug}`}
                onClick={() => handleProjectClick('card')}
              >
                {project.title}
              </Link>
            </CardTitle>
          </div>
          {status && StatusIcon && (
            <StatusIcon className={cn('w-5 h-5', status.color)} />
          )}
        </div>
        
        <CardDescription>
          {project.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {project.technologies && project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {project.technologies.map((tech, index) => (
              <span
                key={index}
                className="text-xs px-2 py-1 bg-bg-tertiary rounded text-text-secondary"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
        
        {showStats && project.stats && (
          <div className="flex gap-4 text-sm text-text-tertiary">
            {project.stats.stars !== undefined && (
              <span className="flex items-center gap-1">
                <Star className="w-3 h-3" />
                {project.stats.stars}
              </span>
            )}
            {project.stats.forks !== undefined && (
              <span className="flex items-center gap-1">
                <GitFork className="w-3 h-3" />
                {project.stats.forks}
              </span>
            )}
            {project.stats.contributors !== undefined && (
              <span className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                {project.stats.contributors}
              </span>
            )}
          </div>
        )}
        
        <div className="flex gap-2 pt-2">
          {project.github && (
            <Button asChild size="sm" variant="ghost" className="text-xs">
              <a 
                href={project.github} 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => handleProjectClick('github')}
              >
                <Github className="mr-1 h-3 w-3" />
                GitHub
              </a>
            </Button>
          )}
          {project.demo && (
            <Button asChild size="sm" variant="ghost" className="text-xs">
              <a 
                href={project.demo} 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => handleProjectClick('demo')}
              >
                <ExternalLink className="mr-1 h-3 w-3" />
                Demo
              </a>
            </Button>
          )}
          {project.docs && (
            <Button asChild size="sm" variant="ghost" className="text-xs">
              <Link to={project.docs}>
                Docs
              </Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
    </>
  )
}

/**
 * @interface ProjectGridProps
 * @description Props for ProjectGrid component with responsive column configuration
 * 
 * @property {ProjectCardProps['project'][]} projects - Array of project data
 * @property {ProjectCardProps['variant']} [variant='default'] - Card variant for all projects
 * @property {1 | 2 | 3 | 4} [columns=3] - Number of grid columns
 * @property {string} [className] - Additional CSS classes
 */
interface ProjectGridProps {
  /** Array of projects to display */
  projects: ProjectCardProps['project'][]
  /** Card variant for all projects */
  variant?: ProjectCardProps['variant']
  /** Number of grid columns */
  columns?: 1 | 2 | 3 | 4
  /** Additional CSS classes */
  className?: string
}

/**
 * ProjectGrid component - Responsive project card grid
 * 
 * @component
 * @param {ProjectGridProps} props - Component props
 * @param {ProjectCardProps['project'][]} props.projects - Projects array
 * @param {ProjectCardProps['variant']} [props.variant='default'] - Card variant
 * @param {1 | 2 | 3 | 4} [props.columns=3] - Grid columns
 * @param {string} [props.className] - Additional CSS classes
 * 
 * @returns {JSX.Element} Responsive grid of project cards
 * 
 * @example
 * ```tsx
 * // 3-column grid with default cards
 * <ProjectGrid
 *   projects={projectList}
 *   columns={3}
 *   variant="default"
 * />
 * ```
 */
export const ProjectGrid: React.FC<{
  projects: ProjectCardProps['project'][]
  variant?: ProjectCardProps['variant']
  columns?: 1 | 2 | 3 | 4
  className?: string
}> = ({ 
  projects, 
  variant = 'default',
  columns = 3,
  className 
}) => {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
  }

  return (
    <div className={cn(
      'grid gap-6',
      gridCols[columns],
      className
    )}>
      {projects.map((project, index) => (
        <ProjectCard
          key={project.slug || index}
          project={project}
          variant={variant}
        />
      ))}
    </div>
  )
}

export default ProjectCard