import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Zap, Menu, X } from 'lucide-react'
import { useState } from 'react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-strong border-b border-border-primary">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center space-x-4 animate-fade-in">
          <div className="relative group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center hover-glow transition-all duration-300">
              <Zap className="w-5 h-5 text-white" />
            </div>
          </div>
          <div>
            <span className="text-2xl font-display font-bold gradient-text">
              RWA Vault
            </span>
            <div className="text-xs text-text-muted font-mono tracking-wider">
              PROFESSIONAL DEFI
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-2">
          {[
            { name: 'About', href: '#about' },
            { name: 'How to Use', href: '#how-to-use' },
            { name: 'Benefits', href: '#benefits' },
            { name: 'Ecosystem', href: '#ecosystem' }
          ].map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="nav-link"
            >
              {item.name}
            </a>
          ))}
              
              {/* Hover effect */}
        </nav>

        {/* Wallet Connection & Mobile Menu */}
        <div className="flex items-center space-x-4">
          {/* Professional Connect Button Wrapper */}
          <div className="relative">
            <ConnectButton showBalance={false} />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-bg-card border border-border-primary hover:border-border-accent transition-colors"
          >
            {isMenuOpen ? (
              <X className="w-5 h-5 text-text-primary" />
            ) : (
              <Menu className="w-5 h-5 text-text-primary" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden glass-strong border-b border-border-primary animate-fade-in">
          <div className="max-w-7xl mx-auto px-6 py-4 space-y-2">
            {[
              { name: 'About', href: '#about' },
              { name: 'How to Use', href: '#how-to-use' },
              { name: 'Benefits', href: '#benefits' },
              { name: 'Ecosystem', href: '#ecosystem' }
            ].map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="nav-link block"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
