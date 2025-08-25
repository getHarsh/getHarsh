# Use Cases & Component Requirements

## Quick Navigation

### Core Documentation
- **[Configuration System](../config/CONFIG.md)** - Complete configuration architecture with proto schemas, validation, and processing pipeline
- **[Schema System](../config/schema/SCHEMA.md)** - Proto-to-Schema.org mapping system with 300+ semantic type mappings
- **[Discovery System](../templates/discovery/DISCOVERY.md)** - Comprehensive discovery file documentation for AI/LLM integration
- **[Consent Architecture](../config/CONSENT-ARCHITECTURE.md)** - GDPR-compliant consent management system with Google Consent Mode v2

### Component Categories
- [Entity Structure & Configuration](#ecosystem-context--entity-structure)
- [Core Primitives](#1-core-primitives-ill-actually-use)
- [Component Variants](#2-component-variants-needed)
- [Content Types & Layouts](#4-content-types--layouts)
- [Project Pages](#7-project-pages--documentation)
- [Services System](#services-pages)
- [Search Components](#8-search-components)
- [Consent & Privacy](#9-consent--privacy-components)
- [Discovery Files](#10-discovery-files--federation)
- [Schema.org Compliance](#12-schemaorg-compliance)

## Purpose

This document captures all actual use cases, pages, user journeys, and the components they require. It serves as the definitive reference for what the system actually needs to build and support.

## Ecosystem Context & Entity Structure

### Legal Entities and Their Domains

The engine supports multiple legal entities, each potentially owning multiple domains. This structure drives how About pages, Contact pages, Services, and legal compliance work:

#### Raw Thoughts Enterprises Private Limited (RTEPL)
- **Legal Entity**: RTEPL
- **Domains Owned**:
  - **getHarsh.in** - Personal brand of Harsh Joshi (special case - person manifestation)
    - About page: About the person Harsh Joshi
    - Contact/Connect: Connect with the person
    - Social links: "SameAs" socials of Harsh Joshi
    - Services (if enabled): Personal consulting, advisory, workshops
  - **rawThoughts.in** - Entity website of RTEPL (special case - entity manifestation)
    - About page: About RTEPL entity
    - Contact/Connect: Connect with RTEPL for business
    - Services (if enabled): Enterprise AI transformation services
  - **causality.in** - Research and analytics brand
    - Services (if enabled): Research services, analytics consulting
  - **sleepwalker.in** - Creative AI experiments brand
    - Services (if enabled): Creative AI services, interactive experiences

#### DAO Studio Private Limited (DSPL)
- **Legal Entity**: DSPL (Harsh was founder)
- **Domains Owned**:
  - **daostudio.in** - Entity website of DSPL (special case - entity manifestation)
    - About page: About DSPL entity
    - Services (if enabled): DAO transformation, blockchain services

### Configuration-Driven Architecture

> **Configuration System**: See [CONFIG.md](../config/CONFIG.md) for the complete configuration system documentation, including proto schemas, validation, and processing pipeline.

**IMPORTANT**: While this document shows examples from the current ecosystem, the engine itself has NO hardcoded domains, entities, or services. Everything is driven by configuration:

- Entity relationships defined in domain config.yml
- Services completely defined in config_services.yml (separate file pattern)
- About/Contact page content from configuration
- Navigation adapted based on entity type
- Legal compliance (terms, privacy) per entity
- Feature flags (services_enabled, sponsor.enabled) control entire subsystems

The examples below demonstrate the engine's flexibility, but any configuration is possible. The beauty of this architecture is complete flexibility - each domain can have entirely different services, or no services at all, just through configuration! If `services_enabled: false` in a domain's config.yml, then:
- No services pages are generated
- No "Services" link appears in navigation  
- No service CTAs appear in blog posts (even if configured)

Similarly for sponsorship with `sponsor.enabled` flag. The engine dynamically renders whatever is configured - could be 1 service or 10 services, with any content you define.

## Component Requirements by Use Case

### 1. Core Primitives I'll Actually Use

#### Social Components
- **[Social Links Component](/src/src/components/social/SocialLinks.tsx)** 🔴
  - Links to social profiles
  - Icons + labels or just icons
  - Configurable from site config
  - Used in contact page
  - Spec: [SOCIAL-LINKS.md](../COMPONENTS/SOCIAL-LINKS.md)

- **[Social Share Component](/src/src/components/social/SocialShare.tsx)** 🔴
  - Share article to social platforms
  - Common platforms (Twitter, LinkedIn, etc.)
  - Responsive positioning:
    - Desktop: Fixed right sidebar (floating)
    - Tablet: Bottom of article
    - Mobile: Bottom (simplified)
  - Stays visible during scroll (desktop)
  - Spec: [SOCIAL-SHARE.md](../COMPONENTS/SOCIAL-SHARE.md)

- **[Social Discuss Component](/src/src/components/social/SocialDiscuss.tsx)** 🔴
  - "Comment & Discuss" section
  - Links from article frontmatter
  - Context Engine determines which platforms to show
  - Supported platforms:
    - github_issue: GitHub issue URL
    - twitter_thread: Twitter discussion URL
    - linkedin_post: LinkedIn post URL
    - reddit_thread: Reddit discussion URL
  - Shows platform icons dynamically
  - Always at article bottom
  - Keeps blog static (no native comments)
  - Responsive visibility:
    - Desktop: Shown at bottom
    - Tablet: Shown at bottom
    - Mobile: Hidden (not shown)
  - Spec: [SOCIAL-DISCUSS.md](../COMPONENTS/SOCIAL-DISCUSS.md)

- **[Social Embed Component](/src/src/components/content/SocialEmbed.tsx)** 🔴
  - Embed social media posts in articles
  - Supported platforms:
    - Twitter/X tweets
    - LinkedIn posts
    - YouTube videos
    - GitHub gists
  - Privacy-conscious loading
  - Responsive embeds
  - Used within article content
  - Spec: [SOCIAL-EMBED.md](../COMPONENTS/SOCIAL-EMBED.md)

#### Booking Components  
- **[Google Appointment Wrapper](/src/src/components/social/GoogleAppointment.tsx)** 🔴
  - Container for Google Calendar booking
  - Embedded iframe or widget
  - No Calendly integration
  - Contact page specific

#### Content Components
- **[Image Component](/src/src/components/content/Image.tsx)** 🔴
  - Single image display
  - Used in About page
  - Responsive sizing
  - Alt text support

- **[Text Area Component](/src/src/components/content/TextArea.tsx)** 🔴
  - Essay/letter style text
  - Minimalist typography
  - Used in About page
  - Markdown content support

- **[Table Component](/src/src/components/content/Table.tsx)** 🔴
  - Standard markdown table rendering
  - First row auto-styled with theme accent colors
  - No complex features - simple is better
  - Responsive table handling
  - Used in article content

- **[Code Block Component](/src/src/components/content/CodeBlock.tsx)** 🔴
  - Syntax highlighting for multiple languages
  - Theme-aware: Uses color palette from config
  - Automatically adapts to theme system
  - Line numbers support
  - Copy button functionality
  - Language label display
  - Responsive behavior:
    - Desktop: Full width with horizontal scroll if needed
    - Tablet: Reduced font size, maintains readability
    - Mobile: Further reduced font size, horizontal scroll
  - Touch-friendly scroll on mobile
  - Used throughout technical content

- **[Mermaid Diagram Component](/src/src/components/content/MermaidDiagram.tsx)** 🔴
  - Renders Mermaid diagrams inline
  - Theme-aware: Inherits color palette
  - Supports all Mermaid diagram types:
    - Flowcharts
    - Sequence diagrams
    - Gantt charts
    - Class diagrams
  - Responsive behavior:
    - Desktop: Full size, optimal viewing
    - Tablet: Scaled to 85%, maintains readability
    - Mobile: Scaled to 70%, horizontal scroll if needed
  - SVG-based scaling (crisp at any size)
  - Touch-friendly pan/zoom on mobile
  - Dark/light mode aware
  - Consistent with overall theme system

- **[Footnotes Component](/src/src/components/content/Footnotes.tsx)** 🔴
  - Academic/reference style content support
  - Inline footnote markers (superscript numbers)
  - Bottom-of-article footnote definitions
  - Bidirectional linking:
    - Click marker → scroll to footnote
    - Click footnote number → scroll back to text
  - Auto-numbering (order of appearance)
  - Markdown syntax: `[^1]` for markers, `[^1]: Text` for definitions
  - Smooth scroll animations
  - Mobile-friendly touch targets
  - Theme-aware styling
  - Used in research/academic articles

- **[Math Formula Component](/src/src/components/content/MathFormula.tsx)** 🔴
  - LaTeX/KaTeX mathematical notation support
  - Inline math: `$...$` or `\\(...\\)`
  - Display math: `$$...$$` or `\\[...\\]`
  - Full LaTeX math command support:
    - Greek letters, operators, relations
    - Matrices, fractions, integrals
    - Summations, limits, derivatives
    - Custom macros and environments
  - Static rendering (no client-side JS required)
  - Fallback to MathML for accessibility
  - Copy LaTeX source functionality
  - Theme-aware: Uses color palette from config
    - Text colors adapt to theme system
    - Background shading for display math
    - Accent colors for emphasis
  - Responsive behavior:
    - Desktop: Full size formulas, optimal spacing
    - Tablet: 90% scale, maintains readability
    - Mobile: 80% scale, horizontal scroll for wide equations
  - Display math breaks responsively
  - Touch-friendly equation navigation
  - Print-optimized styles
  - Critical for technical/scientific content

- **[Table of Contents Component](/src/src/components/content/TableOfContents.tsx)** 🔴
  - Auto-generated from article headings
  - Hierarchical structure (H2, H3, H4)
  - Positioned options:
    - Desktop: Fixed sidebar (left or right)
    - Tablet: Collapsible top section
    - Mobile: Hidden by default
  - Active section highlighting on scroll
  - Smooth scroll to sections on click
  - Depth control (e.g., show only H2-H3)
  - Optional "Back to top" integration
  - Auto-collapse on mobile
  - Theme-aware styling
  - Used for long-form articles (>1500 words)

- **[Quirky Message Component](/src/src/components/content/QuirkyMessage.tsx)** 🔴
  - Short, personality-filled text
  - Used in error pages
  - Error-specific messages
  - Ends with subtle "Learn more" link
  - Maintains brand voice
  - Creates curiosity about ecosystem

- **[Audio Player Component](/src/src/components/content/AudioPlayer.tsx)** 🔴
  - Simple HTML5/CSS/JS player
  - Static site compatible (no server-side)
  - Plays recordings from Google Drive
  - Shows when audio exists in frontmatter
  - Used in article headers
  - Clean, minimal design

- **[Smart Link Component](/src/src/components/content/SmartLink.tsx)** 🔴
  - Rich semantic links in articles
  - Auto-detects link types:
    - Google Docs/Sheets/Slides/Drive
    - GitHub repos/files/folders
    - File extensions (PDF, DOC, etc.)
    - Internal links (same domain)
    - Ecosystem links (from config domains)
    - External links (outside ecosystem)
  - Explicit type override: `[text]{type="google-sheet"}`
  - Adds appropriate icons and ARIA labels
  - Ecosystem-aware (reads from config)
  - Used throughout article content

#### Grid Components
- **[Article Grid](/src/src/components/article/ArticleGrid.tsx)** 🔴
  - CSS Grid template for article displays
  - Shared by [LATEST] and Index List
  - Responsive grid areas
  - Performance optimized
  - Mobile: Simplified grid (title + date only)
  - Desktop: Full grid with all elements
  - Semantic data always in DOM

#### Chip Components
- **[Project/Tag Chips](/src/src/components/ui/Chip.tsx)** 🔴
  - Small, clickable elements
  - Display project/tag/keyword names
  - Link to related pages
  - Used in:
    - Article headers (keywords)
    - Cards (projects)
    - Filters (tags)
  - Fundamental reusable component

- **[Domain Chips](/src/src/components/ui/Chip.tsx)** 🔴
  - Special chip variant for canonical domains
  - Shows domain name (e.g., rawThoughts.in)
  - Links to article URL on that domain
  - Used in cross-posted content
  - Behavior:
    - On canonical site: Shows where else published
    - On cross-posted site: Shows original source
  - Bidirectional awareness

#### Navigation Components
- **[Top Navigation Bar (Domain)](/src/src/components/navigation/TopNavigation.tsx)** 🔴
  - Left: Home/Logo link
  - Right: About link, Services link
  - Style: Standard (minimal, clean)
  - Responsive: Mobile hamburger menu

- **[Top Navigation Bar (Blog)](/src/src/components/navigation/TopNavigation.tsx)** 🔴
  - Left: Home → [domain].in/index
  - Right: 
    - Articles → blog.[domain].in/index
    - Highlights → [domain].in/projects
    - Connect → [domain].in/contact
    - Services → [domain].in/services/
  - RSS feed link included
  - Style: Standard (consistent with domain)
  - Cross-domain routing aware

#### Hero Components  
- **[Dynamic Visualization Background](/src/src/components/hero/DynamicVisualization.tsx)** 🔴
  - Full viewport height
  - Animated/dynamic background
  - HERO text superimposed
  - 3-line paragraph underneath
  - Leverages architecture dynamically

#### CTA Components
- **[Three Primary CTAs](/src/src/components/hero/CTASection.tsx)** 🔴
  - "Thoughts" → blog.[domain].in
  - "Highlights" → /projects  
  - "Connect" → /contact
  - Horizontal layout on desktop
  - Stacked on mobile

#### Footer Components
- **[Bottom Footer (Universal)](/src/src/components/navigation/UniversalFooter.tsx)** 🔴
  - Copyright notice (dynamic year + entity)
  - Policy links (Privacy, Terms, etc.)
  - Technical links:
    - RSS feed
    - Sitemap (sitemap.xml)
    - AI Manifest (llms.txt)
  - Ecosystem links:
    - "Ecosystem" → ecosystem default domain URL (from config)
    - "Learn more" → ecosystem learn more URL (from config)
  - Same footer for domain and blog (policies link to domain)
  - Dynamic from config: ecosystem domain and path
  - Minimal height
  - Standard style

### 2. Component Variants Needed

#### Visualization Background Variants
- **[Less Prominent Visualization](/src/src/components/hero/DynamicVisualization.tsx)** 🔴
  - For content-heavy pages (blog index)
  - Subtle/muted compared to domain hero
  - Still dynamic but doesn't compete with content
  - Background layer positioning

#### Blog-Specific Components
- **[Article Navigation Component](/src/src/components/article/ArticleNavigation.tsx)** 🔴
  - Wraps all article bottom CTAs
  - Responsive behavior built-in
  - Smart Previous/Next display
  - Mobile: Minimal set (3 CTAs)
  - Desktop: Full set (up to 6 CTAs)
  - Modular presentation layer

- **[Article Header Component](/src/src/components/article/ArticleHeader.tsx)** 🔴
  - Unified header for blog articles
  - Contains all metadata and audio
  - Responsive display modes:
    - Mobile: HERO, date published, audio player only
    - Tablet: + chips (all types)
    - Desktop: + reading time, date modified, summary
  - All semantic data always in DOM
  - Progressive disclosure based on viewport
  - Single optimized component

- **[[LATEST] Component](/src/src/components/article/LatestArticle.tsx)** 🔴
  - CSS Grid-based layout for most recent article
  - Grid template areas:
    - Title area (spans left)
    - Date area (right aligned)
    - Domain chip area (under title)
    - Project chips area (bottom left)
  - Visual indicator for "latest" status
  - Consistent alignment with Index List items
  - Positioned in hero section

- **[Index List Component](/src/src/components/article/ArticleList.tsx)** 🔴
  - CSS Grid-based layout for post listings
  - Same grid template as [LATEST] for consistency
  - Each row contains:
    - Title (left column)
    - Dates (right column): published/modified
    - Domain chip (under title if cross-posted)
    - Project chips (bottom of left column)
  - Grid benefits:
    - Consistent alignment across all items
    - Responsive without media queries
    - Performance optimized for 1000s items
    - Virtual scrolling friendly
  - Built-in pagination navigation at bottom
  - Positioned in hero section

### 3. Interaction Patterns

#### Standard Label Conventions
- **Connect** 🔴
  - Display text: "Connect" (everywhere)
  - Page path: /contact
  - Consistent across all navigation and CTAs

#### Article Navigation Patterns
- **[Article Navigation Component](/src/src/components/article/ArticleNavigation.tsx)** 🔴
  - Unified component with all CTAs
  - Smart Previous/Next logic:
    - Latest article: Only shows Previous
    - Oldest article: Only shows Next
    - Middle articles: Shows both
  - Responsive display:
    - Mobile: Top, Previous/Next (one), Connect
    - Tablet/Desktop: All 6 options shown
  - CTAs included:
    - "Top" - Smooth scroll to page top
    - "Back" - Browser history.back()
    - "Previous Thought" - If not oldest
    - "Next Thought" - If not latest
    - "Other Thoughts" - Blog index
    - "Connect" - Contact page

### 4. Content Types & Layouts

#### Landing Page Layout
- **[Domain Landing Page](/src/src/pages/index.tsx)** 🔴
  - Path: /index
  - Style: Standard (clean, professional)
  - Components:
    - Top Navigation
    - Dynamic **[Hero Section](/src/src/components/hero/HeroSection.tsx)** with **[Dynamic Visualization](/src/src/components/hero/DynamicVisualization.tsx)**
    - **[Three CTAs section](/src/src/components/hero/CTASection.tsx)**
    - Bottom Footer
  - Purpose: Domain entry point
  - Dynamic elements: All leverage architecture

- **[Blog Subdomain Landing Page](/src/src/pages/index.tsx)** 🔴
  - Path: blog.[domain].in/index
  - Style: Standard (matches domain style)
  - Components:
    - Top Navigation (blog variant)
    - Less Prominent Visualization Background
    - **[Hero Section](/src/src/components/hero/HeroSection.tsx)** (Z-layer above):
      - HERO text
      - Description
      - [LATEST] component
      - Index List component
    - Bottom Footer (same as domain)
  - Purpose: Blog entry point
  - Cross-domain routing: Maintains domain ecosystem

- **[About Page](/src/src/pages/about.tsx)** 🔴
  - Path: [domain].in/about
  - Style: Standard (consistent with domain)
  - Components:
    - Top Navigation (same as domain index)
    - No visualization background
    - Content area:
      - HERO text
      - Image component
      - Text area (essay/letter style)
      - Three CTAs:
        - "Home" → [domain].in
        - "Thoughts" → blog.[domain].in
        - "Connect" → [domain].in/contact
    - Bottom Footer (same as domain index)
  - Purpose: Minimalist about/profile
  - Approach: Essay/letter aesthetic
  
  **Examples in Practice**:
  - **getHarsh.in/about**: Personal essay about Harsh Joshi the person, his philosophy, journey
  - **rawThoughts.in/about**: About RTEPL entity, its mission, vision, what it offers
  - **daostudio.in/about**: About DSPL entity, DAO philosophy, blockchain focus
  - **causality.in/about**: About the research collective, its focus areas
  - Content comes from domain's config.yml, adapts to entity type automatically

- **[Contact Page](/src/src/pages/contact.tsx)** 🔴
  - Path: [domain].in/contact
  - Style: Standard (consistent with domain)
  - Components:
    - Top Navigation (same as domain index)
    - No visualization background
    - Content area:
      - HERO text
      - Description: Brief paragraph about getting in touch. Ends with: "If you're looking to sponsor or support our work, reach out [here]([domain].in/sponsor)."
      - Social Links component
      - Google Appointment Booking wrapper
    - Bottom Footer (same as domain index)
  - Responsive behavior:
    - Desktop/Tablet: Full Google Appointment component embedded
    - Mobile: Component becomes a simple link "Book an appointment" → external URL
  - Purpose: Contact form/information
  - Note: No Calendly - Google only
  
  **Examples in Practice**:
  - **getHarsh.in/contact** (Personal brand):
    - Label: "Connect" everywhere
    - Purpose: Connect with Harsh Joshi personally
    - Social links: Personal Twitter, LinkedIn, GitHub
  - **rawThoughts.in/contact** (Entity website):
    - Label: "Connect" everywhere
    - Purpose: Business inquiries for RTEPL
    - Description mentions "consulting services" if services_enabled
  - **daostudio.in/contact** (Entity website):
    - Label: "Connect" everywhere
    - Purpose: Business inquiries for DSPL
    - Different appointment slots than RTEPL

#### Error Pages
- **[Error Pages (404, 500, etc.)](/src/src/pages/404.tsx)** 🔴
  - Path: /404, /500, etc.
  - Style: Standard (consistent with domain)
  - Components:
    - Top Navigation (same as domain index)
    - Dynamic visualization (same as domain index)
    - Content area:
      - Quirky error description (error-specific)
      - Ecosystem "Learn more" link at end of description
      - Three CTAs:
        - "Home" → [domain].in/index
        - "Thoughts" → blog.[domain].in/index
        - "About" → [domain].in/about
    - Bottom Footer (same as domain index)
  - Purpose: Error handling with personality
  - Note: Each error gets unique quirky message

#### Policy Pages
- **Policy Pages (Privacy, Terms, etc.)** 🔴
  - Path: /privacy, /terms, etc.
  - Style: Minimal (clean, readable)
  - Components:
    - Top Navigation (same as domain index)
    - No visualization background
    - Content area:
      - HERO text (transparent policy description)
      - Ecosystem "Learn more" link at end of HERO
      - Policy document (Gatsby-generated from templates)
      - Three CTAs at bottom:
        - "Home" → [domain].in
        - "Thoughts" → blog.[domain].in
        - "About" → [domain].in/about
    - Bottom Footer (same as domain index)
  - Purpose: Legal compliance with transparency
  - Note: Jekyll intelligently fills policy templates

#### Individual Blog Article Page
- **Blog Article Page** 🔴
  - Path: blog.[domain].in/[article-slug]
  - Style: Content-focused (text-heavy)
  - Components:
    - Top Navigation (blog variant - same as blog index)
    - Content area:
      - Article Header:
        - HERO (article title from frontmatter)
        - Sponsor disclosure (if sponsor exists in frontmatter):
          - Shows prominently below title
          - Text: "Sponsored by [sponsor.name]" with link
          - Visual indicator (background/border)
          - ARIA label for accessibility
        - Date published, Date modified, Reading time
        - Chips section:
          - If canonical: Shows domain chips where cross-posted
          - If cross-posted: Shows primary domain chip
          - Related project chips (always shown)
          - Keyword/tag chips (from frontmatter tags)
        - Article summary (2-3 lines from frontmatter)
        - Audio player (if recording exists)
      - Article body:
        - No visualization background (clean reading)
        - Main content area:
          - Markdown content with Smart Links
          - Code blocks with theme-aware syntax highlighting
          - Mermaid diagrams (theme-integrated)
          - Tables (simple markdown with accent header)
          - Social Embeds (tweets, videos, gists)
          - Standard markdown elements (quotes, lists)
          - Images with captions
        - Social Share positioning:
          - Desktop: Fixed right sidebar (floating)
          - Tablet/Mobile: At article bottom
      - Article bottom:
        - "Comment & Discuss" section (Social Discuss component)
          - Shows on desktop/tablet only
          - Directs to external platforms for conversation
        - Social Share component (tablet/mobile only)
        - Navigation CTAs:
          - "Top" → Scrolls to top of page
          - "Back" → Previous page (browser history)
          - "Previous Thought" → Chronologically previous article
          - "Next Thought" → Chronologically next article
          - "Other Thoughts" → blog.[domain].in/index
          - "Connect" → [domain].in/contact
    - Bottom Footer (same as blog index)
  - Purpose: Share ideas, thoughts, research
  - Content types:
    - Ideas and thoughts
    - Case studies
    - Research updates
    - Project updates
    - Ecosystem/domain updates
  - Note: NOT image-heavy, focus on communicating concepts

### 5. Special Requirements

#### Responsive Display Rules
- **Mobile View Optimizations** 🔴
  - Blog index: Hide chips, show only title + date published
  - Article header: Show HERO + date + audio only
  - Simpler, cleaner mobile experience
  - Progressive enhancement for larger screens

- **Tablet View Additions** 🔴
  - Blog index: Show all content
  - Article header: Add all chip types
  - Better use of medium screen space

- **Desktop View Complete** 🔴
  - Blog index: Full grid with all elements
  - Article header: Everything including summary
  - Maximum information density

- **Semantic Data Always Present** 🔴
  - ALL semantic data in HTML regardless of view
  - Hidden elements use proper CSS (not display:none)
  - Screen readers can access all information
  - SEO/AI systems see complete data
  - Visual hiding ≠ semantic removal

#### Dynamic Configuration Requirements

- **Ecosystem Links** 🔴
  - Ecosystem default domain URL must come from config (full URL)
  - Learn more URL must come from config (full URL, e.g. https://www.github.com/getHarsh/getHarsh/what_is_getHarsh.md)
  - Link texts: "Ecosystem" and "Learn more" (simple)
  - Universal across all domains/blogs in ecosystem

### 6. Things I DON'T Need (Explicitly)

- **Archive Pages** ⚫
  - No separate /archives page needed
  - Blog index already shows all posts
  - Pagination handles large post counts
  - SEO keywords in frontmatter provide discovery

- **Category Pages** ⚫
  - No separate /categories pages needed
  - Keywords/tags in frontmatter serve SEO
  - Blog index is the single source for browsing
  - Avoids content duplication

- **Tag Cloud Component** ⚫
  - Keywords are in frontmatter for SEO
  - No visual tag cloud needed
  - Keeps interface clean and focused

- **Comments System** ⚫
  - Using external platforms (GitHub, Twitter, etc.)
  - Keeps site static and fast
  - Social Discuss component handles this need

- **Newsletter Signup** ⚫
  - Not part of current business model
  - Contact form serves lead generation
  - Keeps focus on consultations/sponsorships

### 7. Project Pages & Documentation

#### Architecture Note: Project Subdomain Pattern
- **Projects Deploy as Subdomains** 🔴
  - Pattern: `[project-name].[domain].in` (e.g., `hena.causality.in`)
  - Mirrors blog pattern: `blog.[domain].in`
  - Each project is an independent Gatsby bundle
  - Benefits:
    - Parallel builds (2-3 min vs 30-40 min)
    - Independent deployments
    - 500KB bundles vs 6-10MB monolithic
    - Better performance and scalability
  - Projects maintain their own site/ directory
  - Deployed from 'site' branch in project repository

#### Universal Page Rules
- **ALL Pages Share Same Components** 🔴
  - Bottom Footer (universal across entire ecosystem)
  - Error Pages (404, 500, etc.) - same design everywhere
  - Policy Pages (privacy, terms, etc.) - same templates
  - This applies to: domain pages, blog pages, project pages, docs pages
  - Ensures consistent user experience across ecosystem

#### Projects Showcase Page
- **[Projects Showcase Page](/src/src/pages/projects.tsx)** 🔴
  - Path: [domain].in/projects
  - Style: Portfolio/showcase layout
  - Purpose: Display all projects (destination for "Highlights" CTA)
  
  **Project Examples Across Domains**:
  - **causality.in/projects**:
    - HENA (AI healthcare project)
    - JARVIS-kernel (OS kernel project)
  - **rawThoughts.in/projects**:
    - AIPM (AI Product Management)
    - jarvisMCP (MCP server)
    - rteplMCP (Entity MCP)
  - **daostudio.in/projects**:
    - DAOnet (DAO infrastructure)
    - yojnAI (AI solutions)
    - yojnCare (Healthcare platform)
    - yojnProtocol (Blockchain protocol)
  - **getHarsh.in/projects**: May show personal projects
  - **sleepwalker.in/projects**: Creative experiments
  
  - Components:
    - Top Navigation (same as domain)
    - Faded visualization background (lower Z layer, same as domain)
    - Hero section with title/description
    - **If projects exist**:
      - Scrollable list of **[Project Cards](/src/src/components/project/ProjectCard.tsx)** (Highlight components):
        - **Card Header**:
          - Left: [Project_name] title
        - **Card Body** (2-column grid):
          - Left column (shorter):
            - Smart chips: "relates to" projects
            - Smart chips: "updates" projects
            - Status label: active/archived/passive development/abandoned (**[Badge](/src/src/components/ui/Badge.tsx)** variant)
            - Tech stack chips: from project config (no hyperlinks)
            - Tools chips: from project config (no hyperlinks)
          - Right column (wider):
            - Simple project description text
        - **Card Footer**:
          - Left: "Docs" link → [project_name].[domain].in/docs/ (if docs enabled)
          - Right: "Learn more" → [project_name].[domain].in/
    - **If no projects** (empty state):
      - Quirky message: "It's quiet here. With due time in this space, something might manifest soon. How about you consume some of these [thoughts](blog.[domain].in) in the meanwhile..."
    - Two CTAs at bottom:
      - "Sponsor" → [domain].in/sponsor (only if sponsor.enabled)
      - "Connect" → [domain].in/contact
    - Bottom Footer (universal)
    
    **Note on Project Relationships**:
    - Projects can have "relates to" relationships (e.g., jarvisMCP relates to JARVIS-kernel)
    - Projects can have "updates" relationships (e.g., HENA updates an older healthcare project)
    - Some projects are supported by external entities (e.g., AION supports some RTEPL projects)
  - Responsive behavior:
    - Desktop/Tablet: 
      - Cards maintain 2-column body layout
      - Both CTAs shown
    - Mobile:
      - Card structure becomes vertical:
        - Header: Project title (stays at top)
        - Body (single column):
          - Description text
          - Project metadata (chips + status)
        - Footer: Docs (left) / Learn more (right)
      - Empty state: Only "Connect" CTA (Sponsor hidden on mobile regardless of config)
  - Note: Simple scrollable list, no filtering/sorting needed

#### Individual Project Pages
- **Project Landing Page** 🔴
  - Path: [project-name].[domain].in/
  - Style: Technical showcase
  - Components:
    - Top Navigation (project variant):
      - Left: "Home" → [domain].in, "Projects" → [domain].in/projects
      - Right: "Docs" → [project-name].[domain].in/docs/ (if docs enabled), "Thoughts" → blog.[domain].in, "Services" → [domain].in/services/, "Sponsor" → [domain].in/sponsor
    - Content area:
      - HERO text: [Project name] (same as card header)
      - Description: Project description text
      - Smart chips section:
        - "Relates to" project chips
        - "Updates" project chips
        - Status label (active/archived/passive/abandoned)
        - Tech stack chips: from project config (no hyperlinks)
        - Tools chips: from project config (no hyperlinks)
      - README link: Link to project's README.md (if provided in config)
      - **Filtered Blog Section**:
        - [LATEST] component - filtered for articles where this project appears in:
          - uses_projects field (relates to)
          - updates_project field
          - **Grid modification**: Extra left column showing content_type as a chip (tutorial, update, news, etc.)
        - Index List component - filtered for articles where this project appears in:
          - uses_projects field (relates to)
          - updates_project field
          - **Grid modification**: Extra left column showing content_type as a chip (tutorial, update, news, etc.)
        - Note: Same components as blog index but with extra content type column and filtered by frontmatter relationships
        - **Responsive behavior**:
          - Desktop: Shows content_type chip in left column
          - Tablet/Mobile: Content_type chip hidden (cleaner view)
        - **Empty state** (if no related articles):
          - Quirky message: "No thoughts on this yet. While we work on content for this project, explore some other [thoughts](blog.[domain].in) in the meanwhile..."
          - Note: Project page exists = project exists, just no articles yet
    - Bottom Footer (universal)
  - Purpose: Individual project showcase
  - Note: "Docs" link only shown if project config has docs enabled

#### Project Documentation Subsites
- **Project Docs Landing** 🔴
  - Path: [project-name].[domain].in/docs/
  - Style: Documentation layout
  - Components:
    - Top Navigation (docs variant):
      - Left: "Home" → [domain].in, "[project-name]" → [project-name].[domain].in/
      - Right: "Thoughts" → blog.[domain].in, "Services" → [domain].in/services/, "Sponsor" → [domain].in/sponsor
    - Documentation-specific layout (TBD)
    - Bottom Footer (universal)
  - Purpose: Technical documentation entry point
  - Note: Part of project's site branch

#### Sponsor Page
- **[Sponsor Page](/src/src/pages/sponsor.tsx)** 🔴
  - Path: [domain].in/sponsor
  - Style: Standard (consistent with domain)
  - **Critical Note**: This page ONLY exists if `sponsor.enabled: true` in domain's config.yml
  - Components:
    - Top Navigation (sponsor variant):
      - Left: "Back" → browser history.back()
      - Right: "About" → [domain].in/about
    - Content area:
      - HERO text: "Sponsor Our Work"
      - Description: Brief paragraph about support options and fund usage transparency. Ends with: "If you're looking to connect and explore other aspects but not sponsoring these projects & work, get in touch [here]([domain].in/contact)."
      - **CSS Grid Section** (1 row, 3 columns):
        - Column 1 - **Direct Sponsorship**:
          - PayPal link with icon (dynamically from config if provided)
          - Text: "One-time or recurring contributions"
          - Note: Only shows if PayPal link exists in config
        - Column 2 - **Platform Sponsorship**:
          - GitHub Sponsors link (from social links in config)
          - YouTube Channel Membership link (from social links in config)
          - Brief description for each platform
          - Note: Reuses same social links from Contact page config
        - Column 3 - **Sponsored Content**:
          - Text: "Sponsor blog articles on specific topics"
          - Mention of transparent disclosure
          - "Book consultation below" pointer
      - **Contact Section** (two options):
        - Option 1 - **Write to us**:
          - Email link using sponsorship/proposal email from config
          - Triggers mailto: with pre-filled:
            - Subject: "Regarding Sponsorship & Engagement : [domain].in"
            - Body: "Hi [entity_name_from_config],\n\nI wanted to get in touch with you regarding..."
          - Text: "Send us an email to discuss sponsorship"
        - Option 2 - **Book an appointment**:
          - Google Appointment Booking wrapper (same component as Contact)
          - Text: "Schedule a call to discuss:"
            - Long-term or goal-specific engagement
            - Sponsored article topics
            - Custom project sponsorship
            - Enterprise partnerships
      - Three CTAs at bottom:
        - "Home" → [domain].in
        - "Projects" → [domain].in/projects
        - "Thoughts" → blog.[domain].in
    - Bottom Footer (universal)
  - Responsive behavior:
    - Desktop: 3-column horizontal grid + full appointment component
    - Tablet: 3-column horizontal grid + full appointment component
    - Mobile: 
      - Grid becomes vertical (1 column, 3 rows)
      - Google Appointment component becomes a simple link
      - Link text: "Book an appointment" → external Google Calendar URL
  - Purpose: Project sponsorship and funding
  - **Important Notes**:
    - Uses browser back since users arrive from multiple entry points
    - Navigation link "Sponsor" only appears if `sponsor.enabled: true` in domain config
    - When `sponsor.enabled: false`:
      - ❌ No /sponsor page generated
      - ❌ No "Sponsor" link in any navigation
      - ❌ No sponsor CTAs in projects showcase
      - ❌ Entire sponsorship infrastructure is dormant
  
  **Entity-Based Sponsorship Examples**:
  - **RTEPL domains** (getHarsh.in, rawThoughts.in, causality.in, sleepwalker.in):
    - All sponsorships go to RTEPL entity
    - Shared PayPal/payment methods from RTEPL config
    - Terms reference RTEPL legal documents
  - **DSPL domains** (daostudio.in):
    - Sponsorships go to DSPL entity
    - Different payment methods from DSPL config
    - Terms reference DSPL legal documents

#### Services Pages
- **[Main Services Page](/src/src/pages/services/index.tsx)** 🔴
  - Path: [domain].in/services/
  - Style: Professional showcase (clean, conversion-focused)
  - Components:
    - Top Navigation (standard domain nav with services):
      - Left: "Home" → [domain].in
      - Right: "About" → [domain].in/about, "Services" → current page
    - Content area:
      - HERO text: "AI Transformation for the Digital Age"
      - Positioning statement: "Just as SEO defined the 2000s, mobile apps the 2010s, and cloud webapps the early 2020s, AI is the defining technology of today. Don't get left behind."
      - **[Evolution Timeline](/src/src/components/services/EvolutionTimeline.tsx)** (visual): SEO (2000s) → Mobile (2010s) → Cloud (2020s) → AI (Now)
      - **[Service Cards Grid](/src/src/components/services/ServiceGrid.tsx)** (dynamically generated from config_services.yml):
        - Number of cards: Adapts to services array length (1-N services)
        - Grid layout: Responsive (3 columns max on desktop, 2 on tablet, 1 on mobile)
        - Each **[Service Card](/src/src/components/services/ServiceCard.tsx)** displays:
          - Icon: From service.icon in config
          - Title: From service.title in config
          - Tagline: From service.tagline in config
          - Description: From service.description in config
          - Key points: From service.features array in config
          - Outcomes: From service.outcomes array in config
          - Link: → [domain].in/services/[service.id]/ (if individual pages enabled)
        - **Important**: NO hardcoded services - everything comes from configuration
        - Example services (but any services can be configured):
          - AI Transformation (Growth)
          - AI Transformation (Interface)
          - AI Transformation (Intelligence)
          - Custom Analytics
          - Blockchain Solutions
          - Whatever you configure!
      - **Industry Solutions Section** (dynamically generated from config):
        - Title: "Solutions by Industry" (or from config)
        - Displays only if industry_pages array exists in config_services.yml
        - Grid of **[Industry Cards](/src/src/components/services/IndustryCards.tsx)** - number and content from configuration:
          - Each card shows industry_page.hero_title
          - Links to /services/[industry_page.slug]/
          - Description from industry_page.hero_subtitle
        - Examples (but completely configurable):
          - Customer Support → /services/customer-support/
          - Healthcare → /services/healthcare/
          - Or any industries defined in config!
      - **Pricing Section**:
        - Text: "Every AI transformation is unique. We provide custom quotes based on your specific needs and goals."
      - **[Dual CTA Section](/src/src/components/services/ServiceCTASection.tsx)**:
        - Primary CTA: "Book Your AI Transformation Consultation"
          - Links to: [domain].in/contact#appointment
          - Style: Primary button with accent color
          - Tracking: GTM event for primary conversion
        - Secondary CTA: "Get a Custom Quote"
          - Action: Opens embedded Google Form (or modal)
          - Form fields: Company, Email, Service interest, Budget range, Timeline, Requirements
          - Style: Secondary button
          - Tracking: GTM events for form open/submit
    - Bottom Footer (universal)
  - Responsive behavior:
    - Desktop: 
      - 3-column service grid with hover effects
      - Side-by-side CTAs
      - Full evolution timeline
      - Industry cards in 4-column grid
    - Tablet:
      - 3-column grid (compressed)
      - CTAs remain side-by-side
      - Condensed timeline
      - Industry cards in 2-column grid
    - Mobile:
      - Single column service cards
      - Stacked CTAs (full width)
      - Simplified timeline (text only)
      - Industry cards in single column
  - Purpose: Primary business conversion - THE key goal for all analytics
  - **Critical Notes**:
    - This page ONLY exists if `services_enabled: true` in domain's config.yml
    - ALL content comes from config_services.yml - NO hardcoded services
    - Navigation link "Services" only appears if services are enabled
    - Blog post CTAs respect this flag - no service links if disabled
  
  **Service Configuration Examples** (all from config_services.yml):
  - **rawThoughts.in/services/** (RTEPL entity services):
    - AI Transformation (Growth) - "Be Found in the AI Age"
    - AI Transformation (Interface) - "Build Intelligent Experiences"
    - AI Transformation (Intelligence) - "Your Data, Your AI"
    - Positioned as enterprise services for RTEPL
  - **getHarsh.in/services/** (Personal brand services):
    - Technical Advisory - Personal consulting
    - Custom Development - Hands-on coding
    - Speaking & Workshops - Knowledge sharing
    - Different positioning than corporate RTEPL
  - **daostudio.in/services/** (DSPL entity services):
    - DAO Transformation - Decentralized governance
    - Smart Contract AI - Blockchain intelligence
    - DeFi Solutions - Financial protocols
    - Completely different domain expertise
  - **causality.in/services/** (Research brand):
    - AI Research Services - Academic partnerships
    - Data Analytics - Research-grade analysis
    - Technical Due Diligence - Deep investigations
  - **sleepwalker.in/services/** (Creative brand):
    - Could offer creative AI services
    - Or might have `services_enabled: false` - no services at all!
  
  **Key Point**: Each domain's services are 100% defined by its config_services.yml. The engine adapts to show 1 service or 10 services, with any content, styling, and CTAs defined in configuration.

- **[Industry-Specific Service Pages](/src/src/templates/service-industry.tsx)** 🔴
  - Path: [domain].in/services/[industry-slug]/
  - Example: [domain].in/services/customer-support/
  - Style: Industry-focused landing page
  - Components:
    - Top Navigation (same as main services page)
    - Content area (ALL from config_services.yml):
      - HERO text: From industry_page.hero_title
      - Subtitle: From industry_page.hero_subtitle
      - Benefits list: From industry_page.benefits array
      - Use cases: From industry_page.use_cases array
      - Case studies: From industry_page.case_studies array
      - Related services: Filtered from main services based on industry_page.service_ids
      - CTAs: From industry_page configuration
    - Bottom Footer (universal)
  - Purpose: SEO-optimized landing pages for "AI transformation in [Industry]" searches
  - **Important**: Content comes from config_services.yml, NOT from CMS
  - **Note**: These pages are only generated if industry_pages array exists in config
  
  **Industry Page Examples** (from config_services.yml):
  - **/services/customer-support/**:
    - For AI customer service transformation
    - Shows benefits like 24/7 support, multi-language
    - Links to relevant services (AI Interface, AI Intelligence)
  - **/services/healthcare/**:
    - Medical AI transformation focus
    - HIPAA compliance, patient care benefits
    - Different case studies than customer support
  - **/services/defi/** (for daostudio.in):
    - DeFi-specific transformation
    - Smart contract automation benefits
    - Links to blockchain-specific services
  
  **SEO Strategy**: These pages target searches like "AI transformation for customer support" or "blockchain solutions for DeFi" - high-intent commercial keywords

#### Navigation Patterns Summary
- **Domain Top Nav**: Left: "Home" | Right: "About", "Services" (if services_enabled)
- **Blog Top Nav**: Left: "Home" → [domain].in | Right: "Articles", "Highlights", "Connect", "Services" → [domain].in/services/ (if services_enabled)
- **Project Top Nav**: Left: "Home" → [domain].in, "Projects" → /projects | Right: "Docs" (if enabled), "Thoughts" → blog.[domain].in, "Services" → [domain].in/services/ (if services_enabled), "Sponsor" → [domain].in/sponsor (if sponsor.enabled)
- **Docs Top Nav**: Left: "Home" → [domain].in, "[project-name]" → [project-name].[domain].in/ | Right: "Thoughts" → blog.[domain].in, "Services" → [domain].in/services/ (if services_enabled), "Sponsor" → [domain].in/sponsor (if sponsor.enabled)
- **Sponsor Top Nav**: Left: "Back" → history.back() | Right: "About" → /about
- **Services Top Nav**: Left: "Home" → [domain].in | Right: "About" → [domain].in/about, "Services" → current page (highlighted)

**Note**: 
- "Services" link only appears in navigation when `services_enabled: true` in domain config
- "Sponsor" link only appears in navigation when `sponsor.enabled: true` in domain config
- Both features follow the same pattern of configuration-driven enablement

### 8. Search Components

#### Search System Components

These components enable privacy-conscious, schema-aware search across the ecosystem:

- **[Search Interface](/src/src/components/search/SearchInterface.tsx)** 🔴
  - Main search UI component
  - Handles user input and query management
  - Debounced search with keyboard shortcuts
  - Used in search page and potentially as overlay

- **[Search Results](/src/src/components/search/SearchResults.tsx)** 🔴
  - Displays search results with ranking
  - Handles pagination and result grouping
  - Schema-aware result rendering
  - Cross-domain result federation

- **[Search Filters](/src/src/components/search/SearchFilters.tsx)** 🔴
  - Content type filtering (articles, projects, services)
  - Domain filtering for cross-domain search
  - Date range and other metadata filters
  - Responsive filter UI

- **[Federated Search](/src/src/components/search/FederatedSearch.tsx)** 🔴
  - Cross-domain search aggregation
  - Handles ecosystem-wide queries
  - Privacy-conscious federation
  - Result merging and ranking

- **[Search Highlight](/src/src/components/search/SearchHighlight.tsx)** 🔴
  - Highlights matching terms in results
  - Context-aware snippet generation
  - Preserves HTML structure
  - Accessibility-friendly highlighting

- **[Search Input](/src/src/components/search/SearchInput.tsx)** 🔴
  - Standalone search input component
  - Can be embedded in navigation
  - Auto-complete suggestions
  - Voice search support (future)

- **[Search Result Item](/src/src/components/search/SearchResultItem.tsx)** 🔴
  - Individual search result display
  - Schema.org structured data
  - Rich snippets with metadata
  - Click tracking for analytics

- **[Search Empty](/src/src/components/search/SearchEmpty.tsx)** 🔴
  - Empty state for no results
  - Suggested searches
  - Alternative content recommendations
  - Quirky messaging consistent with brand

- **[Search Page](/src/src/pages/search.tsx)** 🔴
  - Dedicated search page at /search
  - Full-page search experience
  - Advanced search options
  - Search analytics integration

### 9. Consent & Privacy Components

> **Architecture Documentation**: See [CONSENT-ARCHITECTURE.md](../config/CONSENT-ARCHITECTURE.md) for the complete consent management system architecture, including legal compliance, implementation details, and data flow.

#### Cookie Consent System

These components handle GDPR/CCPA compliance and user privacy preferences:

- **[Consent Banner](/src/src/components/consent/ConsentBanner.tsx)** 🔴
  - Cookie consent notification
  - GDPR/CCPA compliant
  - Customizable per legal entity
  - Persistent user preferences
  - Responsive positioning

- **[Consent Settings](/src/src/components/consent/ConsentSettings.tsx)** 🔴
  - Detailed privacy settings interface
  - Granular control over cookie categories
  - Analytics, functional, marketing toggles
  - Preference persistence
  - Legal entity aware

### 10. Discovery Files & Federation

> **Complete Documentation**: See [DISCOVERY.md](../templates/discovery/DISCOVERY.md) for comprehensive discovery file system documentation, including templates, generation scripts, and standards compliance.

#### Universal Discovery Files (All Entities)

Every domain, blog, and project includes these discovery files:

- **[robots.txt](/templates/discovery/robots.txt.tmpl)** 🔴
  - AI crawler directives (training vs assistance)
  - TDM rights reservation (EU compliance)
  - Sitemap references with federation
  - Links to other discovery files
  - Generated by: [generate-robots.sh](/scripts/generate-robots.sh)
  - Template: 288 lines with AI-specific extensions

- **[sitemap.xml](/templates/discovery/sitemap.xml.tmpl)** 🔴
  - Lists all pages including discovery files
  - Includes: HTML pages, policy pages, discovery files
  - Excludes: Error pages (404, 500)
  - Generated by: [generate-sitemap.sh](/scripts/generate-sitemap.sh) (planned)

- **[.well-known/tdmrep.json](/templates/discovery/tdmrep.json.tmpl)** 🔴
  - [W3C TDM Reservation Protocol](https://w3c.github.io/tdm-reservation-protocol/spec/)
  - Legal entity information
  - AI licensing contacts  
  - Generated by: [generate-tdmrep.sh](/scripts/generate-tdmrep.sh)
  - EU AI Act compliance (Directive 2024/1689)

- **[ai.txt](/templates/discovery/ai.txt.tmpl)** 🔴
  - Human-readable AI usage policy
  - Visual ✅/❌ indicators
  - Legal compliance references
  - Generated by: [generate-ai-txt.sh](/scripts/generate-ai-txt.sh)
  - Template: 153 lines bridging legal and practical guidance

- **[llms.txt](/templates/discovery/llms.txt.tmpl)** 🔴
  - LLM-friendly content summary
  - Structured markdown format
  - Dynamic content analysis from master_posts/
  - Generated by: [generate-llms-txt.sh](/scripts/generate-llms-txt.sh) + [generate-llms-txt.js](/scripts/generate-llms-txt.js)
  - Two-stage generation with content analysis

- **[ecosystem.json](/templates/discovery/ecosystem.json.tmpl)** 🔴
  - Complete ecosystem mapping using JSON-LD @graph
  - Entity relationships from [ecosystem.proto](/config/schema/ecosystem.proto)
  - Cross-domain discovery federation
  - Generated by: [generate-ecosystem-json.sh](/scripts/generate-ecosystem-json.sh)
  - Incorporates ALL catalogs: entities, persons, brands, communities

- **[site.webmanifest](/templates/discovery/site.webmanifest.tmpl)** 🔴
  - Progressive Web App manifest
  - Theme colors and icons from config
  - Install capabilities
  - Generated by: [generate-pwa-manifest.sh](/scripts/generate-pwa-manifest.sh)

#### Domain-Specific Files

- **CNAME** 🔴 (PRODUCTION only)
  - GitHub Pages custom domain
  - Contains: domain.in
  - NOT generated in LOCAL mode
  - Generated by: generate-cname.sh (planned)

- **sitemap-index.xml** 🔴 (domains only)
  - Federation hub for domain ecosystem
  - Aggregates:
    - Domain's own sitemap.xml
    - blog.[domain].in/sitemap.xml
    - All [project].[domain].in/sitemap.xml
  - Generated by: generate-sitemap.sh (planned)

#### Blog-Specific Files

- **feed.xml** 🔴 (RSS 2.0)
  - Blog post feed
  - Includes cross-posting metadata
  - Configurable post limit (default: 20)
  - Generated by: generate-rss.sh (planned)

- **atom.xml** 🔴 (Atom 1.0) 
  - Alternative feed format
  - Same content as RSS
  - Generated by: generate-rss.sh (planned)

#### Federation Architecture

**Domain Level** (e.g., getHarsh.in):
- Has sitemap-index.xml aggregating all child entities
- robots.txt references own sitemap.xml
- Serves as federation hub

**Blog Level** (e.g., blog.getHarsh.in):
- Has own sitemap.xml
- robots.txt references:
  - Own sitemap.xml
  - Parent's sitemap-index.xml
- Has RSS/Atom feeds

**Project Level** (e.g., hena.causality.in):
- Has own sitemap.xml
- robots.txt references:
  - Own sitemap.xml
  - Parent's sitemap-index.xml
- No RSS feeds (unless blog integration)

#### Discovery File Inclusion in Sitemaps

Each sitemap.xml includes URLs for:
- All HTML pages (/, /about, /contact, etc.)
- Policy pages (/privacy, /terms, /cookies)
- Discovery files:
  - /robots.txt
  - /ai.txt
  - /llms.txt
  - /ecosystem.json
  - /.well-known/tdmrep.json
- PWA manifest (/site.webmanifest)
- Feeds (for blogs): /feed.xml, /atom.xml

This ensures search engines and AI agents can discover all available resources.

### 11. Other Entities in the Ecosystem

While the engine primarily manages RTEPL and DSPL domains, it's aware of relationships with external entities:

#### AION Technologies
- **Relationship**: Harsh is Founding Product Manager (Independent Contractor)
- **Impact**: Some RTEPL projects show "Supported by AION" in metadata
- **Note**: AION has its own infrastructure outside this ecosystem

#### Smart Joules Private Limited (SJPL)
- **Relationship**: Harsh was founding Product Development Lead
- **Products**: DeJoule, JouleMind, JouleLabs (owned by SJPL)
- **Note**: Important for Harsh's personal brand narrative but outside ecosystem

#### UPAI (Upcoming Legal Entity)
- **Status**: Community transitioning to legal entity
- **Relationship**: Harsh is volunteer
- **Future**: May leverage ecosystem projects once formalized

### 12. Schema.org Compliance

> **Schema Documentation**: See [SCHEMA.md](../config/schema/SCHEMA.md) for the proto-to-Schema.org mapping system, with 300+ semantic type mappings.

The entire ecosystem is designed for maximum Schema.org compatibility:
- All entities have Organization or Person markup
- Services use ProfessionalService schema
- Projects use SoftwareApplication or CreativeWork
- Relationships use proper schema properties
- Custom properties extend standard schemas

This ensures AI agents, search engines, and future systems can fully understand the ecosystem's structure and relationships.

## Summary

This document captures all actual use cases, pages, user journeys, and the components they require. It serves as the definitive reference for what the system needs to build and support. All components and pages are cross-referenced with their actual implementation files in `/src/src/`.

### Quick Navigation

**Core Components**:
- [Social Components](#social-components) - SocialLinks, SocialShare, SocialDiscuss, SocialEmbed
- [Content Components](#content-components) - Image, TextArea, Table, CodeBlock, MermaidDiagram, etc.
- [Navigation Components](#navigation-components) - TopNavigation, UniversalFooter
- [Hero Components](#hero-components) - DynamicVisualization, HeroSection, CTASection
- [Article Components](#blog-specific-components) - ArticleHeader, ArticleNavigation, ArticleList
- [Service Components](#services-pages) - ServiceGrid, ServiceCard, EvolutionTimeline
- [Project Components](#projects-showcase-page) - ProjectCard
- [Search Components](#search-components) - SearchInterface, SearchResults, FederatedSearch
- [Consent Components](#consent--privacy-components) - ConsentBanner, ConsentSettings

**Pages & Templates**:
- [Domain Pages](#landing-page-layout) - index, about, contact, projects, sponsor
- [Service Pages](#services-pages) - services/index, service-industry template
- [Blog Pages](#blog-subdomain-landing-page) - blog index, article pages
- [Error & Policy Pages](#error-pages) - 404, privacy, terms

All component requirements have been organized by:
- Core primitives needed with file links
- Component variants required
- Interaction patterns
- Content types and layouts with cross-references
- Special requirements
- Responsive behaviors
- Navigation patterns
- Search and consent systems
- Discovery files and federation

The requirements are marked with priority levels:
- 🔴 **Critical** - Must have for launch
- 🟡 **Important** - Needed soon after
- 🟢 **Nice to Have** - Can add later
- ⚫ **Not Needed** - Explicitly don't implement

## Implementation Status

Most critical components have been implemented in `/src/src/components/`:
- ✅ All UI primitives (Button, Badge, Card, Chip)
- ✅ All layout components (Layout, PageLayout, ContentLayout, RootLayout, SEO)
- ✅ All navigation components (TopNavigation, UniversalFooter)
- ✅ All content components (Image, TextArea, Table, CodeBlock, etc.)
- ✅ All social components (SocialLinks, SocialShare, SocialDiscuss, GoogleAppointment)
- ✅ All article components (ArticleHeader, ArticleList, ArticleNavigation, etc.)
- ✅ All hero components (DynamicVisualization, HeroSection, CTASection)
- ✅ All service components (ServiceGrid, ServiceCard, EvolutionTimeline, etc.)
- ✅ Project components (ProjectCard)
- ✅ All search components (full FlexSearch integration)
- ✅ Consent components (ConsentBanner, ConsentSettings)

Pages implemented in `/src/src/pages/`:
- ✅ index.tsx (domain landing)
- ✅ about.tsx
- ✅ contact.tsx
- ✅ projects.tsx
- ✅ sponsor.tsx
- ✅ 404.tsx
- ✅ services/index.tsx
- ✅ search.tsx

Templates implemented in `/src/src/templates/`:
- ✅ service-industry.tsx

This comprehensive cross-referencing ensures both human developers and LLMs can quickly navigate to the exact implementation of any component or page mentioned in the use cases
