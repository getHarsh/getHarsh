# Context Detection Reference

## Overview
This document contains all detection algorithms, patterns, and rules used by the Context Engine to analyze and classify content, URLs, user journeys, and technical aspects.

## Table of Contents
1. Content Detection Patterns
2. URL and Link Detection  
3. Technical Level Detection
4. Journey Stage Detection
5. Business Context Detection
6. Technology Stack Detection
7. Navigation Variant Detection
8. Evidence Calculation Methods

## 1. Content Detection Patterns

### 1.1 Content Structure Detection

| Keywords | Structure Type | Schema Type | ARIA Label | Analytics Category | Evidence Source |
|----------|----------------|-------------|------------|-------------------|-----------------|
| `step, first, then, next, finally, follow, instructions` | `tutorial` | `HowTo` | `Step-by-step tutorial` | `tutorial` | See 1.3 |
| `guide, learn, understand, introduction, basics, overview` | `guide` | `Guide` | `Educational guide` | `education` | See 1.3 |
| `api, method, function, parameter, returns, documentation` | `reference` | `TechArticle` | `Technical reference` | `documentation` | See 1.3 |
| `project, built, created, developed, features, showcase` | `showcase` | `CreativeWork` | `Project showcase` | `portfolio` | See 1.3 |
| `thoughts, opinion, experience, learned, story, journey` | `blog` | `BlogPosting` | `Blog article` | `blog` | See 1.3 |

### 1.2 Content Type Detection Priority

1. **Frontmatter** (highest priority) - Explicit declarations from author
2. **Layout** - Check `pageData.layout` against known layouts
3. **Type** - Check `pageData.type` field
4. **Category** - Check `pageData.category` field
5. **URL Pattern** - Check URL for `/blog/`, `/projects/`, `/docs/`
6. **Component Validation** (lowest priority) - Validate via content analysis

### 1.3 Signal Hierarchy & Evidence Calculation

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

### 1.4 Content Intent Pattern Matching

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

**Method Implementation**: The `detectContentType(pageData)` method implements these detection patterns following the priority order in Section 1.2 and evidence calculation in Section 1.3.

## 2. URL and Link Detection

### 2.1 File Type Detection

| Extension | Label | ARIA Suffix | Icon | Category |
|-----------|-------|-------------|------|----------|
| `.pdf` | `PDF document` | `, PDF document` | `file-pdf` | `document` |
| `.doc`, `.docx` | `Word document` | `, Word document` | `file-word` | `document` |
| `.xls`, `.xlsx` | `Excel spreadsheet` | `, Excel spreadsheet` | `file-excel` | `spreadsheet` |
| `.ppt`, `.pptx` | `PowerPoint presentation` | `, PowerPoint presentation` | `file-powerpoint` | `presentation` |
| `.zip`, `.rar` | `Archive file` | `, compressed archive` | `file-archive` | `archive` |
| `.mp4`, `.avi` | `Video file` | `, video file` | `file-video` | `media` |
| `.mp3`, `.wav` | `Audio file` | `, audio file` | `file-audio` | `media` |
| `.jpg`, `.png`, `.gif` | `Image` | `, image file` | `file-image` | `image` |

### 2.2 URL Pattern Detection

| URL Pattern | Type | Label | ARIA Suffix | Icon | Priority |
|-------------|------|-------|-------------|------|----------|
| `docs.google.com/spreadsheets` | `google-sheet` | `Google Sheet` | `, Google Sheets document` | `file-spreadsheet` | 1 |
| `docs.google.com/document` | `google-doc` | `Google Doc` | `, Google Docs document` | `file-text` | 1 |
| `docs.google.com/presentation` | `google-slide` | `Google Slides` | `, Google Slides presentation` | `file-presentation` | 1 |
| `drive.google.com/drive/folders` | `google-folder` | `Google Drive folder` | `, Google Drive folder` | `folder-open` | 1 |
| `github.com/[user]/[repo]/blob/` | `github-file` | `GitHub file` | `, file on GitHub` | `github` | 2 |
| `github.com/[user]/[repo]/tree/` | `github-folder` | `GitHub folder` | `, folder on GitHub` | `github` | 2 |
| `github.com/[user]/[repo]` | `github-repo` | `GitHub repository` | `, GitHub repository` | `github` | 3 |
| File extension detected | (from 6.1) | (from 6.1) | (from 6.1) | (from 6.1) | 4 |
| Current domain (from config) | `internal-link` | `Internal link` | `, internal page` | `internal-link` | 5 |
| Ecosystem domain (from config) | `ecosystem-link` | `Ecosystem link` | `, link within ecosystem` | `ecosystem-link` | 6 |
| (no pattern match) | `external-link` | `External link` | `, external link` | `external-link` | 7 |

**Context Engine Detection Rules**:
1. Context Engine checks URL patterns in priority order
2. If no URL pattern matches, Context Engine checks file extension
3. Context Engine checks if link is to current domain (internal)
4. Context Engine checks if link is to ecosystem domain/subdomain (from config)
5. If no match, Context Engine provides generic external link type
6. Explicit type overrides Context Engine detection

**Component Behavior**: Components (like Smart Link) receive the detected type from Context Engine and apply appropriate styling/behavior. Components NEVER perform detection themselves.

**Ecosystem Detection**:
- Config provides list of ecosystem domains/subdomains
- Internal: Same domain as current site
- Ecosystem: Different domain but in ecosystem list
- External: Not in ecosystem

**Method Implementations**:
- `detectFileType(href)`: Extracts file extension from URL and maps to file type using the table in Section 2.1
- `isExternal(href)`: Checks if URL is absolute and compares domain with current domain from config

## 3. Technical Level Detection

| Indicators | Level | Complexity Score | Target Audience | Content Depth |
|------------|-------|------------------|-----------------|---------------|
| Tags: `advanced`, `expert`, `complex` | `advanced` | 3 | `senior-developers` | `deep` |
| Tags: `intermediate`, `moderate` | `intermediate` | 2 | `developers` | `moderate` |
| Tags: `beginner`, `basic`, `intro` | `beginner` | 1 | `new-developers` | `surface` |
| (no indicators) | `general` | 1 | `general-audience` | `balanced` |

**Method Implementation**: The `detectTechnicalLevel(pageData)` method implements these detection rules by checking tags and other indicators in the pageData.

## 4. Journey Stage Detection

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

**Method Implementation**: The `identifyJourneyStageDeterministically()` method maps content types and URLs to journey stages using the evidence table above. It returns a structure with stage, confidence, signals, analyticsValue, and ariaLabel.

## 5. Business Context Detection

### 5.1 Lead Type Classification

**Evidence Combination**: Multiple signals combine using `total_evidence = √(e1² + e2² + ...)`

| Indicators | Lead Type | Base Evidence | Analytics Label | Schema Type | ARIA Label |
|------------|-----------|---------------|-----------------|-------------|------------|
| Layout: `contact` | `direct_lead` | 1.0 | `direct_contact_lead` | `ContactPage` | `Direct contact form` |
| Content: `project` | `portfolio_lead` | 0.6 | `portfolio_viewer` | `CreativeWork` | `Project portfolio showcase` |
| Tutorial + Advanced level | `educational_lead` | 0.5 | `educational_consumer` | `LearningResource` | `Educational content` |
| Blog + Technical content | `content_lead` | 0.4 | `content_consumer` | `BlogPosting` | `Technical blog content` |
| (default) | `general_lead` | 0.1 | `general_visitor` | `WebPage` | `General content` |

**Method Implementation**: The `classifyLeadTypeDeterministically()` method analyzes content type, layout, and technical level to classify leads using the evidence combination formula above. It maps these signals to lead types with associated analytics labels and schema types.

## 6. Technology Stack Detection

**Principle**: Technology detection uses configured declarations as ground truth, validated by code usage

**Technology Evidence Sources** (in priority order):

| Source | Evidence Weight | Validation Method |
|--------|-----------------|-------------------|
| Frontmatter `tech_stack` | 0.8 | Explicitly declared |
| Frontmatter `tools_stack` | 0.8 | Explicitly declared |
| Project config `tech_stack` | 0.8 | Project-level declaration |
| Project config `tools` | 0.8 | Project-level declaration |
| Frontmatter `tags` | 0.5 | Author categorization |
| Code block languages | 0.3 | Actual usage validation |
| Import statements | 0.2 | Direct dependencies |
| Title/HERO mentions | 0.2 | Primary focus |
| Heading mentions | 0.15 | Section topics |
| Body text | 0.05 | Context validation only |

**Technology Validation Process**:

1. **Primary Source**: Read declared `tech_stack` and `tools_stack` from frontmatter/config
2. **Dynamic Detection**: For each declared technology, validate its actual usage
3. **Confidence Calculation**: Evidence = declaration weight + usage validation
4. **No Hardcoded Patterns**: System adapts to whatever technologies are declared

**Dynamic Technology Validation Algorithm**:

```javascript
// Example: If config declares tech_stack: [React, TypeScript, Node.js]
for each tech in declared_tech_stack:
    base_evidence = 0.8  // Declared in config
    
    // Validate usage dynamically
    if (code_blocks.any(block => block.language === tech.toLowerCase())):
        base_evidence += 0.3
    
    if (content.includes(tech) in headings):
        base_evidence += 0.2
    
    if (imports/patterns match tech conventions):
        base_evidence += 0.2
    
    tech_confidence[tech] = 1 - e^(-0.5 * base_evidence)
```

**Benefits of Dynamic Detection**:
- **Scalable**: Works with any technology stack without code changes
- **Accurate**: Ground truth comes from explicit declarations
- **Flexible**: New technologies automatically supported
- **Validated**: Usage patterns confirm declarations

**Negative Pattern Detection** (applies to any declared technology):

| Pattern Template | Impact | Dynamic Example |
|-----------------|--------|-----------------|
| "migrating from {tech}" | 0.3x multiplier | If tech_stack has Vue, "migrating from Vue" reduces confidence |
| "not using {tech}" | 0.2x multiplier | If tech_stack has React, "not using React" signals mismatch |
| "replacing {tech}" | 0.3x multiplier | If tools_stack has Docker, "replacing Docker" reduces confidence |
| "{tech} alternative" | 0.4x multiplier | If declared Kubernetes, "Kubernetes alternative" reduces confidence |

**Note**: {tech} is dynamically replaced with each technology from tech_stack/tools_stack

[Additional technology detection methods from CONTEXT-ENGINE.md to be moved here]

## 7. Navigation Variant Detection
**Navigation Variant Detection Rules**:

The `detectNavigationVariant(processedConfig, pageData)` method determines the navigation variant based on URL patterns and repository context:

| URL Pattern | Repository Context | Navigation Variant | Priority |
|-------------|-------------------|-------------------|----------|
| `/sponsor` | any | `sponsor` | 1 (highest) |
| `/docs/` | any | `docs` | 2 |
| `/[project-slug]/` | any | `project` | 3 |
| any | `blog` | `blog` | 4 |
| any | `domain` | `domain` | 5 (default) |

**Implementation Logic**:
1. Check URL patterns in priority order
2. For project detection, check if path matches any project slug from config
3. Fall back to repository context
4. Default to 'domain' navigation

**Method Implementation**: The navigation variant detection follows these priority rules to determine which navigation component variant to use.

## 8. Evidence Calculation Methods

### 8.1 Component Property Feeding

**How Components Provide Signals to Context Engine**:

| Component | Properties Provided | Usage in Classification |
|-----------|-------------------|------------------------|
| **Heading** | `level`, `text`, `id` | TF-IDF weighting, structure validation |
| **Code Block** | `language`, `filename`, `content` | Technology detection, usage patterns |
| **Smart Link** | `type`, `url`, `text` | External references, documentation links |
| **Project Chip** | `project`, `relationship` | Domain expertise, project connections |
| **Social Share** | `platforms`, `position` | Engagement intent validation |
| **Table** | `headers`, `row_count` | Reference/comparison detection |
| **Mermaid** | `type`, `nodes` | Architecture/flow content |
| **Math Block** | `notation`, `complexity` | Academic/technical depth |
| **TOC** | `heading_count`, `depth` | Document structure, comprehensiveness |

**Component Aggregation Example**:
```
Article with:
- 5 Code blocks (language="python") → Strong Python signal
- 3 H2s with "Step N:" pattern → Tutorial structure confirmed
- Project chips for "HENA", "JARVIS" → Domain expertise
- Math blocks present → Technical depth
- TOC with 3 levels → Comprehensive guide

Result: High confidence in technical tutorial classification
```

### 8.2 Dynamic Technical Term Detection

**Technical Term Recognition**: Dynamically generated from configured tech_stack and tools_stack

Instead of hardcoded patterns, technical terms are recognized based on:
1. Technologies declared in `tech_stack` and `tools_stack` from frontmatter/config
2. Dynamic pattern generation: For each declared technology, create detection patterns
3. Example: If `tech_stack: [React, TypeScript]`, the system generates patterns to detect "React", "useState", "TypeScript", "interface", etc.

**Method Implementation**: The `countTechnicalTerms()` method should use the declared technologies from config to dynamically build detection patterns, ensuring consistency with the configuration-driven approach.

**Cross-Reference**: For the complete evidence calculation formula and methodology, see Section 1.3: Signal Hierarchy & Evidence Calculation.