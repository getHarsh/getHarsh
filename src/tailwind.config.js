/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        // Map CSS variables to Tailwind utilities
        bg: {
          primary: 'var(--color-bg-primary)',
          glass: 'var(--color-bg-glass)',
        },
        accent: {
          primary: 'var(--color-accent-primary)',
          secondary: 'var(--color-accent-secondary)',
        },
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'monospace'],
        body: ['var(--font-body)', 'monospace'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      fontSize: {
        // Fluid typography scale from design system
        'xs': 'var(--text-xs)',
        'sm': 'var(--text-sm)',
        'base': 'var(--text-base)',
        'lg': 'var(--text-lg)',
        'xl': 'var(--text-xl)',
        '2xl': 'var(--text-2xl)',
        '3xl': 'var(--text-3xl)',
        '4xl': 'var(--text-4xl)',
        '5xl': 'var(--text-5xl)',
      },
      lineHeight: {
        'tight': 'var(--leading-tight)',
        'snug': 'var(--leading-snug)',
        'normal': 'var(--leading-normal)',
        'relaxed': 'var(--leading-relaxed)',
        'loose': 'var(--leading-loose)',
        'body': 'var(--leading-body)',
      },
      letterSpacing: {
        'tighter': 'var(--tracking-tighter)',
        'tight': 'var(--tracking-tight)',
        'normal': 'var(--tracking-normal)',
        'wide': 'var(--tracking-wide)',
        'wider': 'var(--tracking-wider)',
        'widest': 'var(--tracking-widest)',
        'mono': 'var(--tracking-mono)',
      },
      spacing: {
        '1': 'var(--space-1)',
        '2': 'var(--space-2)',
        '3': 'var(--space-3)',
        '4': 'var(--space-4)',
        '5': 'var(--space-5)',
        '6': 'var(--space-6)',
        '8': 'var(--space-8)',
        '10': 'var(--space-10)',
        '12': 'var(--space-12)',
        '16': 'var(--space-16)',
        '20': 'var(--space-20)',
      },
      maxWidth: {
        'content-narrow': 'var(--content-narrow)',
        'content-wide': 'var(--content-wide)',
        'content-full': 'var(--content-full)',
      },
      backdropBlur: {
        'glass': 'var(--glass-blur)',
        'depth-1': 'var(--depth-1-blur)',
        'depth-2': 'var(--depth-2-blur)',
        'depth-3': 'var(--depth-3-blur)',
        'depth-4': 'var(--depth-4-blur)',
      },
      opacity: {
        'glass': 'var(--glass-opacity)',
        'depth-0': 'var(--depth-0-opacity)',
        'depth-1': 'var(--depth-1-opacity)',
        'depth-2': 'var(--depth-2-opacity)',
        'depth-3': 'var(--depth-3-opacity)',
        'depth-4': 'var(--depth-4-opacity)',
      },
      boxShadow: {
        'depth-0': 'var(--depth-0-shadow)',
        'depth-1': 'var(--depth-1-shadow)',
        'depth-2': 'var(--depth-2-shadow)',
        'depth-3': 'var(--depth-3-shadow)',
        'depth-4': 'var(--depth-4-shadow)',
      },
      borderRadius: {
        'terminal': '3px',
      },
      animation: {
        'fadeIn': 'fadeIn 0.3s ease-out forwards',
        'fadeInUp': 'fadeInUp 0.5s ease-out forwards',
        'slideInFromLeft': 'slideInFromLeft 0.3s ease-out forwards',
        'shimmer': 'shimmer 2s linear infinite',
        'rotate-gradient': 'rotateGradient 10s ease infinite',
      },
      keyframes: {
        fadeIn: {
          from: { 
            opacity: '0',
            transform: 'translateY(10px)',
          },
          to: { 
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        fadeInUp: {
          from: {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        slideInFromLeft: {
          from: {
            opacity: '0',
            transform: 'translateX(-20px)',
          },
          to: {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        shimmer: {
          '0%': {
            backgroundPosition: '-200% center',
          },
          '100%': {
            backgroundPosition: '200% center',
          },
        },
        rotateGradient: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}