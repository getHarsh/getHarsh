/**
 * Theme Switcher Module
 * Handles theme switching and persistence
 */

class ThemeSwitcher {
  constructor() {
    this.currentTheme = this.getSavedTheme() || 'auto';
    this.init();
  }
  
  init() {
    this.applyTheme();
    this.bindEvents();
  }
  
  getSavedTheme() {
    return localStorage.getItem('theme');
  }
  
  saveTheme(theme) {
    localStorage.setItem('theme', theme);
  }
  
  applyTheme() {
    if (this.currentTheme === 'auto') {
      // Use system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    } else {
      document.documentElement.setAttribute('data-theme', this.currentTheme);
    }
  }
  
  bindEvents() {
    // Listen for theme toggle clicks
    const toggles = document.querySelectorAll('[data-theme-toggle]');
    toggles.forEach(toggle => {
      toggle.addEventListener('click', () => {
        this.currentTheme = toggle.dataset.themeToggle;
        this.saveTheme(this.currentTheme);
        this.applyTheme();
      });
    });
  }
}

// Initialize theme switcher
new ThemeSwitcher();