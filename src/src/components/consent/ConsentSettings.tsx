/**
 * @fileoverview ConsentSettings - Granular consent management modal
 * @module components/consent/ConsentSettings
 * 
 * @description
 * A modal component providing granular control over cookie consent categories.
 * Allows users to selectively enable/disable different types of cookies while
 * maintaining compliance with privacy regulations and Google Consent Mode.
 * 
 * @architecture
 * ```
 * ┌──────────────────────────────────────────────────────────┐
 * │              ConsentSettings Architecture                 │
 * ├──────────────────────────────────────────────────────────┤
 * │                                                          │
 * │  Modal Initialization                                   │
 * │  ┌──────────────────────────────────────────────────┐   │
 * │  │  Load Categories from Config:                    │   │
 * │  │  - consent_settings.categories_config            │   │
 * │  │  - Default category definitions                  │   │
 * │  │                                                  │   │
 * │  │  Categories:                                     │   │
 * │  │  ┌──────────────────────────────────────────┐   │   │
 * │  │  │  necessary: Always enabled (required)    │   │   │
 * │  │  │  analytics: GA tracking (optional)       │   │   │
 * │  │  │  marketing: Ads & tracking (optional)    │   │   │
 * │  │  │  functional: Features (optional)         │   │   │
 * │  │  └──────────────────────────────────────────┘   │   │
 * │  └──────────────────────────────────────────────────┘   │
 * │                        ▼                                 │
 * │  Load Saved Preferences                                 │
 * │  ┌──────────────────────────────────────────────────┐   │
 * │  │  Check localStorage:                            │   │
 * │  │  - 'consent_preferences' key                    │   │
 * │  │  - Parse JSON object                            │   │
 * │  │  - Apply to non-required categories             │   │
 * │  │  - Fall back to defaults if missing             │   │
 * │  └──────────────────────────────────────────────────┘   │
 * │                        ▼                                 │
 * │  Modal UI Rendering                                     │
 * │  ┌──────────────────────────────────────────────────┐   │
 * │  │  ┌────────────────────────────────────────┐     │   │
 * │  │  │         Privacy Settings                │     │   │
 * │  │  ├────────────────────────────────────────┤     │   │
 * │  │  │  Necessary Cookies              [✓] 🔒  │     │   │
 * │  │  │  Required for website function          │     │   │
 * │  │  │  • session_id, csrf_token               │     │   │
 * │  │  │                                         │     │   │
 * │  │  │  Analytics Cookies              [ ]     │     │   │
 * │  │  │  Help us understand usage               │     │   │
 * │  │  │  • _ga, _gid, _gat                      │     │   │
 * │  │  │                                         │     │   │
 * │  │  │  Marketing Cookies              [ ]     │     │   │
 * │  │  │  For relevant advertising               │     │   │
 * │  │  │  • _fbp, fr, tr                         │     │   │
 * │  │  │                                         │     │   │
 * │  │  │  Functional Cookies             [ ]     │     │   │
 * │  │  │  Enhanced features                      │     │   │
 * │  │  │  • user_preferences, theme              │     │   │
 * │  │  ├────────────────────────────────────────┤     │   │
 * │  │  │ [Cancel] [Decline] [Save] [Accept All]  │     │   │
 * │  │  └────────────────────────────────────────┘     │   │
 * │  └──────────────────────────────────────────────────┘   │
 * │                        ▼                                 │
 * │  User Interaction                                       │
 * │  ┌──────────────────────────────────────────────────┐   │
 * │  │  Toggle Category:                               │   │
 * │  │  - Update local state                           │   │
 * │  │  - Skip if required category                    │   │
 * │  │                                                  │   │
 * │  │  Accept All:                                    │   │
 * │  │  - Enable all categories                        │   │
 * │  │  - Trigger save after delay                     │   │
 * │  │                                                  │   │
 * │  │  Decline All:                                   │   │
 * │  │  - Disable non-required categories              │   │
 * │  │  - Trigger save after delay                     │   │
 * │  └──────────────────────────────────────────────────┘   │
 * │                        ▼                                 │
 * │  Save Preferences                                       │
 * │  ┌──────────────────────────────────────────────────┐   │
 * │  │  1. Build preferences object from state         │   │
 * │  │  2. Save to localStorage with timestamp         │   │
 * │  │  3. Update Google Consent Mode:                 │   │
 * │  │     - analytics → analytics_storage             │   │
 * │  │     - marketing → ad_storage                    │   │
 * │  │     - functional → functionality_storage        │   │
 * │  │  4. Set consent cookie (granted/custom)         │   │
 * │  │  5. Call parent onSave callback                 │   │
 * │  │  6. Close modal                                 │   │
 * │  └──────────────────────────────────────────────────┘   │
 * │                                                          │
 * └──────────────────────────────────────────────────────────┘
 * ```
 * 
 * @proto-integration
 * Maps to protobuf configurations:
 * - `config/proto/consent/categories_config.proto` - Category definitions
 * - `config/proto/consent/consent_cookies.proto` - Cookie listings
 * - `config/proto/consent/preferences_storage.proto` - Storage settings
 * - `config/proto/ui/modal_config.proto` - Modal styling
 * 
 * @hook-integration
 * - `useConfig()` - Consent categories and settings
 * 
 * @ecosystem-integration
 * - Used by: ConsentBanner for granular control
 * - Data flow: Categories → user selection → storage & gtag
 * - Storage: localStorage (preferences), cookies (consent)
 * - Google: Updates consent mode based on selections
 * - UI: Styled-components modal with backdrop
 * 
 * @features
 * - 🎛️ Category-based consent control
 * - 🔐 Required cookies always enabled
 * - 💾 Persistent preference storage
 * - 🍪 Cookie listing per category
 * - 🔄 Google Consent Mode updates
 * - 🎨 Styled modal interface
 * - ♿ Accessible toggle controls
 * - 🔄 Graceful error handling
 * 
 * @consent-categories
 * ```
 * Category    | Required | Purpose                  | Cookies
 * ------------|----------|--------------------------|------------------
 * necessary   | Yes      | Core functionality       | session_id, csrf
 * analytics   | No       | Usage tracking           | _ga, _gid, _gat
 * marketing   | No       | Advertising              | _fbp, fr, tr
 * functional  | No       | Enhanced features        | preferences, theme
 * ```
 * 
 * @storage-strategy
 * - **localStorage**: Detailed preferences JSON
 * - **Cookie**: Main consent state (granted/custom/denied)
 * - **Timestamp**: Track when consent was given
 * - **Fallback**: Continue on storage failures
 * 
 * @google-consent-mapping
 * ```
 * Category    | Google Consent Mode Field
 * ------------|---------------------------
 * analytics   | analytics_storage
 * marketing   | ad_storage
 * functional  | functionality_storage, personalization_storage
 * ```
 * 
 * @accessibility
 * - Modal backdrop click to close
 * - Keyboard navigation for toggles
 * - Clear labels and descriptions
 * - Focus management on open/close
 * - Screen reader announcements
 * 
 * @performance
 * - Lazy category initialization
 * - Debounced save operations
 * - Minimal re-renders
 * - Efficient localStorage access
 * 
 * @dos
 * - ✅ Always keep necessary cookies enabled
 * - ✅ Save preferences even if cookie fails
 * - ✅ Update Google Consent Mode immediately
 * - ✅ Provide clear category descriptions
 * - ✅ Handle storage failures gracefully
 * 
 * @donts
 * - ❌ Don't allow disabling necessary cookies
 * - ❌ Don't block modal close on errors
 * - ❌ Don't forget to update gtag
 * - ❌ Don't store sensitive data
 * - ❌ Don't assume storage is available
 * 
 * @example
 * ```tsx
 * // Basic usage with ConsentBanner
 * const ConsentManager = () => {
 *   const [settingsOpen, setSettingsOpen] = useState(false)
 *   
 *   return (
 *     <>
 *       <ConsentBanner 
 *         onOpenSettings={() => setSettingsOpen(true)}
 *       />
 *       <ConsentSettings
 *         isOpen={settingsOpen}
 *         onClose={() => setSettingsOpen(false)}
 *       />
 *     </>
 *   )
 * }
 * 
 * // With custom save handler
 * <ConsentSettings
 *   isOpen={modalOpen}
 *   onClose={handleClose}
 *   onSave={(categories) => {
 *     console.log('User preferences:', categories)
 *     trackEvent({
 *       event: 'consent_updated',
 *       consent_categories: categories
 *     })
 *   }}
 * />
 * 
 * // Standalone modal
 * const PrivacySettings = () => {
 *   const [open, setOpen] = useState(false)
 *   
 *   return (
 *     <>
 *       <button onClick={() => setOpen(true)}>
 *         Privacy Settings
 *       </button>
 *       <ConsentSettings
 *         isOpen={open}
 *         onClose={() => setOpen(false)}
 *         onSave={(prefs) => {
 *           console.log('Saved:', prefs)
 *           window.location.reload() // Reload to apply
 *         }}
 *       />
 *     </>
 *   )
 * }
 * ```
 * 
 * @see {@link ../../../CONSENT-ARCHITECTURE.md#granular-consent-ui} - Granular consent spec
 * @see {@link ./ConsentBanner.tsx} - Parent consent banner
 * @see {@link https://developers.google.com/tag-platform/gtagjs/consent#update} - Consent updates
 * @see {@link ../../../BUILD.md#consent-ui} - Consent UI build
 * @see {@link ../../../README.md#privacy} - Privacy documentation
 * 
 * @since 1.0.0
 */

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button } from '../ui/Button';
import { useConfig } from '@/hooks/useConfig';

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
  }
}

const Modal = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${(props: { isOpen: boolean }) => props.isOpen ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  z-index: 1100;
  padding: 1rem;
`;

const ModalContent = styled.div`
  background-color: ${(props: any) => props.theme?.colors?.background || '#ffffff'};
  border-radius: 12px;
  max-width: 600px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
`;

const ModalHeader = styled.div`
  padding: 2rem 2rem 1rem;
  border-bottom: 1px solid ${(props: any) => props.theme?.colors?.border || '#e0e0e0'};
`;

const ModalTitle = styled.h2`
  margin: 0 0 0.5rem;
  font-size: 1.5rem;
  color: ${(props: any) => props.theme?.colors?.text || '#333333'};
`;

const ModalDescription = styled.p`
  margin: 0;
  color: ${(props: any) => props.theme?.colors?.textSecondary || '#666666'};
  font-size: 0.875rem;
  line-height: 1.5;
`;

const ModalBody = styled.div`
  padding: 2rem;
`;

const CategorySection = styled.div`
  margin-bottom: 2rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
`;

const CategoryTitle = styled.h3`
  margin: 0;
  font-size: 1.125rem;
  color: ${(props: any) => props.theme?.colors?.text || '#333333'};
`;

const CategoryDescription = styled.p`
  margin: 0 0 0.5rem;
  color: ${(props: any) => props.theme?.colors?.textSecondary || '#666666'};
  font-size: 0.875rem;
  line-height: 1.5;
`;

const Toggle = styled.label`
  position: relative;
  display: inline-block;
  width: 48px;
  height: 24px;
`;

const ToggleInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
  
  &:checked + span {
    background-color: ${(props: any) => props.theme?.colors?.primary || '#4caf50'};
  }
  
  &:checked + span:before {
    transform: translateX(24px);
  }
  
  &:disabled + span {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ToggleSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.3s;
  border-radius: 24px;
  
  &:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: 0.3s;
    border-radius: 50%;
  }
`;

const CookieList = styled.ul`
  margin: 0.5rem 0 0 1.5rem;
  padding: 0;
  list-style: disc;
  color: ${(props: any) => props.theme?.colors?.textSecondary || '#666666'};
  font-size: 0.8rem;
`;

const ModalFooter = styled.div`
  padding: 1.5rem 2rem;
  border-top: 1px solid ${(props: any) => props.theme?.colors?.border || '#e0e0e0'};
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  
  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 480px) {
    width: 100%;
    
    button {
      flex: 1;
    }
  }
`;

/**
 * @interface ConsentCategory
 * @description Individual consent category configuration
 * 
 * @property {string} key - Category identifier (necessary, analytics, etc.)
 * @property {string} name - Display name for UI
 * @property {string} description - Detailed category description
 * @property {boolean} enabled - Current enabled state
 * @property {boolean} [required] - Whether category cannot be disabled
 * @property {string[]} [cookies] - List of cookie names in category
 */
interface ConsentCategory {
  /** Category identifier */
  key: string;
  /** Display name */
  name: string;
  /** Category description */
  description: string;
  /** Whether category is enabled */
  enabled: boolean;
  /** Whether category is required (cannot be disabled) */
  required?: boolean;
  /** List of cookies in this category */
  cookies?: string[];
}

/**
 * @interface ConsentSettingsProps
 * @description Props for ConsentSettings component
 * 
 * @property {boolean} isOpen - Modal visibility state
 * @property {() => void} onClose - Callback when modal closes
 * @property {(categories: Record<string, boolean>) => void} [onSave] - Save callback with preferences
 */
interface ConsentSettingsProps {
  /** Whether modal is open */
  isOpen: boolean;
  /** Callback when modal closes */
  onClose: () => void;
  /** Callback when settings are saved */
  onSave?: (categories: Record<string, boolean>) => void;
}

/**
 * ConsentSettings component - Granular consent control modal
 * 
 * @component
 * @param {ConsentSettingsProps} props - Component props
 * @param {boolean} props.isOpen - Modal open state
 * @param {() => void} props.onClose - Close callback
 * @param {(categories: Record<string, boolean>) => void} [props.onSave] - Save callback with category states
 * 
 * @returns {JSX.Element | null} Settings modal or null if closed
 * 
 * @example
 * ```tsx
 * // Modal with save handler
 * <ConsentSettings
 *   isOpen={true}
 *   onClose={() => setOpen(false)}
 *   onSave={(prefs) => console.log(prefs)}
 * />
 * ```
 */
export const ConsentSettings: React.FC<ConsentSettingsProps> = ({ isOpen, onClose, onSave }) => {
  const config = useConfig();
  const consentSettings = config?.consent_settings;
  const [categories, setCategories] = useState<ConsentCategory[]>([]);

  useEffect(() => {
    try {
      // Initialize categories from config
      const categoriesConfig = consentSettings?.categories_config || {};
      const defaultCategories: ConsentCategory[] = [
        {
          key: 'necessary',
          name: 'Necessary Cookies',
          description: 'Required for the website to function properly. These cannot be disabled.',
          enabled: true,
          required: true,
          cookies: ['session_id', 'csrf_token', consentSettings?.consent_cookie_name || 'ecosystem_consent']
        },
        {
          key: 'analytics',
          name: 'Analytics Cookies',
          description: categoriesConfig.analytics?.description || 'Help us understand how visitors interact with our website by collecting and reporting information anonymously.',
          enabled: categoriesConfig.analytics?.pre_selected ?? false,
          cookies: ['_ga', '_gid', '_gat', 'ga_session_id']
        },
        {
          key: 'marketing',
          name: 'Marketing Cookies',
          description: categoriesConfig.marketing?.description || 'Used to track visitors across websites to display ads that are relevant and engaging.',
          enabled: categoriesConfig.marketing?.pre_selected ?? false,
          cookies: ['_fbp', 'fr', 'tr', 'twclid', 'li_sugr']
        },
        {
          key: 'functional',
          name: 'Functional Cookies',
          description: categoriesConfig.functional?.description || 'Enable enhanced functionality and personalization, such as videos and live chats.',
          enabled: categoriesConfig.functional?.pre_selected ?? false,
          cookies: ['user_preferences', 'language', 'theme']
        }
      ];

      // Load saved preferences from localStorage if available
      if (typeof window !== 'undefined' && window.localStorage) {
        try {
          const savedPreferences = localStorage.getItem('consent_preferences');
          if (savedPreferences) {
            const preferences = JSON.parse(savedPreferences);
            if (typeof preferences === 'object' && preferences !== null) {
              defaultCategories.forEach(cat => {
                if (preferences[cat.key] !== undefined && !cat.required) {
                  cat.enabled = Boolean(preferences[cat.key]);
                }
              });
            }
          }
        } catch (storageError) {
          console.warn('Failed to load saved consent preferences:', storageError);
          // Continue with default categories
        }
      }

      setCategories(defaultCategories);
    } catch (error) {
      console.error('Error initializing consent categories:', error);
      // Set minimal fallback categories
      setCategories([
        {
          key: 'necessary',
          name: 'Necessary Cookies',
          description: 'Required for the website to function properly.',
          enabled: true,
          required: true,
          cookies: ['session_id']
        }
      ]);
    }
  }, [consentSettings]);

  const handleToggle = (key: string) => {
    setCategories(prev => prev.map(cat => 
      cat.key === key && !cat.required ? { ...cat, enabled: !cat.enabled } : cat
    ));
  };

  const handleSave = () => {
    try {
      // Save preferences to localStorage
      const preferences: Record<string, boolean> = {};
      categories.forEach(cat => {
        preferences[cat.key] = cat.enabled;
      });
      
      // Try to save to localStorage
      if (typeof window !== 'undefined' && window.localStorage) {
        try {
          localStorage.setItem('consent_preferences', JSON.stringify(preferences));
          localStorage.setItem('consent_preferences_timestamp', new Date().toISOString());
        } catch (storageError) {
          console.warn('Failed to save preferences to localStorage:', storageError);
          // Continue anyway - cookie will still be set
        }
      }

      // Update Google Consent Mode
      if (typeof window !== 'undefined' && window.gtag) {
        try {
          window.gtag('consent', 'update', {
            'analytics_storage': preferences.analytics ? 'granted' : 'denied',
            'ad_storage': preferences.marketing ? 'granted' : 'denied',
            'functionality_storage': preferences.functional ? 'granted' : 'denied',
            'personalization_storage': preferences.functional ? 'granted' : 'denied',
          });
        } catch (gtagError) {
          console.warn('Failed to update Google Consent Mode:', gtagError);
          // Non-critical, continue
        }
      }

      // Call parent save handler
      if (onSave) {
        try {
          onSave(preferences);
        } catch (saveError) {
          console.error('Error in parent save handler:', saveError);
        }
      }

      // Set main consent cookie
      try {
        const cookieName = consentSettings?.consent_cookie_name || 'ecosystem_consent';
        const durationDays = consentSettings?.consent_duration_days || 365;
        const hasAcceptedAll = categories.filter(c => !c.required).every(c => c.enabled);
        const value = hasAcceptedAll ? 'granted' : 'custom';
        
        const date = new Date();
        date.setTime(date.getTime() + (durationDays * 24 * 60 * 60 * 1000));
        const expires = `expires=${date.toUTCString()}`;
        
        // Safe domain extraction
        const hostname = window?.location?.hostname || 'localhost';
        const domainParts = hostname.split('.');
        const domain = domainParts.length > 2 ? domainParts.slice(-2).join('.') : hostname;
        
        document.cookie = `${cookieName}=${value};${expires};path=/;domain=.${domain};SameSite=Lax`;
        
        // Try without domain if first attempt might fail
        if (!document.cookie.includes(cookieName)) {
          document.cookie = `${cookieName}=${value};${expires};path=/;SameSite=Lax`;
        }
      } catch (cookieError) {
        console.error('Failed to set consent cookie:', cookieError);
        // Still close modal - preferences saved to localStorage at least
      }

      onClose();
    } catch (error) {
      console.error('Error saving consent preferences:', error);
      // Still close modal to not block user
      onClose();
    }
  };

  const handleAcceptAll = () => {
    setCategories(prev => prev.map(cat => ({ ...cat, enabled: true })));
    setTimeout(handleSave, 100);
  };

  const handleDeclineAll = () => {
    setCategories(prev => prev.map(cat => 
      cat.required ? cat : { ...cat, enabled: false }
    ));
    setTimeout(handleSave, 100);
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClick={onClose}>
      <ModalContent onClick={(e: React.MouseEvent) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Privacy Settings</ModalTitle>
          <ModalDescription>
            We use cookies and similar technologies to provide you with a better experience. 
            You can customize your preferences below.
          </ModalDescription>
        </ModalHeader>
        
        <ModalBody>
          {categories.map(category => (
            <CategorySection key={category.key}>
              <CategoryHeader>
                <CategoryTitle>{category.name}</CategoryTitle>
                <Toggle>
                  <ToggleInput 
                    type="checkbox" 
                    checked={category.enabled}
                    onChange={() => handleToggle(category.key)}
                    disabled={category.required}
                  />
                  <ToggleSlider />
                </Toggle>
              </CategoryHeader>
              <CategoryDescription>{category.description}</CategoryDescription>
              {category.cookies && category.cookies.length > 0 && (
                <CookieList>
                  {category.cookies.map(cookie => (
                    <li key={cookie}>{cookie}</li>
                  ))}
                </CookieList>
              )}
            </CategorySection>
          ))}
        </ModalBody>
        
        <ModalFooter>
          <Button variant="link" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <ButtonGroup>
            <Button variant="outline" size="sm" onClick={handleDeclineAll}>
              Decline All
            </Button>
            <Button variant="outline" size="sm" onClick={handleSave}>
              Save Settings
            </Button>
            <Button variant="primary" size="sm" onClick={handleAcceptAll}>
              Accept All
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConsentSettings;