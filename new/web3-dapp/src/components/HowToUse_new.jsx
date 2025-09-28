import { Wallet, Search, ShoppingCart, TrendingUp, ArrowRight } from 'lucide-react'

const HowToUse = () => {
  const steps = [
    {
      number: "01",
      icon: Wallet,
      title: "Connect Wallet",
      description: "Connect your preferred Web3 wallet (MetaMask, WalletConnect, Coinbase Wallet) to get started.",
      details: [
        "Supported wallets: MetaMask, WalletConnect, Coinbase",
        "Secure connection with encrypted communication",
        "One-click setup process"
      ]
    },
    {
      number: "02", 
      icon: Search,
      title: "Browse Assets",
      description: "Explore our curated selection of tokenized real-world assets across various categories.",
      details: [
        "Real estate, commodities, bonds, and more",
        "Detailed asset information and analytics",
        "Risk assessment and performance history"
      ]
    },
    {
      number: "03",
      icon: ShoppingCart,
      title: "Invest Securely",
      description: "Purchase fractional ownership of assets with transparent pricing and instant settlement.",
      details: [
        "Minimum investment from $100",
        "Transparent fee structure",
        "Instant transaction confirmation"
      ]
    },
    {
      number: "04",
      icon: TrendingUp,
      title: "Earn & Manage",
      description: "Monitor your portfolio performance and earn regular returns from your investments.",
      details: [
        "Real-time portfolio tracking",
        "Automated yield distribution",
        "Comprehensive performance analytics"
      ]
    }
  ]

  return (
    <section id="how-to-use" className="section-padding relative overflow-hidden bg-bg-secondary">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-20 animate-fade-in">
          <div className="badge-primary inline-flex items-center px-4 py-2 mb-8">
            <ArrowRight className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">How It Works</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-8">
            Get Started in <span className="gradient-text">4 Simple Steps</span>
          </h2>
          
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Our streamlined process makes it easy for anyone to start investing in tokenized 
            real-world assets within minutes.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-12 mb-20">
          {steps.map((step, index) => (
            <div 
              key={step.number}
              className={`flex flex-col lg:flex-row items-center gap-12 animate-fade-in ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Step Content */}
              <div className="flex-1">
                <div className="flex items-center mb-6">
                  <div className="text-4xl font-display font-bold text-accent-primary/30 mr-4">
                    {step.number}
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-accent-primary to-accent-secondary rounded-lg flex items-center justify-center">
                    <step.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-2xl font-display font-bold text-text-primary">
                      {step.title}
                    </h3>
                  </div>
                </div>
                
                <p className="text-lg text-text-secondary mb-6 leading-relaxed">
                  {step.description}
                </p>
                
                <ul className="space-y-3">
                  {step.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-center text-text-secondary">
                      <div className="w-2 h-2 bg-accent-primary rounded-full mr-3 flex-shrink-0"></div>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Step Visual */}
              <div className="flex-1 flex justify-center">
                <div className="card w-full max-w-md p-8 hover-scale">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-accent-primary/20 to-accent-secondary/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <step.icon className="w-10 h-10 text-accent-primary" />
                    </div>
                    <h4 className="text-lg font-heading font-semibold mb-3 text-text-primary">
                      Step {step.number}
                    </h4>
                    <p className="text-text-muted text-sm">
                      {step.title}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Getting Started CTA */}
        <div className="text-center animate-fade-in">
          <div className="card-elevated p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-display font-bold mb-4 gradient-text">
              Ready to Begin?
            </h3>
            <p className="text-text-secondary mb-6">
              Start your journey into tokenized real-world assets today.
            </p>
            <button className="btn-primary px-8 py-4 text-lg font-semibold group">
              <span className="flex items-center">
                Get Started Now
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowToUse
