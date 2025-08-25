/**
 * @fileoverview ConsentBanner - GDPR/CCPA compliant cookie consent banner
 * @module components/consent/ConsentBanner
 * 
 * @description
 * A comprehensive consent banner component implementing Google Consent Mode v2
 * with regional detection, cross-domain consent coordination, and granular
 * control options. Handles GDPR, CCPA, and other privacy regulations.
 * 
 * @architecture
 * ```
 * ┌──────────────────────────────────────────────────────────┐
 * │               ConsentBanner Architecture                  │
 * ├──────────────────────────────────────────────────────────┤
 * │                                                          │
 * │  Initial Load                                           │
 * │  ┌──────────────────────────────────────────────────┐   │
 * │  │  Component Mount                                │   │
 * │  │       ▼                                         │   │
 * │  │  Check Existing Consent Cookie                 │   │
 * │  │       ├── Exists → Update gtag, hide banner   │   │
 * │  │       └── Missing → Continue                  │   │
 * │  └──────────────────────────────────────────────────┘   │
 * │                        ▼                                 │
 * │  Regional Detection                                     │
 * │  ┌──────────────────────────────────────────────────┐   │
 * │  │  detectRegion() using:                         │   │
 * │  │  - Intl.DateTimeFormat timezone                 │   │
 * │  │  - navigator.language locale                    │   │
 * │  │                                                  │   │
 * │  │  Returns:                                       │   │
 * │  │  ├── 'EU' (GDPR) - Europe timezones            │   │
 * │  │  ├── 'US-CA' (CCPA) - California               │   │
 * │  │  ├── 'IN' - India timezones                    │   │
 * │  │  └── 'DEFAULT' - Other regions                 │   │
 * │  └──────────────────────────────────────────────────┘   │
 * │                        ▼                                 │
 * │  Apply Regional Defaults                                │
 * │  ┌──────────────────────────────────────────────────┐   │
 * │  │  getRegionalDefault(region):                   │   │
 * │  │  - Parse config.region_defaults                 │   │
 * │  │  - Format: "REGION:state"                       │   │
 * │  │  - Default: 'denied' (conservative)             │   │
 * │  │                                                  │   │
 * │  │  Update Google Consent Mode v2:                 │   │
 * │  │  - analytics_storage                            │   │
 * │  │  - ad_storage                                   │   │
 * │  │  - ad_user_data                                 │   │
 * │  │  - ad_personalization                           │   │
 * │  └──────────────────────────────────────────────────┘   │
 * │                        ▼                                 │
 * │  Show Banner (after 1s delay)                           │
 * │  ┌──────────────────────────────────────────────────┐   │
 * │  │  Banner UI:                                    │   │
 * │  │  ┌────────────────────────────────────────┐     │   │
 * │  │  │  Text: Cookie usage explanation         │     │   │
 * │  │  │  Links: Privacy Policy, Cookie Policy   │     │   │
 * │  │  │  Cross-domain notice (if enabled)       │     │   │
 * │  │  │                                          │     │   │
 * │  │  │  Buttons:                                │     │   │
 * │  │  │  [Decline All] [Manage] [Accept All]    │     │   │
 * │  │  └────────────────────────────────────────┘     │   │
 * │  └──────────────────────────────────────────────────┘   │
 * │                        ▼                                 │
 * │  User Interaction                                       │
 * │  ┌──────────────────────────────────────────────────┐   │
 * │  │  Accept All:                                    │   │
 * │  │  1. Set cookie: 'granted'                       │   │
 * │  │  2. Update gtag: all granted                    │   │
 * │  │  3. Dispatch 'consentGranted' event             │   │
 * │  │  4. Hide banner                                 │   │
 * │  │                                                  │   │
 * │  │  Decline All:                                   │   │
 * │  │  1. Set cookie: 'denied'                        │   │
 * │  │  2. Update gtag: all denied                     │   │
 * │  │  3. Hide banner                                 │   │
 * │  │                                                  │   │
 * │  │  Manage Settings:                               │   │
 * │  │  1. Call onOpenSettings callback                │   │
 * │  │  2. Open ConsentSettings modal                  │   │
 * │  └──────────────────────────────────────────────────┘   │
 * │                                                          │
 * │  Cross-Domain Limitations                               │
 * │  ┌──────────────────────────────────────────────────┐   │
 * │  │  Browser Security:                              │   │
 * │  │  - Cannot set cookies for different domains     │   │
 * │  │  - Can set for parent domain (.getHarsh.in)     │   │
 * │  │  - Cannot cross root domains                    │   │
 * │  │                                                  │   │
 * │  │  Workaround:                                    │   │
 * │  │  - Store domain list in localStorage            │   │
 * │  │  - Show entity ownership in UI                  │   │
 * │  │  - Require per-domain consent                   │   │
 * │  └──────────────────────────────────────────────────┘   │
 * │                                                          │
 * └──────────────────────────────────────────────────────────┘
 * ```
 * 
 * @proto-integration
 * Maps to protobuf configurations:
 * - `config/proto/consent/consent_settings.proto` - Banner configuration
 * - `config/proto/consent/consent_mode_v2.proto` - Google Consent Mode
 * - `config/proto/consent/regional_defaults.proto` - Regional settings
 * - `config/proto/consent/cross_domain.proto` - Cross-domain config
 * 
 * @hook-integration
 * - `useConfig()` - Consent settings from configuration
 * 
 * @ecosystem-integration
 * - Used by: RootLayout wrapper for all pages
 * - Data flow: Config → regional defaults → user choice → storage
 * - Google integration: gtag consent API
 * - Storage: Cookies (primary), localStorage (metadata)
 * - Related: ConsentSettings modal for granular control
 * 
 * @features
 * - 🌐 Regional detection for compliance
 * - 🍪 Google Consent Mode v2
 * - 🔗 Cross-domain consent coordination
 * - 💾 Persistent consent storage
 * - 🎮 Granular consent control
 * - 🎨 Styled-components theming
 * - 📱 Responsive design
 * - ♿ Accessibility compliant
 * 
 * @regional-specifications
 * ```
 * Region  | Detection                  | Default   | Regulation
 * --------|----------------------------|-----------|------------
 * EU      | Europe timezones, locales  | denied    | GDPR
 * US-CA   | California timezone        | denied    | CCPA
 * IN      | India timezone, locales    | granted   | Local
 * DEFAULT | All other regions          | denied    | Conservative
 * ```
 * 
 * @consent-categories
 * ```
 * Category             | Purpose                    | Default
 * --------------------|----------------------------|----------
 * analytics_storage    | Google Analytics tracking  | Per region
 * ad_storage          | Google Ads cookies         | Per region
 * ad_user_data        | User data for ads          | denied
 * ad_personalization  | Personalized advertising   | denied
 * ```
 * 
 * @cross-domain-limitations
 * - **Cannot**: Set cookies for different root domains
 * - **Can**: Set for parent domain from subdomain
 * - **Workaround**: localStorage for metadata
 * - **UI**: Shows entity ownership clearly
 * 
 * @accessibility
 * - ARIA role="dialog" for banner
 * - Keyboard navigation support
 * - Screen reader announcements
 * - Focus management on interaction
 * - Clear button labels
 * 
 * @performance
 * - Lazy banner display (1s delay)
 * - Regional detection cached
 * - Minimal re-renders
 * - Cookie checks optimized
 * 
 * @dos
 * - ✅ Test regional detection thoroughly
 * - ✅ Verify Google Consent Mode updates
 * - ✅ Handle cookie failures gracefully
 * - ✅ Provide clear policy links
 * - ✅ Show entity ownership for transparency
 * 
 * @donts
 * - ❌ Don't block page interaction
 * - ❌ Don't assume cross-domain cookies work
 * - ❌ Don't store PII in cookies
 * - ❌ Don't show if already consented
 * - ❌ Don't skip accessibility attributes
 * 
 * @example
 * ```tsx
 * // Basic usage in RootLayout
 * const RootLayout = ({ children }) => {
 *   const [settingsOpen, setSettingsOpen] = useState(false)
 *   
 *   return (
 *     <>
 *       {children}
 *       <ConsentBanner 
 *         onOpenSettings={() => setSettingsOpen(true)}
 *       />
 *       {settingsOpen && (
 *         <ConsentSettings 
 *           onClose={() => setSettingsOpen(false)}
 *         />
 *       )}
 *     </>
 *   )
 * }
 * 
 * // Conditional rendering
 * const App = () => {
 *   const { consent_settings } = useConfig()
 *   
 *   return (
 *     <>
 *       <MainContent />
 *       {consent_settings?.enable_consent_banner && (
 *         <ConsentBanner />
 *       )}
 *     </>
 *   )
 * }
 * 
 * // With custom styling
 * <ConsentBanner 
 *   className="custom-consent-banner"
 *   onOpenSettings={handleOpenSettings}
 * />
 * ```
 * 
 * @see {@link ../../../CONSENT-ARCHITECTURE.md} - Consent system architecture
 * @see {@link ./ConsentSettings.tsx} - Granular settings modal
 * @see {@link https://developers.google.com/tag-platform/gtagjs/consent} - Google Consent Mode
 * @see {@link ../../../BUILD.md#consent-management} - Consent build process
 * @see {@link ../../../README.md#privacy} - Privacy documentation
 * 
 * @since 1.0.0
 */

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button } from '../ui/Button';
import { useConfig } from '@/hooks/useConfig';
import { getAriaProperty } from '@/utils/mappings';

/**
 * Extended window interface for consent tracking
 */
declare global {
  interface Window {
    gtag?: (
      command: 'consent' | 'config' | 'event', 
      action: string | Record<string, string>, 
      params?: Record<string, unknown>
    ) => void;
    __detected_region?: string;
  }
}

const BannerContainer = styled.div<{ position: string; theme: string }>`
  position: fixed;
  ${(props: { position: string }) => props.position === 'bottom' ? 'bottom: 0' : 'top: 0'};
  left: 0;
  right: 0;
  background-color: ${(props: { theme: string }) => props.theme === 'dark' ? 'rgba(10, 14, 39, 0.98)' : 'rgba(255, 255, 255, 0.98)'};
  backdrop-filter: blur(10px);
  border-top: 1px solid ${(props: { theme: string }) => props.theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
  padding: 1.5rem;
  z-index: 1000;
  transform: translateY(100%);
  transition: transform 0.3s ease-in-out;

  &.visible {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const BannerContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
`;

const BannerText = styled.p`
  margin: 0;
  flex: 1;
  color: ${(props: any) => props.theme?.colors?.text || '#333'};
  font-size: 0.875rem;
  line-height: 1.5;

  a {
    color: ${(props: any) => props.theme?.colors?.primary || '#007bff'};
    text-decoration: underline;
    
    &:hover {
      text-decoration: none;
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100%;
    
    button {
      flex: 1;
    }
  }
`;

/**
 * @interface ConsentBannerProps
 * @description Props for ConsentBanner component with settings callback
 * 
 * @property {string} [className] - Additional CSS classes for styling
 * @property {() => void} [onOpenSettings] - Callback to open ConsentSettings modal
 */
export interface ConsentBannerProps {
  /** Additional CSS classes */
  className?: string;
  /** Callback to open granular settings modal */
  onOpenSettings?: () => void;
}

/**
 * ConsentBanner component - GDPR/CCPA consent management
 * 
 * @component
 * @param {ConsentBannerProps} props - Component props
 * @param {string} [props.className] - Additional CSS classes
 * @param {() => void} [props.onOpenSettings] - Settings modal callback
 * 
 * @returns {JSX.Element | null} Consent banner or null if not needed
 * 
 * @example
 * ```tsx
 * // With settings modal
 * <ConsentBanner
 *   onOpenSettings={() => setModalOpen(true)}
 * />
 * ```
 */
export const ConsentBanner: React.FC<ConsentBannerProps> = ({ className, onOpenSettings }) => {
  const config = useConfig();
  const [isVisible, setIsVisible] = useState(false);
  const [hasConsented, setHasConsented] = useState<boolean | null>(null);

  const consentSettings = config?.consent_settings;
  const cookieName = consentSettings?.consent_cookie_name || 'analytics_consent';
  const durationDays = consentSettings?.consent_duration_days || 365;

  /**
   * Detect user's region for applying appropriate consent defaults
   * Implementation: CONSENT-ARCHITECTURE.md#regional-detection
   */
  const detectRegion = (): string => {
    try {
      // Check if Intl API is available (older browsers might not support it)
      if (typeof Intl === 'undefined' || !Intl.DateTimeFormat) {
        console.warn('Intl API not available, using DEFAULT region');
        return 'DEFAULT';
      }
      
      // Use Intl API for timezone detection (most reliable client-side method)
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
      const locale = navigator?.language || '';
      
      // EU Detection (GDPR) - comprehensive list of European timezones
      if (timezone.includes('Europe') || 
          timezone.includes('Berlin') || 
          timezone.includes('Paris') || 
          timezone.includes('Rome') || 
          timezone.includes('Madrid') || 
          timezone.includes('Amsterdam') ||
          locale.startsWith('de') || 
          locale.startsWith('fr') || 
          locale.startsWith('it') || 
          locale.startsWith('es') || 
          locale.startsWith('nl')) {
        return 'EU';
      }
      
      // California Detection (CCPA)
      if (timezone === 'America/Los_Angeles' || 
          timezone === 'America/San_Francisco' ||
          (timezone.includes('America') && locale.includes('CA'))) {
        return 'US-CA';
      }
      
      // India Detection
      if (timezone === 'Asia/Kolkata' || 
          timezone === 'Asia/Calcutta' ||
          locale.startsWith('hi') || 
          locale.startsWith('bn') || 
          locale.startsWith('te')) {
        return 'IN';
      }
      
      return 'DEFAULT';
    } catch (error) {
      console.error('Error detecting region:', error);
      // Fail safe to most restrictive (EU-like) for safety
      return 'EU';
    }
  };

  /**
   * Get default consent state based on region
   * Implementation: CONSENT-ARCHITECTURE.md#regional-detection
   */
  const getRegionalDefault = (region: string): string => {
    const regionDefaults = consentSettings?.region_defaults || [];
    
    // Parse region defaults from config (format: "REGION:state")
    for (const defaultStr of regionDefaults) {
      const [regionKey, state] = defaultStr.split(':');
      if (regionKey === region) {
        return state;
      }
    }
    
    // Fallback to denied for safety
    return 'denied';
  };

  useEffect(() => {
    // Check if user has already made a consent choice
    const existingConsent = getCookie(cookieName);
    if (existingConsent !== null) {
      setHasConsented(existingConsent === 'granted');
      updateGoogleConsent(existingConsent === 'granted');
    } else {
      // Detect region and apply appropriate defaults
      const region = detectRegion();
      const regionalDefault = getRegionalDefault(region);
      
      // Set initial Google Consent Mode state based on region
      updateGoogleConsent(regionalDefault === 'granted');
      
      // Store detected region for analytics
      if (typeof window !== 'undefined') {
        window.__detected_region = region;
      }
      
      // Show banner after a short delay
      setTimeout(() => setIsVisible(true), 1000);
    }
  }, [cookieName]);

  const getCookie = (name: string): string | null => {
    try {
      // Check if we can access cookies
      if (typeof document === 'undefined' || !document.cookie) {
        return null;
      }
      
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) {
        return parts.pop()?.split(';').shift() || null;
      }
      return null;
    } catch (error) {
      console.error('Error reading cookie:', error);
      return null;
    }
  };

  const setCookie = (name: string, value: string, days: number) => {
    try {
      // Validate inputs
      if (!name || typeof days !== 'number' || days < 0) {
        console.error('Invalid cookie parameters');
        return false;
      }
      
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      const expires = `expires=${date.toUTCString()}`;
      
      // IMPORTANT: Browser security prevents setting cookies for different domains
      // We can only set cookies for:
      // 1. The exact current domain (e.g., blog.getHarsh.in)
      // 2. Parent domain if we're on a subdomain (e.g., .getHarsh.in from blog.getHarsh.in)
      // We CANNOT set cookies for other root domains (e.g., cannot set causality.in from getHarsh.in)
      
      // Extract the root domain (e.g., getHarsh.in from blog.getHarsh.in)
      const hostname = window?.location?.hostname || 'localhost';
      const domainParts = hostname.split('.');
      const domain = domainParts.length > 2 ? domainParts.slice(-2).join('.') : hostname;
      
      // Set cookie for current domain family (includes all subdomains)
      document.cookie = `${name}=${value};${expires};path=/;domain=.${domain};SameSite=Lax`;
      
      // Verify cookie was set
      const verifyValue = getCookie(name);
      if (verifyValue !== value) {
        console.warn('Cookie may not have been set correctly, trying without domain');
        // Try setting without domain restriction (works for current domain only)
        document.cookie = `${name}=${value};${expires};path=/;SameSite=Lax`;
      }
      
      // Cross-domain consent configuration
      // Implementation: CONSENT-ARCHITECTURE.md#cross-domain-limitations
      if (consentSettings?.enable_cross_domain_consent) {
        // Get list of all domains owned by this entity
        const consentDomains = consentSettings?.consent_domains || [];
        
        // LIMITATION: We cannot technically set cookies for other root domains
        // What we CAN do:
        // 1. Show users that multiple domains are owned by the same entity
        // 2. Use consistent consent UI/UX across all entity domains
        // 3. Document in privacy policy that consent must be given per-domain
        // 4. Future enhancement: Could implement a consent sync API
        
        // Store entity domain list in localStorage for potential future sync
        if (consentDomains.length > 0) {
          try {
            localStorage.setItem('consent_domains', JSON.stringify(consentDomains));
            localStorage.setItem('consent_domain', window.location.hostname);
            localStorage.setItem('consent_timestamp', new Date().toISOString());
          } catch (storageError) {
            console.warn('localStorage not available:', storageError);
          }
        }
      }
      
      return true;
    } catch (error) {
      console.error('Error setting cookie:', error);
      return false;
    }
  };

  const updateGoogleConsent = (granted: boolean) => {
    try {
      // Update Google Consent Mode v2
      if (typeof window !== 'undefined' && window.gtag) {
        const consentModeV2 = consentSettings?.consent_mode_v2;
        const consentUpdate = {
          'analytics_storage': granted ? 'granted' : 'denied',
          'ad_storage': granted ? 'granted' : 'denied',
          'ad_user_data': granted && consentModeV2?.ad_user_data_default ? 'granted' : 'denied',
          'ad_personalization': granted && consentModeV2?.ad_personalization_default ? 'granted' : 'denied',
        };
        
        window.gtag('consent', 'update', consentUpdate);
        console.log('Google Consent Mode updated:', consentUpdate);
      }
    } catch (error) {
      console.error('Error updating Google Consent Mode:', error);
      // Non-critical error, consent banner still functions
    }
  };

  const handleAccept = () => {
    try {
      const success = setCookie(cookieName, 'granted', durationDays);
      if (success) {
        setHasConsented(true);
        setIsVisible(false);
        updateGoogleConsent(true);
        
        // Reload analytics scripts if needed
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new Event('consentGranted'));
        }
      } else {
        console.error('Failed to save consent preference');
        // Still hide banner to avoid blocking user
        setIsVisible(false);
      }
    } catch (error) {
      console.error('Error handling consent acceptance:', error);
      setIsVisible(false);
    }
  };

  const handleDecline = () => {
    try {
      const success = setCookie(cookieName, 'denied', durationDays);
      if (success) {
        setHasConsented(false);
        setIsVisible(false);
        updateGoogleConsent(false);
      } else {
        console.error('Failed to save consent preference');
        // Still hide banner to avoid blocking user
        setIsVisible(false);
      }
    } catch (error) {
      console.error('Error handling consent decline:', error);
      setIsVisible(false);
    }
  };

  // Don't render if consent settings are disabled or user has already consented
  if (!consentSettings?.enable_consent_banner || hasConsented !== null) {
    return null;
  }

  const bannerPosition = consentSettings?.banner_position || 'bottom';
  const bannerTheme = consentSettings?.banner_theme || 'auto';
  const actualTheme = bannerTheme === 'auto' ? 
    (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : 
    bannerTheme;

  return (
    <BannerContainer 
      className={`${className} ${isVisible ? 'visible' : ''}`}
      position={bannerPosition}
      theme={actualTheme}
      role={getAriaProperty('ConsentPatterns', 'consent_banner.role', 'dialog')}
      aria-label={getAriaProperty('ConsentPatterns', 'consent_banner.label', 'Cookie consent')}
      aria-modal="false"
      aria-live="polite"
      aria-describedby="consent-description"
    >
      <BannerContent>
        <BannerText id="consent-description">
          {consentSettings?.banner_text || 
            'We use cookies and similar technologies to analyze site usage and improve your experience. Some features may not work properly without cookies.'}
          {' '}
          {consentSettings?.privacy_policy_url && (
            <>
              Read our <a href={consentSettings.privacy_policy_url}>Privacy Policy</a>
            </>
          )}
          {consentSettings?.cookie_policy_url && (
            <>
              {' '}and <a href={consentSettings.cookie_policy_url}>Cookie Policy</a>
            </>
          )}
          .
          {/* Show cross-domain notice if enabled and there are multiple entity domains */}
          {consentSettings?.enable_cross_domain_consent && 
           consentSettings?.consent_domains && 
           consentSettings.consent_domains.length > 1 && (
            <>
              {' '}
              <br />
              <small style={{ opacity: 0.9 }}>
                Note: This site is part of {consentSettings.consent_domains.length} domains 
                operated by the same entity ({consentSettings.consent_domains.join(', ')}). 
                Consent must be provided separately on each domain due to browser security.
              </small>
            </>
          )}
        </BannerText>
        <ButtonContainer>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleDecline}
            aria-label="Decline all cookies and tracking"
          >
            {consentSettings?.decline_button_text || 'Decline All'}
          </Button>
          {/* Show settings button if granular control is enabled */}
          {consentSettings?.enable_granular_control && onOpenSettings && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onOpenSettings}
              aria-label="Manage cookie preferences and settings"
            >
              {consentSettings?.settings_button_text || 'Manage Settings'}
            </Button>
          )}
          <Button 
            variant="primary" 
            size="sm" 
            onClick={handleAccept}
            aria-label="Accept all cookies and tracking"
            id="consent-accept-all"
          >
            {consentSettings?.accept_button_text || 'Accept All'}
          </Button>
        </ButtonContainer>
      </BannerContent>
    </BannerContainer>
  );
};

export default ConsentBanner;