import { useAccount, useReadContract } from 'wagmi'
import { Wallet, TrendingUp, Clock, Award } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import UserRegistryABI from '../abis/UserRegistry.json'

const USER_REGISTRY_ADDRESS = '0x7ff9dcb2eb9e000e5f21a752ebd31c789e24765e'

const Dashboard = () => {
  const { address } = useAccount()

  // Get user profile data
  const { data: userProfile } = useReadContract({
    address: USER_REGISTRY_ADDRESS,
    abi: UserRegistryABI.abi,
    functionName: 'getUserProfile',
    args: [address],
  })

  const { data: reputationTier } = useReadContract({
    address: USER_REGISTRY_ADDRESS,
    abi: UserRegistryABI.abi,
    functionName: 'getReputationTier',
    args: [address],
  })

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A'
    return new Date(Number(timestamp) * 1000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary pt-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <h1 className="text-3xl font-display font-bold">Dashboard</h1>
        </div>

        {/* User Profile Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 card p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-accent-primary/10 rounded-lg">
                <Wallet className="w-8 h-8 text-accent-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-1">Welcome to RWA Vault</h2>
                <p className="text-text-secondary">Manage your real-world assets on blockchain</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-bg-secondary border border-border-primary rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-accent-success" />
                  <span className="text-sm text-text-secondary">Reputation Score</span>
                </div>
                <p className="text-2xl font-bold text-text-primary">
                  {userProfile ? Number(userProfile[1]) : '0'}
                </p>
              </div>

              <div className="bg-bg-secondary border border-border-primary rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-4 h-4 text-accent-primary" />
                  <span className="text-sm text-text-secondary">Reputation Tier</span>
                </div>
                <p className="text-2xl font-bold text-text-primary capitalize">
                  {reputationTier || 'Bronze'}
                </p>
              </div>

              <div className="bg-bg-secondary border border-border-primary rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-text-secondary" />
                  <span className="text-sm text-text-secondary">Member Since</span>
                </div>
                <p className="text-lg font-semibold text-text-primary">
                  {formatDate(userProfile?.[2])}
                </p>
              </div>

              <div className="bg-bg-secondary border border-border-primary rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Wallet className="w-4 h-4 text-text-secondary" />
                  <span className="text-sm text-text-secondary">Status</span>
                </div>
                <p className="text-lg font-semibold text-accent-success">
                  {userProfile?.[0] ? 'Registered' : 'Not Registered'}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <NavLink to="/lend" className="w-full btn-primary py-3 rounded-lg font-medium text-center block hover:bg-accent-primary/90 transition-colors">
                Start Lending
              </NavLink>
              <NavLink to="/borrow" className="w-full btn-secondary py-3 rounded-lg font-medium text-center block hover:bg-accent-secondary/90 transition-colors">
                Borrow Assets
              </NavLink>
              <NavLink to="/liquidate" className="w-full border border-border-primary py-3 rounded-lg font-medium hover:bg-bg-secondary transition-colors text-center block">
                Liquidation Hub
              </NavLink>
              <button className="w-full border border-border-primary py-3 rounded-lg font-medium hover:bg-bg-secondary transition-colors">
                Transaction History
              </button>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: 'Asset Tokenization',
              description: 'Convert your real-world assets into blockchain tokens',
              icon: '🏠',
              status: 'Available'
            },
            {
              title: 'Lending Pool',
              description: 'Lend your assets and earn competitive returns',
              icon: '💰',
              status: 'Available'
            },
            {
              title: 'Borrowing',
              description: 'Borrow against your tokenized assets',
              icon: '🔄',
              status: 'Available'
            },
            {
              title: 'Governance',
              description: 'Participate in protocol decision making',
              icon: '🗳️',
              status: 'Coming Soon'
            },
            {
              title: 'Yield Farming',
              description: 'Earn additional rewards through farming',
              icon: '🌱',
              status: 'Coming Soon'
            },
            {
              title: 'Insurance',
              description: 'Protect your assets with decentralized insurance',
              icon: '🛡️',
              status: 'Coming Soon'
            }
          ].map((feature, index) => (
            <div key={index} className="card p-6 hover:bg-bg-secondary/50 transition-colors">
              <div className="text-3xl mb-3">{feature.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-text-secondary text-sm mb-3">{feature.description}</p>
              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                feature.status === 'Available' 
                  ? 'bg-accent-success/10 text-accent-success' 
                  : 'bg-text-secondary/10 text-text-secondary'
              }`}>
                {feature.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
