import { useState } from 'react'
import { useAccount, useReadContract } from 'wagmi'
import { Zap, Target, AlertTriangle, Clock, DollarSign, ArrowRight, Filter } from 'lucide-react'
import GemLiquidationManagerABI from '../abis/GemLiquidationManager.json'

const LIQUIDATION_MANAGER_ADDRESS = '0x7ff9dcb2eb9e000e5f21a752ebd31c789e24765e'

const Liquidate = () => {
  const { address, isConnected } = useAccount()
  const [filterRisk, setFilterRisk] = useState('all')

  // Mock data for liquidation opportunities - replace with actual contract calls
  const liquidationOpportunities = [
    {
      id: 1,
      borrower: '0x1234...5678',
      collateralAsset: 'RWA NFT #001',
      collateralValue: '$52,000',
      debtAmount: '$45,000',
      healthFactor: '0.85',
      liquidationDiscount: '8%',
      riskLevel: 'high',
      timeToLiquidation: '2 hours',
      potentialProfit: '$4,160'
    },
    {
      id: 2,
      borrower: '0x9876...4321',
      collateralAsset: 'WETH',
      collateralValue: '$3,200',
      debtAmount: '$2,650',
      healthFactor: '0.92',
      liquidationDiscount: '5%',
      riskLevel: 'medium',
      timeToLiquidation: '8 hours',
      potentialProfit: '$160'
    },
    {
      id: 3,
      borrower: '0x5555...9999',
      collateralAsset: 'WBTC',
      collateralValue: '$8,500',
      debtAmount: '$6,800',
      healthFactor: '0.88',
      liquidationDiscount: '6%',
      riskLevel: 'high',
      timeToLiquidation: '4 hours',
      potentialProfit: '$510'
    },
    {
      id: 4,
      borrower: '0x7777...3333',
      collateralAsset: 'RWA NFT #045',
      collateralValue: '$28,000',
      debtAmount: '$22,500',
      healthFactor: '0.95',
      liquidationDiscount: '7%',
      riskLevel: 'low',
      timeToLiquidation: '12 hours',
      potentialProfit: '$1,960'
    }
  ]

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'high': return 'text-accent-error'
      case 'medium': return 'text-accent-warning'
      case 'low': return 'text-accent-success'
      default: return 'text-text-secondary'
    }
  }

  const getRiskBgColor = (risk) => {
    switch (risk) {
      case 'high': return 'bg-accent-error/10 border-accent-error/20'
      case 'medium': return 'bg-accent-warning/10 border-accent-warning/20'
      case 'low': return 'bg-accent-success/10 border-accent-success/20'
      default: return 'bg-text-secondary/10 border-text-secondary/20'
    }
  }

  const filteredOpportunities = filterRisk === 'all' 
    ? liquidationOpportunities 
    : liquidationOpportunities.filter(opp => opp.riskLevel === filterRisk)

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary pt-20">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-display font-bold mb-4 gradient-text">
            Liquidation Hub
          </h1>
          <p className="text-xl text-text-secondary max-w-3xl">
            Help maintain protocol health by liquidating undercollateralized positions and earn rewards for your contribution.
          </p>
        </div>

        {/* Warning Banner */}
        <div className="card p-4 mb-8 border-l-4 border-accent-primary bg-accent-primary/5">
          <div className="flex items-start gap-3">
            <Zap className="w-5 h-5 text-accent-primary mt-0.5" />
            <div>
              <h3 className="font-semibold text-accent-primary mb-1">Liquidation Bot Active</h3>
              <p className="text-sm text-text-secondary">
                Automated liquidations are active. Manual liquidations are available for positions requiring immediate attention.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-accent-error/10 rounded-lg mb-4">
              <Target className="w-6 h-6 text-accent-error" />
            </div>
            <h3 className="text-2xl font-bold mb-1">23</h3>
            <p className="text-text-secondary text-sm">At Risk Positions</p>
          </div>

          <div className="card p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-accent-success/10 rounded-lg mb-4">
              <DollarSign className="w-6 h-6 text-accent-success" />
            </div>
            <h3 className="text-2xl font-bold mb-1">$127K</h3>
            <p className="text-text-secondary text-sm">Total Liquidation Value</p>
          </div>

          <div className="card p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-accent-primary/10 rounded-lg mb-4">
              <Zap className="w-6 h-6 text-accent-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-1">$6.8K</h3>
            <p className="text-text-secondary text-sm">Potential Rewards</p>
          </div>

          <div className="card p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-accent-secondary/10 rounded-lg mb-4">
              <Clock className="w-6 h-6 text-accent-secondary" />
            </div>
            <h3 className="text-2xl font-bold mb-1">156</h3>
            <p className="text-text-secondary text-sm">Liquidations Today</p>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-text-secondary" />
            <span className="text-sm text-text-secondary">Filter by Risk:</span>
          </div>
          <div className="flex gap-2">
            {['all', 'high', 'medium', 'low'].map((risk) => (
              <button
                key={risk}
                onClick={() => setFilterRisk(risk)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  filterRisk === risk
                    ? 'bg-accent-primary text-white'
                    : 'bg-bg-secondary text-text-secondary hover:bg-bg-card'
                }`}
              >
                {risk.charAt(0).toUpperCase() + risk.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Liquidation Opportunities */}
        <div className="space-y-4 mb-8">
          {filteredOpportunities.map((opportunity) => (
            <div key={opportunity.id} className="card p-6 hover:bg-bg-secondary/30 transition-all duration-300 group">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className={`px-3 py-1.5 rounded-lg border ${getRiskBgColor(opportunity.riskLevel)}`}>
                    <span className={`text-xs font-medium uppercase ${getRiskColor(opportunity.riskLevel)}`}>
                      {opportunity.riskLevel} Risk
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">
                      {opportunity.collateralAsset}
                    </h3>
                    <p className="text-text-secondary text-sm">
                      Borrower: <code className="bg-bg-secondary px-2 py-0.5 rounded text-xs">{opportunity.borrower}</code>
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-accent-success">{opportunity.potentialProfit}</div>
                  <div className="text-text-secondary text-sm">Potential Profit</div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="bg-bg-secondary border border-border-primary rounded-lg p-3">
                  <div className="text-text-secondary text-xs mb-1">Collateral Value</div>
                  <div className="font-semibold">{opportunity.collateralValue}</div>
                </div>
                <div className="bg-bg-secondary border border-border-primary rounded-lg p-3">
                  <div className="text-text-secondary text-xs mb-1">Debt Amount</div>
                  <div className="font-semibold">{opportunity.debtAmount}</div>
                </div>
                <div className="bg-bg-secondary border border-border-primary rounded-lg p-3">
                  <div className="text-text-secondary text-xs mb-1">Health Factor</div>
                  <div className={`font-semibold ${getRiskColor(opportunity.riskLevel)}`}>
                    {opportunity.healthFactor}
                  </div>
                </div>
                <div className="bg-bg-secondary border border-border-primary rounded-lg p-3">
                  <div className="text-text-secondary text-xs mb-1">Liquidation Discount</div>
                  <div className="font-semibold text-accent-success">{opportunity.liquidationDiscount}</div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-text-secondary">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>Est. liquidation in {opportunity.timeToLiquidation}</span>
                  </div>
                </div>
                {isConnected ? (
                  <button className="btn-primary px-6 py-2 rounded-lg font-medium group-hover:bg-accent-primary/90 transition-colors flex items-center gap-2">
                    <span>Liquidate</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                ) : (
                  <div className="bg-bg-secondary border border-border-primary px-6 py-2 rounded-lg font-medium text-text-secondary">
                    Connect Wallet
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* How Liquidation Works */}
        <div className="card p-8">
          <h2 className="text-2xl font-bold mb-6">How Liquidation Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-accent-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-accent-primary font-bold text-xl">1</span>
              </div>
              <h3 className="font-semibold mb-2">Monitor Positions</h3>
              <p className="text-text-secondary text-sm">Track undercollateralized loans with health factors below 1.0</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-accent-primary font-bold text-xl">2</span>
              </div>
              <h3 className="font-semibold mb-2">Execute Liquidation</h3>
              <p className="text-text-secondary text-sm">Pay off the borrower's debt to claim their collateral</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-accent-primary font-bold text-xl">3</span>
              </div>
              <h3 className="font-semibold mb-2">Receive Discount</h3>
              <p className="text-text-secondary text-sm">Get the collateral at a discount as a liquidation reward</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-accent-primary font-bold text-xl">4</span>
              </div>
              <h3 className="font-semibold mb-2">Earn Profit</h3>
              <p className="text-text-secondary text-sm">Sell the collateral for profit while helping protocol stability</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Liquidate
