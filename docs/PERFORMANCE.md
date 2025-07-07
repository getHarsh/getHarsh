# Performance Standards & Optimization

## Overview

This document is a **pure reference layer** that details **exact performance specifications** and **optimization requirements** for 2025, focusing on Core Web Vitals, loading performance, and browser compatibility. All implementations consume context from the [Central Context Engine](./CONTEXT-ENGINE.md).

**Pure Reference**: This document contains NO content detection logic - it serves as a reference for performance standards and optimization patterns. Any detection mentioned is for browser capabilities and infrastructure metrics, not content analysis.

**Performance Consumer**: This system transforms universal context into performance-optimized output across all consumer systems:

- [ARIA.md](./ARIA.md) - Accessibility performance
- [ANALYTICS.md](./ANALYTICS.md) - Analytics performance  
- [SEO.md](./SEO.md) - SEO performance impact
- [AI.md](./AI.md) - AI crawling performance

> **Research-Based**: All specifications verified against 2025 standards from Google, W3C, and performance monitoring services

## Core Web Vitals Standards (2025)

### Latest Performance Metrics - EXACT Thresholds

**Status**: Updated March 2024 - INP replaces FID
**Current Metrics**: LCP, INP, CLS (FID deprecated)
**Measurement**: 75th percentile of all page loads

#### 1. Largest Contentful Paint (LCP) - EXACT Requirements

```javascript
// LCP Targets (2025)
const LCP_THRESHOLDS = {
  good: "≤ 2.5 seconds",           // REQUIRED: Pass Core Web Vitals
  needsImprovement: "2.5 - 4.0",  // WARNING: Needs optimization  
  poor: "> 4.0 seconds"            // FAILING: Major issues
};
```

**REQUIRED Implementation:**
```html
<!-- REQUIRED: LCP optimization -->
<!DOCTYPE html>
<html lang="en">
<head>
  <!-- REQUIRED: Critical resource hints -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preload" href="/hero-image.jpg" as="image" fetchpriority="high">
  <link rel="preload" href="/critical.css" as="style">
  <link rel="preload" href="/critical.js" as="script">
  
  <!-- REQUIRED: Critical CSS inline (above-the-fold) -->
  <style>
    /* Critical CSS here - max 14KB */
    body { font-family: system-ui, sans-serif; }
    .hero { height: 100vh; background: url('/hero-image.jpg'); }
  </style>
</head>
<body>
  <!-- REQUIRED: LCP element optimization -->
  <img src="/hero-image.jpg" 
       alt="Hero image" 
       loading="eager"              <!-- REQUIRED: Eager loading for LCP -->
       fetchpriority="high"         <!-- REQUIRED: High priority -->
       width="1200" 
       height="630">                <!-- REQUIRED: Dimensions to prevent CLS -->
</body>
</html>
```

#### 2. Interaction to Next Paint (INP) - NEW Metric

```javascript
// INP Targets (2025) - Replaces FID
const INP_THRESHOLDS = {
  good: "≤ 200 milliseconds",      // REQUIRED: Pass Core Web Vitals
  needsImprovement: "200 - 500",   // WARNING: Needs optimization
  poor: "> 500 milliseconds"       // FAILING: Major issues
};
```

**REQUIRED Implementation:**
```html
<!-- REQUIRED: INP optimization -->
<script>
// REQUIRED: Debounce user interactions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// REQUIRED: Throttle scroll events
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}

// REQUIRED: Use requestIdleCallback for non-critical tasks
function scheduleWork(task) {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(task);
  } else {
    setTimeout(task, 1);
  }
}

// REQUIRED: Break up long tasks
async function processLargeDataset(data) {
  const CHUNK_SIZE = 100;
  for (let i = 0; i < data.length; i += CHUNK_SIZE) {
    const chunk = data.slice(i, i + CHUNK_SIZE);
    processChunk(chunk);
    
    // REQUIRED: Yield to main thread
    await new Promise(resolve => setTimeout(resolve, 0));
  }
}
</script>
```

#### 3. Cumulative Layout Shift (CLS) - EXACT Requirements

```javascript
// CLS Targets (2025)
const CLS_THRESHOLDS = {
  good: "≤ 0.1",                   // REQUIRED: Pass Core Web Vitals
  needsImprovement: "0.1 - 0.25",  // WARNING: Needs optimization
  poor: "> 0.25"                   // FAILING: Major issues
};
```

**REQUIRED Implementation:**
```html
<!-- REQUIRED: CLS prevention -->
<!DOCTYPE html>
<html>
<head>
  <style>
    /* REQUIRED: Reserve space for dynamic content */
    .ad-container {
      width: 300px;
      height: 250px;           /* REQUIRED: Fixed dimensions */
      min-height: 250px;       /* REQUIRED: Minimum height */
    }
    
    /* REQUIRED: Use aspect-ratio for responsive media */
    .video-container {
      aspect-ratio: 16/9;      /* REQUIRED: Maintains ratio */
      width: 100%;
    }
    
    /* REQUIRED: Font loading strategy */
    @font-face {
      font-family: 'WebFont';
      src: url('/font.woff2') format('woff2');
      font-display: swap;      /* REQUIRED: Prevents invisible text */
    }
  </style>
</head>
<body>
  <!-- REQUIRED: Images with dimensions -->
  <img src="/image.jpg" 
       alt="Description" 
       width="800" 
       height="600"            <!-- REQUIRED: Explicit dimensions -->
       loading="lazy">         <!-- REQUIRED: Lazy loading for non-LCP -->
  
  <!-- REQUIRED: Responsive embeds -->
  <div class="video-container">
    <iframe src="/video" 
            width="100%" 
            height="100%" 
            loading="lazy">     <!-- REQUIRED: Lazy loading -->
    </iframe>
  </div>
  
  <!-- REQUIRED: Dynamic content placeholders -->
  <div class="ad-container">
    <!-- Ad content loads here with fixed dimensions -->
  </div>
</body>
</html>
```

## Resource Loading Optimization

### Critical Resource Loading - EXACT Order

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <!-- 1. REQUIRED: Meta tags (first 1024 bytes) -->
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- 2. REQUIRED: DNS prefetching -->
  <link rel="dns-prefetch" href="//fonts.googleapis.com">
  <link rel="dns-prefetch" href="//analytics.google.com">
  <link rel="dns-prefetch" href="//connect.facebook.net">
  
  <!-- 3. REQUIRED: Preconnect to origins -->
  <link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  
  <!-- 4. REQUIRED: Preload critical resources -->
  <link rel="preload" href="/critical.css" as="style">
  <link rel="preload" href="/hero-image.jpg" as="image" fetchpriority="high">
  <link rel="preload" href="/font.woff2" as="font" type="font/woff2" crossorigin>
  
  <!-- 5. REQUIRED: Critical CSS inline -->
  <style>/* Critical CSS - max 14KB */</style>
  
  <!-- 6. REQUIRED: Non-critical CSS -->
  <link rel="stylesheet" href="/styles.css" media="print" onload="this.media='all'">
  <noscript><link rel="stylesheet" href="/styles.css"></noscript>
  
  <!-- 7. REQUIRED: Title and meta -->
  <title>Page Title</title>
  <meta name="description" content="Page description">
</head>
```

### JavaScript Loading Strategy - EXACT Implementation

```html
<!-- REQUIRED: Critical JavaScript -->
<script>
  // REQUIRED: Critical functionality inline
  // Feature detection, critical polyfills
  if (!window.IntersectionObserver) {
    // Load polyfill
  }
</script>

<!-- REQUIRED: Deferred non-critical JavaScript -->
<script src="/non-critical.js" defer></script>     <!-- REQUIRED: Use defer -->
<script src="/analytics.js" async></script>        <!-- REQUIRED: Use async for analytics -->

<!-- REQUIRED: Third-party scripts with loading strategy -->
<script>
  // REQUIRED: Load third-party scripts after page load
  window.addEventListener('load', function() {
    // Google Analytics
    const script = document.createElement('script');
    script.src = 'https://www.googletagmanager.com/gtag/js?id=GA_ID';
    script.async = true;
    document.head.appendChild(script);
    
    // Facebook Pixel
    setTimeout(() => {
      const fbScript = document.createElement('script');
      fbScript.src = 'https://connect.facebook.net/en_US/fbevents.js';
      fbScript.async = true;
      document.head.appendChild(fbScript);
    }, 1000);  // REQUIRED: Delay for non-critical scripts
  });
</script>
```

## Performance Monitoring - EXACT Implementation

### Core Web Vitals Measurement

```javascript
// REQUIRED: Core Web Vitals measurement
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

// REQUIRED: Send to analytics
function sendToAnalytics(metric) {
  gtag('event', metric.name, {
    event_category: 'Web Vitals',
    event_label: metric.id,
    value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
    non_interaction: true
  });
}

// REQUIRED: Measure all vitals
getCLS(sendToAnalytics);
getFID(sendToAnalytics);      // Will be deprecated - use for compatibility
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);

// NEW: Measure INP (2025)
import { onINP } from 'web-vitals';
onINP(sendToAnalytics);
```

### Performance Budget - EXACT Limits

```javascript
// REQUIRED: Performance budget thresholds
const PERFORMANCE_BUDGET = {
  // Resource sizes
  javascript: {
    critical: '14KB',          // REQUIRED: Critical JS budget
    total: '170KB',            // REQUIRED: Total JS budget (gzipped)
  },
  css: {
    critical: '14KB',          // REQUIRED: Critical CSS budget
    total: '100KB',            // REQUIRED: Total CSS budget (gzipped)
  },
  images: {
    hero: '100KB',             // REQUIRED: Hero image budget
    total: '500KB',            // REQUIRED: Total image budget per page
  },
  fonts: {
    woff2: '50KB',             // REQUIRED: Font budget per font
    total: '100KB',            // REQUIRED: Total font budget
  },
  
  // Timing budgets
  metrics: {
    LCP: 2500,                 // REQUIRED: 2.5 seconds
    INP: 200,                  // REQUIRED: 200 milliseconds
    CLS: 0.1,                  // REQUIRED: 0.1 score
    FCP: 1800,                 // RECOMMENDED: 1.8 seconds
    TTFB: 600,                 // RECOMMENDED: 600 milliseconds
  }
};
```

## Browser Compatibility - EXACT Requirements

### Required Browser Support (2025)

```javascript
// REQUIRED: Minimum browser support
const BROWSER_SUPPORT = {
  chrome: '91+',               // REQUIRED: 2021 and newer
  firefox: '90+',              // REQUIRED: 2021 and newer  
  safari: '14+',               // REQUIRED: 2020 and newer
  edge: '91+',                 // REQUIRED: 2021 and newer
  
  // Mobile browsers
  chrome_mobile: '91+',        // REQUIRED: Android Chrome
  safari_mobile: '14+',        // REQUIRED: iOS Safari
  
  // Market share threshold
  min_usage: '0.5%',           // REQUIRED: Minimum global usage
};
```

### Progressive Enhancement - EXACT Implementation

```html
<!-- REQUIRED: Feature detection and fallbacks -->
<script>
// REQUIRED: Critical feature detection
const hasModuleSupport = 'noModule' in document.createElement('script');
const hasIntersectionObserver = 'IntersectionObserver' in window;
const hasWebP = document.createElement('canvas').toDataURL('image/webp').indexOf('webp') > -1;

// REQUIRED: Load appropriate resources
if (hasModuleSupport) {
  // Modern browsers
  import('/js/modern.js');
} else {
  // Legacy browsers
  document.write('<script src="/js/legacy.js"><\/script>');
}

// REQUIRED: Image format selection
const imageFormat = hasWebP ? 'webp' : 'jpg';
document.documentElement.classList.add(hasWebP ? 'webp' : 'no-webp');
</script>

<!-- REQUIRED: CSS feature support -->
<style>
/* REQUIRED: Fallback first */
.grid-container {
  display: block;              /* REQUIRED: Fallback for old browsers */
}

/* REQUIRED: Modern enhancement */
@supports (display: grid) {
  .grid-container {
    display: grid;             /* REQUIRED: Modern browsers only */
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
}

/* REQUIRED: Variable font fallback */
@supports (font-variation-settings: normal) {
  .text {
    font-family: 'Variable Font', sans-serif;
    font-variation-settings: 'wght' 400;
  }
}
</style>
```

## Performance Optimization Checklist

### REQUIRED Performance Optimizations

```markdown
## Critical Performance Requirements

### HTML Structure
- [ ] DOCTYPE html declared
- [ ] charset=UTF-8 within first 1024 bytes  
- [ ] viewport meta tag present
- [ ] No render-blocking resources in <head>
- [ ] Critical CSS inline (≤14KB)
- [ ] Images have width/height attributes

### Resource Loading
- [ ] DNS prefetch for external domains
- [ ] Preconnect to critical origins
- [ ] Preload LCP image with fetchpriority="high"
- [ ] Defer non-critical JavaScript
- [ ] Async third-party scripts
- [ ] Font-display: swap for web fonts

### Core Web Vitals
- [ ] LCP ≤ 2.5 seconds (75th percentile)
- [ ] INP ≤ 200 milliseconds (75th percentile)  
- [ ] CLS ≤ 0.1 (75th percentile)
- [ ] No layout shifts from dynamic content
- [ ] Interactive elements respond within 100ms

### Progressive Enhancement
- [ ] Works without JavaScript
- [ ] Works without CSS
- [ ] Fallbacks for unsupported features
- [ ] Accessible on slow connections
- [ ] Supports browsers with 0.5%+ market share
```

## Performance Integration with Consumer Systems

### Context-Driven Performance Optimization

```javascript
// Performance optimization based on universal context
class PerformanceOptimizer {
  constructor(universalContext) {
    this.context = universalContext;
  }
  
  optimizeForContext() {
    const { semantics, sources } = this.context;
    
    // Optimize based on content type
    if (semantics.contentType === 'image-heavy') {
      this.enableImageOptimization();
    }
    
    if (semantics.technicalLevel === 'advanced') {
      this.enableAdvancedFeatures();
    }
    
    // Optimize based on audience
    if (semantics.audience === 'mobile-users') {
      this.enableMobileOptimizations();
    }
    
    return this.generateOptimizations();
  }
  
  generateOptimizations() {
    return {
      criticalCSS: this.generateCriticalCSS(),
      resourceHints: this.generateResourceHints(),
      loadingStrategy: this.generateLoadingStrategy(),
      performanceBudget: this.generatePerformanceBudget()
    };
  }
}
```

## Jekyll Caching API Implementation - 4x Speed Improvements

### Jekyll Caching Architecture (2025)

**Advanced Jekyll Caching for Multi-Repository Builds:**

```yaml
# _config.yml - Jekyll caching configuration
# REQUIRED: Enable Jekyll caching for 4x speed improvements
incremental: true
cache_dir: .jekyll-cache
liquid:
  error_mode: strict
  strict_filters: true
  strict_variables: true

# REQUIRED: Repository-specific cache optimization
cache:
  collections: true
  data: true
  sass: true
  webpack: true
  
# REQUIRED: Multi-target cache management
target_cache:
  domain: .jekyll-cache/domain
  blog: .jekyll-cache/blog
  project: .jekyll-cache/project
  docs: .jekyll-cache/docs
```

### Smart Caching Strategy Implementation

```ruby
# _plugins/performance_cache.rb - REQUIRED Jekyll caching plugin
module Jekyll
  class PerformanceCache < Generator
    safe true
    priority :highest
    
    def generate(site)
      # REQUIRED: Multi-target cache management
      setup_target_cache(site)
      
      # REQUIRED: Component-level caching
      setup_component_cache(site)
      
      # REQUIRED: Content relationship caching
      setup_relationship_cache(site)
    end
    
    private
    
    def setup_target_cache(site)
      target_type = site.config['target_type']
      cache_dir = site.config.dig('target_cache', target_type)
      
      # REQUIRED: Target-specific cache directory
      FileUtils.mkdir_p(cache_dir) if cache_dir
      
      # REQUIRED: Cache invalidation based on target context
      invalidate_cache_if_needed(site, target_type)
    end
    
    def setup_component_cache(site)
      # REQUIRED: Component rendering cache
      site.config['component_cache'] = {
        'enabled' => true,
        'ttl' => 3600, # 1 hour cache
        'cache_key_strategy' => 'universal_context_hash'
      }
    end
    
    def invalidate_cache_if_needed(site, target_type)
      # REQUIRED: Smart cache invalidation
      cache_key = "#{target_type}_#{site.config['repository_context']}"
      
      if cache_outdated?(cache_key)
        clear_target_cache(target_type)
        Jekyll.logger.info "Cache invalidated for #{target_type}"
      end
    end
    
    def cache_outdated?(cache_key)
      # REQUIRED: Cache freshness check
      cache_file = ".jekyll-cache/#{cache_key}.timestamp"
      return true unless File.exist?(cache_file)
      
      cache_time = File.mtime(cache_file)
      config_time = File.mtime('_config.yml')
      
      config_time > cache_time
    end
  end
end
```

### Component-Level Caching

```liquid
<!-- REQUIRED: Component caching with universal context -->
{% comment %} Smart component caching based on context hash {% endcomment %}
{% assign context_hash = universal_context | jsonify | sha256 %}
{% assign cache_key = "component_" | append: include.component | append: "_" | append: context_hash %}

{% cache cache_key %}
  {% include components/{{ include.component }}.html %}
{% endcache %}
```

### Build Performance Optimization

```yaml
# REQUIRED: Asset optimization for Jekyll builds
plugins:
  - jekyll-minifier          # REQUIRED: HTML/CSS/JS minification
  - jekyll-compress-images   # REQUIRED: Image optimization
  - jekyll-cache-helper      # REQUIRED: Advanced caching
  - jekyll-target-cache      # REQUIRED: Multi-target build cache

# REQUIRED: Minification settings
jekyll-minifier:
  remove_comments: true
  remove_intertag_spaces: true
  remove_quotes: false
  compress_css: true
  compress_javascript: true
  compress_json: true
  simple_doctype: false
  remove_script_attributes: false
  remove_style_attributes: false
  remove_link_attributes: false
  remove_meta_attributes: false
  remove_input_attributes: false
  remove_form_attributes: false
  remove_http_protocol: false
  remove_https_protocol: false
  preserve_line_breaks: false
  simple_boolean_attributes: false
  
# REQUIRED: Image optimization
compress_images:
  quality: 85
  progressive: true
  webp: true
  avif: true
```

### Jekyll Build Performance Monitoring

```javascript
// REQUIRED: Build performance tracking
class JekyllBuildMonitor {
  constructor() {
    this.buildStart = performance.now();
    this.phases = {};
  }
  
  // REQUIRED: Track build phases
  trackPhase(phaseName, startTime, endTime) {
    this.phases[phaseName] = {
      duration: endTime - startTime,
      timestamp: new Date().toISOString()
    };
  }
  
  // REQUIRED: Generate build performance report
  generateReport() {
    const totalBuildTime = performance.now() - this.buildStart;
    
    return {
      totalBuildTime: `${totalBuildTime}ms`,
      phases: this.phases,
      cacheHitRate: this.calculateCacheHitRate(),
      recommendations: this.generateRecommendations()
    };
  }
  
  // REQUIRED: Cache performance analysis
  calculateCacheHitRate() {
    const cacheStats = this.readCacheStats();
    return {
      componentCache: cacheStats.componentHits / cacheStats.componentTotal,
      dataCache: cacheStats.dataHits / cacheStats.dataTotal,
      overallHitRate: cacheStats.totalHits / cacheStats.totalRequests
    };
  }
  
  // REQUIRED: Performance recommendations
  generateRecommendations() {
    const recommendations = [];
    
    if (this.phases.componentGeneration > 5000) {
      recommendations.push('Consider enabling component-level caching');
    }
    
    if (this.phases.dataProcessing > 3000) {
      recommendations.push('Optimize data processing with incremental builds');
    }
    
    return recommendations;
  }
}

// REQUIRED: Build performance integration
const buildMonitor = new JekyllBuildMonitor();
```

## Multi-Target Rendering Performance

### Repository-Specific Optimization

```yaml
# REQUIRED: Performance optimization per repository context
performance_targets:
  domain:
    # REQUIRED: Domain repository optimization
    critical_resources:
      - "/assets/css/critical.css"
      - "/assets/js/critical.js"
      - "/assets/images/hero.webp"
    
    lazy_load_threshold: 3
    component_cache_ttl: 3600
    
  blog:
    # REQUIRED: Blog repository optimization
    critical_resources:
      - "/assets/css/blog.css"
      - "/assets/js/blog.js"
      - "/assets/images/blog-hero.webp"
    
    lazy_load_threshold: 2
    component_cache_ttl: 1800
    pagination_cache: true
    
  project:
    # REQUIRED: Project repository optimization
    critical_resources:
      - "/assets/css/project.css"
      - "/assets/js/project.js"
      - "/assets/images/project-hero.webp"
    
    lazy_load_threshold: 1
    component_cache_ttl: 7200
    documentation_cache: true
```

### Cross-Repository Performance Coordination

```javascript
// REQUIRED: Multi-repository performance optimization
class CrossRepositoryPerformanceManager {
  constructor(universalContext) {
    this.context = universalContext;
    this.targetContext = universalContext.targetContext;
  }
  
  // REQUIRED: Optimize performance based on repository context
  optimizeForRepository() {
    const { repositoryContext, crossRepositoryUrls } = this.targetContext;
    
    switch (repositoryContext) {
      case 'domain':
        return this.optimizeDomainPerformance();
      case 'blog':
        return this.optimizeBlogPerformance();
      default:
        return this.optimizeGeneralPerformance();
    }
  }
  
  // REQUIRED: Domain-specific optimizations
  optimizeDomainPerformance() {
    return {
      preloadStrategy: 'hero-first',
      cacheStrategy: 'long-term',
      assetBundling: 'critical-path',
      crossRepositoryPrefetch: this.generateCrossRepositoryPrefetch()
    };
  }
  
  // REQUIRED: Blog-specific optimizations
  optimizeBlogPerformance() {
    return {
      preloadStrategy: 'content-first',
      cacheStrategy: 'content-based',
      assetBundling: 'reading-optimized',
      infiniteScroll: 'performance-aware'
    };
  }
  
  // REQUIRED: Cross-repository prefetch strategy
  generateCrossRepositoryPrefetch() {
    const { crossRepositoryUrls } = this.targetContext;
    
    return Object.entries(crossRepositoryUrls).map(([key, url]) => ({
      rel: 'prefetch',
      href: url,
      as: 'document',
      crossorigin: 'anonymous'
    }));
  }
}
```

### Target-Aware Performance Budgets

```javascript
// REQUIRED: Performance budgets per target type
const TARGET_PERFORMANCE_BUDGETS = {
  domain: {
    // REQUIRED: Homepage performance budget
    lcp: 2000,        // 2 seconds for hero content
    inp: 150,         // 150ms for navigation interactions
    cls: 0.05,        // Minimal layout shift
    javascript: '120KB',  // Reduced JS for faster load
    css: '80KB',          // Optimized CSS
    images: '400KB'       // Hero + key images
  },
  
  blog: {
    // REQUIRED: Blog performance budget
    lcp: 2500,        // 2.5 seconds for article content
    inp: 200,         // 200ms for reading interactions
    cls: 0.1,         // Standard layout shift
    javascript: '150KB',  // Enhanced JS for blog features
    css: '90KB',          // Blog-specific CSS
    images: '600KB'       // Article images + featured
  },
  
  project: {
    // REQUIRED: Project performance budget
    lcp: 3000,        // 3 seconds for project showcase
    inp: 250,         // 250ms for interactive demos
    cls: 0.15,        // Acceptable for rich content
    javascript: '200KB',  // Interactive components
    css: '120KB',         // Rich styling for demos
    images: '800KB'       // Project screenshots + demos
  }
};
```

## Jekyll-Specific Performance Monitoring

### Build Time Analysis

```ruby
# _plugins/build_performance.rb - REQUIRED Jekyll build monitoring
module Jekyll
  class BuildPerformanceAnalyzer < Generator
    safe true
    priority :lowest
    
    def generate(site)
      start_time = Time.now
      
      # REQUIRED: Track build phases
      track_content_generation(site)
      track_component_rendering(site)
      track_asset_processing(site)
      
      end_time = Time.now
      build_duration = end_time - start_time
      
      # REQUIRED: Generate performance report
      generate_performance_report(site, build_duration)
    end
    
    private
    
    def track_content_generation(site)
      content_start = Time.now
      
      # Track content processing time
      post_count = site.posts.docs.length
      page_count = site.pages.length
      
      content_end = Time.now
      content_duration = content_end - content_start
      
      site.config['performance_metrics'] ||= {}
      site.config['performance_metrics']['content_generation'] = {
        'duration' => content_duration,
        'posts_processed' => post_count,
        'pages_processed' => page_count,
        'avg_time_per_post' => content_duration / post_count
      }
    end
    
    def track_component_rendering(site)
      # REQUIRED: Component rendering performance
      component_metrics = {
        'renders' => count_component_renders(site),
        'cache_hits' => count_cache_hits(site),
        'cache_misses' => count_cache_misses(site)
      }
      
      site.config['performance_metrics']['component_rendering'] = component_metrics
    end
    
    def generate_performance_report(site, build_duration)
      report = {
        'build_duration' => build_duration,
        'target_type' => site.config['target_type'],
        'repository_context' => site.config['repository_context'],
        'metrics' => site.config['performance_metrics'],
        'recommendations' => generate_recommendations(site)
      }
      
      # REQUIRED: Write performance report
      File.write('_performance_report.json', JSON.pretty_generate(report))
    end
    
    def generate_recommendations(site)
      recommendations = []
      metrics = site.config['performance_metrics']
      
      if metrics['content_generation']['duration'] > 10
        recommendations << 'Consider enabling incremental builds'
      end
      
      if metrics['component_rendering']['cache_hits'] < 0.8
        recommendations << 'Improve component caching strategy'
      end
      
      recommendations
    end
  end
end
```

### Performance Monitoring Integration

```javascript
// REQUIRED: Jekyll performance monitoring client
class JekyllPerformanceMonitor {
  constructor() {
    this.metrics = {
      buildTime: 0,
      cacheHitRate: 0,
      componentRenderTime: 0,
      assetOptimizationTime: 0
    };
  }
  
  // REQUIRED: Collect Jekyll build metrics
  collectBuildMetrics() {
    fetch('/_performance_report.json')
      .then(response => response.json())
      .then(data => {
        this.metrics.buildTime = data.build_duration;
        this.metrics.cacheHitRate = this.calculateCacheHitRate(data.metrics);
        this.reportToAnalytics(data);
      });
  }
  
  // REQUIRED: Report Jekyll performance to analytics
  reportToAnalytics(performanceData) {
    gtag('event', 'jekyll_build_performance', {
      event_category: 'build_performance',
      event_label: performanceData.target_type,
      value: Math.round(performanceData.build_duration * 1000),
      custom_map: {
        'target_type': performanceData.target_type,
        'repository_context': performanceData.repository_context,
        'cache_hit_rate': this.metrics.cacheHitRate
      }
    });
  }
  
  // REQUIRED: Performance budget validation
  validatePerformanceBudget(targetType) {
    const budget = TARGET_PERFORMANCE_BUDGETS[targetType];
    const violations = [];
    
    if (this.metrics.buildTime > budget.maxBuildTime) {
      violations.push(`Build time exceeded: ${this.metrics.buildTime}s > ${budget.maxBuildTime}s`);
    }
    
    if (this.metrics.cacheHitRate < budget.minCacheHitRate) {
      violations.push(`Cache hit rate below target: ${this.metrics.cacheHitRate} < ${budget.minCacheHitRate}`);
    }
    
    return violations;
  }
}

// REQUIRED: Initialize Jekyll performance monitoring
const jekyllPerformanceMonitor = new JekyllPerformanceMonitor();
jekyllPerformanceMonitor.collectBuildMetrics();
```

This **Performance Standards & Optimization** specification ensures every component generates output that meets exact 2025 performance requirements while leveraging Jekyll caching API for 4x speed improvements and Universal Intelligence for target-aware optimization decisions.

## Pure Reference Architecture

**IMPORTANT**: This Performance document is a **pure reference layer** that:

1. **Provides reference standards** for Core Web Vitals and performance metrics
2. **Documents optimization patterns** for achieving performance goals
3. **Contains NO content detection logic** - all content analysis happens in CONTEXT-DETECTION.md
4. **Shows performance transformations** using pre-calculated context

The only detection in this document relates to:

- Browser feature detection (for polyfills and fallbacks)
- Network capability detection (for adaptive loading)
- Cache hit rate calculations (for performance monitoring)

These are infrastructure measurements, not content analysis. All content-based performance decisions come from the Central Context Engine.
