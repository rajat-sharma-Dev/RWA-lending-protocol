import { useState } from 'react'
import { useAccount, useWriteContract } from 'wagmi'
import { UserPlus, Loader, Shield, X } from 'lucide-react'
import UserRegistryABI from '../abis/UserRegistry.json'

const USER_REGISTRY_ADDRESS = '0x7ff9dcb2eb9e000e5f21a752ebd31c789e24765e'

const RegistrationCard = ({ isOpen, onClose, onRegistered }) => {
  const [isRegistering, setIsRegistering] = useState(false)
  const { address } = useAccount()
  
  const { writeContract, isPending, isError, error } = useWriteContract()

  const handleRegister = async () => {
    if (!address) return

    setIsRegistering(true)
    try {
      await writeContract({
        address: USER_REGISTRY_ADDRESS,
        abi: UserRegistryABI.abi,
        functionName: 'registerUser',
        args: []
      })
      
      // Wait a bit for the transaction to be mined
      setTimeout(() => {
        onRegistered()
        onClose()
        setIsRegistering(false)
      }, 2000)
    } catch (err) {
      console.error('Registration failed:', err)
      setIsRegistering(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-bg-card border border-border-primary rounded-2xl max-w-md w-full mx-auto shadow-2xl">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-accent-primary/10 rounded-lg">
                <Shield className="w-6 h-6 text-accent-primary" />
              </div>
              <h3 className="text-xl font-semibold text-text-primary">Registration Required</h3>
            </div>
            <button 
              onClick={onClose}
              className="p-1 hover:bg-bg-secondary rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-text-secondary" />
            </button>
          </div>

          {/* Content */}
          <div className="space-y-4 mb-6">
            <p className="text-text-secondary leading-relaxed">
              To access the RWA Vault platform, you need to register your wallet address. 
              This creates your user profile with an initial reputation score of 100.
            </p>
            
            <div className="bg-bg-secondary border border-border-primary rounded-lg p-4">
              <h4 className="font-medium text-text-primary mb-2">Registration Benefits:</h4>
              <ul className="space-y-1 text-sm text-text-secondary">
                <li>• Initial reputation score of 100</li>
                <li>• Access to lending and borrowing features</li>
                <li>• Participate in protocol governance</li>
                <li>• Track your transaction history</li>
              </ul>
            </div>

            {isError && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                <p className="text-red-400 text-sm">
                  Registration failed: {error?.shortMessage || 'Unknown error'}
                </p>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-border-primary rounded-lg text-text-secondary hover:bg-bg-secondary transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleRegister}
              disabled={isRegistering || isPending || !address}
              className="flex-1 btn-primary px-4 py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex items-center justify-center gap-2">
                {isRegistering || isPending ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    <span>Registering...</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4" />
                    <span>Register</span>
                  </>
                )}
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegistrationCard
