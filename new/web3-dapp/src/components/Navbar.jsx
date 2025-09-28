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
    <header className="fixed top-0 left-0 right-0 z-50 glass-strong border-b border-border-primary w-full rounded-b-3xl">
      <div className="flex items-center justify-between px-8 py-4 w-full max-w-full rounded-full bg-bg-card/80 shadow-xl backdrop-blur-md">
        {/* Logo Section */}
        <div className="flex items-center space-x-4 animate-fade-in">
          <div className="relative group">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center hover-glow transition-all duration-300">
              <Zap className="w-6 h-6 text-white" />
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
        <nav className="hidden md:flex items-center space-x-3 ml-8 flex-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `nav-link relative px-6 py-3 rounded-full font-medium transition-all duration-300 ${
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
        {/* Connect Button */}
        <div className="ml-auto flex items-center gap-4">
          <ConnectButton showBalance={false} chainStatus="icon" />
        </div>
        {/* Mobile Menu Button */}
        <button className="md:hidden ml-4 p-2 rounded-full bg-bg-elevated border border-border-primary" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className="md:hidden bg-bg-card border-t border-border-primary px-8 py-4 w-full rounded-b-3xl">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `nav-link px-5 py-3 rounded-full font-medium transition-all duration-300 ${
                    isActive 
                      ? 'text-accent-primary bg-accent-primary/10 border border-accent-primary/20' 
                      : 'text-text-secondary hover:text-text-primary hover:bg-bg-secondary'
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </NavLink>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}

export default Navbar
