import { useState } from 'react'
import { ArrowRight, Zap, Shield, TrendingUp } from 'lucide-react'

const Hero = () => {
  const [isConnected, setIsConnected] = useState(false)

  const connectWallet = () => {
    setIsConnected(true)
    console.log('Wallet connection initiated...')
  }

  return (
    <section className="min-h-screen relative flex items-center justify-center overflow-hidden pt-20 bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-primary">
      {/* Subtle Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-bg-primary/80 via-bg-secondary/60 to-bg-primary/80 blur-2xl opacity-80"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-12 gap-4 h-full">
            {Array.from({ length: 48 }).map((_, i) => (
              <div key={i} className="border-r border-border-primary"></div>
            ))}
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="text-center">
          {/* Professional Badge */}
          <div className="inline-flex items-center px-4 py-2 badge-primary mb-8 animate-fade-in glass-strong rounded-xl shadow-lg">
            <Zap className="w-4 h-4 mr-2 text-accent-primary" />
            <span className="text-sm font-medium">Professional DeFi Protocol</span>
          </div>
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-8 animate-fade-in gradient-text drop-shadow-xl" style={{ animationDelay: '0.2s' }}>
            The Future of{' '}
            <span className="gradient-text">Real World Assets</span>
          </h1>
          {/* Subheading */}
          <p className="text-xl md:text-2xl text-text-secondary max-w-4xl mx-auto mb-12 leading-relaxed animate-fade-in" style={{ animationDelay: '0.4s' }}>
            Bridge traditional finance with decentralized protocols. Unlock liquidity from real estate, 
            commodities, and bonds through our revolutionary tokenization platform.
          </p>
          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            {[
              { icon: Shield, text: "Bank-Grade Security" },
              { icon: Zap, text: "Instant Settlements" },
              { icon: TrendingUp, text: "Yield Opportunities" }
            ].map((item, i) => (
              <span key={i} className="inline-flex items-center px-4 py-2 rounded-full glass-strong border border-border-primary text-text-primary font-medium text-sm gap-2 shadow-md">
                <item.icon className="w-4 h-4 text-accent-primary" /> {item.text}
              </span>
            ))}
          </div>
          {/* Launch App Button */}
          <div className="flex flex-col items-center gap-4">
            <button
              className="btn-primary px-8 py-4 rounded-xl text-lg font-semibold shadow-xl hover:scale-105 transition-transform bg-gradient-to-br from-accent-primary to-accent-secondary"
              onClick={connectWallet}
            >
              Launch App <ArrowRight className="ml-2 w-5 h-5" />
            </button>
            <div className="mt-2">
              {/* Simulated ConnectButton */}
              <span className="inline-block px-4 py-2 rounded-lg bg-bg-elevated border border-border-primary text-text-secondary font-mono text-sm glass-strong">{isConnected ? 'Wallet Connected' : 'Connect Wallet'}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
