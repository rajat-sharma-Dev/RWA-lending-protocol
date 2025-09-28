import { Building, DollarSign, Globe, Users, Shield, Zap, Database } from 'lucide-react'

const About = () => {
  return (
    <section id="about" className="section-padding relative overflow-hidden">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-20 animate-fade-in">
          <div className="badge-primary inline-flex items-center px-4 py-2 mb-8">
            <Database className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">About Our Platform</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-8">
            About <span className="gradient-text">RWA Vault</span>
          </h2>
          
          <p className="text-xl text-text-secondary max-w-4xl mx-auto leading-relaxed">
            We're revolutionizing traditional finance by tokenizing real-world assets and making them
            accessible to everyone through decentralized protocols.
          </p>
        </div>

        {/* Key Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {[
            {
              icon: Building,
              title: "Real Estate Tokenization",
              description: "Transform physical properties into liquid digital assets with fractional ownership capabilities.",
              color: "text-accent-primary"
            },
            {
              icon: DollarSign,
              title: "Stable Value Preservation",
              description: "Maintain asset value through professional management and transparent pricing mechanisms.",
              color: "text-accent-success"
            },
            {
              icon: Globe,
              title: "Global Accessibility",
              description: "Access international markets and investment opportunities from anywhere in the world.",
              color: "text-accent-secondary"
            },
            {
              icon: Users,
              title: "Community Governance",
              description: "Participate in decision-making processes through our decentralized governance protocol.",
              color: "text-accent-warning"
            },
            {
              icon: Shield,
              title: "Enterprise Security",
              description: "Bank-grade security protocols protect your assets with multi-signature wallets and audited smart contracts.",
              color: "text-accent-primary"
            },
            {
              icon: Zap,
              title: "Instant Liquidity",
              description: "Trade tokenized assets 24/7 with immediate settlement and competitive spreads.",
              color: "text-accent-success"
            }
          ].map((feature, index) => (
            <div key={feature.title} className="card hover-scale animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className={`${feature.color} mb-4`}>
                <feature.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-heading font-semibold mb-4 text-text-primary">{feature.title}</h3>
              <p className="text-text-secondary leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Stats and Achievements */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 card-elevated p-8 animate-fade-in">
          {[
            { label: "Assets Under Management", value: "$2.1B+", suffix: "" },
            { label: "Total Transactions", value: "500K+", suffix: "" },
            { label: "Global Users", value: "150K+", suffix: "" },
            { label: "Supported Countries", value: "45", suffix: "+" }
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-display font-bold gradient-text mb-2">
                {stat.value}{stat.suffix}
              </div>
              <div className="text-sm text-text-muted">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Mission Statement */}
        <div className="text-center mt-20 animate-fade-in">
          <div className="max-w-3xl mx-auto card p-12">
            <h3 className="text-2xl font-display font-bold mb-6 gradient-text">Our Mission</h3>
            <p className="text-lg text-text-secondary leading-relaxed">
              To democratize access to real-world assets by creating a transparent, secure, and efficient 
              platform that bridges traditional finance with decentralized technology. We believe everyone 
              should have the opportunity to invest in high-quality assets regardless of their location or 
              financial background.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
