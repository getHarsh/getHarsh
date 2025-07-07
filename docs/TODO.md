# Remaining Architecture Tasks

This document contains ONLY the tasks that still need to be completed. For completed tasks, see [COMPLETED-TASKS.md](./COMPLETED-TASKS.md).

## Priority Order

### 🔴 Critical Priority

#### Issue #12.1: CONTEXT-MAPPING.md & COMPONENTS.md Parity
**Status**: NOT STARTED
**Criticality**: This is the foundation for everything else

**What Needs to Be Done**:
1. Audit current mappings in CONTEXT-MAPPING.md for completeness
2. Ensure EVERY component type in COMPONENT-TABLE.md has mappings
3. Add missing component mappings
4. Verify all standards compliance (WCAG, Schema.org, GA4, OpenGraph)
5. Create comprehensive examples for every mapping

**Why This Matters**:
- Foundation for all consumer systems
- Ensures deterministic outputs
- Single source of truth for mappings

### 🟡 High Priority

#### Issue #3: Component Intelligence Consistency
**Status**: NOT STARTED
**Complexity**: MEDIUM

**What Needs to Be Done**:
1. Create base intelligence layers:
   - `base/trackable.html` for analytics
   - `base/accessible.html` for ARIA
   - `base/discoverable.html` for SEO
   - `base/performant.html` for optimization

2. Update ALL components to use base intelligence layers
3. Remove hardcoded intelligence from individual components
4. Ensure consistent tracking/ARIA/SEO across all components

**Files to Update**:
- Create new base intelligence patterns in COMPONENTS.md
- Update all component files to use base layers
- Update ANALYTICS.md, ARIA.md, SEO.md to reference patterns

#### Issue #6: ARIA Generation Centralization
**Status**: NOT STARTED
**Complexity**: MEDIUM

**What Needs to Be Done**:
1. Create centralized ARIA generator (`aria/generate.html`)
2. Map component types to ARIA patterns
3. Remove hardcoded ARIA from all components
4. Implement context-aware label generation
5. Ensure WCAG 2.2 AA compliance maintained

**Component ARIA Patterns Needed**:
- Button: aria-label with action context
- Navigation: aria-label + aria-current
- Form: aria-describedby + aria-invalid
- Card: aria-labelledby + role
- Modal: aria-modal + focus management

### 🟢 Medium Priority

#### Issue #9: JavaScript Module Separation
**Status**: NOT STARTED
**Complexity**: MEDIUM

**What Needs to Be Done**:
1. Separate theme JavaScript from base component JavaScript
2. Create theme enhancement pattern
3. Ensure components work without theme enhancements
4. Implement enhancement hooks
5. Update all mixed modules

**Module Separation Required**:
- Base behaviors: Event handling, state, accessibility
- Theme behaviors: Visual effects, animations
- Clear enhancement API between layers

#### Issue #10: Atomic Design Implementation
**Status**: NOT STARTED
**Complexity**: HIGH

**What Needs to Be Done**:
1. Create atomic hierarchy documentation:
   - COMPONENTS/ATOMS.md
   - COMPONENTS/MOLECULES.md  
   - COMPONENTS/ORGANISMS.md

2. Decompose existing components:
   - Button → icon atom + text atom
   - Card → image + heading + text atoms
   - Form → field molecules + button molecule

3. Define clear atomic boundaries:
   - Atoms: Single-purpose, indivisible
   - Molecules: Simple combinations
   - Organisms: Complex UI sections

**Why This Matters**:
- Better reusability
- Clearer component hierarchy
- Easier maintenance
- True composability

## Success Criteria

For each remaining task:

### Component Intelligence (Issue #3)
- [ ] Every component includes base intelligence
- [ ] No duplicate intelligence logic
- [ ] Consistent data attributes across components
- [ ] Context Engine integration verified
- [ ] Performance impact acceptable

### ARIA Generation (Issue #6)
- [ ] All components use centralized ARIA
- [ ] No hardcoded ARIA attributes
- [ ] Context-aware labels generated
- [ ] WCAG 2.2 AA compliance maintained
- [ ] Screen reader testing passed

### JavaScript Modules (Issue #9)
- [ ] Components work without themes
- [ ] Themes enhance via public API only
- [ ] No theme code in base modules
- [ ] Clear enhancement pattern
- [ ] Performance optimized loading

### Atomic Design (Issue #10)
- [ ] Clear atomic boundaries defined
- [ ] No circular dependencies
- [ ] Improved reusability demonstrated
- [ ] Performance acceptable
- [ ] Documentation complete

## Implementation Order

1. **Start with Issue #12.1** - CONTEXT-MAPPING.md parity (MOST CRITICAL)
2. **Then Issue #3** - Component intelligence consistency
3. **Then Issue #6** - ARIA generation centralization
4. **Then Issue #9** - JavaScript module separation
5. **Finally Issue #10** - Atomic design implementation

## Time Estimates

- Issue #12.1: 2-3 days (comprehensive mapping work)
- Issue #3: 2 days (base layer creation + component updates)
- Issue #6: 1-2 days (ARIA centralization)
- Issue #9: 1-2 days (JS module separation)
- Issue #10: 3-4 days (atomic decomposition)

**Total Estimated Time**: 9-14 days

## Next Immediate Steps

1. **Begin Issue #12.1**: Start auditing CONTEXT-MAPPING.md
2. List all components from COMPONENT-TABLE.md
3. Identify missing mappings
4. Create comprehensive mapping for each component type
5. Ensure standards compliance for all mappings

## Notes

- The Three-Layer Architecture refactoring is COMPLETE
- All consumer systems are now pure transformation layers
- Context Engine is fully intelligent
- These remaining tasks build on that solid foundation
- Each task should maintain the architectural purity achieved