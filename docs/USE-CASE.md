# Use Cases & Component Requirements

## Purpose

This document captures all actual use cases, pages, user journeys, and the components they require. It serves as the definitive reference for what the system actually needs to build and support.

## Component Requirements by Use Case

### 1. Core Primitives I'll Actually Use

#### Social Components
- **Social Links Component** 🔴
  - Links to social profiles
  - Icons + labels or just icons
  - Configurable from site config
  - Used in contact page
  - Spec: [SOCIAL-LINKS.md](../COMPONENTS/SOCIAL-LINKS.md)

- **Social Share Component** 🔴
  - Share article to social platforms
  - Common platforms (Twitter, LinkedIn, etc.)
  - Responsive positioning:
    - Desktop: Fixed right sidebar (floating)
    - Tablet: Bottom of article
    - Mobile: Bottom (simplified)
  - Stays visible during scroll (desktop)
  - Spec: [SOCIAL-SHARE.md](../COMPONENTS/SOCIAL-SHARE.md)

- **Social Discuss Component** 🔴
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

- **Social Embed Component** 🔴
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
- **Google Appointment Wrapper** 🔴
  - Container for Google Calendar booking
  - Embedded iframe or widget
  - No Calendly integration
  - Contact page specific

#### Content Components
- **Image Component** 🔴
  - Single image display
  - Used in About page
  - Responsive sizing
  - Alt text support

- **Text Area Component** 🔴
  - Essay/letter style text
  - Minimalist typography
  - Used in About page
  - Markdown content support

- **Table Component** 🔴
  - Standard markdown table rendering
  - First row auto-styled with theme accent colors
  - No complex features - simple is better
  - Responsive table handling
  - Used in article content

- **Code Block Component** 🔴
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

- **Mermaid Diagram Component** 🔴
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

- **Footnotes Component** 🔴
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

- **Math Formula Component** 🔴
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

- **Table of Contents Component** 🔴
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

- **Quirky Message Component** 🔴
  - Short, personality-filled text
  - Used in error pages
  - Error-specific messages
  - Ends with subtle "Learn more" link
  - Maintains brand voice
  - Creates curiosity about ecosystem

- **Audio Player Component** 🔴
  - Simple HTML5/CSS/JS player
  - Static site compatible (no server-side)
  - Plays recordings from Google Drive
  - Shows when audio exists in frontmatter
  - Used in article headers
  - Clean, minimal design

- **Smart Link Component** 🔴
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
- **Article Grid** 🔴
  - CSS Grid template for article displays
  - Shared by [LATEST] and Index List
  - Responsive grid areas
  - Performance optimized
  - Mobile: Simplified grid (title + date only)
  - Desktop: Full grid with all elements
  - Semantic data always in DOM

#### Chip Components
- **Project/Tag Chips** 🔴
  - Small, clickable elements
  - Display project/tag/keyword names
  - Link to related pages
  - Used in:
    - Article headers (keywords)
    - Cards (projects)
    - Filters (tags)
  - Fundamental reusable component

- **Domain Chips** 🔴
  - Special chip variant for canonical domains
  - Shows domain name (e.g., rawThoughts.in)
  - Links to article URL on that domain
  - Used in cross-posted content
  - Behavior:
    - On canonical site: Shows where else published
    - On cross-posted site: Shows original source
  - Bidirectional awareness

#### Navigation Components
- **Top Navigation Bar (Domain)** 🔴
  - Left: Home/Logo link
  - Right: About link
  - Style: Standard (minimal, clean)
  - Responsive: Mobile hamburger menu

- **Top Navigation Bar (Blog)** 🔴
  - Left: Home → [domain].in/index
  - Right: 
    - Articles → blog.[domain].in/index
    - Highlights → [domain].in/projects
    - Connect → [domain].in/contact
  - RSS feed link included
  - Style: Standard (consistent with domain)
  - Cross-domain routing aware

#### Hero Components  
- **Dynamic Visualization Background** 🔴
  - Full viewport height
  - Animated/dynamic background
  - HERO text superimposed
  - 3-line paragraph underneath
  - Leverages architecture dynamically

#### CTA Components
- **Three Primary CTAs** 🔴
  - "Thoughts" → blog.[domain].in
  - "Highlights" → /projects  
  - "Connect" → /contact
  - Horizontal layout on desktop
  - Stacked on mobile

#### Footer Components
- **Bottom Footer (Universal)** 🔴
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
- **Less Prominent Visualization** 🔴
  - For content-heavy pages (blog index)
  - Subtle/muted compared to domain hero
  - Still dynamic but doesn't compete with content
  - Background layer positioning

#### Blog-Specific Components
- **Article Navigation Component** 🔴
  - Wraps all article bottom CTAs
  - Responsive behavior built-in
  - Smart Previous/Next display
  - Mobile: Minimal set (3 CTAs)
  - Desktop: Full set (up to 6 CTAs)
  - Modular presentation layer

- **Article Header Component** 🔴
  - Unified header for blog articles
  - Contains all metadata and audio
  - Responsive display modes:
    - Mobile: HERO, date published, audio player only
    - Tablet: + chips (all types)
    - Desktop: + reading time, date modified, summary
  - All semantic data always in DOM
  - Progressive disclosure based on viewport
  - Single optimized component

- **[LATEST] Component** 🔴
  - CSS Grid-based layout for most recent article
  - Grid template areas:
    - Title area (spans left)
    - Date area (right aligned)
    - Domain chip area (under title)
    - Project chips area (bottom left)
  - Visual indicator for "latest" status
  - Consistent alignment with Index List items
  - Positioned in hero section

- **Index List Component** 🔴
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
- **Article Navigation Component** 🔴
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
- **Domain Landing Page** 🔴
  - Path: /index
  - Style: Standard (clean, professional)
  - Components:
    - Top Navigation
    - Dynamic Hero with visualization
    - Three CTAs section
    - Bottom Footer
  - Purpose: Domain entry point
  - Dynamic elements: All leverage architecture

- **Blog Subdomain Landing Page** 🔴
  - Path: blog.[domain].in/index
  - Style: Standard (matches domain style)
  - Components:
    - Top Navigation (blog variant)
    - Less Prominent Visualization Background
    - Hero Section (Z-layer above):
      - HERO text
      - Description
      - [LATEST] component
      - Index List component
    - Bottom Footer (same as domain)
  - Purpose: Blog entry point
  - Cross-domain routing: Maintains domain ecosystem

- **About Page** 🔴
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

- **Contact Page** 🔴
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

#### Error Pages
- **Error Pages (404, 500, etc.)** 🔴
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
      - Policy document (Jekyll-generated from templates)
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

- **Search Functionality** ⚫
  - Already removed from navigation
  - Static site constraints
  - Google/search engines handle discovery

- **Comments System** ⚫
  - Using external platforms (GitHub, Twitter, etc.)
  - Keeps site static and fast
  - Social Discuss component handles this need

- **Newsletter Signup** ⚫
  - Not part of current business model
  - Contact form serves lead generation
  - Keeps focus on consultations/sponsorships

### 7. Project Pages & Documentation

#### Universal Page Rules
- **ALL Pages Share Same Components** 🔴
  - Bottom Footer (universal across entire ecosystem)
  - Error Pages (404, 500, etc.) - same design everywhere
  - Policy Pages (privacy, terms, etc.) - same templates
  - This applies to: domain pages, blog pages, project pages, docs pages
  - Ensures consistent user experience across ecosystem

#### Projects Showcase Page
- **Projects Showcase Page** 🔴
  - Path: [domain].in/projects
  - Style: Portfolio/showcase layout
  - Purpose: Display all projects (destination for "Highlights" CTA)
  - Components:
    - Top Navigation (same as domain)
    - Faded visualization background (lower Z layer, same as domain)
    - Hero section with title/description
    - **If projects exist**:
      - Scrollable list of Project Cards (Highlight components):
        - **Card Header**:
          - Left: [Project_name] title
        - **Card Body** (2-column grid):
          - Left column (shorter):
            - Smart chips: "relates to" projects
            - Smart chips: "updates" projects
            - Status label: active/archived/passive development/abandoned
            - Tech stack chips: from project config (no hyperlinks)
            - Tools chips: from project config (no hyperlinks)
          - Right column (wider):
            - Simple project description text
        - **Card Footer**:
          - Left: "Docs" link → /[project_name]/docs/index (if docs enabled)
          - Right: "Learn more" → /[project_name]/index
    - **If no projects** (empty state):
      - Quirky message: "It's quiet here. With due time in this space, something might manifest soon. How about you consume some of these [thoughts](blog.[domain].in) in the meanwhile..."
    - Two CTAs at bottom:
      - "Sponsor" → [domain].in/sponsor
      - "Connect" → [domain].in/contact
    - Bottom Footer (universal)
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
      - Empty state: Only "Connect" CTA (no Sponsor)
  - Note: Simple scrollable list, no filtering/sorting needed

#### Individual Project Pages
- **Project Landing Page** 🔴
  - Path: [domain].in/[project-name]/index
  - Style: Technical showcase
  - Components:
    - Top Navigation (project variant):
      - Left: "Home" → [domain].in, "Projects" → [domain].in/projects
      - Right: "Docs" → [domain].in/[project-name]/docs/ (if docs enabled), "Thoughts" → blog.[domain].in, "Sponsor" → [domain].in/sponsor
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
  - Path: [domain].in/[project-name]/docs/index
  - Style: Documentation layout
  - Components:
    - Top Navigation (docs variant):
      - Left: "Home" → [domain].in, "[project-name]" → [domain].in/[project-name]/index
      - Right: "Thoughts" → blog.[domain].in, "Sponsor" → [domain].in/sponsor
    - Documentation-specific layout (TBD)
    - Bottom Footer (universal)
  - Purpose: Technical documentation entry point
  - Note: Part of project's site branch

#### Sponsor Page
- **Sponsor Page** 🔴
  - Path: [domain].in/sponsor
  - Style: Standard (consistent with domain)
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
  - Note: Uses browser back since users arrive from multiple entry points

#### Navigation Patterns Summary
- **Domain Top Nav**: Left: "Home" | Right: "About"
- **Blog Top Nav**: Left: "Home" → [domain].in | Right: "Articles", "Highlights", "Connect"
- **Project Top Nav**: Left: "Home" → [domain].in, "Projects" → /projects | Right: "Docs" (if enabled), "Thoughts" → blog, "Sponsor" → /sponsor
- **Docs Top Nav**: Left: "Home" → [domain].in, "[project-name]" → /[project-name] | Right: "Thoughts" → blog, "Sponsor" → /sponsor
- **Sponsor Top Nav**: Left: "Back" → history.back() | Right: "About" → /about

## Summary

This document captures all actual use cases, pages, user journeys, and the components they require. It serves as the definitive reference for what the system needs to build and support.

All component requirements have been organized by:
- Core primitives needed
- Component variants required
- Interaction patterns
- Content types and layouts
- Special requirements
- Responsive behaviors
- Navigation patterns

The requirements are marked with priority levels:
- 🔴 **Critical** - Must have for launch
- 🟡 **Important** - Needed soon after
- 🟢 **Nice to Have** - Can add later
- ⚫ **Not Needed** - Explicitly don't implement
