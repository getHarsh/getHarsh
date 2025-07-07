/**
 * Button Component JavaScript
 * Handles button interactions and analytics
 */

class ButtonComponent {
  constructor(element) {
    this.element = element;
    this.init();
  }
  
  init() {
    // Add click tracking
    this.element.addEventListener('click', this.handleClick.bind(this));
  }
  
  handleClick(event) {
    // Analytics tracking placeholder
    if (window.analytics) {
      window.analytics.track('Button Click', {
        text: this.element.textContent,
        variant: this.element.dataset.variant
      });
    }
  }
}

// Auto-initialize all buttons
document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(btn => new ButtonComponent(btn));
});