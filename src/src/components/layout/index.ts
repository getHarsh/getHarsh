/**
 * @fileoverview Layout Components Barrel Export
 * @module components/layout
 * 
 * @description
 * Central export point for all layout components in the ecosystem.
 * Provides a clean API for importing layout components throughout the application.
 * 
 * This barrel export follows the established pattern of hierarchical layout composition:
 * - RootLayout: Foundation with theme and consent
 * - PageLayout: Modern page wrapper using RootLayout
 * - ContentLayout: Responsive content width container
 * 
 * @architecture
 * ```
 * components/layout/index.ts (this file)
 *         ├── RootLayout (root wrapper)
 *         ├── PageLayout (page wrapper) 
 *         └── ContentLayout (content container)
 * 
 * Import hierarchy:
 * Pages/Templates
 *       ↓
 *   PageLayout
 *       ↓
 *   RootLayout
 *       ↓
 *   ContentLayout (optional)
 * ```
 * 
 * @proto-integration
 * Layout components map to configuration protos:
 * - **ThemeConfig** (theme.proto): Colors and animations
 * - **ConsentConfig** (consent.proto): GDPR/CCPA compliance
 * - **DomainConfig** (domain.proto): Site structure
 * - **DisplaySettings** (blog.proto): Content width preferences
 * 
 * @usage
 * ```tsx
 * // Import specific components
 * import { PageLayout, ContentLayout } from '@/components/layout'
 * 
 * // Import all layout components
 * import * as Layout from '@/components/layout'
 * 
 * // Use in page component
 * export const MyPage = () => (
 *   <PageLayout>
 *     <ContentLayout maxWidth="narrow">
 *       <h1>Page Title</h1>
 *     </ContentLayout>
 *   </PageLayout>
 * )
 * ```
 * 
 * @exports
 * - {@link RootLayout} - Root application wrapper with theme and consent
 * - {@link PageLayout} - Modern page layout wrapper (recommended)
 * - {@link ContentLayout} - Responsive content width container
 * 
 * Note: SEO and Layout components are not exported here as they are
 * used internally by the layout components or imported directly when needed.
 * 
 * @see {@link file://./RootLayout.tsx} - Foundation layout component
 * @see {@link file://./PageLayout.tsx} - Page wrapper component
 * @see {@link file://./ContentLayout.tsx} - Content container component
 * @see {@link file://./BUILD.md#layout-system} - Layout architecture
 * 
 * @since 1.0.0
 */

export * from './RootLayout'
export * from './PageLayout'
export * from './ContentLayout'