# ARIA & Accessibility Configuration Examples

This guide provides comprehensive examples for configuring accessibility features in the getHarsh ecosystem, ensuring WCAG 2.1 AA compliance and optimal experience for users with disabilities.

## Table of Contents

1. [Overview](#overview)
2. [Basic Configuration](#basic-configuration)
3. [ARIA Attributes](#aria-attributes)
4. [Keyboard Navigation](#keyboard-navigation)
5. [Focus Management](#focus-management)
6. [Visual Accessibility](#visual-accessibility)
7. [Audio & Media](#audio--media)
8. [Forms & Interactions](#forms--interactions)
9. [Navigation & Landmarks](#navigation--landmarks)
10. [Testing & Validation](#testing--validation)

## Overview

The ARIA configuration system ensures:

- **WCAG 2.1 AA Compliance**: Meeting standard accessibility requirements
- **Screen Reader Optimization**: Proper announcements and navigation
- **Keyboard Navigation**: Full keyboard accessibility
- **Visual Accommodations**: High contrast, text scaling, motion preferences
- **Semantic Structure**: Proper HTML and ARIA usage
- **Multi-Language Support**: RTL languages and translations

## Basic Configuration

### Minimal Setup

```yaml
# Domain config (e.g., getHarsh.in/config.yml)
# Note: ARIAConfig is from website.config.aria.ARIAConfig namespace
aria_config:
  core:
    enabled: true
    compliance_level: "AA"  # WCAG 2.1 AA
    language:
      primary_language: "en"
      direction: "ltr"
    skip_links:
      enabled: true
      links:
        - text: "Skip to main content"
          target: "#main"
          aria_label: "Skip navigation and go to main content"
```

### Complete Core Configuration

```yaml
aria_config:
  core:
    enabled: true
    compliance_level: "AA"
    
    language:
      primary_language: "en"
      direction: "ltr"
      multi_language: true
      language_switcher_label: "Change language"
      hreflang_enabled: true
    
    skip_links:
      enabled: true
      links:
        - text: "Skip to main content"
          target: "#main"
          shortcut: "Alt+S"
          aria_label: "Skip navigation and go directly to main content"
        - text: "Skip to navigation"
          target: "#navigation"
          shortcut: "Alt+N"
          aria_label: "Skip to main navigation menu"
        - text: "Skip to search"
          target: "#search"
          shortcut: "Alt+/"
          aria_label: "Skip to search form"
      styling:
        show_on_focus: true
        position: "absolute"
        z_index: 9999
        css_class: "skip-links"
    
    landmarks:
      enabled: true
      main:
        enabled: true
        aria_label: "Main content"
      navigation:
        enabled: true
        aria_label: "Main navigation"
        multiple_allowed: true
      banner:
        enabled: true
        aria_label: "Site header"
      contentinfo:
        enabled: true
        aria_label: "Site footer"
      search:
        enabled: true
        aria_label: "Site search"
    
    live_regions:
      enabled: true
      status:
        enabled: true
        politeness: "polite"
        atomic: true
      alerts:
        enabled: true
        politeness: "assertive"
        atomic: true
      notifications:
        enabled: true
        politeness: "polite"
        atomic: false
    
    error_handling:
      announce_errors: true
      error_format: "Error: {message}"
      associate_with_fields: true
      show_error_summary: true
      focus_on_error: true
    
    statement:
      enabled: true
      url: "/accessibility"
      last_updated: "2024-01-01"
      conformance: "WCAG 2.1 Level AA"
      contact: "accessibility@${domain}"
```

## ARIA Attributes

### Global ARIA Configuration

```yaml
aria_config:
  aria:
    global:
      auto_labels: true
      use_describedby: true
      hidden_handling:
        hide_decorative: true
        hide_icons: true
        respect_explicit: true
      label_format: "{type}: {content}"
    
    custom_rules:
      - name: "External link indication"
        selector: "a[target='_blank']"
        required_attributes:
          - "aria-label"
        validation: |
          return element.getAttribute('aria-label').includes('opens in new tab');
      
      - name: "Icon button labels"
        selector: "button:has(svg):not(:has(span))"
        required_attributes:
          - "aria-label"
        forbidden_attributes:
          - "title"  # Use aria-label instead
```

### Widget ARIA Patterns

```yaml
aria_config:
  aria:
    widgets:
      buttons:
        require_names: true
        announce_states: true
        loading_pattern: "{action} in progress"
        disabled_handling: "aria-disabled"
      
      links:
        indicate_external: true
        new_window_warning: true
        indicate_download: true
        indicate_current: true
        require_purpose: true
      
      menus:
        orientation: "horizontal"
        indicate_submenu: true
        announce_states: true
        enhanced_keyboard: true
      
      dialogs:
        modal_handling: true
        focus_trap: true
        require_close: true
        require_title: true
        announce_on_open: true
      
      tabs:
        orientation: "horizontal"
        auto_activation: false  # Manual activation
        panel_association: true
        arrow_navigation: true
      
      accordions:
        multi_expand: true
        announce_changes: true
        header_level: 3
        enhanced_keyboard: true
      
      carousels:
        autoplay_control: true
        announce_slides: true
        navigation_labels: true
        live_updates: true
```

### Document Structure ARIA

```yaml
aria_config:
  aria:
    document:
      headings:
        enforce_hierarchy: true
        single_h1: true
        check_empty: true
        use_landmarks: true
      
      lists:
        enforce_nesting: true
        require_items: true
        support_description: true
      
      tables:
        require_captions: true
        header_associations: true
        use_scope: true
        complex_summary: true
      
      articles:
        use_article_role: true
        semantic_time: true
        author_info: true
```

## Keyboard Navigation

### Complete Keyboard Configuration

```yaml
aria_config:
  keyboard:
    enabled: true
    
    tab_order:
      enforce_logical: true
      skip_hidden: true
      tab_index:
        remove_positive: true
        interactive_only: true
        custom_stops:
          - "#main-search"
          - "#user-menu"
      show_visualization: false  # Development only
    
    shortcuts:
      enabled: true
      detect_conflicts: true
      show_help: true
      help_key: "?"
      shortcuts:
        - key: "/"
          action: "Focus search"
          context: "global"
          customizable: true
        
        - key: "g h"
          action: "Go to home"
          context: "global"
          customizable: true
        
        - key: "g p"
          action: "Go to projects"
          context: "global"
          customizable: true
        
        - key: "Escape"
          action: "Close dialog or menu"
          context: "modal"
          customizable: false
        
        - key: "?"
          action: "Show keyboard shortcuts"
          context: "global"
          customizable: false
    
    patterns:
      arrows:
        enabled: true
        contexts:
          - name: "menu"
            selector: "[role='menu']"
            type: "vertical"
          - name: "tabs"
            selector: "[role='tablist']"
            type: "horizontal"
          - name: "grid"
            selector: "[role='grid']"
            type: "grid"
        wrap_around: true
      
      home_end_support: true
      page_support: true
      escape_handling: true
      enter_behavior: "activate"
    
    indicators:
      show_focus: true
      focus_style:
        outline_width: 2
        outline_color: "#0066cc"
        outline_offset: 2
        custom_css: |
          outline-style: solid;
          transition: outline-offset 0.1s ease;
      skip_indicators: true
      active_indication: true
```

## Focus Management

### Focus Trap and Restoration

```yaml
aria_config:
  focus:
    focus_traps:
      - id: "main-menu"
        selector: "#mobile-menu"
        initial_focus: "#mobile-menu-close"
        return_focus: true
        allow_escape: true
      
      - id: "modal-dialog"
        selector: "[role='dialog']"
        initial_focus: "[role='dialog'] h2"
        return_focus: true
        allow_escape: true
      
      - id: "search-dropdown"
        selector: "#search-dropdown"
        initial_focus: "#search-input"
        return_focus: true
        allow_escape: true
    
    restoration:
      enabled: true
      save_on_navigation: true
      restore_on_back: true
      memory_duration_ms: 300000  # 5 minutes
    
    order:
      match_reading_order: true
      group_related: true
      regions:
        - name: "header"
          selector: "header"
          tab_behavior: "normal"
        - name: "main"
          selector: "main"
          tab_behavior: "normal"
        - name: "sidebar"
          selector: "aside"
          tab_behavior: "skip_if_collapsed"
    
    announcements:
      enabled: true
      announce_context: true
      announce_landmarks: true
      custom:
        search_results: "Search results region"
        user_menu: "User menu"
        notifications: "Notifications panel"
```

## Visual Accessibility

### Color and Contrast

```yaml
aria_config:
  visual:
    contrast:
      ratios:
        normal_text: 4.5      # WCAG AA
        large_text: 3.0       # WCAG AA
        ui_components: 3.0    # WCAG AA
        use_enhanced: false   # Set true for AAA
      
      high_contrast:
        enabled: true
        auto_detect: true
        show_toggle: true
        schemes:
          - name: "High Contrast Dark"
            background: "#000000"
            foreground: "#ffffff"
            accent: "#ffff00"
          - name: "High Contrast Light"
            background: "#ffffff"
            foreground: "#000000"
            accent: "#0000ff"
      
      color_blind:
        enabled: true
        use_safe_palette: true
        use_patterns: true
        filters:
          - name: "Protanopia"
            type: "protanopia"
            css_filter: "url(#protanopia-filter)"
          - name: "Deuteranopia"
            type: "deuteranopia"
            css_filter: "url(#deuteranopia-filter)"
      
      enable_checking: true  # Build-time validation
```

### Text Scaling and Motion

```yaml
aria_config:
  visual:
    scaling:
      enabled: true
      controls:
        show_controls: true
        position: "top-right"
        steps: [0.85, 1.0, 1.15, 1.3, 1.5, 2.0]
        remember: true
      responsive_sizing: true
      scale_line_height: true
      max_scale: 2.0
    
    motion:
      respect_preference: true
      controls:
        allow_pause: true
        speed_control: true
        disable_option: true
      prevent_autoplay: true
      disable_parallax: true
      optional_smooth_scroll: true
    
    images:
      alt_text:
        required: true
        min_length: 3
        max_length: 125
        quality_check: true
        empty_for_decorative: true
      
      long_descriptions: true
      
      decorative:
        allow_marking: true
        auto_detect: true
        hide_from_sr: true
      
      complex:
        require_description: true
        description_format: "Long description: {description}"
        link_to_description: true
    
    indicators:
      loading:
        show_loading: true
        loading_text: "Loading..."
        text_alternative: true
      
      errors:
        icons_with_text: true
        avoid_color_only: true
        use_patterns: true
      
      success:
        announce_success: true
        use_patterns: true
      
      progress:
        announce_progress: true
        text_alternatives: true
        show_percentage: true
```

## Audio & Media

### Complete Media Accessibility

```yaml
aria_config:
  audio:
    captions:
      provide_captions: true
      auto_generate: false  # Manual for accuracy
      show_controls: true
      multi_language: true
    
    descriptions:
      provide_descriptions: true
      separate_track: true
      inline_descriptions: false
    
    volume:
      show_controls: true
      keyboard_control: true
      remember_preference: true
    
    transcripts:
      provide_transcripts: true
      interactive: true
      allow_download: true
```

## Forms & Interactions

### Comprehensive Form Accessibility

```yaml
aria_config:
  forms:
    labels:
      required: true
      visible_labels: true
      placeholder_not_label: true
      required_indication: "* (required)"
    
    errors:
      inline_errors: true
      error_summary: true
      associate_errors: true
      success_messages: true
    
    grouping:
      use_fieldsets: true
      group_related: true
      require_legend: true
    
    instructions:
      provide_instructions: true
      associate_with_fields: true
      format_hints: true
    
    validation:
      client_validation: true
      realtime: false  # On blur instead
      indicate_success: true
      messages:
        custom:
          email: "Enter email as name@example.com"
          phone: "Enter 10-digit phone number"
          date: "Enter date as MM/DD/YYYY"
        helpful_messages: true
        avoid_jargon: true
```

### Interactive Elements

```yaml
aria_config:
  interactive:
    buttons:
      require_names: true
      proper_semantics: true
      disabled:
        explain_disabled: true
        keep_focusable: true
        provide_alternatives: true
      icons:
        require_text: true
        show_tooltip: true
        sr_text: true
    
    links:
      descriptive_text: true
      avoid_generic: true
      purpose:
        indicate_file_type: true
        indicate_file_size: true
        indicate_external: true
        warn_new_window: true
      combine_adjacent: true
    
    modals:
      focus_management: true
      escape_close: true
      prevent_background: true
      require_title: true
      require_close: true
    
    tooltips:
      keyboard_access: true
      persistent: true
      dismissible: true
      use_describedby: true
```

## Component-Specific Patterns

### Social Share Components

```yaml
aria_config:
  components:
    social_share:
      role: "complementary"
      label: "Share this article"
      keyboard_shortcut: "Alt+S"
      aria_properties:
        expanded_label: "Social sharing options"
        collapsed_label: "Show sharing options"
      focus_management:
        trap_focus: false
        restore_focus: true
      announcements:
        opened: "Social sharing menu opened"
        closed: "Social sharing menu closed"
        shared: "${platform} share dialog opened in new window"
```

### Table of Contents

```yaml
aria_config:
  components:
    table_of_contents:
      role: "navigation"
      label: "Table of contents"
      keyboard_shortcut: "Alt+T"
      collapsible: true
      aria_properties:
        label: "Article navigation"
        expanded: true  # Default state
      keyboard_navigation:
        arrow_keys: true
        home_end: true
        auto_expand: true  # Expand on keyboard focus
      announcements:
        current_section: "Currently in section: ${section_title}"
        section_count: "Table of contents with ${count} sections"
```

### Code Blocks

```yaml
aria_config:
  components:
    code_blocks:
      role: "region"
      label_pattern: "Code snippet: ${language}"
      copy_button:
        enabled: true
        label: "Copy code to clipboard"
        success_message: "Code copied to clipboard"
        failure_message: "Failed to copy code"
        keyboard_shortcut: "Ctrl+C"
      syntax_highlighting:
        announce_language: true
        color_blind_safe: true
      line_numbers:
        enabled: true
        aria_hidden: true  # Decorative only
      keyboard_navigation:
        tab_through_code: false  # Tab exits the block
```

### Chips/Tags

```yaml
aria_config:
  components:
    chips_tags:
      role: "link"  # When clickable
      label_pattern: "Tag: ${name}"
      context_aware: true  # Changes based on ContentType
      states:
        selected: "Selected filter: ${name}"
        unselected: "Available filter: ${name}"
      keyboard_navigation:
        space_toggles: true
        enter_navigates: true
      announcements:
        filter_applied: "Filtering by ${name}"
        filter_removed: "${name} filter removed"
```

### Theme Switcher

```yaml
aria_config:
  components:
    theme_switch:
      role: "switch"
      label: "Toggle theme"
      keyboard_shortcut: "Alt+D"
      states:
        light: 
          label: "Switch to dark mode"
          announcement: "Light mode active"
        dark:
          label: "Switch to light mode"
          announcement: "Dark mode active"
      transition:
        announce_change: true
        message: "Theme changed to ${mode} mode"
```

### Person Role Attribution

```yaml
aria_config:
  components:
    person_attribution:
      # Maps PersonRole enum to announcements
      role_announcements:
        PERSON_ROLE_AUTHOR: "Article by ${name}, ${role} at ${organization}"
        PERSON_ROLE_CONTRIBUTOR: "Contributed by ${name}, ${role}"
        PERSON_ROLE_REVIEWER: "Reviewed by ${name}, ${role}"
        PERSON_ROLE_EDITOR: "Edited by ${name}, ${role}"
      link_context:
        add_role: true  # "Harsh (Author)" instead of just "Harsh"
        pattern: "${name} (${role})"
```

### Entity Navigation

```yaml
aria_config:
  components:
    entity_navigation:
      # Dynamic based on EntityCatalog
      cross_entity_warnings:
        enabled: true
        message: "You are leaving ${from_entity} and entering ${to_entity}"
      entity_context:
        announce_on_load: true
        message: "Currently viewing content from ${entity}"
      legal_boundaries:
        announce_transition: true
        privacy_message: "Different privacy policy applies"
```

### WCAG 2.2 Enhancements

```yaml
aria_config:
  wcag_2_2:
    # Focus Not Obscured (2.4.11, 2.4.12)
    focus_visibility:
      minimum_visible_area: 100  # pixels
      check_sticky_headers: true
      scroll_padding: 20  # pixels
    
    # Target Size (2.5.8)
    target_sizing:
      minimum_size: "44x44"  # pixels
      spacing: 8  # pixels between targets
      exceptions:
        - inline_links
        - essential_ui
    
    # Dragging Movements (2.5.7)
    dragging:
      provide_alternatives: true
      single_pointer_alternatives:
        - click_to_select
        - keyboard_navigation
```

## Navigation & Landmarks

### Navigation Accessibility

```yaml
aria_config:
  navigation:
    menus:
      keyboard_navigation: true
      structure:
        proper_roles: true
        nested_indication: true
        current_indication: true
      mobile:
        accessible_toggle: true
        focus_management: true
        escape_close: true
      announce_changes: true
    
    breadcrumbs:
      use_nav: true
      aria_label: "Breadcrumb navigation"
      structured_data: true
      current_indication: true
    
    pagination:
      navigation_role: true
      announce_current: true
      descriptive_labels: true
      number_format: "Page {current} of {total}"
    
    search:
      use_landmark: true
      clear_labels: true
      include_button: true
      announce_results: true
      no_results_message: true
```

## Testing & Validation

### Accessibility Testing Configuration

```yaml
aria_config:
  testing:
    automated:
      enabled: true
      tools:
        - "axe-core"
        - "pa11y"
        - "lighthouse"
      test_on_build: true
      fail_on_errors: true
      error_threshold: 0  # Zero tolerance for AA issues
    
    manual:
      checklist_url: "/accessibility/checklist"
      schedule: "monthly"
      key_workflows:
        - "Complete purchase flow"
        - "Form submission"
        - "Navigation with keyboard only"
        - "Screen reader navigation"
    
    user:
      include_pwd: true  # People with disabilities
      frequency: "quarterly"
      collect_feedback: true
    
    reporting:
      generate_reports: true
      format: "html"
      public_reports: true
      report_url: "/accessibility/reports"
```

### Assistive Technology Support

```yaml
aria_config:
  assistive:
    screen_readers:
      optimize: true
      tested_with:
        - "NVDA"
        - "JAWS"
        - "VoiceOver"
        - "TalkBack"
      announcements:
        announce_dynamic: true
        announce_states: true
        announce_pages: true
        custom:
          cart_update: "Cart updated. {count} items"
          form_saved: "Form saved successfully"
      virtual_cursor: true
    
    voice_control:
      voice_navigation: true
      commands:
        - phrase: "click submit"
          action: "submit_form"
          context: "form"
        - phrase: "go to projects"
          action: "navigate_projects"
          context: "global"
      number_overlays: true
    
    switch_devices:
      switch_scanning: true
      scan_speed_ms: 1500
      patterns:
        - "linear"
        - "row-column"
    
    magnification:
      reflow_content: true
      high_res_images: true
      avoid_horizontal: true
```

## Complete Example Configuration

### Full Domain Configuration

```yaml
# getHarsh.in/config.yml (excerpt)
aria_config:
  core:
    enabled: true
    compliance_level: "AA"
    language:
      primary_language: "en"
      direction: "ltr"
      multi_language: true
    skip_links:
      enabled: true
      links:
        - text: "Skip to main content"
          target: "#main"
    landmarks:
      enabled: true
      main:
        enabled: true
        aria_label: "Main content"
    live_regions:
      enabled: true
      alerts:
        enabled: true
        politeness: "assertive"
    error_handling:
      announce_errors: true
      associate_with_fields: true
  
  aria:
    global:
      auto_labels: true
      use_describedby: true
    widgets:
      buttons:
        require_names: true
        announce_states: true
      links:
        indicate_external: true
        require_purpose: true
      dialogs:
        modal_handling: true
        focus_trap: true
  
  keyboard:
    enabled: true
    tab_order:
      enforce_logical: true
      skip_hidden: true
    shortcuts:
      enabled: true
      help_key: "?"
    patterns:
      arrows:
        enabled: true
        wrap_around: true
    indicators:
      show_focus: true
      focus_style:
        outline_width: 2
        outline_color: "#0066cc"
  
  focus:
    focus_traps:
      - id: "modal"
        selector: "[role='dialog']"
        return_focus: true
    restoration:
      enabled: true
      save_on_navigation: true
  
  visual:
    contrast:
      ratios:
        normal_text: 4.5
        large_text: 3.0
      high_contrast:
        enabled: true
        show_toggle: true
    scaling:
      enabled: true
      controls:
        show_controls: true
    motion:
      respect_preference: true
      prevent_autoplay: true
    images:
      alt_text:
        required: true
        quality_check: true
  
  forms:
    labels:
      required: true
      visible_labels: true
    errors:
      inline_errors: true
      error_summary: true
    validation:
      client_validation: true
      indicate_success: true
  
  navigation:
    menus:
      keyboard_navigation: true
      announce_changes: true
    search:
      use_landmark: true
      announce_results: true
  
  testing:
    automated:
      enabled: true
      test_on_build: true
      fail_on_errors: true
```

## Implementation Checklist

### Pre-Launch Accessibility Checklist

- [ ] **Keyboard Navigation**
  - [ ] All interactive elements keyboard accessible
  - [ ] Logical tab order
  - [ ] No keyboard traps
  - [ ] Focus indicators visible

- [ ] **Screen Reader Testing**
  - [ ] All content readable
  - [ ] Form labels associated
  - [ ] Error messages announced
  - [ ] Dynamic content updates announced

- [ ] **Visual Accessibility**
  - [ ] Color contrast passes WCAG AA
  - [ ] Text scalable to 200%
  - [ ] No information conveyed by color alone
  - [ ] Motion can be paused/stopped

- [ ] **Forms and Errors**
  - [ ] All fields labeled
  - [ ] Required fields indicated
  - [ ] Error messages clear and associated
  - [ ] Success confirmations provided

- [ ] **Media and Images**
  - [ ] All images have alt text
  - [ ] Videos have captions
  - [ ] Audio has transcripts
  - [ ] Complex images have descriptions

## Best Practices

1. **Test Early and Often**: Use automated tools during development
2. **Real User Testing**: Include users with disabilities in testing
3. **Semantic HTML First**: Use proper HTML before adding ARIA
4. **ARIA as Enhancement**: Don't change native semantics unnecessarily
5. **Announce Changes**: Ensure dynamic content is announced
6. **Error Prevention**: Help users avoid errors, not just fix them
7. **Consistent Navigation**: Keep navigation patterns consistent
8. **Progressive Enhancement**: Ensure basic functionality works for all

## Troubleshooting

### Common Issues

1. **Focus indicators not visible**
   - Check CSS for `outline: none` without replacement
   - Ensure focus_style configuration is applied
   - Test with keyboard navigation

2. **Screen reader not announcing content**
   - Verify ARIA labels are present
   - Check live regions are configured
   - Ensure content isn't marked as decorative

3. **Keyboard navigation broken**
   - Check for positive tabindex values
   - Verify focus trap implementation
   - Test arrow key navigation patterns

4. **Color contrast failing**
   - Use automated testing tools
   - Check both text and UI components
   - Consider high contrast mode

## See Also

- [ARIA Schema Definition](schema/aria.proto)
- [ARIA Mappings](schema/aria-mappings.yml)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Resources](https://webaim.org/)