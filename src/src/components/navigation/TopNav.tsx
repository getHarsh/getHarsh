import React, { useState } from 'react'
import { Link } from 'gatsby'
import { Menu, X } from 'lucide-react'
import { useConfig } from '@/hooks/useConfig'
import { buildCrossDomainUrl } from '@/lib/utils'

interface TopNavProps {
  variant?: 'domain' | 'blog' | 'project' | 'docs' | 'sponsor'
}

export const TopNav: React.FC<TopNavProps> = ({ variant = 'domain' }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const config = useConfig()
  
  // Get navigation items based on variant
  const getNavItems = () => {
    const { features, sponsor } = config
    const servicesEnabled = features?.services_enabled
    const sponsorEnabled = sponsor?.enabled
    const currentDomain = config.domain_info?.domain || ''

    switch (variant) {
      case 'domain':
        return {
          left: [{ label: 'Home', href: '/' }],
          right: [
            { label: 'About', href: '/about' },
            ...(servicesEnabled ? [{ label: 'Services', href: '/services/' }] : [])
          ]
        }
      
      case 'blog':
        return {
          left: [{ label: 'Home', href: buildCrossDomainUrl('/', currentDomain, undefined) }],
          right: [
            { label: 'Articles', href: '/' },
            { label: 'Highlights', href: buildCrossDomainUrl('/projects', currentDomain, undefined) },
            { label: 'Connect', href: buildCrossDomainUrl('/contact', currentDomain, undefined) },
            ...(servicesEnabled ? [{ label: 'Services', href: buildCrossDomainUrl('/services/', currentDomain, undefined) }] : [])
          ]
        }
      
      case 'project':
        return {
          left: [
            { label: 'Home', href: buildCrossDomainUrl('/', currentDomain, undefined) },
            { label: 'Projects', href: buildCrossDomainUrl('/projects', currentDomain, undefined) }
          ],
          right: [
            { label: 'Docs', href: '/docs/', disabled: !config.project?.docs_enabled },
            { label: 'Thoughts', href: buildCrossDomainUrl('/', currentDomain, 'blog') },
            ...(servicesEnabled ? [{ label: 'Services', href: buildCrossDomainUrl('/services/', currentDomain, undefined) }] : []),
            ...(sponsorEnabled ? [{ label: 'Sponsor', href: buildCrossDomainUrl('/sponsor', currentDomain, undefined) }] : [])
          ].filter(item => !item.disabled)
        }
      
      case 'docs': {
        const projectName = config.project?.name || ''
        return {
          left: [
            { label: 'Home', href: buildCrossDomainUrl('/', currentDomain, undefined) },
            { label: projectName, href: '/' }
          ],
          right: [
            { label: 'Thoughts', href: buildCrossDomainUrl('/', currentDomain, 'blog') },
            ...(servicesEnabled ? [{ label: 'Services', href: buildCrossDomainUrl('/services/', currentDomain, undefined) }] : []),
            ...(sponsorEnabled ? [{ label: 'Sponsor', href: buildCrossDomainUrl('/sponsor', currentDomain, undefined) }] : [])
          ]
        }
      }
      
      case 'sponsor':
        return {
          left: [{ label: 'Back', href: '#', onClick: () => window.history.back() }],
          right: [{ label: 'About', href: '/about' }]
        }
      
      default:
        return { left: [], right: [] }
    }
  }

  const { left, right } = getNavItems()

  return (
    <nav className="sticky top-0 z-40 bg-bg-glass backdrop-blur-xl border-b border-accent-primary/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left Navigation */}
          <div className="flex items-center space-x-8">
            {left.map((item, index) => (
              <React.Fragment key={item.label}>
                {'onClick' in item && item.onClick ? (
                  <button
                    onClick={'onClick' in item ? item.onClick : undefined}
                    className="font-mono text-sm hover:text-accent-primary transition-colors"
                  >
                    {item.label}
                  </button>
                ) : (
                  <Link
                    to={item.href}
                    className="font-mono text-sm hover:text-accent-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
                {index < left.length - 1 && (
                  <span className="text-accent-primary/40">|</span>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Desktop Right Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {right.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="font-mono text-sm hover:text-accent-primary transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-accent-primary/10 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-bg-glass backdrop-blur-xl border-b border-accent-primary/20">
          <div className="container mx-auto px-4 py-4 space-y-3">
            {right.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="block font-mono text-sm hover:text-accent-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}