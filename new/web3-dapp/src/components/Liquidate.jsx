import { Zap } from 'lucide-react'

const Liquidate = () => {
  // Example mock data for liquidation opportunities
  const liquidationOpportunities = [
    {
      id: 1,
      borrower: '0x1234...5678',
      collateralAsset: 'RWA NFT #001',
      collateralValue: '$52,000',
      debtAmount: '$45,000',
      potentialProfit: '$4,160'
    },
    {
      id: 2,
      borrower: '0x9876...4321',
      collateralAsset: 'WETH',
      collateralValue: '$3,200',
      debtAmount: '$2,650',
      potentialProfit: '$160'
    }
  ]

  const handleLiquidate = () => {
    // Call smart contract liquidation logic here
    // ...
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-primary px-4 py-24">
      <div className="w-full max-w-2xl mx-auto glass-strong rounded-3xl border border-border-primary shadow-2xl p-10">
        <h2 className="text-2xl font-bold mb-8 gradient-text text-center">Liquidation Opportunities</h2>
        <div className="flex flex-col gap-6">
          {liquidationOpportunities.map((op) => (
            <div key={op.id} className="bg-bg-card glass-strong rounded-2xl border border-border-primary p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 shadow-md">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent-primary/10">
                  <Zap className="w-6 h-6 text-accent-primary" />
                </div>
                <div>
                  <div className="font-semibold text-text-primary">{op.collateralAsset}</div>
                  <div className="text-xs text-text-secondary">Borrower: {op.borrower}</div>
                  <div className="text-xs text-text-secondary">Collateral: {op.collateralValue} | Debt: {op.debtAmount}</div>
                  <div className="text-xs text-accent-success font-semibold">Profit: {op.potentialProfit}</div>
                </div>
              </div>
              <button
                className="px-8 py-3 rounded-full bg-gradient-to-br from-accent-primary to-accent-secondary text-white font-semibold shadow-lg hover:scale-105 transition-transform"
                onClick={handleLiquidate}
              >
                Liquidate
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Liquidate
