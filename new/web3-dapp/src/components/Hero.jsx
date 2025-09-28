import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAccount, useReadContract } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import RegistrationCard from './RegistrationCard'
import UserRegistryABI from '../abis/UserRegistry.json'

const USER_REGISTRY_ADDRESS = '0x7ff9dcb2eb9e000e5f21a752ebd31c789e24765e'

const Hero = () => {
  const [showRegistrationCard, setShowRegistrationCard] = useState(false)
  const navigate = useNavigate()
  
  const { address } = useAccount()

  // Check if user is registered
  const { refetch: refetchRegistration } = useReadContract({
    address: USER_REGISTRY_ADDRESS,
    abi: UserRegistryABI.abi,
    functionName: 'isRegistered',
    args: [address],
    enabled: !!address,
  })

  const handleRegistrationComplete = () => {
    refetchRegistration()
    setTimeout(() => {
      navigate('/dashboard')
    }, 1000)
  }

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-primary px-4 py-24">
      <div className="max-w-2xl w-full mx-auto text-center glass-strong rounded-3xl border border-border-primary shadow-2xl p-10">
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 gradient-text">RWA Collateralized Lending Platform</h1>
        <p className="text-lg text-text-secondary mb-4">Borrow against real-world assets (RWA) with instant liquidity, transparent rates, and on-chain auto-liquidation. Secure, decentralized, and accessible to all.</p>
        <ul className="text-text-primary text-base mb-8 space-y-2">
          <li>• RWA-backed loans (real estate, commodities, bonds)</li>
          <li>• Automated liquidation for undercollateralized positions</li>
          <li>• Transparent, on-chain lending and borrowing</li>
        </ul>
        <div className="flex flex-col items-center gap-4 mb-8">
          <ConnectButton showBalance={false} chainStatus="icon" className="rounded-full px-6 py-3 bg-gradient-to-br from-accent-primary to-accent-secondary shadow-lg" />
        </div>
      </div>
      {/* Use Cases Section */}
      <div className="max-w-3xl w-full mx-auto mt-16 text-center">
        <h2 className="text-2xl font-bold mb-4 gradient-text">Use Cases</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-bg-card glass-strong rounded-2xl p-6 border border-border-primary">
            <div className="font-semibold mb-2">Real Estate Liquidity</div>
            <div className="text-text-secondary text-sm">Unlock cash from property NFTs without selling your asset.</div>
          </div>
          <div className="bg-bg-card glass-strong rounded-2xl p-6 border border-border-primary">
            <div className="font-semibold mb-2">SME Financing</div>
            <div className="text-text-secondary text-sm">Small businesses can borrow against tokenized invoices or inventory.</div>
          </div>
          <div className="bg-bg-card glass-strong rounded-2xl p-6 border border-border-primary">
            <div className="font-semibold mb-2">Commodities & Bonds</div>
            <div className="text-text-secondary text-sm">Access liquidity using tokenized gold, oil, or government bonds as collateral.</div>
          </div>
        </div>
      </div>
      {/* How-To Guide Section */}
      <div className="max-w-3xl w-full mx-auto mt-16 text-center">
        <h2 className="text-2xl font-bold mb-4 gradient-text">How to Use</h2>
        <ol className="list-decimal list-inside text-text-primary text-base space-y-2 text-left mx-auto max-w-xl">
          <li>Connect your wallet to the platform.</li>
          <li>Register and verify your account (if new).</li>
          <li>Mint or deposit your RWA NFT or tokenized asset.</li>
          <li>Borrow stablecoins against your collateral instantly.</li>
          <li>Repay your loan or let the protocol auto-liquidate if undercollateralized.</li>
        </ol>
      </div>
      {/* Registration Modal */}
      <RegistrationCard isOpen={showRegistrationCard} onClose={() => setShowRegistrationCard(false)} onRegistered={handleRegistrationComplete} />
    </section>
  )
}

export default Hero
