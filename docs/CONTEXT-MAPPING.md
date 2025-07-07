# Context Engine Mapping Reference

## Overview

This document defines ALL deterministic mappings used by the Context Engine to produce standards-compliant outputs. Every mapping follows established web standards (WCAG 2.2 AA, Schema.org, OpenGraph, GA4) to ensure consistent, meaningful outputs.

**Core Principle**: Same inputs ALWAYS produce same outputs. No arbitrary values.

## 1. Standards Compliance Mappings

### 1.1 ARIA Role Mappings (WCAG 2.2 AA)

**Atoms**

| Component | Variants | ARIA Role | Standard | Multi-Dimensional Usage |
|-----------|----------|-----------|----------|-------------------------|
| **Text** | body, small, large, caption, code | `text` | WCAG 2.2 | Semantic text with reading level awareness |
| **Heading** | H1-H6, visual override | `heading` + level | WCAG 2.2 | Document structure with SEO integration |
| **Icon** | xs, sm, md, lg, xl | `img` or decorative | WCAG 2.2 | Context-aware decorative vs semantic |
| **Image** | responsive, aspect ratios | `img` | WCAG 2.2 | Performance-optimized with loading strategy |
| **Smart Link** | internal, external, ecosystem, file | `link` | WCAG 2.2 | Receives type and ecosystem info from Context Engine |
| **Link** | internal, external, download | `link` | WCAG 2.2 | External detection, current page state awareness |
| **Chip** | project, tag, domain | `link` or decorative | WCAG 2.2 | Type-based routing, clickable metadata |
| **Separator** | horizontal, vertical | `separator` or none | WCAG 2.2 | Decorative vs semantic based on context |
| **Spacer** | xs, sm, md, lg, xl | none (decorative) | WCAG 2.2 | Responsive scaling based on viewport |
| **Code** | inline only | `code` | WCAG 2.2 | Language detection for syntax context |
| **Math** | inline LaTeX/KaTeX | `math` | WCAG 2.2 | Formula rendering with fallback text |
| **Quote** | inline quotes | `quote` | WCAG 2.2 | Citation handling with source attribution |
| **List Item** | ordered, unordered | `listitem` | WCAG 2.2 | Nesting depth awareness, marker adaptation |
| **Table Cell** | th, td | `columnheader` or `cell` | WCAG 2.2 | Header association, scope management |
| **Audio Control** | play, pause, seek | `button` | WCAG 2.2 | State-aware labels, keyboard accessible |
| **Video Control** | play, pause, seek, fullscreen | `button` | WCAG 2.2 | State management, fullscreen API aware |

**Molecules**

| Component | Variants | ARIA Role | Standard | Multi-Dimensional Usage |
|-----------|----------|-----------|----------|-------------------------|
| **Button** | primary, secondary, danger, ghost | `button` | WCAG 2.2 | Intent-based styling, NO journey stage exposure |
| **Navigation Link** | active, with badge | `link` in `navigation` | WCAG 2.2 | Current page detection, journey-aware |
| **Social Share Button** | twitter, linkedin, etc | `button` in `complementary` | WCAG 2.2 | Position varies by intent + device |
| **Social Discuss Link** | github, twitter, reddit | `link` in `complementary` | WCAG 2.2 | Platform-specific, mobile hidden |
| **Code Block** | multiple languages | `region` + label | WCAG 2.2 | Receives language info from Context Engine, copy function |
| **Project Chip** | clickable with icon | `link` | WCAG 2.2 | Project context, relates-to awareness |
| **Quirky Message** | 404, 403, empty states | `status` | WCAG 2.2 | Error-specific personality messages |
| **Social Link** | all social platforms | `link` | WCAG 2.2 | Receives platform type and icon from Context Engine |
| **Mermaid Diagram** | flowchart, sequence, gantt | `figure` | WCAG 2.2 | Theme palette injection, responsive scaling |
| **Math Block** | display LaTeX/KaTeX | `math` | WCAG 2.2 | Rendering with theme colors, fallback text |
| **Table Row** | header, data, striped | `row` | WCAG 2.2 | First row accent, responsive reflow |
| **List** | ordered, unordered, nested | `list` | WCAG 2.2 | Type and nesting level awareness |
| **Footnote** | numbered with backlinks | `note` + link | WCAG 2.2 | Auto-numbering, bidirectional navigation |
| **Audio Player** | Google Drive, local files | `application` | WCAG 2.2 | Drive integration, keyboard controls |
| **Domain Chip** | canonical indicator | `link` | WCAG 2.2 | Cross-posting detection and routing |
| **Empty State** | no posts, no results | `status` | WCAG 2.2 | Context-specific messaging and links |
| **CTA Button** | high/medium/low priority | `button` | WCAG 2.2 | Conversion tracking, A/B testing ready |
| **Consent Toggle** | analytics, marketing | `switch` | WCAG 2.2 | State persistence, legal compliance |
| **Theme Toggle** | light/dark/auto | `switch` | WCAG 2.2 | System preference detection, persistence |
| **Sponsor Option** | PayPal, GitHub, YouTube | `link` | WCAG 2.2 | Platform availability from config |
| **Metadata Item** | date, author, reading time | `text` | WCAG 2.2 | Progressive disclosure by viewport |
| **TOC Item** | active tracking, nested | `link` in `navigation` | WCAG 2.2 | Scroll spy, current section highlight |
| **Social Embed** | Twitter, LinkedIn, YouTube, GitHub | `complementary` | WCAG 2.2 | Privacy-conscious loading, platform detect |

**Organisms**

| Component | Variants | ARIA Role | Standard | Multi-Dimensional Usage |
|-----------|----------|-----------|----------|-------------------------|
| **Site Header** | domain, blog, project, docs, sponsor | `banner` | WCAG 2.2 | Navigation variant detection |
| **Site Footer** | universal context-aware | `contentinfo` | WCAG 2.2 | Entity-specific with ecosystem links |
| **Article Navigation** | 3 buttons mobile, 6 desktop | `navigation` | WCAG 2.2 | Intent + device responsive buttons |
| **Social Share** | floating desktop, bottom mobile | `complementary` | WCAG 2.2 | Intent + stage + device positioning |
| **Social Discuss** | hidden mobile, visible larger | `complementary` | WCAG 2.2 | Device-based visibility |
| **Project Card** | showcase layout | `article` | WCAG 2.2 | Empty state messages, metadata |
| **Sponsor Grid** | 3 col desktop, 1 mobile | `region` | WCAG 2.2 | PayPal, GitHub, Content sponsorship |
| **Article Header** | mobile minimal, desktop full | `header` | WCAG 2.2 | Progressive disclosure, metadata display |
| **Article Body** | standard, technical, narrative | `main` | WCAG 2.2 | Content enhancement, theme integration |
| **Social Links** | contact page, footer | `navigation` | WCAG 2.2 | Platform list from config, icon mapping |
| **Article Grid** | latest articles, index pages | `feed` | WCAG 2.2 | CSS Grid areas, responsive columns |
| **Latest Article** | homepage feature | `article` | WCAG 2.2 | Latest post data, visual prominence |
| **Index List** | blog index | `feed` | WCAG 2.2 | Pagination controls |
| **Google Appointment** | full widget desktop, link mobile | `complementary` | WCAG 2.2 | Calendar integration, responsive fallback |
| **Visualization Background** | dynamic hero, subtle content | decorative | WCAG 2.2 | Performance-aware animation, page context |
| **Table of Contents** | desktop sidebar, mobile hidden | `navigation` | WCAG 2.2 | Heading extraction, scroll position tracking |
| **Consent Banner** | GDPR required regions | `alertdialog` | WCAG 2.2 | Region detection, preference persistence |

### 1.2 Schema.org Type Mappings

| Content Type | Schema.org Type | Description |
|--------------|-----------------|-------------|
| `blog` | `BlogPosting` | Blog articles |
| `article` | `Article` | News articles |
| `tutorial` | `HowTo` | Step-by-step guides |
| `project` | `CreativeWork` | Portfolio projects |
| `portfolio` | `CreativeWork` | Portfolio pages |
| `about` | `AboutPage` | About pages |
| `contact` | `ContactPage` | Contact pages |
| `person` | `Person` | Personal profiles |
| `organization` | `Organization` | Company pages |
| `post` | `BlogPosting` | Blog posts |
| `guide` | `Guide` | Educational guides |
| `reference` | `TechArticle` | Technical documentation |
| `showcase` | `CreativeWork` | Project showcases |
| (default) | `WebPage` | General web pages |

### 1.3 GA4 Event Mappings

| Action/Type | GA4 Event Name | Parameters | Description |
|-------------|----------------|------------|-------------|
| `click` | `click` | element_type, element_text | Button/link clicks |
| `view` | `page_view` | page_location, page_title | Page views |
| `submit` | `form_submit` | form_name, form_destination | Form submissions |
| `download` | `file_download` | file_name, file_extension | File downloads |
| `video` | `video_engagement` | video_title, video_percent | Video interactions |
| `scroll` | `scroll` | percent_scrolled | Scroll depth |
| `search` | `search` | search_term | Search actions |
| `contact` | `generate_lead` | lead_type, value | Contact form views |
| (default) | `interaction` | custom_category | Generic interactions |

### 1.4 OpenGraph Type Mappings

| Content Type | OG Type | Fallback | Description |
|--------------|---------|----------|-------------|
| `blog` | `article` | `website` | Blog posts |
| `post` | `article` | `website` | Articles |
| `article` | `article` | `website` | News articles |
| `project` | `website` | - | Project pages |
| `profile` | `profile` | `website` | Profile pages |
| `video` | `video.other` | `website` | Video content |
| `tutorial` | `article` | `website` | Tutorials |
| (default) | `website` | - | General pages |

## 2. Repository Context Patterns

### 2.1 Repository Intelligence Mapping

| Repository Context | Primary Focus | Secondary Focus | Content Depth | Cross-Repository Role |
|-------------------|---------------|-----------------|---------------|----------------------|
| `domain` | `portfolio_showcase` | `lead_generation` | `overview` | `hub` |
| `blog` | `educational_content` | `expertise_demonstration` | `detailed` | `content_provider` |
| `project` | `technical_implementation` | `code_showcase` | `technical` | `implementation_reference` |
| `docs` | `technical_documentation` | `api_reference` | `comprehensive` | `knowledge_base` |

### 2.2 Repository Default Mappings

| Repository | Default Schema | Default ARIA | Analytics Category | OG Type |
|------------|----------------|--------------|-------------------|---------|
| `domain` | `Organization` | `main` | `portfolio` | `website` |
| `blog` | `Blog` | `main` | `content` | `article` |
| `project` | `SoftwareSourceCode` | `main` | `technical` | `website` |
| `docs` | `TechArticle` | `main` | `documentation` | `website` |

## 3. Content Analysis Patterns

### 3.1 Content Structure Detection

| Keywords | Structure Type | Schema Type | ARIA Label | Analytics Category | Evidence Source |
|----------|----------------|-------------|------------|-------------------|-----------------|
| `step, first, then, next, finally, follow, instructions` | `tutorial` | `HowTo` | `Step-by-step tutorial` | `tutorial` | See 3.3 |
| `guide, learn, understand, introduction, basics, overview` | `guide` | `Guide` | `Educational guide` | `education` | See 3.3 |
| `api, method, function, parameter, returns, documentation` | `reference` | `TechArticle` | `Technical reference` | `documentation` | See 3.3 |
| `project, built, created, developed, features, showcase` | `showcase` | `CreativeWork` | `Project showcase` | `portfolio` | See 3.3 |
| `thoughts, opinion, experience, learned, story, journey` | `blog` | `BlogPosting` | `Blog article` | `blog` | See 3.3 |

### 3.2 Content Type Detection Priority

1. **Frontmatter** (highest priority) - Explicit declarations from author
2. **Layout** - Check `pageData.layout` against known layouts
3. **Type** - Check `pageData.type` field
4. **Category** - Check `pageData.category` field
5. **URL Pattern** - Check URL for `/blog/`, `/projects/`, `/docs/`
6. **Component Validation** (lowest priority) - Validate via content analysis

### 3.3 Signal Hierarchy & Evidence Calculation

**Core Principle**: Keywords validate declarations, not determine classifications

**Evidence Hierarchy** (by information quality):

| Signal Source | Evidence Weight | Extraction Method | Purpose |
|---------------|-----------------|-------------------|---------|
| **Frontmatter Declarations** | 0.7-0.8 | Direct field access | Ground truth from author |
| **Document Structure** | 0.3-0.5 | Component properties | Information architecture |
| **Rich Components** | 0.2-0.3 | Component type + content | Actual usage patterns |
| **Body Keywords** | 0.1 max | Text analysis with position weighting | Validation only |

**Position-Based Keyword Weighting**:

| Position | Weight Multiplier | Rationale |
|----------|------------------|-----------|
| Title (H1) | 5.0x | Primary topic declaration |
| HERO text | 4.0x | Key message emphasis |
| H2 Headings | 3.0x | Major section topics (TF-IDF boost) |
| H3 Headings | 2.0x | Subsection topics (TF-IDF boost) |
| H4-H6 | 1.5x | Detail markers |
| First paragraph | 1.5x | Introduction weight |
| Body text | 1.0x | Base weight |
| Code comments | 0.5x | Supplementary only |

**Component Property Extraction**:

| Component Type | Extracted Properties | Evidence Value |
|----------------|---------------------|----------------|
| Code Block | `language`, `content` | Tech stack confirmation |
| Heading | `level`, `text` | Structure + keywords |
| Project Chip | `project`, `relationship` | Domain expertise |
| Tech/Tools Chips | `tech_stack`, `tools_stack` from config | Direct declaration (0.8 weight) |
| Math Block | Presence | Technical content |
| Table | Column headers | Reference/comparison |
| Mermaid | Diagram type | Architecture/flow |

**Validation Multipliers**:

| Condition | Multiplier | Example |
|-----------|------------|---------|
| Frontmatter matches keywords | 1.2x | `content_type: tutorial` + tutorial keywords found |
| Frontmatter contradicts keywords | 0.8x | `content_type: tutorial` but no tutorial patterns |
| Expected headings present | 1.1x | Tutorial has "Step 1:", "Step 2:" headings |
| Negative patterns detected | 0.5x | "not using", "instead of", "without" |
| Co-occurrence patterns | 1.3x | React + useState + useEffect together |

**Total Evidence Calculation**:
```
base_evidence = frontmatter_evidence × validation_multiplier
component_evidence = Σ(component_signals × position_weights)  
keyword_evidence = Σ(keyword_matches × position_weights × context_multipliers)
total_evidence = √(base_evidence² + component_evidence² + keyword_evidence²)
```

### 3.4 Content Intent Pattern Matching

**Expected Patterns by content_type**:

| content_type | Expected Heading Patterns | Expected Components | Validation Keywords |
|--------------|---------------------------|---------------------|-------------------|
| `tutorial` | "Step N:", "How to", "Setup" | Code blocks, numbered lists | step, next, follow |
| `showcase` | "Features", "Demo", "Results" | Images, project chips | built, created, features |
| `guide` | "Overview", "Getting Started" | TOC, multiple H2s | learn, understand, guide |
| `reference` | Method names, "API", "Parameters" | Tables, code signatures | function, returns, api |
| `article` | Topic-based, varied | Mixed content | thoughts, opinion, experience |

**Expected Patterns by content_intent**:

| content_intent | Expected Heading Focus | CTA Patterns | Urgency Indicators |
|----------------|----------------------|--------------|-------------------|
| `awareness` | "What is", "Introduction" | Soft CTAs | Low urgency |
| `engagement` | "Try", "Explore", "Experiment" | Interactive | Medium urgency |
| `trust-building` | "Case Study", "Results", "How we" | Evidence-based | Credibility focus |
| `conversion` | "Get Started", "Sign up", "Contact" | Strong CTAs | High urgency |
| `retention` | "Updates", "What's new", "Roadmap" | Newsletter | Loyalty focus |

## 4. Customer Journey Mapping

### 4.1 Journey Stage Classification

**Mathematical Basis**: Evidence scores use logarithmic confidence model: `confidence = 1 - e^(-λ * evidence)` where λ = 0.5

**Evidence Unit Scale**: 0.1 (minimal) → 1.0 (maximum single signal) → Combined evidence can exceed 1.0

| Indicator | Stage | Evidence Units | Analytics Value | ARIA Context | SEO Impact |
|-----------|-------|----------------|-----------------|--------------|------------|
| URL: `/contact` | `decision` | 1.0 | `decision_stage` | `Decision stage content` | High conversion intent |
| URL: `/sponsor` | `consideration` | 0.8 | `consideration_stage` | `Sponsorship evaluation` | Support pages |
| Content: `contact`, Layout: `contact` | `decision` | 1.0 | `decision_stage` | `Direct contact form` | Conversion page |
| Content: `project`, `case-study` | `consideration` | 0.6 | `consideration_stage` | `Portfolio evaluation` | Trust building |
| Content: `tutorial`, `blog` | `awareness` | 0.4 | `awareness_stage` | `Educational content` | Top of funnel |
| Content: `about` | `awareness` | 0.2 | `awareness_stage` | `Company information` | Brand awareness |
| (default) | `awareness` | 0.1 | `awareness_stage` | `Informational content` | General content |

### 4.2 Intent Classification

| Pattern | Intent Type | Analytics Label | Use Case |
|---------|-------------|-----------------|----------|
| Contact page/form | `conversion` | `conversion_intent` | Ready to convert |
| Sponsor page viewing | `evaluation` | `evaluation_intent` | Considering support |
| Project/portfolio viewing | `research` | `research_intent` | Evaluating expertise |
| Tutorial/guide reading | `learning` | `learning_intent` | Skill development |
| Blog/article reading | `informational` | `info_intent` | General interest |

## 5. Business Context Mapping

### 5.1 Lead Type Classification

**Evidence Combination**: Multiple signals combine using `total_evidence = √(e1² + e2² + ...)`

| Indicators | Lead Type | Base Evidence | Analytics Label | Schema Type | ARIA Label |
|------------|-----------|---------------|-----------------|-------------|------------|
| Layout: `contact` | `direct_lead` | 1.0 | `direct_contact_lead` | `ContactPage` | `Direct contact form` |
| Content: `project` | `portfolio_lead` | 0.6 | `portfolio_viewer` | `CreativeWork` | `Project portfolio showcase` |
| Tutorial + Advanced level | `educational_lead` | 0.5 | `educational_consumer` | `LearningResource` | `Educational content` |
| Blog + Technical content | `content_lead` | 0.4 | `content_consumer` | `BlogPosting` | `Technical blog content` |
| (default) | `general_lead` | 0.1 | `general_visitor` | `WebPage` | `General content` |

### 5.2 Engagement Classification

| Behavior | Engagement Type | Level | Strategy | Analytics Value |
|----------|-----------------|-------|----------|-----------------|
| Decision stage + High intent | `active` | `high` | `conversion_focused` | `high_engagement` |
| Consideration + Research | `evaluating` | `medium` | `trust_building` | `medium_engagement` |
| Awareness + Learning | `exploring` | `low` | `educational` | `low_engagement` |
| (default) | `passive` | `low` | `educational` | `passive_engagement` |

## 6. Technical Value Mappings

> **Detection Logic**: See [CONTEXT-DETECTION.md Section 2](./CONTEXT-DETECTION.md#2-url-and-link-detection) for how these values are determined.

### 6.1 File Type Mappings

| Context Engine Provides | Label | ARIA Suffix | Icon | Category |
|------------------------|-------|-------------|------|----------|
| fileType: 'pdf' | `PDF document` | `, PDF document` | `file-pdf` | `document` |
| fileType: 'doc' | `Word document` | `, Word document` | `file-word` | `document` |
| fileType: 'xls' | `Excel spreadsheet` | `, Excel spreadsheet` | `file-excel` | `spreadsheet` |
| fileType: 'ppt' | `PowerPoint presentation` | `, PowerPoint presentation` | `file-powerpoint` | `presentation` |
| fileType: 'zip' | `Archive file` | `, compressed archive` | `file-archive` | `archive` |
| fileType: 'mp4' | `Video file` | `, video file` | `file-video` | `media` |
| fileType: 'mp3' | `Audio file` | `, audio file` | `file-audio` | `media` |
| fileType: 'image' | `Image` | `, image file` | `file-image` | `image` |

### 6.2 Link Type Mappings

| Context Engine Provides | Label | ARIA Suffix | Icon | Priority |
|------------------------|-------|-------------|------|----------|
| linkType: 'google-sheet' | `Google Sheet` | `, Google Sheets document` | `file-spreadsheet` | `high` |
| linkType: 'google-doc' | `Google Doc` | `, Google Docs document` | `file-text` | `high` |
| linkType: 'google-slide' | `Google Slides` | `, Google Slides presentation` | `file-presentation` | `high` |
| linkType: 'google-folder' | `Google Drive folder` | `, Google Drive folder` | `folder-open` | `high` |
| linkType: 'github-file' | `GitHub file` | `, file on GitHub` | `github` | `medium` |
| linkType: 'github-folder' | `GitHub folder` | `, folder on GitHub` | `github` | `medium` |
| linkType: 'github-repo' | `GitHub repository` | `, GitHub repository` | `github` | `medium` |
| linkType: '[file-type]' | `[from 6.1]` | `[from 6.1]` | `[from 6.1]` | `low` |
| linkType: 'internal-link' | `Internal link` | `, internal page` | `internal-link` | `low` |
| linkType: 'ecosystem-link' | `Ecosystem link` | `, link within ecosystem` | `ecosystem-link` | `low` |
| linkType: 'external-link' | `External link` | `, external link` | `external-link` | `low` |

**How Link Types Are Determined**: See [CONTEXT-DETECTION.md Section 2.2](./CONTEXT-DETECTION.md#22-url-pattern-detection) for the complete detection rules and priority order.

**Component Behavior**: Components (like Smart Link) receive the detected `linkType` value from Context Engine and apply appropriate styling/behavior based on the mappings above.


## 7. Compliance Validation Rules

### 7.1 WCAG 2.2 AA Requirements

| Check | Required | Validation | Fallback | Error Message |
|-------|----------|------------|----------|---------------|
| ARIA Label | Yes | Non-empty string | Component text | "Missing ARIA label" |
| ARIA Role | Yes | Valid WCAG role | `region` | "Invalid ARIA role" |
| Color Contrast | Yes | 4.5:1 minimum | Theme default | "Contrast too low" |
| Keyboard Navigation | Yes | Focusable elements | Native behavior | "Not keyboard accessible" |
| Alt Text | Yes (images) | Non-empty string | Filename | "Missing alt text" |

### 7.2 SEO Compliance Rules

| Element | Max Length | Required | Fallback | Validation |
|---------|------------|----------|----------|------------|
| Title | 60 chars | Yes | Page name + Site | Length check |
| Description | 160 chars | Yes | First paragraph | Length + content |
| Keywords | 10 keywords | No | Extracted from content | Relevance check |
| Canonical URL | Full URL | Yes | Current URL | Valid URL format |

### 7.3 Analytics Compliance (GA4)

| Event Type | Required Parameters | Optional Parameters | Validation |
|------------|-------------------|-------------------|------------|
| All events | `event_name` | `event_category`, `event_label` | Non-empty strings |
| `page_view` | `page_location`, `page_title` | `page_referrer` | Valid URLs |
| `file_download` | `file_name`, `file_extension` | `file_size` | Valid file info |
| `form_submit` | `form_name` | `form_destination` | Form identifier |

## 8. Intent Classification & Frontmatter Schema

**CRITICAL UNDERSTANDING**: 
- **EXTERNAL FIELDS**: Used by Context Engine/Analytics AND safe for public exposure (ARIA/SEO/AI/Schema.org)
- **INTERNAL FIELDS**: Used ONLY by Context Engine/Analytics, NEVER exposed publicly

The Context Engine and Analytics systems leverage BOTH external and internal fields for maximum intelligence. External fields provide valuable semantic context while remaining safe for public display.

### 8.1 External Content Types (Safe for ARIA/SEO/AI/Schema.org + Used by Analytics)

These types are used by Context Engine/Analytics for intelligent behavior AND are safely exposed in ARIA labels, Schema.org mapping, SEO, and AI discovery. They represent what the content IS, not what it's trying to achieve.

**Supports Multiple Values**: YES - meaningful combinations allowed (e.g., `[case-study, news]`)

| Content Type | ARIA Label | Schema.org Type | Description | Example |
|--------------|------------|-----------------|-------------|---------|
| `tutorial` | `Tutorial` | `HowTo` | Step-by-step guide | "How to implement auth" |
| `guide` | `Guide` | `Guide` | Educational resource | "Understanding React hooks" |
| `case-study` | `Case study` | `Article` | Real-world implementation | "How we built X" |
| `news` | `News article` | `NewsArticle` | Announcements, updates | "Version 2.0 released" |
| `update` | `Update` | `BlogPosting` | Progress on existing work | "Project X: Month 3 update" |
| `showcase` | `Showcase` | `CreativeWork` | Highlighting work/features | "Introducing new UI" |
| `thought-piece` | `Article` | `Article` | Ideas, philosophy | "The future of web" |
| `reference` | `Reference` | `TechArticle` | Technical documentation | "API Reference" |
| `review` | `Review` | `Review` | Analysis of tools/tech | "Framework comparison" |

### 8.2 Content Format (Safe for ARIA/SEO/AI/Schema.org + Used by Analytics)

Used by Context Engine/Analytics for format-specific behaviors AND safely exposed for accessibility, proper content handling in all public contexts.

**Supports Multiple Values**: NO - single format per content

| Format | Description | Accessibility Impact |
|--------|-------------|---------------------|
| `article` | Standard blog post | Screen reader optimized |
| `video` | Video content | Requires captions |
| `audio` | Podcast/recording | Requires transcript |
| `interactive` | Interactive demos | Keyboard navigation required |
| `download` | Downloadable resources | File type announcement |
| `slides` | Presentation format | Alternative text required |

### 8.3 Content Depth (Safe for ARIA/SEO/AI/Schema.org + Used by Analytics)

Used by Context Engine/Analytics to adapt content presentation AND helps users understand complexity level. Safe for all public contexts including ARIA, SEO, AI manifests, and Schema.org.

**Supports Multiple Values**: NO - single depth level

| Depth | Description | Target Audience |
|-------|-------------|-----------------|
| `beginner` | Entry level content | New to topic |
| `intermediate` | Some experience needed | Familiar with basics |
| `advanced` | Expert level content | Deep expertise |
| `reference` | Lookup/reference only | All levels |

### 8.4 Internal Content Intent (Analytics/Context Engine Only - NEVER Exposed)

These are NEVER exposed in user-facing markup, ARIA, SEO, or AI manifests. Used EXCLUSIVELY by Context Engine and Analytics for internal intelligence and tracking.

**Supports Multiple Values**: NO - single primary intent

| Content Intent | Funnel Stage | Purpose | Success Metrics | Component Behavior |
|----------------|--------------|---------|-----------------|-------------------|
| `awareness` | Top | "I want them to discover/learn" | Time on page, scroll depth | Optimize for readability |
| `engagement` | Mid | "I want them to interact/share" | Social shares, comments, return visits | Prominent social components |
| `trust-building` | Mid | "I want them to see expertise" | Portfolio views, case study reads | Showcase credentials |
| `consideration` | Bottom | "I want them to evaluate options" | Comparison views, feature exploration | Highlight differentiators |
| `conversion` | Bottom | "I want them to take action" | Form fills, appointment bookings | Strong action buttons, urgency |
| `retention` | Post | "I want them to stay engaged" | Return visits, content consumption | Related content, subscriptions |

### 8.5 Conversion Focus (Analytics/Context Engine Only - NEVER Exposed)

Tracks specific conversion goals. NEVER exposed in user-facing markup, ARIA, SEO, or AI manifests. Used EXCLUSIVELY by Context Engine and Analytics.

**Supports Multiple Values**: YES - can have multiple conversion goals

| Conversion Focus | Goal | Success Event | Tracking |
|------------------|------|---------------|----------|
| `contact` | Contact/reach out | Form submission | GA4: generate_lead |
| `project-sponsor` | Sponsor a project | Sponsor inquiry/commitment | GA4: custom event |
| `consultation` | Book consultation | Appointment scheduled | GA4: schedule |
| `newsletter` | Subscribe to updates | Email captured | GA4: sign_up |
| `social-follow` | Follow on social media | New follower | GA4: custom event |
| `download` | Download resource | File downloaded | GA4: file_download |
| `none` | No conversion goal | Engagement only | GA4: engagement_time |

### 8.6 Engagement Type (Analytics/Context Engine Only - NEVER Exposed)

Predicts user engagement patterns. NEVER exposed in user-facing markup, ARIA, SEO, or AI manifests. Used EXCLUSIVELY by Context Engine and Analytics.

**Supports Multiple Values**: NO - single engagement type

| Engagement Type | Description | Content Strategy | Measurement |
|-----------------|-------------|------------------|-------------|
| `quick-read` | 2-3 min content | Concise, scannable | Completion rate |
| `deep-dive` | 10+ min content | Comprehensive, detailed | Scroll depth |
| `actionable` | Expects user action | Clear next steps | Action completion |
| `passive` | Just consuming | Information dense | Time on page |

### 8.7 Complete Frontmatter Schema

```yaml
# Article frontmatter example
title: "Building Real-time Systems with HENA"
description: "Step-by-step guide to implementing real-time features"
tags: [hena, real-time, websockets, tutorial]

# EXTERNAL - Used by Analytics/Context Engine + Safe for public exposure
content_type: [tutorial, showcase]  # Can be multiple
content_format: article             # Single value
content_depth: intermediate         # Single value
content_author: harsh               # For attribution
tech_stack: [TypeScript, React, Node.js]  # Optional, renders as non-clickable chips
tools_stack: [Docker, Kubernetes, GitHub Actions]  # Optional, renders as non-clickable chips

# INTERNAL - Used by Analytics/Context Engine ONLY (NEVER exposed publicly)
content_intent: conversion          # Single primary intent
engagement_type: deep-dive          # Single type
conversion_focus: [contact, project-sponsor]  # Can be multiple

# Relationships
primary_domain: getHarsh.in
uses_projects: [HENA, JARVIS]
updates_project: HENA

# Cross-posting
canonical_url: https://blog.getHarsh.in/building-realtime-hena
also_published: [causality.in, rawThoughts.in]

# Sponsorship (if applicable)
sponsor:
  name: "Company Name"              # Sponsor name
  url: "https://sponsor.com"        # Sponsor website
  disclosure: "sponsored"           # Type: sponsored, affiliate, partnership
  
# Discussion links
discussion_links:
  github_issue: https://github.com/getHarsh/HENA/issues/42
  twitter_thread: https://twitter.com/harsh/status/...
```

### 8.8 Cascading Intent System

The intent flows through the page hierarchy:

1. **Article Level**: Frontmatter declares primary intent
2. **Component Level**: Components adapt behavior based on article intent
3. **User Action**: Clicks validate the intent path

Example cascade:
- Article: `content_intent: conversion`
- → Social Share component becomes more prominent
- → Navigation buttons emphasize "Connect"
- → User clicks "Connect" → Conversion path validated
- → Analytics captures: Tutorial → Connect → Appointment

This creates a deterministic system where:
- Same content + same intent = same component behaviors
- Every user action becomes a meaningful signal
- Analytics provide actionable insights for audience building

## 9. Sponsored Content Detection

### 9.1 Sponsor Disclosure Mapping (Safe for ARIA/SEO/AI/Schema.org + Used by Analytics)

| Disclosure Type | Schema.org Type | ARIA Label | Display Text | Legal Requirement |
|-----------------|-----------------|------------|--------------|-------------------|
| `sponsored` | `SponsoredPosting` | `Sponsored content` | "Sponsored by [name]" | FTC/GDPR required |
| `affiliate` | `Article` + affiliate note | `Affiliate content` | "Contains affiliate links" | FTC required |
| `partnership` | `Article` + partnership note | `Partner content` | "In partnership with [name]" | FTC required |

### 9.2 Sponsored Content Display Rules

**Article Header**: 
- Display sponsor disclosure prominently near title
- Include sponsor name with link to sponsor URL
- Use consistent visual indicator (background, border, icon)

**Schema.org Enhancement**:
```json
{
  "@type": "SponsoredPosting",
  "sponsor": {
    "@type": "Organization",
    "name": "[sponsor.name]",
    "url": "[sponsor.url]"
  },
  "disclosure": "[sponsor.disclosure]"
}
```

**Analytics Tracking**:
- Add `is_sponsored: true` to custom dimensions
- Track sponsor name in event parameters
- Measure sponsored content performance separately

## 10. Output Generation Templates

### 9.1 ARIA Label Construction

```
[Variant Prefix] + [Main Text] + [Context Suffix] + [File Type] + [State Indicators]

Examples:
- "Primary action: Download Report, PDF document"
- "Secondary action: View Project (opens in new tab)"
- "Navigation: Main menu, 5 items"
```

### 9.2 SEO Title Construction

```
[Page Title] + [Category Context] + [Site Name] + [Modifier]

Examples:
- "React Tutorial | Development Blog | SiteName"
- "Project HENA | Portfolio | SiteName"
- "Contact Us | Get Started | SiteName"
```

### 9.3 Analytics Event Construction

```
{
  event_name: [GA4 Standard Event],
  event_category: [External Content Type],  // From 8.1
  event_label: [Specific Context],
  custom_dimensions: {
    journey_stage: [Stage],
    content_type: [External Type],        // From 8.1
    content_stage: [Internal Stage],      // From 8.2
    technical_level: [Level]
  }
}
```

**Note**: Internal stages (8.2) are ONLY used in analytics custom dimensions, never in visible event_category or event_label fields.

## 13. Journey Stage Detection Patterns

### 13.1 Journey Stage Indicators

**CRITICAL**: Journey stages are for internal analytics only, never expose in public HTML

**Stage Evidence**: Combines page evidence + behavior multipliers using confidence scoring system

| URL Pattern | Content Signals | User Behavior | Inferred Stage | Evidence Strength |
|-------------|-----------------|---------------|----------------|-------------------|
| Homepage first visit | No referrer | Direct navigation | `entry` | 0.1 base |
| `/projects` after blog | From article | Exploring portfolio | `discovery` | 0.4 + path bonus |
| Project page with time | 2+ min on page | Reading details | `evaluation` | 0.6 × time quality |
| Multiple project views | 3+ projects | Comparing work | `trust` | 0.6 + 0.3 breadth |
| `/contact` or `/sponsor` | From any page | Seeking action | `decision` | 1.0 or 0.8 base |
| Mailto/external click | Click tracked | Taking action | `action` | Base + 0.8 action |

### 13.2 Multi-Path Journey Flows

| Entry Point | Typical Flow | Alternate Paths | Conversion Points |
|-------------|--------------|-----------------|-------------------|
| Blog article | Read → Author → Projects → Contact | → Home → About → Contact | Multiple touchpoints |
| Homepage | Hero → Projects → Individual → Sponsor | → Blog → Trust → Contact | Direct or explored |
| Project page | Details → Docs → Blog → Contact | → Other projects → Compare | Technical evaluation |
| Social share | Article → Related → Projects → Action | → Home → Explore | Referral journey |

## 14. Confidence Scoring System

### 14.1 Mathematical Foundation

**Core Formula**: `confidence = 1 - e^(-λ * total_evidence)` where λ = 0.5

This logarithmic model ensures:
- Confidence asymptotically approaches but never reaches 1.0
- Diminishing returns on additional weak signals
- Natural plateau behavior without artificial caps
- Smooth gradients between confidence levels

### 14.2 Evidence Units Reference

**Page Visit Evidence** (single signal maximum = 1.0):

| Page Type | Evidence Units | Rationale |
|-----------|----------------|-----------|
| Homepage (`/`) | 0.1 | Minimal intent signal |
| About (`/about`) | 0.2 | Brand interest |
| Projects (`/projects`) | 0.4 | Portfolio interest |
| Specific Project (`/[project]`) | 0.6 | Targeted interest |
| Sponsor (`/sponsor`) | 0.8 | Commercial awareness |
| Contact (`/contact`) | 1.0 | Action intent |

### 14.3 Content Intent Multipliers

**From Frontmatter** (multiplies base evidence):

| content_intent | Multiplier | Rationale |
|----------------|------------|-----------|
| `awareness` | 1.0x | No boost - top of funnel |
| `engagement` | 1.2x | Interaction desired |
| `trust-building` | 1.5x | Credibility focus |
| `retention` | 1.3x | Loyalty building |
| `conversion` | 2.0x | Action oriented |

### 14.4 Behavioral Evidence

**Time Quality Score** (0-1 multiplier based on engagement_type match):

| engagement_type | Expected Time | Quality Score Calculation |
|-----------------|---------------|---------------------------|
| `quick-read` | 2-3 minutes | Full score at 2-3 min, decreases outside |
| `deep-dive` | 10+ minutes | Full score at 10+ min, heavily penalized under 5 |
| `actionable` | 3-5 minutes | Full score at action completion |
| `passive` | Any | Time-based gradient |

**Action Evidence** (additive to base):

| User Action | Evidence Units | Stackable |
|-------------|----------------|-----------|
| Mailto click | 0.8 | No |
| Sponsor link click | 0.6 | No |
| Social share click | 0.3 | Yes (different platforms) |
| Discussion link click | 0.4 | Yes (different platforms) |
| File download | 0.5 | Yes (different files) |
| Project chip click | 0.2 | Yes (different projects) |

### 14.5 Path Intelligence Evidence

**Sequential Path Patterns** (uses geometric mean):

| Path Pattern | Evidence Calculation | Result |
|--------------|---------------------|--------|
| Blog(conversion) → Project → Contact | ∛(0.4 × 2.0 × 0.6 × 1.0) | 0.84 |
| Homepage → Projects → Specific → Contact | ∜(0.1 × 0.4 × 0.6 × 1.0) | 0.36 |
| Direct → Contact | 1.0 × 0.7 | 0.70 |
| Blog → Blog → Blog → Projects | Pattern bonus | +0.3 |

### 14.6 Evidence Combination Rules

1. **Page + Content**: `base × content_multiplier × time_quality`
2. **Multiple Actions**: `√(action1² + action2² + ...)`
3. **Total Evidence**: `√(page_evidence² + action_evidence² + path_evidence²)`
4. **Final Confidence**: `1 - e^(-0.5 × total_evidence)`

### 14.7 Confidence Interpretation Scale

| Total Evidence | Confidence | Interpretation |
|----------------|------------|----------------|
| 0.5 | 0.22 | Low interest |
| 1.0 | 0.39 | Moderate interest |
| 2.0 | 0.63 | Good interest |
| 3.0 | 0.78 | High interest |
| 4.0 | 0.86 | Very high interest |
| 6.0 | 0.95 | Exceptional interest |
| ∞ | <1.00 | Never reaches 1.0 |

### 14.8 Multi-Session Accumulation

For returning visitors, evidence accumulates with decay:
- Current session: 100% weight
- Previous session (< 7 days): 70% weight
- Previous session (< 30 days): 40% weight
- Previous session (> 30 days): 20% weight

Combined as: `total = √(current² + 0.7×previous_week² + 0.4×previous_month² + ...)`

### 14.9 Example Calculations

**Example A: Quick Browse**
- Pages: Homepage (0.1) → About (0.2) → Contact (1.0)
- Time: < 30s each page (quality = 0.3)
- No content intent (no blog article)
- Actions: None
- Path: Simple progression (0.3)

Calculation:
- Page evidence: 1.0 × 1.0 × 0.3 = 0.3
- Action evidence: 0
- Path evidence: 0.3
- Total: √(0.3² + 0² + 0.3²) = 0.42
- **Confidence: 1 - e^(-0.5 × 0.42) = 0.19** (Low interest)

**Example B: Engaged Journey**
- Pages: Blog article (0.4) → Specific project (0.6) → Contact (1.0)
- Content: conversion intent article (2.0x multiplier)
- Time: 5 min on blog, 3 min on project (quality = 0.9)
- Actions: Mailto click (0.8)
- Path: Strong progression (0.84)

Calculation:
- Page evidence: 1.0 × 2.0 × 0.9 = 1.8
- Action evidence: 0.8
- Path evidence: 0.84
- Total: √(1.8² + 0.8² + 0.84²) = 2.16
- **Confidence: 1 - e^(-0.5 × 2.16) = 0.66** (Good interest)

**Example C: Returning High-Intent Visitor**
- Current: Direct → Contact → Mailto click
- Previous (3 days): Blog → Projects → 2 specific projects
- Evidence: Current (1.5) + Previous (2.0 × 0.7) = 1.5 + 1.4

Calculation:
- Total: √(1.5² + 1.4²) = 2.06
- **Confidence: 1 - e^(-0.5 × 2.06) = 0.64** (Good interest, building over time)

## Usage Notes

1. **Deterministic Priority**: When multiple mappings could apply, use the highest confidence/priority match
2. **Fallback Strategy**: Always provide meaningful fallbacks, never empty values
3. **Standards First**: When in doubt, follow the web standard (WCAG, Schema.org, etc.)
4. **Context Awareness**: Consider the full context hierarchy when selecting mappings
5. **Performance**: Cache mapping results when possible, as they're deterministic
6. **Multi-Dimensional**: Always consider ALL dimensions acting together (intent + journey + device + navigation)

This mapping reference ensures consistent, meaningful, standards-compliant outputs across the entire Jekyll theme ecosystem.

## 10. Component Multi-Dimensional Behaviors

**Key**: Components respond to ALL dimensions simultaneously (intent + journey + navigation + device)

### 10.1 Social Share Component Multi-Dimensional Matrix

**Base Behavior**: Intent determines position/prominence, device determines final placement

| Intent + Journey + Nav Context | Desktop Behavior | Tablet Behavior | Mobile Behavior | Analytics Event |
|-------------------------------|------------------|-----------------|-----------------|-----------------|
| `conversion` + `evaluation` + `blog` | floating-right, sticky, high prominence | bottom-static, medium | bottom-fixed, high | `share_high_intent` |
| `conversion` + `decision` + `project` | floating-right, pulse animation | bottom-static, action style | hidden, in article nav | `share_decision_stage` |
| `engagement` + `discovery` + `blog` | article-bottom, static | article-bottom | article-bottom | `share_engagement` |
| `awareness` + `entry` + `domain` | hidden | hidden | hidden | n/a |
| `trust-building` + `evaluation` + `project` | article-bottom, with testimonial | article-bottom | hidden | `share_credibility` |

### 10.2 Social Share Component Detailed Behaviors

| Content Intent | Position | Persistence | Prominence | Mobile Behavior |
|----------------|----------|-------------|------------|-----------------|
| `conversion` | `floating-right` | `sticky` | `high` | `bottom-fixed` |
| `engagement` | `article-bottom` | `static` | `medium` | `article-bottom` |
| `awareness` | `article-bottom` | `static` | `low` | `hidden` |
| `trust-building` | `article-bottom` | `static` | `medium` | `article-bottom` |
| `retention` | `floating-left` | `sticky` | `medium` | `bottom-fixed` |

### 10.3 Article Navigation Multi-Dimensional Matrix

**Base Behavior**: 6 buttons desktop, 3 buttons mobile - selection based on intent + journey

| Intent + Journey + Nav Context | Desktop Buttons (6) | Mobile Buttons (3) | Button Styling | Analytics |
|-------------------------------|------------------|-----------------|-------------|-----------|
| `conversion` + `decision` + `blog` | Connect (primary), Sponsor, Projects, Prev, Next, Home | Connect, Sponsor, Home | Primary highlight on Connect | `nav_conversion_ready` |
| `trust-building` + `evaluation` + `project` | Projects, Other Work, Connect, Docs, Prev, Next | Projects, Connect, More | Balanced emphasis | `nav_credibility_focus` |
| `engagement` + `discovery` + `blog` | Other Thoughts, Share, Discuss, Related, Prev, Next | Other Thoughts, Share, Next | Social emphasis | `nav_engagement_focus` |
| `awareness` + `entry` + `domain` | About, Projects, Blog, Contact, Home, Sitemap | About, Blog, Home | Exploratory layout | `nav_discovery_mode` |

### 10.4 Article Navigation Detailed Behaviors

| Content Intent | Primary Button | Secondary Buttons | Emphasis | Mobile Buttons |
|----------------|------------|----------------|----------|-------------|
| `conversion` | `Connect` | `Sponsor`, `Home` | `high` | `Connect` only |
| `awareness` | `Other Thoughts` | `Previous`, `Next` | `medium` | `Other Thoughts`, `Next` |
| `trust-building` | `Projects` | `Connect`, `Home` | `medium` | `Projects`, `Connect` |
| `engagement` | `Other Thoughts` | `Share`, `Discuss` | `high` | `Other Thoughts` |
| `retention` | `Subscribe` | `Other Thoughts`, `Home` | `medium` | `Subscribe` only |

### 10.5 Social Discuss Component Multi-Dimensional Matrix

**Base Behavior**: Only shows if discussion_links exist in frontmatter, mobile always hidden

| Intent + Journey + Has Links | Desktop Display | Tablet Display | Platform Priority | Analytics |
|------------------------------|-----------------|----------------|-------------------|-----------|
| `engagement` + `discovery` + `true` | Prominent, all platforms | Standard, all | Twitter, Reddit first | `discuss_engagement` |
| `trust-building` + `evaluation` + `true` | Enhanced, GitHub first | Standard | GitHub, then others | `discuss_technical` |
| `conversion` + Any + `true` | Standard placement | Standard | All equal priority | `discuss_available` |
| Any + Any + `false` | Hidden | Hidden | n/a | n/a |

### 10.6 Project Card Component Multi-Dimensional Matrix

**Base Behavior**: Showcase layout with metadata, empty state aware, tech/tools from config

| Project State + Intent + Device | Card Layout | Metadata Display | Empty State | Analytics |
|--------------------------------|-------------|------------------|-------------|-----------|
| Has content + `trust-building` + Desktop | 2-col grid, chips prominent | Full metadata + tech/tools | n/a | `project_showcase` |
| Has content + Any + Mobile | Single col, description first | Hidden chips except status | n/a | `project_mobile` |
| No content + Any + Desktop | Empty state message | n/a | "It's quiet here..." + thoughts link | `project_empty` |
| No content + Any + Mobile | Empty state message | n/a | Same, no sponsor button | `project_empty_mobile` |

**Chip Types in Project Card**:

| Chip Type | Source | Clickable | Visual Style | Purpose |
|-----------|--------|-----------|--------------|---------|
| Related projects | Config `relates_to` | Yes → project page | Accent border | Navigation |
| Updates projects | Config `updates` | Yes → project page | Accent border | Navigation |
| Status | Config `status` | No | Status color | Information |
| Tech stack | Config `tech_stack` | No | Muted style | Information |
| Tools | Config `tools` | No | Muted style | Information |

### 10.7 Homepage Button Pattern

**Fixed Pattern**: Always 3 buttons - "Thoughts", "Highlights", "Connect" - but styling varies

| Journey Stage + Intent | Thoughts Button | Highlights Button | Connect Button | Overall Style |
|-----------------------|--------------|----------------|-------------|---------------|
| `entry` + `awareness` | Standard | Standard | Standard | Equal weight |
| `discovery` + `engagement` | Enhanced | Primary | Standard | Portfolio focus |
| `evaluation` + `trust-building` | Standard | Enhanced | Standard | Credibility focus |
| `decision` + `conversion` | Standard | Standard | Primary + pulse | Conversion focus |

### 10.8 Site Header Multi-Dimensional Matrix

**Base Behavior**: Navigation items change based on repository context

| Nav Variant + Device + User State | Left Navigation | Right Navigation | Mobile Menu | Special Behavior |
|-----------------------------------|-----------------|------------------|-------------|------------------|
| `domain` + Desktop + Any | Home | About | n/a | Standard spacing |
| `blog` + Desktop + Any | Home → [domain].in | Thoughts, Highlights, Connect | n/a | Cross-domain aware |
| `project` + Desktop + Docs enabled | Home, Projects | Docs, Thoughts, Sponsor | n/a | Docs conditional |
| `docs` + Desktop + Any | Home, [project-name] | Thoughts, Sponsor | n/a | Project context |
| `sponsor` + Any + Any | Back (history) | About | Hamburger | Special back behavior |
| Any + Mobile + Any | Visible brand | Hamburger icon | All items vertical | Touch-optimized |

### 10.9 Button Component Multi-Dimensional Matrix

**CRITICAL**: Never expose internal journey stage or lead score in HTML attributes

| Variant + Intent + Context | Visual Style | ARIA Label | Analytics Event | Conversion Tracking |
|---------------------------|--------------|------------|-----------------|---------------------|
| `primary` + `conversion` + Button position | Prominent, possible animation | "[Action]" only | `button_click` + intent | Track with consent |
| `secondary` + `awareness` + Article | Subtle, standard | "[Action]" only | `button_click` | Low priority |
| `danger` + Any + Form | Red, warning style | "Warning: [Action]" | `button_warning` | Track carefully |
| `ghost` + `engagement` + Social | Minimal, hover effect | "[Platform] share" | `social_click` | Platform specific |

### 10.10 Smart Link Component Intelligence

**Base Behavior**: Receives link type from Context Engine based on URL analysis

| URL Pattern + Context + Device | Icon | ARIA Enhancement | Open Behavior | Analytics |
|-------------------------------|------|------------------|---------------|-----------|
| Google Docs + Any + Any | `file-doc` | ", Google Docs document" | New tab | `link_gdocs` |
| GitHub repo + Technical + Any | `github` | ", GitHub repository" | New tab | `link_github` |
| PDF file + Any + Mobile | `file-pdf` | ", PDF document" | Download prompt | `link_pdf` |
| Internal + Navigation + Any | None | Current state if active | Same tab | `link_internal` |
| Ecosystem + Cross-domain + Any | `ecosystem` | ", [domain] site" | Same tab | `link_ecosystem` |

### 10.11 Sponsor Grid Multi-Dimensional Behavior

| Sponsor Options + Device + Intent | Grid Layout | Appointment Display | Emphasis | Empty State |
|----------------------------------|-------------|---------------------|----------|-------------|
| All available + Desktop + Any | 3 columns | Full widget | Equal weight | n/a |
| PayPal only + Desktop + Any | Single centered | Full widget | PayPal focus | Show others as "coming soon" |
| All + Mobile + Any | 1 column stack | Link only "Book appointment" | Vertical priority | n/a |
| None configured + Any + Any | Hide section | Hide section | n/a | Custom message |

### 10.12 Site Footer Multi-Dimensional Matrix

**Base Behavior**: Universal footer with context-aware adaptations

| Nav Context + Device + Intent | Legal Entity | Ecosystem Links | Newsletter Form | Social Links |
|------------------------------|--------------|-----------------|-----------------|--------------|
| `domain` + Desktop + `conversion` | Prominent with ©️ | All domains visible | Enhanced CTA | All platforms |
| `blog` + Desktop + `engagement` | Standard | Blog-focused first | Standard form | Share-focused |
| `project` + Mobile + Any | Minimal | Hidden in accordion | Link to form | Essential only |
| `sponsor` + Any + `trust-building` | With credentials | Sponsor ecosystem | Hidden | Professional |
| Any + Mobile + Any | Short form | Collapsed menu | External link | Icon-only |

### 10.13 Article Header Multi-Dimensional Matrix

**Base Behavior**: Progressive disclosure based on device and intent

| Intent + Device + Content Type | Title Display | Metadata | Sponsor Disclosure | Reading Time |
|--------------------------------|---------------|----------|-------------------|--------------|
| `awareness` + Desktop + `tutorial` | Large, clear | Full: date, author, tags | If present, subtle | Prominent |
| `engagement` + Mobile + `article` | Standard size | Minimal: date only | If present, prominent | Hidden |
| `trust-building` + Desktop + `showcase` | With project chips | Full + project links | Enhanced if present | With depth indicator |
| `conversion` + Tablet + Any | Standard | Author prominent | Very prominent | Hidden |
| Any + Mobile + Long-form | Compact | Progressive reveal | Top banner if present | In metadata |

### 10.14 Article Body Multi-Dimensional Matrix

**Base Behavior**: Content enhancement based on format and technical level

| Content Format + Tech Level + Device | Code Blocks | Diagrams | Links | Table of Contents |
|-------------------------------------|-------------|----------|-------|-------------------|
| `technical` + `advanced` + Desktop | Syntax highlight, copy button | Full Mermaid render | Smart detection | Floating sidebar |
| `tutorial` + `beginner` + Mobile | Simplified, no line numbers | Static images | Basic styling | Hidden |
| `narrative` + Any + Tablet | Minimal styling | Decorative only | Standard | Top summary only |
| `reference` + `intermediate` + Desktop | Full features + expand | Interactive diagrams | Smart + tooltips | Sticky sidebar |
| Any + Any + Mobile | Horizontal scroll | Simplified | Touch-friendly | Collapsed top |

### 10.15 Text Component Multi-Dimensional Matrix

**Base Behavior**: Semantic styling based on context and reading level

| Variant + Content Type + Device | Font Size | Line Height | Max Width | Special Features |
|--------------------------------|-----------|-------------|-----------|------------------|
| `body` + `article` + Desktop | 18px | 1.6 | 65ch | Optimal reading |
| `body` + `technical` + Mobile | 16px | 1.5 | Full | Dense info |
| `caption` + Any + Any | 14px | 1.4 | Parent | Muted color |
| `large` + `awareness` + Desktop | 20px | 1.7 | 70ch | Easy scanning |
| `code` + `technical` + Any | Monospace | 1.4 | Parent | Syntax aware |

### 10.16 Heading Component Multi-Dimensional Matrix

**Base Behavior**: SEO and accessibility optimization per level

| Level + Page Type + Intent | Visual Size | Anchor Generation | TOC Inclusion | SEO Weight |
|---------------------------|-------------|-------------------|---------------|------------|
| H1 + `article` + Any | 2.5rem | Yes, with slug | No (title) | Primary |
| H2 + `tutorial` + `engagement` | 2rem | Yes | Yes, primary | Secondary |
| H3 + `reference` + Any | 1.5rem | Yes | Yes, subsection | Tertiary |
| H4-H6 + Any + Any | 1.25-1rem | Optional | No | Minimal |
| Visual override + Any + Any | As specified | Based on semantic | Based on semantic | Semantic level |

### 10.17 Icon Component Multi-Dimensional Matrix

**Base Behavior**: Size and style adapt to context

| Size + Context + Theme Mode | Actual Size | Stroke Width | Color Behavior | Accessibility |
|----------------------------|-------------|--------------|----------------|---------------|
| `xs` + inline text + Any | 14px | 1.5 | Inherit text | Decorative |
| `md` + button + Dark | 20px | 2 | Theme aware | Part of button label |
| `lg` + hero + Light | 32px | 2.5 | Accent color | Alt text if standalone |
| Social icon + Any + Any | Platform spec | Platform spec | Brand colors | Platform name |
| File type + Any + Any | 16px | 2 | Type-specific | File type label |

### 10.18 Image Component Multi-Dimensional Matrix

**Base Behavior**: Performance optimization based on context

| Context + Device + Network | Loading Strategy | Format Selection | Sizes Attribute | Fallback |
|---------------------------|------------------|------------------|-----------------|----------|
| Above fold + Mobile + Slow | Eager | WebP with JPEG | (max-width: 640px) 100vw | Low quality |
| Article body + Desktop + Fast | Lazy | WebP only | (max-width: 1200px) 65ch | Standard |
| Hero + Any + Any | Eager priority | WebP with JPEG | 100vw | Blurred placeholder |
| Thumbnail + Any + Slow | Lazy | JPEG only | 200px | CSS background |
| Gallery + Mobile + Any | Intersection | WebP progressive | (max-width: 640px) 50vw | Loading skeleton |

### 10.19 Navigation Link Multi-Dimensional Matrix

**Base Behavior**: State awareness and intent-based styling

| Current Page + Intent + Device | Visual State | ARIA Current | Badge Display | Analytics |
|-------------------------------|--------------|--------------|---------------|-----------|
| Active page + Any + Desktop | Underline + color | page | If present, prominent | `nav_current` |
| Parent section + `engagement` + Any | Subtle highlight | true | Standard | `nav_section` |
| Inactive + `conversion` + Mobile | Standard | false | Hidden | `nav_other` |
| External + Any + Any | Icon indicator | false | If any | `nav_external` |
| Has badge + `trust-building` + Any | Enhanced | Varies | Number or dot | `nav_badge_shown` |

### 10.20 Social Link Multi-Dimensional Matrix

**Base Behavior**: Receives platform type from Context Engine

| Platform + Context + Device | Icon Selection | Hover Behavior | Color Scheme | Accessibility |
|----------------------------|----------------|----------------|--------------|---------------|
| Twitter/X + Footer + Desktop | Twitter icon | Brand color | Monochrome default | "Twitter profile" |
| GitHub + About + Mobile | GitHub icon | No hover | Always mono | "GitHub profile" |
| LinkedIn + Contact + Any | LinkedIn icon | Subtle lift | Professional | "LinkedIn profile" |
| Email + Any + Any | Mail icon | Underline | Inherit | "Email address" |
| Unknown URL + Any + Any | Link icon | Standard | Inherit | "External link" |

### 10.21 Code Block Multi-Dimensional Matrix

**Base Behavior**: Language-specific enhancement

| Language + Device + Context | Syntax Highlighting | Line Numbers | Copy Button | Special Features |
|----------------------------|-------------------|--------------|-------------|------------------|
| JavaScript + Desktop + `tutorial` | Full theme colors | Yes, clickable | Top-right | Run button (future) |
| Bash + Any + `guide` | Shell theme | No | Yes | $ prefix |
| JSON + Mobile + Any | Minimal colors | No | Bottom | Collapse large |
| Unknown + Any + Any | Basic mono | Optional | Yes | Plain text |
| Diff + Any + `comparison` | Red/green | If > 10 lines | Yes | Side-by-side desktop |

### 10.22 Empty State Multi-Dimensional Matrix

**Base Behavior**: Context-specific messaging and actions

| Page Context + Has Alternative + Device | Message Tone | Link Options | Visual Style | Animation |
|----------------------------------------|--------------|--------------|--------------|-----------|
| Projects empty + Blog exists + Desktop | Encouraging | Link to thoughts | Large icon | Subtle fade |
| Search no results + Any + Mobile | Helpful | Try different search | Compact | None |
| Tag filter empty + Other tags + Any | Suggestive | Browse all | Medium | None |
| Blog empty + Projects exist + Any | Coming soon | See projects | Branded | Pulse on CTA |
| Complete empty + Any + Any | Honest | Contact us | Minimal | None |

### 10.23 Consent Toggle Multi-Dimensional Matrix

**Base Behavior**: Legal compliance with UX consideration

| Consent Type + Region + User State | Default State | Visual Prominence | Description | Persistence |
|-----------------------------------|--------------|-------------------|-------------|-------------|
| Analytics + GDPR + First visit | Off | High - modal | Full explanation | localStorage |
| Marketing + CCPA + Return visit | Previous choice | Low - settings | Brief | Remembered |
| Essential + Any + Any | On, disabled | Info only | Why required | n/a |
| All + Mobile + Any | Off | Full screen | Progressive | Same |
| Preferences + Logged in + Any | User prefs | Settings page | Detailed | Account |

### 10.24 Theme Toggle Multi-Dimensional Matrix

**Base Behavior**: System preference aware

| Current Theme + System Pref + Time | Toggle State | Icon Display | Transition | Storage |
|-----------------------------------|--------------|--------------|------------|---------|
| Light + Dark system + Day | Light active | Sun icon | None | localStorage |
| Dark + Dark system + Night | Dark active | Moon icon | None | Synced |
| Auto + Changes + Any | Auto active | Auto icon | Smooth fade | System |
| Light + No pref + Night | Light active | Sun + tooltip | None | Forced |
| Any + Mobile + Any | Current | Compact icon | Instant | Same |

### 10.25 Mermaid Diagram Multi-Dimensional Matrix

**Base Behavior**: Responsive rendering with theme integration

| Diagram Type + Device + Theme | Render Method | Color Palette | Interaction | Fallback |
|------------------------------|---------------|---------------|-------------|----------|
| Flowchart + Desktop + Light | Client-side SVG | Theme colors | Pan/zoom | Static PNG |
| Sequence + Mobile + Dark | Simplified SVG | High contrast | Scroll only | Vertical layout |
| Gantt + Tablet + Any | Horizontal scroll | Accessible | Touch scroll | Table view |
| Complex + Any + Print | Static render | Print safe | None | Simplified |
| Error + Any + Any | Error message | n/a | n/a | Code block |

### 10.26 TOC Item Multi-Dimensional Matrix

**Base Behavior**: Scroll-spy with current section tracking

| Heading Level + Scroll Position + Device | Visual State | Expand State | Click Behavior | Analytics |
|------------------------------------------|--------------|--------------|----------------|-----------|
| H2 + In viewport + Desktop | Bold + accent | Auto expand H3s | Smooth scroll | `toc_navigate` |
| H3 + Parent active + Mobile | Indented | Visible | Instant jump | `toc_subsection` |
| H2 + Above viewport + Any | Muted | Collapsed | Smooth scroll | Standard |
| Active section + Any + Desktop | Highlight + bar | Expanded | No-op | `toc_current` |
| Deep nesting + Any + Mobile | Hidden | n/a | n/a | n/a |

### 10.27 Audio Player Multi-Dimensional Matrix

**Base Behavior**: Google Drive integration with fallbacks

| Source Type + Device + Network | Player UI | Controls | Preload | Analytics |
|-------------------------------|-----------|----------|---------|-----------|
| Google Drive + Desktop + Fast | Full custom | All + speed | Metadata | `audio_play_drive` |
| Local file + Mobile + Slow | Native | Basic | None | `audio_play_local` |
| Podcast + Any + Medium | Enhanced | Chapters | First 30s | `audio_podcast` |
| Missing + Any + Any | Error state | None | n/a | `audio_error` |
| Background + Mobile + Any | Mini player | Play/pause | None | `audio_background` |

### 10.28 Social Embed Multi-Dimensional Matrix

**Base Behavior**: Privacy-conscious progressive enhancement

| Platform + Privacy Mode + Device | Load Behavior | Placeholder | Interaction | Fallback |
|----------------------------------|--------------|-------------|-------------|----------|
| Twitter + Consent given + Desktop | Auto embed | None | Full Twitter | n/a |
| YouTube + No consent + Mobile | Click to load | Thumbnail + play | Consent prompt | Link out |
| LinkedIn + Blocked + Any | Never load | Text description | External link | Quote |
| GitHub Gist + Any + Desktop | Immediate | Loading | Syntax highlight | Code block |
| Unknown + Any + Any | No embed | Link only | Navigate | External |

### 10.29 Table Cell Multi-Dimensional Matrix

**Base Behavior**: Responsive and accessible

| Cell Type + Table Context + Device | Display Method | ARIA Role | Visual Style | Interaction |
|------------------------------------|----------------|-----------|--------------|-------------|
| Header + Data table + Desktop | Standard th | columnheader | Bold + bg | Sort (future) |
| Data + Comparison + Mobile | Label: value | cell | Stacked | Tap to expand |
| Header + Layout + Any | Visual only | presentation | Styled | None |
| Numeric + Financial + Any | Right align | cell | Monospace | Copy |
| Long text + Any + Mobile | Truncate | cell | Ellipsis | Tap for full |

### 10.30 Link Component Multi-Dimensional Matrix

**Base Behavior**: Basic link with context awareness (not Smart Link)

| Link Type + Context + State | Visual Style | Hover Effect | Icon | Analytics |
|---------------------------|--------------|--------------|------|-----------|
| Internal + Navigation + Current | Accent color | None | None | `link_current` |
| External + Article + Any | Underline | Color change | External icon | `link_external` |
| Download + Resources + Any | Dashed underline | Highlight | Download icon | `link_download` |
| Broken + Any + Any | Strike-through | Tooltip | Warning | `link_broken` |
| Visited + Article + Any | Muted color | Standard | None | `link_visited` |

### 10.31 Chip Component Multi-Dimensional Matrix

**Base Behavior**: Clickable metadata tags

| Type + Context + State | Visual Style | Click Behavior | Icon Position | Size |
|-----------------------|--------------|----------------|---------------|------|
| `project` + Article + Any | Accent border | Navigate to project | Left | Small |
| `tag` + Index + Active | Filled bg | Filter by tag | None | Medium |
| `domain` + Cross-post + Any | Ghost style | Navigate to domain | Right | Small |
| `technology` + Project + Any | Tech color | Show related | Left | Small |
| `tech` + Project card + Any | Muted style | None (no hyperlink) | Left | Small |
| `tools` + Project card + Any | Muted style | None (no hyperlink) | Left | Small |
| `tech` + Blog frontmatter + Any | Muted style | None (no hyperlink) | Left | Small |
| `tools` + Blog frontmatter + Any | Muted style | None (no hyperlink) | Left | Small |
| `status` + Any + Disabled | Muted | None | None | Extra small |

### 10.32 Separator Component Multi-Dimensional Matrix

**Base Behavior**: Visual or semantic separation

| Orientation + Context + Theme | Visual Style | ARIA Role | Spacing | Width |
|------------------------------|--------------|-----------|---------|-------|
| Horizontal + Article sections + Light | 1px line | separator | 2rem vertical | 100% |
| Horizontal + Decorative + Dark | Gradient fade | none | 3rem | 50% |
| Vertical + Navigation + Any | 1px solid | none | 0.5rem horizontal | Full height |
| Horizontal + Footer + Any | 2px accent | separator | 1rem | 80% |
| None + Semantic only + Any | Hidden | separator | 0 | 0 |

### 10.33 Spacer Component Multi-Dimensional Matrix

**Base Behavior**: Responsive spacing utility

| Size + Context + Device | Actual Space | Scaling | Collapsible | Purpose |
|------------------------|--------------|---------|-------------|---------|
| `xl` + Section break + Desktop | 5rem | 1x | No | Major sections |
| `xl` + Section break + Mobile | 3rem | 0.6x | No | Reduced |
| `md` + Component gap + Any | 2rem | 1x | No | Standard |
| `sm` + Inline + Mobile | 0.5rem | 0.5x | Yes | Minimal |
| `responsive` + Any + Any | Viewport-based | Fluid | No | Dynamic |

### 10.34 Code Component (Inline) Multi-Dimensional Matrix

**Base Behavior**: Inline code styling

| Context + Content Type + Theme | Font Style | Background | Padding | Border |
|-------------------------------|------------|------------|---------|--------|
| Variable name + Article + Light | Monospace | Subtle bg | 0.2em | None |
| Command + Tutorial + Dark | Monospace bold | Contrast bg | 0.3em | 1px |
| File path + Docs + Any | Monospace | Different bg | 0.25em | None |
| Keyboard + Guide + Any | Monospace | Key style | 0.4em | Raised |
| API + Reference + Any | Monospace | None | 0.1em | Bottom only |

### 10.35 Math Component (Inline) Multi-Dimensional Matrix

**Base Behavior**: Inline mathematical expressions

| Complexity + Context + Device | Render Method | Font Size | Vertical Align | Fallback |
|------------------------------|---------------|-----------|----------------|----------|
| Simple + Article + Any | HTML/CSS | Inherit | Baseline | Unicode |
| Complex + Tutorial + Desktop | KaTeX | 1.1em | Middle | LaTeX source |
| Fraction + Any + Mobile | Simplified | 0.9em | Text-top | a/b format |
| Symbol + Any + Any | Unicode | Inherit | Baseline | Text |
| Error + Any + Any | Code style | Inherit | Baseline | Raw LaTeX |

### 10.36 Quote Component (Inline) Multi-Dimensional Matrix

**Base Behavior**: Inline quotations with citation

| Quote Type + Language + Device | Quote Marks | Citation Style | Font Style | Accessibility |
|--------------------------------|-------------|----------------|------------|---------------|
| Short + English + Any | Curly quotes | — Author | Italic | With cite attribute |
| Foreign + Non-English + Any | Language-specific | (Author) | Normal + mark | Lang attribute |
| Nested + Any + Any | Single inside double | Inline | Inherit | Proper nesting |
| Pull quote + Article + Desktop | Large decorative | Block cite | Larger | Aside role |
| Inline + Any + Mobile | Simple quotes | Hidden | Italic | Semantic only |

### 10.37 List Item Component Multi-Dimensional Matrix

**Base Behavior**: Context-aware list items

| List Type + Nesting + Content | Marker Style | Spacing | Indent | Special |
|------------------------------|--------------|---------|--------|---------|
| Ordered + Level 1 + Any | Numbers | Standard | 0 | None |
| Unordered + Level 2 + Any | Circle | Reduced | 2rem | None |
| Ordered + Level 3+ + Any | Letters | Minimal | 4rem | None |
| Checklist + Any + Interactive | Checkbox | Standard | 0 | Clickable |
| Definition + Any + Any | None | Extended | 2rem | Term styling |

### 10.38 Audio Control Multi-Dimensional Matrix

**Base Behavior**: Individual audio control buttons

| Control Type + State + Device | Icon | Size | Feedback | Accessibility |
|-----------------------------|------|------|----------|---------------|
| Play + Paused + Desktop | Play triangle | 44px | Hover highlight | "Play audio" |
| Pause + Playing + Mobile | Pause bars | 48px | Touch ripple | "Pause audio" |
| Seek + Any + Touch | Slider | Full width | Drag handle | "Seek to time" |
| Volume + Muted + Any | Muted speaker | 36px | Click unmute | "Volume muted" |
| Speed + 1.5x + Any | 1.5x text | 36px | Menu | "Playback speed" |

### 10.39 Video Control Multi-Dimensional Matrix

**Base Behavior**: Video player control elements

| Control + Context + State | Display | Position | Auto-hide | Touch Target |
|--------------------------|---------|----------|-----------|--------------|
| Play + Overlay + Paused | Large center | Centered | No | 80px |
| Controls bar + Playing + Desktop | Bottom bar | Fixed bottom | After 3s | 40px |
| Fullscreen + Any + Mobile | Corner icon | Bottom right | With controls | 48px |
| Captions + Available + Any | CC icon | In bar | Never | 44px |
| Quality + Multiple + Any | Gear icon | In bar | Never | 44px |

### 10.40 Social Share Button Multi-Dimensional Matrix

**Base Behavior**: Individual social sharing buttons

| Platform + Intent + Position | Style | Behavior | Tracking | Mobile |
|-----------------------------|-------|----------|----------|---------|
| Twitter + `engagement` + Sidebar | Icon only | New window | Share event | Hidden |
| LinkedIn + `trust-building` + Bottom | Icon + text | Native app | Professional share | Compact |
| Email + Any + Article end | Text link | Mail client | Email share | Full |
| Copy link + Any + Anywhere | Icon + tooltip | Clipboard | Copy event | Available |
| WhatsApp + `engagement` + Mobile | Icon only | App deep link | Mobile share | Prominent |

### 10.41 Social Discuss Link Multi-Dimensional Matrix

**Base Behavior**: Individual discussion platform links

| Platform + Has Thread + Device | Display Style | Icon | Text | Priority |
|-------------------------------|---------------|------|------|----------|
| GitHub Issue + Open + Desktop | Card style | GitHub | "Discuss on GitHub" | High |
| Twitter Thread + Active + Mobile | Compact | Twitter | "Join discussion" | Medium |
| Reddit + New + Any | Standard link | Reddit | "Discuss on Reddit" | Low |
| LinkedIn + Professional + Any | Enhanced | LinkedIn | "Professional discussion" | Medium |
| None + No links + Any | Hidden | n/a | n/a | n/a |

### 10.42 Math Block Multi-Dimensional Matrix

**Base Behavior**: Display mathematical expressions

| Math Type + Device + Context | Render Engine | Numbering | Controls | Overflow |
|-----------------------------|---------------|-----------|----------|----------|
| Equation + Desktop + Article | KaTeX | Auto (1), (2) | Copy LaTeX | Scroll |
| Proof + Any + Academic | KaTeX | None | None | Wrap |
| Matrix + Mobile + Any | Simplified | None | Zoom | Horizontal scroll |
| Complex + Print + Any | Static SVG | By request | None | Scale down |
| Error + Any + Any | Code block | n/a | Show source | Standard |

### 10.43 Table Row Multi-Dimensional Matrix

**Base Behavior**: Responsive table rows

| Row Type + Position + Device | Styling | Hover State | Selection | Mobile Display |
|-----------------------------|---------|-------------|-----------|----------------|
| Header + First + Desktop | Accent bg | None | None | Sticky header |
| Data + Even + Desktop | Striped | Highlight | Click to select | Standard |
| Data + Odd + Mobile | White | Touch highlight | Long press | Card view |
| Footer + Last + Any | Border top | None | None | Summary style |
| Expandable + Any + Any | Chevron icon | Rotate icon | Click toggle | Accordion |

### 10.44 List Component Multi-Dimensional Matrix

**Base Behavior**: Complete list structures

| List Type + Content + Nesting | Container Style | Item Spacing | Markers | Mobile |
|-------------------------------|-----------------|--------------|---------|---------|
| Ordered + Steps + None | Number bubbles | Extended | Large numbers | Same |
| Unordered + Features + 1 level | Clean bullets | Standard | Custom icon | Same |
| Mixed + Nested + 3 levels | Indented | Compressed | Varied | Simplified |
| Definition + Terms + None | Grid layout | Generous | Bold terms | Stack |
| Task + Checklist + None | Card style | Medium | Checkboxes | Touch friendly |

### 10.45 Footnote Component Multi-Dimensional Matrix

**Base Behavior**: Footnote references and content

| Type + Position + Device | Number Style | Link Behavior | Return Link | Display |
|-------------------------|--------------|---------------|-------------|---------|
| Reference + Inline + Desktop | Superscript [1] | Smooth scroll | ↩ icon | Tooltip preview |
| Content + Footer + Desktop | [1] prefix | Highlight target | Each note | Block |
| Reference + Inline + Mobile | [1] normal | Jump to bottom | n/a | Tap to preview |
| Content + Footer + Mobile | 1. prefix | Highlight | Single return | Collapsed |
| Sidenote + Margin + Desktop | * | No scroll | None | Margin note |

### 10.46 Quirky Message Multi-Dimensional Matrix

**Base Behavior**: Personality-driven error and empty states

| Error Type + Brand Voice + Device | Message Style | Illustration | Actions | Animation |
|-----------------------------------|---------------|--------------|---------|-----------|
| 404 + Playful + Desktop | Large quirky text | Animated icon | Home, Projects | Bounce |
| 403 + Professional + Any | Apologetic | Static icon | Contact, Back | None |
| 500 + Technical + Mobile | Dev humor | ASCII art | Reload, Report | Glitch |
| Empty + Encouraging + Any | Motivational | Subtle graphic | Browse, Wait | Fade |
| Offline + Helpful + Any | Practical | Connection icon | Retry, Cache | Pulse |

### 10.47 Project Chip Multi-Dimensional Matrix

**Base Behavior**: Project reference chips in articles

| Project State + Context + Click | Visual Style | Icon Display | Hover | Navigation |
|--------------------------------|--------------|--------------|-------|------------|
| Active project + Article + Yes | Accent border | Project icon | Lift | Project page |
| Archived + Anywhere + No | Muted style | None | Tooltip | None |
| External + Reference + Yes | Dashed border | External | Underline | New tab |
| Related + Sidebar + Yes | Filled bg | Small icon | Glow | Smooth scroll |
| Featured + Hero + Yes | Large style | Prominent | Pulse | Direct link |

### 10.48 Domain Chip Multi-Dimensional Matrix

**Base Behavior**: Cross-domain indicators

| Domain Type + Current Domain + State | Style | Text | Icon | Behavior |
|-------------------------------------|-------|------|------|----------|
| Current + Same + Any | Hidden | n/a | n/a | n/a |
| Primary + Different + Active | Accent fill | Domain name | Home | Navigate |
| Cross-post + Other + Any | Ghost style | "Also on [domain]" | Link | New tab |
| Canonical + Source + Any | Bold border | "Original" | Star | Tooltip |
| Ecosystem + Related + Any | Minimal | Short name | None | Quick switch |

### 10.49 CTA Button Multi-Dimensional Matrix

**Base Behavior**: High-intent call-to-action buttons

| Priority + Journey Stage + Position | Visual Weight | Animation | Size | Tracking |
|------------------------------------|---------------|-----------|------|----------|
| High + `decision` + Hero | Primary large | Pulse | XL | Full funnel |
| Medium + `evaluation` + Article end | Primary | Hover glow | L | Engagement |
| Low + `discovery` + Sidebar | Secondary | None | M | Interest |
| Urgent + `action` + Modal | Danger style | Shake | L | Conversion |
| Soft + `retention` + Footer | Ghost | None | S | Retention |

### 10.50 Sponsor Option Multi-Dimensional Matrix

**Base Behavior**: Individual sponsorship options

| Platform + Availability + Context | Display Style | Icon Size | Text | Action |
|----------------------------------|---------------|-----------|------|--------|
| PayPal + Active + Primary | Card with border | Large | "Support via PayPal" | Popup |
| GitHub + Active + Developer | Dev-friendly | Medium | "Sponsor on GitHub" | External |
| Content + Active + Creator | Creative style | Large | "Buy me content time" | Form |
| Disabled + Unavailable + Any | Grayed out | Small | "Coming soon" | Tooltip |
| Custom + Enterprise + Any | Branded | Custom | Custom CTA | Contact |

### 10.51 Metadata Item Multi-Dimensional Matrix

**Base Behavior**: Article metadata display

| Metadata Type + Device + Priority | Display Style | Icon | Order | Visibility |
|----------------------------------|---------------|------|-------|------------|
| Date + Desktop + High | Full format | Calendar | 1 | Always |
| Author + Desktop + Medium | Name + avatar | Person | 2 | Always |
| Reading time + Mobile + Low | Short form | Clock | 3 | Hidden |
| Tags + Any + Medium | Chip style | Tag | 4 | Truncate |
| Updated + Any + Low | Relative time | Refresh | Last | On hover |

### 10.52 Social Links Organism Multi-Dimensional Matrix

**Base Behavior**: Complete social links section

| Page Context + Platform Count + Device | Layout | Style | Heading | Spacing |
|----------------------------------------|--------|-------|---------|---------|
| Contact + All platforms + Desktop | Grid 4 cols | Cards | "Connect" | Generous |
| Footer + Essential only + Mobile | Horizontal | Icons only | None | Compact |
| About + Professional + Any | List | Icon + text | "Find me" | Standard |
| Sidebar + Top 3 + Desktop | Vertical | Minimal | "Social" | Tight |
| Empty + None + Any | Hidden | n/a | n/a | n/a |

### 10.53 Article Grid Multi-Dimensional Matrix

**Base Behavior**: Article listing grid

| Page Type + Article Count + Device | Grid Layout | Card Style | Metadata | Load More |
|-----------------------------------|-------------|------------|----------|-----------|
| Index + Many + Desktop | 3 column | Full card | Complete | Pagination |
| Tag page + Few + Mobile | 1 column | Compact | Minimal | Hidden |
| Tag + Medium + Tablet | 2 column | Standard | Date + tags | Button |
| Filtered + Results + Any | List view | Extended | Highlighted | Button |
| Empty + None + Any | Empty state | n/a | n/a | n/a |

### 10.54 Latest Article Multi-Dimensional Matrix

**Base Behavior**: Featured latest article display

| Position + Content Type + Device | Display Style | Image | Metadata | CTA |
|----------------------------------|---------------|-------|----------|-----|
| Homepage hero + Long-form + Desktop | Full width card | Large hero | Full details | Read more |
| Sidebar + Any + Mobile | Compact card | Thumbnail | Title + date | Arrow |
| Footer + Technical + Any | Text only | None | Title only | Link |
| Modal + Featured + Tablet | Overlay card | Medium | Excerpt | Prominent |
| Empty + None + Any | Placeholder | Generic | Coming soon | Subscribe |

### 10.55 Index List Multi-Dimensional Matrix

**Base Behavior**: Article index listings

| Sort Order + Filters + Device | List Style | Grouping | Controls | Density |
|-------------------------------|------------|----------|----------|---------|
| Chronological + None + Desktop | Clean list | By month | None | Normal |
| Tags + Active + Mobile | Grouped cards | By tag | Filter chips | Compact |
| Popular + Analytics + Any | Numbered list | None | Sort dropdown | Normal |
| Alphabetical + All + Desktop | Dense list | By letter | Jump links | High |
| Custom + Multiple + Tablet | Flexible | Dynamic | Advanced | Variable |

### 10.56 Google Appointment Multi-Dimensional Matrix

**Base Behavior**: Appointment booking integration

| Device + Network + User State | Display Mode | Loading | Fallback | Analytics |
|-------------------------------|--------------|---------|----------|-----------|
| Desktop + Fast + New | Full iframe | Smooth | None | Embed view |
| Mobile + Any + Return | Button link | Instant | External link | Click to book |
| Tablet + Slow + Any | Lazy iframe | Skeleton | Button | Delayed load |
| Any + Offline + Any | Button only | None | Contact form | Offline attempt |
| Blocked + Any + Any | Alternatives | None | Email + phone | Blocked view |

### 10.57 Visualization Background Multi-Dimensional Matrix

**Base Behavior**: Dynamic background visualizations

| Page Type + Performance Mode + Device | Animation Type | Complexity | Interaction | Fallback |
|---------------------------------------|----------------|------------|-------------|----------|
| Homepage + Quality + Desktop | WebGL particles | High | Mouse parallax | Static gradient |
| Article + Balanced + Mobile | CSS animations | Low | None | Subtle gradient |
| Project + Economy + Any | Static SVG | None | None | Solid color |
| Loading + Any + Any | Skeleton pulse | Minimal | None | Gray |
| Error + Any + Desktop | Glitch effect | Medium | None | Pattern |

### 10.58 Table of Contents (Organism) Multi-Dimensional Matrix

**Base Behavior**: Complete TOC with scroll spy

| Article Length + Device + Position | Display Style | Features | Behavior | Visibility |
|-----------------------------------|---------------|----------|----------|------------|
| Long + Desktop + Sidebar | Sticky sidebar | Full tree + spy | Smooth scroll | Always |
| Medium + Tablet + Top | Collapsible | 2 levels | Jump | Toggle |
| Short + Any + Any | Hidden | n/a | n/a | n/a |
| Long + Mobile + Bottom | Fixed button | Overlay | Instant | On demand |
| Technical + Desktop + Right | Floating | Numbered | Highlight + scroll | Fade on scroll |

### 10.59 Consent Banner Multi-Dimensional Matrix

**Base Behavior**: GDPR/CCPA compliance banner

| Region + Visit Type + Previous Choice | Display Style | Position | Options | Persistence |
|---------------------------------------|---------------|----------|---------|-------------|
| EU + First + None | Full modal | Center overlay | Granular | Required |
| US + First + None | Bottom bar | Fixed bottom | Simple | Required |
| EU + Return + Accepted | Hidden | n/a | Settings link | Stored |
| Any + Rejected + Any | Minimal bar | Top | Reconsider | Reminder |
| Non-regulated + Any + Any | Hidden | n/a | Footer link | Optional |

## 11. Empty State Configurations

### 11.1 Empty State Messages

| Context | Message | Link Text | Link Target | Mobile Behavior |
|---------|---------|-----------|-------------|-----------------|
| `projects-no-items` | "It's quiet here. With due time in this space, something might manifest soon. How about you consume some of these [link] in the meanwhile..." | `thoughts` | `blog.[domain].in` | Hide sponsor button |
| `project-no-articles` | "No thoughts on this yet. While we work on content for this project, explore some other [link] in the meanwhile..." | `thoughts` | `blog.[domain].in` | Standard |
| `blog-no-posts` | "Starting fresh. New thoughts coming soon. Check back later or [link]..." | `connect with us` | `[domain].in/contact` | Standard |
| `search-no-results` | "Nothing found for that search. Try different keywords or browse our [link]..." | `latest thoughts` | `blog.[domain].in` | Standard |

### 11.2 Empty State Button Behavior

| Page Type | Has Content Buttons | Empty State Buttons | Mobile Difference |
|-----------|------------------|------------------|-------------------|
| `/projects` | `Sponsor`, `Connect` | `Connect` only | Same |
| `/[project]` | None | None | None |
| `blog index` | Standard nav | Standard nav | Same |

## 12. Navigation Variant Patterns

### 12.1 URL Pattern to Navigation Mappings

| URL Pattern | Navigation Variant | Left Items | Right Items | Mobile Menu |
|-------------|-------------------|------------|-------------|-------------|
| `/sponsor` | `sponsor` | `Back` | `About` | Hamburger |
| `/[project]/docs/*` | `docs` | `Home`, `[project-name]` | `Thoughts`, `Sponsor` | Hamburger |
| `/[project]/*` | `project` | `Home`, `Projects` | `Docs` (if enabled), `Thoughts`, `Sponsor` | Hamburger |
| `blog.*` | `blog` | `Home` → `[domain].in` | `Thoughts`, `Highlights`, `Connect` | Hamburger |
| `/contact` | `domain` | `Home` | `About` | Hamburger |
| `/about` | `domain` | `Home` | `About` | Hamburger |
| `/` | `domain` | `Home` | `About` | Hamburger |

### 12.2 Navigation Item Resolution

| Item | Link Target | Condition | Text |
|------|-------------|-----------|------|
| `Home` | `[domain].in` | Always | "Home" |
| `Projects` | `[domain].in/projects` | Project pages only | "Projects" |
| `[project-name]` | `[domain].in/[project]` | Docs pages only | Project name |
| `Docs` | `[domain].in/[project]/docs/` | If `docs_enabled: true` | "Docs" |
| `Thoughts` | `blog.[domain].in` | Blog nav only | "Thoughts" |
| `Highlights` | `[domain].in/projects` | Blog nav only | "Highlights" |
| `Connect` | `[domain].in/contact` | Various | "Connect" |
| `Sponsor` | `[domain].in/sponsor` | Project/docs pages | "Sponsor" |
| `About` | `[domain].in/about` | Domain pages | "About" |
| `Back` | `history.back()` | Sponsor page only | "Back" |

### 12.3 Mobile Navigation Adaptations

All navigation variants collapse to hamburger menu on mobile with same items but in vertical layout. Special cases:
- Sponsor page: "Back" remains visible outside hamburger
- Blog pages: Current section highlighted in mobile menu