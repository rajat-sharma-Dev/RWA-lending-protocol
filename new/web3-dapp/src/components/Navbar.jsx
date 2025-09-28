import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Zap, Menu, X } from 'lucide-react'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Lend', path: '/lend' },
    { name: 'Borrow', path: '/borrow' },
    { name: 'Liquidate', path: '/liquidate' }
  ]

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
            <NavLink to="/dashboard" className="text-2xl font-display font-bold gradient-text hover:opacity-80 transition-opacity">
              RWA Vault
            </NavLink>
            <div className="text-xs text-text-muted font-mono tracking-wider">
              PROFESSIONAL DEFI
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-2">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `nav-link relative px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  isActive 
                    ? 'text-accent-primary bg-accent-primary/10 border border-accent-primary/20' 
                    : 'text-text-secondary hover:text-text-primary hover:bg-bg-secondary'
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
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
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `nav-link block px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    isActive 
                      ? 'text-accent-primary bg-accent-primary/10 border border-accent-primary/20' 
                      : 'text-text-secondary hover:text-text-primary hover:bg-bg-secondary'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
