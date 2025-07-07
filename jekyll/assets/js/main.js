/**
 * Main JavaScript Entry Point
 * Initializes all component systems
 */

// Core systems
import './core/context-system.js';
import './core/analytics.js';
import './core/performance.js';

// Component behaviors
import './components/button.js';
import './components/navigation.js';
import './components/forms.js';

// Theme systems
import './theme-systems/theme-switcher.js';
import './theme-systems/animations.js';

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  console.log('Jekyll theme initialized');
  
  // Initialize context system
  const contextSystem = new window.ContextSystem();
  contextSystem.init();
});