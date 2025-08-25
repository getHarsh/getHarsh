/**
 * @fileoverview Projects - Project showcase page with detailed cards
 * @module pages/projects
 * 
 * @description
 * A project showcase page displaying open-source projects, tools, and experiments.
 * Features detailed project cards with metadata, relationships, tech stacks, and
 * documentation links. Supports both populated and empty states.
 * 
 * Key features:
 * - Detailed project cards
 * - Project relationships display
 * - Tech stack and tools listing
 * - Status indicators
 * - Documentation links
 * - Empty state with CTAs
 * 
 * @ecosystem-integration
 * - Layout: PageLayout with navigation
 * - Components: Card, Chip, Button
 * - Navigation: Links to project pages/docs
 * - Theme: getCurrentTheme for branding
 * 
 * @configuration
 * - Project data: Currently mock data (TODO: GraphQL)
 * - Status types: active, passive development, archived, abandoned
 * - Relationships: relatesTo, updatesProject
 * - Documentation: Links to /[project]/docs/
 * 
 * @project-structure
 * - Name: Project identifier
 * - Description: Project summary
 * - Status: Development status
 * - Relations: Related projects
 * - Tech stack: Primary technologies
 * - Tools: Supporting tools
 * - Documentation: Docs availability
 * 
 * @dos
 * - DO: Display project relationships
 * - DO: Show clear status indicators
 * - DO: Link to documentation
 * - DO: Provide empty state guidance
 * 
 * @donts
 * - DON'T: Show broken project links
 * - DON'T: Hide important metadata
 * - DON'T: Forget mobile optimization
 * - DON'T: Mix status color meanings
 * 
 * @example
 * ```tsx
 * // With projects:
 * // - Shows project cards in grid
 * // - Each card has metadata sidebar
 * // - Links to project pages and docs
 * // - Sponsor and Connect CTAs
 * 
 * // Without projects:
 * // - Shows empty state message
 * // - Links to thoughts (cross-domain)
 * // - Same CTA buttons
 * ```
 * 
 * @todo
 * - Replace mock data with GraphQL
 * - Add project filtering
 * - Implement search functionality
 * - Add GitHub stats integration
 * 
 * @see {@link ../../../USE-CASE.md#projects-page} - Projects page specifications
 * @see {@link ../components/project/ProjectCard.tsx} - Alternative card component
 * @see {@link ../../../config/CONFIG.md#projects} - Project configuration
 * 
 * @since 1.0.0
 */

import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import { Link } from "gatsby"
import { PageLayout } from "@/components/layout/PageLayout"
import { ContentLayout } from "@/components/layout/ContentLayout"
import { TopNavigation } from "@/components/navigation/TopNavigation"
import { UniversalFooter } from "@/components/navigation/UniversalFooter"
import { Card, CardContent } from "@/components/ui/Card"
import { Chip } from "@/components/ui/Chip"
import { Button } from "@/components/ui/Button"
import { getCurrentTheme, buildCrossDomainLink, getSiteType, getProjectName } from "@/config/themes"
import { useGTM } from "@/hooks/useGTM"
import { useSchema } from "@/hooks/useSchema"
import { getSchemaType } from "@/utils/mappings"

/** Mock project data - TODO: Replace with GraphQL */
const mockProjects = [
  {
    name: "HENA",
    description: "A revolutionary health analytics platform that leverages AI to provide personalized insights and predictive health monitoring.",
    status: "active",
    relatesTo: ["JARVIS-kernel"],
    techStack: ["TypeScript", "React", "Node.js", "TensorFlow"],
    tools: ["Docker", "K8s", "AWS"],
    hasDocumentation: true
  },
  {
    name: "JARVIS-kernel",
    description: "Core AI kernel that powers intelligent decision-making across multiple platforms. Built for scalability and real-time processing.",
    status: "passive development",
    relatesTo: ["HENA"],
    updatesProject: "AIPM",
    techStack: ["Python", "Rust", "CUDA"],
    tools: ["PyTorch", "ONNX"],
    hasDocumentation: true
  }
]

/**
 * ProjectsPage component - Project showcase and portfolio
 * 
 * @param {PageProps} props - Gatsby page props
 * @returns {JSX.Element} Projects page with cards or empty state
 */
const ProjectsPage: React.FC<PageProps> = () => {
  const theme = getCurrentTheme()
  const hasProjects = mockProjects.length > 0
  const { trackPageView } = useGTM()
  const { getBaseSchema, buildSoftwareApplicationSchema, buildItemListSchema, mergeSchemas, renderJsonLd } = useSchema()
  const siteType = getSiteType()
  const projectName = getProjectName()
  const isProject = siteType === 'project'
  
  // Track projects page view
  React.useEffect(() => {
    trackPageView({
      page_title: 'Projects',
      page_path: '/projects',
      page_type: 'project_collection',
      project_count: mockProjects.length,
      has_projects: hasProjects,
      site_type: siteType,
      ...(isProject && { project_name: projectName })
    })
  }, [hasProjects, siteType, isProject, projectName, trackPageView])
  
  // Build page-level Schema.org for projects page
  const projectsPageSchema = React.useMemo(() => {
    const baseSchema = getBaseSchema()
    
    // Build software application schemas for each project
    const projectSchemas = mockProjects.map(project => buildSoftwareApplicationSchema({
      name: project.name,
      description: project.description,
      applicationCategory: 'WebApplication',
      operatingSystem: 'Web'
    }))
    
    const itemListSchema = buildItemListSchema(projectSchemas, 'Open Source Projects')
    
    const pageSchema = {
      '@context': 'https://schema.org',
      '@type': getSchemaType('page_types', 'PAGE_TYPE_PROJECTS', 'CollectionPage'),
      '@id': `${baseSchema.url}/projects#webpage`,
      url: `${baseSchema.url}/projects`,
      name: 'Projects Collection',
      description: 'A showcase of open-source projects and experiments',
      isPartOf: {
        '@id': `${baseSchema.url}#website`
      },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: baseSchema.url
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Projects',
            item: `${baseSchema.url}/projects`
          }
        ]
      },
      mainEntity: itemListSchema
    }
    
    return mergeSchemas(baseSchema, pageSchema)
  }, [mockProjects, getBaseSchema, buildSoftwareApplicationSchema, buildItemListSchema, mergeSchemas])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-500'
      case 'passive development': return 'text-yellow-500'
      case 'archived': return 'text-gray-500'
      case 'abandoned': return 'text-red-500'
      default: return 'text-text-secondary'
    }
  }

  return (
    <>
      {/* Page-level Schema.org JSON-LD */}
      {renderJsonLd(projectsPageSchema)}
      
      <PageLayout>
      <TopNavigation variant="domain" />
      
      <main className="section-spacing" role="main" aria-label="Projects collection page">
        <ContentLayout>
          <header className="text-center mb-12">
            <h1 className="text-responsive-2xl font-display uppercase tracking-wide text-gradient mb-4">
              Project Highlights
            </h1>
            <p className="text-text-secondary max-w-2xl mx-auto">
              A showcase of my work, experiments, and contributions to the open-source community.
            </p>
          </header>

          {hasProjects ? (
            <section className="space-y-6 mb-12" aria-label="Project listings">
              {mockProjects.map((project) => (
                <article key={project.name} aria-label={`Project: ${project.name}`}>
                  <Card variant="glass" className="overflow-hidden">
                  <CardContent className="p-0">
                    {/* Card Header */}
                    <div className="p-6 border-b border-accent-primary/20">
                      <h3 className="text-xl font-display uppercase tracking-wide">
                        {project.name}
                      </h3>
                    </div>
                    
                    {/* Card Body - 2 column grid */}
                    <div className="grid md:grid-cols-[1fr,2fr] gap-6 p-6">
                      {/* Left column - metadata */}
                      <aside className="space-y-3" aria-label="Project metadata">
                        {project.relatesTo && (
                          <div>
                            <p className="text-xs text-text-secondary mb-1">Relates to:</p>
                            <div className="flex flex-wrap gap-2">
                              {project.relatesTo.map(rel => (
                                <Chip key={rel} variant="secondary" size="sm">
                                  {rel}
                                </Chip>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {project.updatesProject && (
                          <div>
                            <p className="text-xs text-text-secondary mb-1">Updates:</p>
                            <Chip variant="secondary" size="sm">
                              {project.updatesProject}
                            </Chip>
                          </div>
                        )}
                        
                        <div>
                          <p className="text-xs text-text-secondary mb-1">Status:</p>
                          <span className={`text-sm font-display ${getStatusColor(project.status)}`}>
                            {project.status}
                          </span>
                        </div>
                        
                        <div>
                          <p className="text-xs text-text-secondary mb-1">Tech Stack:</p>
                          <div className="flex flex-wrap gap-1">
                            {project.techStack.map(tech => (
                              <Chip key={tech} size="sm" variant="outline">
                                {tech}
                              </Chip>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-xs text-text-secondary mb-1">Tools:</p>
                          <div className="flex flex-wrap gap-1">
                            {project.tools.map(tool => (
                              <Chip key={tool} size="sm" variant="outline">
                                {tool}
                              </Chip>
                            ))}
                          </div>
                        </div>
                      </aside>
                      
                      {/* Right column - description */}
                      <div role="region" aria-label="Project description">
                        <p className="text-text-secondary leading-relaxed">
                          {project.description}
                        </p>
                      </div>
                    </div>
                    
                    {/* Card Footer */}
                    <footer className="p-6 border-t border-accent-primary/20 flex justify-between" role="contentinfo">
                      <div>
                        {project.hasDocumentation && (
                          <Link 
                            to={`/${project.name}/docs/`}
                            className="text-accent-primary hover:text-accent-secondary text-sm"
                          >
                            Docs →
                          </Link>
                        )}
                      </div>
                      <Link 
                        to={`/${project.name}/`}
                        className="text-accent-primary hover:text-accent-secondary text-sm"
                      >
                        Learn more →
                      </Link>
                    </footer>
                  </CardContent>
                  </Card>
                </article>
              ))}
            </section>
          ) : (
            <section className="text-center py-16" aria-label="Empty state">
              <p className="text-text-secondary mb-8 max-w-md mx-auto">
                It&apos;s quiet here. With due time in this space, something might manifest soon. 
                How about you consume some of these{" "}
                <a 
                  href={buildCrossDomainLink("/", true)}
                  className="text-accent-primary hover:text-accent-secondary underline"
                >
                  thoughts
                </a>{" "}
                in the meanwhile...
              </p>
            </section>
          )}

          {/* CTAs */}
          <nav className="flex flex-col sm:flex-row gap-4 justify-center" role="navigation" aria-label="Page actions">
            <Button asChild variant="primary" size="lg">
              <Link to="/sponsor">
                Sponsor
              </Link>
            </Button>
            <Button asChild size="lg">
              <Link to="/contact">
                Connect
              </Link>
            </Button>
          </nav>
        </ContentLayout>
      </main>
      
      <UniversalFooter />
    </PageLayout>
    </>
  )
}

export default ProjectsPage

/**
 * Head component for projects page SEO
 * 
 * @returns {JSX.Element} SEO meta tags for projects page
 */
export const Head: HeadFC = () => {
  const theme = getCurrentTheme()
  return (
    <>
      <title>Projects - {theme.name}</title>
      <meta name="description" content={`Explore projects and work by ${theme.name}`} />
    </>
  )
}