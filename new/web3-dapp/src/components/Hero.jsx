import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Zap, Shield, TrendingUp } from 'lucide-react'
import { useAccount, useReadContract } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import RegistrationCard from './RegistrationCard'
import UserRegistryABI from '../abis/UserRegistry.json'

const USER_REGISTRY_ADDRESS = '0x7ff9dcb2eb9e000e5f21a752ebd31c789e24765e'

const Hero = () => {
  const [showRegistrationCard, setShowRegistrationCard] = useState(false)
  const navigate = useNavigate()
  
  const { address, isConnected } = useAccount()

  // Check if user is registered
  const { data: isRegistered, refetch: refetchRegistration } = useReadContract({
    address: USER_REGISTRY_ADDRESS,
    abi: UserRegistryABI.abi,
    functionName: 'isRegistered',
    args: [address],
    enabled: !!address,
  })

  const handleLaunchApp = () => {
    if (!isConnected) {
      // Will be handled by ConnectButton
      return
    }
    
    if (isRegistered) {
      navigate('/dashboard')
    } else {
      setShowRegistrationCard(true)
    }
  }

  const handleRegistrationComplete = () => {
    refetchRegistration()
    setTimeout(() => {
      navigate('/dashboard')
    }, 1000)
  }

  return (
    <section className="min-h-screen relative flex items-center justify-center overflow-hidden pt-20">
      {/* Subtle Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-primary"></div>
      
      {/* Professional grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-12 gap-4 h-full">
          {Array.from({ length: 48 }).map((_, i) => (
            <div key={i} className="border-r border-border-primary"></div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center">
          {/* Professional Badge */}
          <div className="inline-flex items-center px-4 py-2 badge-primary mb-8 animate-fade-in">
            <Zap className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">Professional DeFi Protocol</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
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
              { icon: TrendingUp, text: "Competitive Returns" }
            ].map((feature) => (
              <div key={feature.text} className="flex items-center gap-2 bg-bg-card border border-border-primary px-4 py-2 rounded-full">
                <feature.icon className="w-4 h-4 text-accent-primary" />
                <span className="text-sm text-text-primary">{feature.text}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 animate-fade-in" style={{ animationDelay: '0.8s' }}>
            {!isConnected ? (
              <ConnectButton.Custom>
                {({
                  account,
                  chain,
                  openConnectModal,
                  authenticationStatus,
                  mounted,
                }) => {
                  const ready = mounted && authenticationStatus !== 'loading'
                  const connected =
                    ready &&
                    account &&
                    chain &&
                    (!authenticationStatus ||
                      authenticationStatus === 'authenticated')

                  return (
                    <div
                      {...(!ready && {
                        'aria-hidden': true,
                        'style': {
                          opacity: 0,
                          pointerEvents: 'none',
                          userSelect: 'none',
                        },
                      })}
                    >
                      {(() => {
                        if (!connected) {
                          return (
                            <button 
                              onClick={openConnectModal} 
                              className="btn-primary group px-8 py-4 text-lg font-semibold rounded-lg"
                            >
                              <div className="flex items-center gap-3">
                                <span>Connect Wallet</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                              </div>
                            </button>
                          )
                        }

                        return (
                          <button
                            onClick={handleLaunchApp}
                            className="btn-primary group px-8 py-4 text-lg font-semibold rounded-lg"
                          >
                            <div className="flex items-center gap-3">
                              <span>Launch App</span>
                              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                            </div>
                          </button>
                        )
                      })()}
                    </div>
                  )
                }}
              </ConnectButton.Custom>
            ) : (
              <button
                onClick={handleLaunchApp}
                className="btn-primary group px-8 py-4 text-lg font-semibold rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <span>Launch App</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </button>
            )}

            <button className="btn-secondary px-8 py-4 text-lg font-semibold rounded-lg">
              <span>View Documentation</span>
            </button>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: '1s' }}>
            {[
              { label: "Total Value Locked", value: "$2.1B+", change: "+24%" },
              { label: "Assets Tokenized", value: "1,250+", change: "+156%" },
              { label: "Active Users", value: "150K+", change: "+89%" }
            ].map((stat) => (
              <div key={stat.label} className="card p-6">
                <div className="text-3xl font-display font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-sm text-text-secondary mb-2">{stat.label}</div>
                <div className="text-xs text-accent-success font-medium">{stat.change} this month</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Registration Card Modal */}
      <RegistrationCard
        isOpen={showRegistrationCard}
        onClose={() => setShowRegistrationCard(false)}
        onRegistered={handleRegistrationComplete}
      />
    </section>
  )
}

export default Hero
