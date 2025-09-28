import { useAccount, useReadContract } from 'wagmi'
import { CreditCard, Shield, DollarSign, AlertTriangle, ArrowRight } from 'lucide-react'
import GemLoanVaultABI from '../abis/GemLoanVault.json'

const LOAN_VAULT_ADDRESS = '0x7ff9dcb2eb9e000e5f21a752ebd31c789e24765e'

const Borrow = () => {
  const { address, isConnected } = useAccount()

  // Mock data for borrowing options - replace with actual contract calls
  const borrowingOptions = [
    {
      id: 1,
      collateral: 'RWA NFT',
      borrowAsset: 'USDC',
      maxLTV: '70%',
      interestRate: '9.5%',
      liquidationThreshold: '80%',
      availableToBorrow: '$45K',
      description: 'Borrow against tokenized real estate'
    },
    {
      id: 2,
      collateral: 'WETH',
      borrowAsset: 'USDC',
      maxLTV: '75%',
      interestRate: '8.2%',
      liquidationThreshold: '82%',
      availableToBorrow: '$120K',
      description: 'ETH-backed stable borrowing'
    },
    {
      id: 3,
      collateral: 'WBTC',
      borrowAsset: 'USDC',
      maxLTV: '70%',
      interestRate: '8.8%',
      liquidationThreshold: '78%',
      availableToBorrow: '$85K',
      description: 'Bitcoin-collateralized loans'
    }
  ]

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary pt-20">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-display font-bold mb-4 gradient-text">
            Borrow Assets
          </h1>
          <p className="text-xl text-text-secondary max-w-3xl">
            Access liquidity by borrowing against your crypto and RWA collateral with competitive rates and flexible terms.
          </p>
        </div>

        {/* Warning Banner */}
        <div className="card p-4 mb-8 border-l-4 border-accent-warning bg-accent-warning/5">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-accent-warning mt-0.5" />
            <div>
              <h3 className="font-semibold text-accent-warning mb-1">Borrowing Risks</h3>
              <p className="text-sm text-text-secondary">
                Borrowing involves liquidation risk. Ensure you maintain adequate collateralization ratio to avoid liquidation of your assets.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-accent-primary/10 rounded-lg mb-4">
              <DollarSign className="w-6 h-6 text-accent-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-1">$3.2M</h3>
            <p className="text-text-secondary text-sm">Total Borrowed</p>
          </div>

          <div className="card p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-accent-success/10 rounded-lg mb-4">
              <Shield className="w-6 h-6 text-accent-success" />
            </div>
            <h3 className="text-2xl font-bold mb-1">$5.8M</h3>
            <p className="text-text-secondary text-sm">Total Collateral</p>
          </div>

          <div className="card p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-accent-secondary/10 rounded-lg mb-4">
              <CreditCard className="w-6 h-6 text-accent-secondary" />
            </div>
            <h3 className="text-2xl font-bold mb-1">892</h3>
            <p className="text-text-secondary text-sm">Active Loans</p>
          </div>

          <div className="card p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-text-secondary/10 rounded-lg mb-4">
              <AlertTriangle className="w-6 h-6 text-text-secondary" />
            </div>
            <h3 className="text-2xl font-bold mb-1">8.8%</h3>
            <p className="text-text-secondary text-sm">Avg Interest Rate</p>
          </div>
        </div>

        {/* Borrowing Options */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
          {borrowingOptions.map((option) => (
            <div key={option.id} className="card p-6 hover:bg-bg-secondary/50 transition-all duration-300 group">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent-primary to-accent-secondary rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{option.collateral.slice(0, 2)}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{option.collateral} → {option.borrowAsset}</h3>
                    <p className="text-text-secondary text-sm">{option.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-accent-primary">{option.interestRate}</div>
                  <div className="text-text-secondary text-xs">Interest Rate</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-bg-secondary border border-border-primary rounded-lg p-3">
                  <div className="text-text-secondary text-xs mb-1">Max LTV</div>
                  <div className="font-semibold">{option.maxLTV}</div>
                </div>
                <div className="bg-bg-secondary border border-border-primary rounded-lg p-3">
                  <div className="text-text-secondary text-xs mb-1">Liquidation</div>
                  <div className="font-semibold">{option.liquidationThreshold}</div>
                </div>
                <div className="bg-bg-secondary border border-border-primary rounded-lg p-3 col-span-2">
                  <div className="text-text-secondary text-xs mb-1">Available to Borrow</div>
                  <div className="font-semibold text-lg">{option.availableToBorrow}</div>
                </div>
              </div>

              {isConnected ? (
                <button className="w-full btn-primary py-3 rounded-lg font-medium group-hover:bg-accent-primary/90 transition-colors flex items-center justify-center gap-2">
                  <span>Borrow {option.borrowAsset}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              ) : (
                <div className="w-full bg-bg-secondary border border-border-primary py-3 rounded-lg font-medium text-center text-text-secondary">
                  Connect Wallet to Borrow
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Your Active Loans */}
        {isConnected && (
          <div className="card p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">Your Active Loans</h2>
            <div className="text-center py-8 text-text-secondary">
              <CreditCard className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No active loans found</p>
              <p className="text-sm mt-1">Your loans will appear here once you borrow assets</p>
            </div>
          </div>
        )}

        {/* How Borrowing Works */}
        <div className="card p-8">
          <h2 className="text-2xl font-bold mb-6">How Borrowing Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-accent-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-accent-primary font-bold text-xl">1</span>
              </div>
              <h3 className="font-semibold mb-2">Deposit Collateral</h3>
              <p className="text-text-secondary text-sm">Deposit your crypto or RWA NFTs as collateral</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-accent-primary font-bold text-xl">2</span>
              </div>
              <h3 className="font-semibold mb-2">Choose Amount</h3>
              <p className="text-text-secondary text-sm">Select how much you want to borrow up to the LTV limit</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-accent-primary font-bold text-xl">3</span>
              </div>
              <h3 className="font-semibold mb-2">Receive Funds</h3>
              <p className="text-text-secondary text-sm">Get the borrowed assets instantly in your wallet</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-accent-primary font-bold text-xl">4</span>
              </div>
              <h3 className="font-semibold mb-2">Manage Loan</h3>
              <p className="text-text-secondary text-sm">Monitor health ratio and repay to get collateral back</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Borrow
