/**
 * Cookie Consent Banner for Website Ecosystem
 * 
 * LEGALLY REQUIRED: EU law mandates explicit consent BEFORE loading analytics
 * Reference: €1.34M fine example for non-compliance
 * 
 * This template implements:
 * - Cookie consent banner that blocks GA/FB Pixel until consent
 * - Google Consent Mode v2 (required by March 2024)
 * - localStorage for consent state persistence
 * 
 * Configuration is passed from Jekyll as consentConfig object
 */

(function() {
  'use strict';
  
  // Default configuration (overridden by Jekyll)
  const config = window.consentConfig || {
    cookieName: 'analytics_consent',
    durationDays: 365,
    bannerText: 'We use cookies to analyze site traffic and improve your experience. By continuing to use this site, you consent to our use of cookies.',
    acceptText: 'Accept',
    declineText: 'Decline',
    privacyUrl: '/privacy/',
    cookieUrl: '/cookies/',
    googleConsentMode: true
  };
  
  // Check if consent has already been given
  function hasConsent() {
    const consent = localStorage.getItem(config.cookieName);
    if (!consent) return null;
    
    try {
      const data = JSON.parse(consent);
      const now = new Date().getTime();
      
      // Check if consent has expired
      if (data.expires && now > data.expires) {
        localStorage.removeItem(config.cookieName);
        return null;
      }
      
      return data.value;
    } catch (e) {
      return null;
    }
  }
  
  // Store consent decision
  function setConsent(value) {
    const expires = new Date().getTime() + (config.durationDays * 24 * 60 * 60 * 1000);
    const data = {
      value: value,
      expires: expires,
      timestamp: new Date().toISOString()
    };
    
    localStorage.setItem(config.cookieName, JSON.stringify(data));
    
    // Update Google Consent Mode if enabled
    if (config.googleConsentMode && window.gtag) {
      updateGoogleConsent(value);
    }
    
    // Trigger custom event for other scripts to listen to
    window.dispatchEvent(new CustomEvent('consentUpdated', { detail: value }));
  }
  
  // Update Google Consent Mode v2
  function updateGoogleConsent(granted) {
    if (!window.gtag) return;
    
    gtag('consent', 'update', {
      'ad_storage': granted ? 'granted' : 'denied',
      'analytics_storage': granted ? 'granted' : 'denied',
      'ad_user_data': granted ? 'granted' : 'denied',
      'ad_personalization': granted ? 'granted' : 'denied'
    });
  }
  
  // Initialize Google Consent Mode v2 (default to denied)
  function initGoogleConsent() {
    if (!window.gtag) {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function() { dataLayer.push(arguments); };
    }
    
    gtag('consent', 'default', {
      'ad_storage': 'denied',
      'analytics_storage': 'denied',
      'ad_user_data': 'denied',
      'ad_personalization': 'denied',
      'wait_for_update': 500
    });
  }
  
  // Create and show consent banner
  function showBanner() {
    // Don't show if already has consent decision
    const consent = hasConsent();
    if (consent !== null) {
      if (config.googleConsentMode) {
        updateGoogleConsent(consent);
      }
      return;
    }
    
    // Create banner HTML
    const banner = document.createElement('div');
    banner.id = 'cookie-consent-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Cookie consent');
    banner.innerHTML = `
      <div class="cookie-consent-content">
        <p class="cookie-consent-text">
          ${config.bannerText}
          <a href="${config.privacyUrl}" target="_blank" rel="noopener">Privacy Policy</a> | 
          <a href="${config.cookieUrl}" target="_blank" rel="noopener">Cookie Policy</a>
        </p>
        <div class="cookie-consent-buttons">
          <button id="cookie-consent-accept" class="btn btn-primary">
            ${config.acceptText}
          </button>
          <button id="cookie-consent-decline" class="btn btn-secondary">
            ${config.declineText}
          </button>
        </div>
      </div>
    `;
    
    // Add styles
    const styles = `
      <style>
        #cookie-consent-banner {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: var(--consent-bg, #1a1a1a);
          color: var(--consent-text, #ffffff);
          padding: 1.5rem;
          box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
          z-index: 9999;
          animation: slideUp 0.3s ease-out;
        }
        
        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        
        .cookie-consent-content {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }
        
        .cookie-consent-text {
          flex: 1;
          margin: 0;
          font-size: 0.95rem;
          line-height: 1.5;
        }
        
        .cookie-consent-text a {
          color: var(--consent-link, #4a9eff);
          text-decoration: underline;
        }
        
        .cookie-consent-buttons {
          display: flex;
          gap: 0.75rem;
        }
        
        .cookie-consent-buttons button {
          padding: 0.5rem 1.5rem;
          border: none;
          border-radius: 4px;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .btn-primary {
          background: var(--consent-accept-bg, #4a9eff);
          color: var(--consent-accept-text, #ffffff);
        }
        
        .btn-primary:hover {
          background: var(--consent-accept-hover, #3a8eef);
          transform: translateY(-1px);
        }
        
        .btn-secondary {
          background: var(--consent-decline-bg, #666666);
          color: var(--consent-decline-text, #ffffff);
        }
        
        .btn-secondary:hover {
          background: var(--consent-decline-hover, #555555);
          transform: translateY(-1px);
        }
        
        @media (max-width: 768px) {
          .cookie-consent-content {
            flex-direction: column;
            text-align: center;
          }
          
          .cookie-consent-buttons {
            width: 100%;
            justify-content: center;
          }
        }
        
        /* Accessibility - Focus styles */
        #cookie-consent-banner button:focus {
          outline: 2px solid var(--consent-focus, #4a9eff);
          outline-offset: 2px;
        }
        
        /* Dark mode support */
        @media (prefers-color-scheme: dark) {
          #cookie-consent-banner {
            background: var(--consent-bg-dark, #1a1a1a);
            color: var(--consent-text-dark, #ffffff);
          }
        }
      </style>
    `;
    
    // Add styles to head
    document.head.insertAdjacentHTML('beforeend', styles);
    
    // Add banner to body
    document.body.appendChild(banner);
    
    // Handle button clicks
    document.getElementById('cookie-consent-accept').addEventListener('click', function() {
      setConsent(true);
      hideBanner();
      loadAnalytics();
    });
    
    document.getElementById('cookie-consent-decline').addEventListener('click', function() {
      setConsent(false);
      hideBanner();
    });
    
    // Handle escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && document.getElementById('cookie-consent-banner')) {
        setConsent(false);
        hideBanner();
      }
    });
  }
  
  // Hide consent banner
  function hideBanner() {
    const banner = document.getElementById('cookie-consent-banner');
    if (banner) {
      banner.style.animation = 'slideDown 0.3s ease-out';
      banner.style.animationFillMode = 'forwards';
      setTimeout(() => banner.remove(), 300);
    }
  }
  
  // Load analytics scripts (GA and FB Pixel)
  function loadAnalytics() {
    // Google Analytics
    if (window.GA_TRACKING_ID && !window.ga) {
      const gaScript = document.createElement('script');
      gaScript.async = true;
      gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${window.GA_TRACKING_ID}`;
      document.head.appendChild(gaScript);
      
      gaScript.onload = function() {
        window.dataLayer = window.dataLayer || [];
        window.gtag = function() { dataLayer.push(arguments); };
        gtag('js', new Date());
        gtag('config', window.GA_TRACKING_ID, {
          'anonymize_ip': true,
          'cookie_flags': 'SameSite=None;Secure'
        });
      };
    }
    
    // Facebook Pixel
    if (window.META_PIXEL_ID && !window.fbq) {
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', window.META_PIXEL_ID);
      fbq('track', 'PageView');
    }
  }
  
  // Initialize on DOM ready
  function init() {
    // Initialize Google Consent Mode first
    if (config.googleConsentMode) {
      initGoogleConsent();
    }
    
    // Check existing consent
    const consent = hasConsent();
    
    if (consent === true) {
      // User has consented, load analytics
      if (config.googleConsentMode) {
        updateGoogleConsent(true);
      }
      loadAnalytics();
    } else if (consent === false) {
      // User has declined, update consent mode only
      if (config.googleConsentMode) {
        updateGoogleConsent(false);
      }
    } else {
      // No consent decision yet, show banner
      showBanner();
    }
  }
  
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
  // Export functions for external use
  window.cookieConsent = {
    hasConsent: hasConsent,
    setConsent: setConsent,
    showBanner: showBanner,
    reset: function() {
      localStorage.removeItem(config.cookieName);
      location.reload();
    }
  };
})();