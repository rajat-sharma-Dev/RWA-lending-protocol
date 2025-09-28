import { TrendingUp, Shield, Zap, Globe2, Users, BarChart3 } from 'lucide-react'

const Benefits = () => {
  const benefits = [
    {
      icon: TrendingUp,
      title: "Competitive Returns",
      description: "Access institutional-grade investments with attractive yield opportunities and consistent performance.",
      stats: "8-12% APY"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Multi-signature wallets, audited smart contracts, and insurance coverage protect your investments.",
      stats: "$100M+ Insured"
    },
    {
      icon: Zap,
      title: "Instant Liquidity",
      description: "Trade your tokenized assets 24/7 with immediate settlement and minimal slippage.",
      stats: "< 1s Settlement"
    },
    {
      icon: Globe2,
      title: "Global Access",
      description: "Invest in premium real-world assets from anywhere in the world without geographical restrictions.",
      stats: "45+ Countries"
    },
    {
      icon: Users,
      title: "Community Governance",
      description: "Participate in platform decisions and vote on new asset listings through decentralized governance.",
      stats: "150K+ Voters"
    },
    {
      icon: BarChart3,
      title: "Transparent Analytics",
      description: "Real-time portfolio tracking, detailed performance metrics, and comprehensive reporting tools.",
      stats: "Live Data"
    }
  ]

  return (
    <section id="benefits" className="section-padding relative overflow-hidden">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-20 animate-fade-in">
          <div className="badge-primary inline-flex items-center px-4 py-2 mb-8">
            <BarChart3 className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">Platform Benefits</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-8">
            Why Choose <span className="gradient-text">RWA Vault</span>
          </h2>
          
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Experience the next generation of asset management with institutional-grade security, 
            transparency, and accessibility.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {benefits.map((benefit, index) => (
            <div 
              key={benefit.title}
              className="card hover-scale animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-accent-primary to-accent-secondary rounded-lg flex items-center justify-center">
                  <benefit.icon className="w-6 h-6 text-white" />
                </div>
                <div className="badge-success">
                  {benefit.stats}
                </div>
              </div>
              
              <h3 className="text-xl font-heading font-semibold mb-4 text-text-primary">
                {benefit.title}
              </h3>
              
              <p className="text-text-secondary leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center animate-fade-in">
          <div className="card-elevated p-12 max-w-4xl mx-auto">
            <h3 className="text-3xl font-display font-bold mb-6 gradient-text">
              Ready to Get Started?
            </h3>
            <p className="text-lg text-text-secondary mb-8 leading-relaxed">
              Join thousands of investors who are already benefiting from tokenized real-world assets. 
              Start your journey with as little as $100.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary px-8 py-4 text-lg font-semibold">
                Launch App
              </button>
              <button className="btn-secondary px-8 py-4 text-lg font-semibold">
                View Documentation
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Benefits
