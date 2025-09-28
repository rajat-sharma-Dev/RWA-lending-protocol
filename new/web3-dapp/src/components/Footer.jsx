import { Github, Twitter, MessageCircle, Mail, Zap, Globe, Shield, ExternalLink, ArrowUp } from 'lucide-react'

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative overflow-hidden border-t border-border-primary rounded-t-3xl bg-bg-card/80 shadow-2xl backdrop-blur-md mt-16">
      <div className="container py-16 rounded-xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="animate-fade-in">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-2xl font-display font-bold gradient-text">RWA Vault</span>
                <div className="text-xs text-text-muted font-mono tracking-wider">PROFESSIONAL DEFI</div>
              </div>
            </div>
            
            <p className="text-text-secondary leading-relaxed mb-6">
              Pioneering the future of real-world asset tokenization with professional-grade blockchain technology and transparent governance.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {[
                { icon: Twitter, href: '#', label: 'Twitter' },
                { icon: Github, href: '#', label: 'GitHub' },
                { icon: MessageCircle, href: '#', label: 'Discord' },
                { icon: Mail, href: '#', label: 'Email' }
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-bg-card border border-border-primary rounded-lg flex items-center justify-center hover:border-border-accent hover:bg-bg-elevated transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-text-secondary hover:text-accent-primary transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <h4 className="text-lg font-heading font-semibold mb-6 text-text-primary">Platform</h4>
            <ul className="space-y-3">
              {[
                { name: 'Dashboard', href: '#' },
                { name: 'Portfolio', href: '#' },
                { name: 'Marketplace', href: '#' },
                { name: 'Analytics', href: '#' },
                { name: 'Governance', href: '#' }
              ].map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-text-secondary hover:text-text-primary transition-colors duration-300">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h4 className="text-lg font-heading font-semibold mb-6 text-text-primary">Resources</h4>
            <ul className="space-y-3">
              {[
                { name: 'Documentation', href: '#' },
                { name: 'API Reference', href: '#' },
                { name: 'Help Center', href: '#' },
                { name: 'Security', href: '#' },
                { name: 'Blog', href: '#' }
              ].map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-text-secondary hover:text-text-primary transition-colors duration-300 flex items-center">
                    {link.name}
                    {['Documentation', 'API Reference'].includes(link.name) && (
                      <ExternalLink className="w-3 h-3 ml-1" />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <h4 className="text-lg font-heading font-semibold mb-6 text-text-primary">Company</h4>
            <ul className="space-y-3">
              {[
                { name: 'About Us', href: '#about' },
                { name: 'Careers', href: '#' },
                { name: 'Privacy Policy', href: '#' },
                { name: 'Terms of Service', href: '#' },
                { name: 'Contact', href: '#' }
              ].map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-text-secondary hover:text-text-primary transition-colors duration-300">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border-primary pt-8 flex flex-col md:flex-row justify-between items-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center space-x-6 mb-4 md:mb-0">
            <p className="text-text-muted text-sm">
              © 2024 RWA Vault. All rights reserved.
            </p>
            
            {/* Security Badges */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-bg-card border border-border-primary px-3 py-1 rounded-full">
                <Shield className="w-3 h-3 text-accent-success" />
                <span className="text-xs text-text-secondary">Audited</span>
              </div>
              <div className="flex items-center space-x-2 bg-bg-card border border-border-primary px-3 py-1 rounded-full">
                <Globe className="w-3 h-3 text-accent-primary" />
                <span className="text-xs text-text-secondary">Decentralized</span>
              </div>
            </div>
          </div>

          {/* Scroll to Top */}
          <button
            onClick={scrollToTop}
            className="w-10 h-10 bg-bg-card border border-border-primary rounded-lg flex items-center justify-center hover:border-border-accent hover:bg-bg-elevated transition-all duration-300 group"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5 text-text-secondary group-hover:text-accent-primary transition-colors" />
          </button>
        </div>
      </div>
    </footer>
  )
}

export default Footer
