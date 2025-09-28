import { useState, useEffect } from 'react'
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseUnits } from 'viem'
import GemLendingPoolABI from '../abis/GemLendingPool.json'
import GemStablecoinABI from '../abis/GemStablecoin.json'

const LENDING_POOL_ADDRESS = '0x97b31f3370cc5c2c4ccf9e4227ad2b9b602f8b13'
const STABLECOIN_ADDRESS = '0xb0a0bc4c23f05f714f7e2a78953836225a09a04f'

const Lend = () => {
  const { address } = useAccount()
  const { writeContract, data: hash, error: writeError } = useWriteContract()
  const [depositAmount, setDepositAmount] = useState('')
  const [isDepositing, setIsDepositing] = useState(false)
  const [isMinting, setIsMinting] = useState(false)
  const [isApproving, setIsApproving] = useState(false)

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  // Read user's stablecoin balance
  const { data: balance } = useReadContract({
    address: STABLECOIN_ADDRESS,
    abi: GemStablecoinABI.abi,
    functionName: 'balanceOf',
    args: [address],
    enabled: !!address,
  })

  // Read current allowance
  const { data: allowance } = useReadContract({
    address: STABLECOIN_ADDRESS,
    abi: GemStablecoinABI.abi,
    functionName: 'allowance',
    args: [address, LENDING_POOL_ADDRESS],
    enabled: !!address,
  })

  const handleDeposit = async () => {
    if (!depositAmount || !address || isDepositing) return
    try {
      const amount = parseUnits(depositAmount, 18)
      if (balance && amount > balance) {
        alert('Insufficient balance')
        setIsDepositing(false)
        return
      }
      setIsDepositing(true)
      writeContract({
        address: LENDING_POOL_ADDRESS,
        abi: GemLendingPoolABI.abi,
        functionName: 'deposit',
        args: [amount],
      })
    } catch {
      setIsDepositing(false)
    }
  }

  const handleApprove = async () => {
    if (!depositAmount || !address || isApproving) return
    try {
      const amount = parseUnits(depositAmount, 18)
      if (balance && amount > balance) {
        alert('Insufficient balance')
        setIsApproving(false)
        return
      }
      setIsApproving(true)
      writeContract({
        address: STABLECOIN_ADDRESS,
        abi: GemStablecoinABI.abi,
        functionName: 'approve',
        args: [LENDING_POOL_ADDRESS, amount],
      })
    } catch {
      setIsApproving(false)
    }
  }

  const handleMintTestTokens = async () => {
    if (!address) return
    try {
      setIsMinting(true)
      const amount = parseUnits('1000', 18)
      await writeContract({
        address: STABLECOIN_ADDRESS,
        abi: GemStablecoinABI.abi,
        functionName: 'mint',
        args: [address, amount],
      })
    } catch {
      setIsMinting(false)
    }
  }

  useEffect(() => {
    if (isConfirmed) {
      setDepositAmount('')
      setIsDepositing(false)
      setIsMinting(false)
      setIsApproving(false)
    }
  }, [isConfirmed])

  useEffect(() => {
    if (hash && !isConfirming && !isConfirmed) {
      const timer = setTimeout(() => {
        setIsDepositing(false)
        setIsMinting(false)
        setIsApproving(false)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [hash, isConfirming, isConfirmed])

  useEffect(() => {
    if (writeError) {
      setIsDepositing(false)
      setIsMinting(false)
      setIsApproving(false)
      alert(`Transaction failed: ${writeError.message}`)
    }
  }, [writeError])

  const depositAmountBigInt = depositAmount && !isNaN(Number(depositAmount)) && Number(depositAmount) > 0 
    ? parseUnits(depositAmount, 18) 
    : BigInt(0)
  const isValidAmount = depositAmount && !isNaN(Number(depositAmount)) && Number(depositAmount) > 0
  const hasEnoughBalance = balance && isValidAmount ? depositAmountBigInt <= balance : false
  const needsApproval = !allowance || (isValidAmount && allowance < depositAmountBigInt)
  const isApprovalSufficient = allowance && isValidAmount && allowance >= depositAmountBigInt

  const getApproveButtonText = () => {
    if (isConfirming && isApproving) return 'Confirming Approval...'
    if (isApproving) return 'Approving...'
    if (!isValidAmount) return 'Enter Amount to Approve'
    if (!hasEnoughBalance) return 'Insufficient Balance'
    return 'Approve'
  }

  const getDepositButtonText = () => {
    if (isConfirming && isDepositing) return 'Confirming Deposit...'
    if (isDepositing) return 'Depositing...'
    if (!isValidAmount) return 'Enter Amount to Deposit'
    if (!hasEnoughBalance) return 'Insufficient Balance'
    if (!isApprovalSufficient) return 'Approval Required First'
    return 'Deposit'
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-primary px-4 py-24">
      <div className="w-full max-w-md mx-auto glass-strong rounded-3xl border border-border-primary shadow-2xl p-10 flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-6 gradient-text">Lend Stablecoin</h2>
        <div className="w-full mb-4">
          <label className="block text-text-secondary mb-2 text-sm">Stablecoin Address</label>
          <div className="w-full px-4 py-3 rounded-full bg-bg-elevated border border-border-primary text-text-primary font-mono text-xs select-all mb-2">
            {STABLECOIN_ADDRESS}
          </div>
        </div>
        <div className="w-full mb-6">
          <label className="block text-text-secondary mb-2 text-sm">Amount</label>
          <input
            type="number"
            min="0"
            value={depositAmount}
            onChange={e => setDepositAmount(e.target.value)}
            className="w-full px-6 py-3 rounded-full bg-bg-elevated border border-border-primary text-text-primary text-lg focus:outline-none focus:ring-2 focus:ring-accent-primary transition-all"
            placeholder="Enter amount to lend"
          />
        </div>
        {/* Approve Button */}
        <button
          className="w-full py-3 rounded-full bg-gradient-to-br from-accent-primary to-accent-secondary text-white font-semibold text-lg shadow-lg hover:scale-105 transition-transform disabled:opacity-60 mb-4"
          onClick={handleApprove}
          disabled={!isValidAmount || !hasEnoughBalance || isApproving || (isConfirming && isApproving)}
        >
          {needsApproval ? getApproveButtonText() : '✓ Approved'}
        </button>
        {/* Deposit Button */}
        <button
          className="w-full py-3 rounded-full bg-gradient-to-br from-accent-secondary to-accent-primary text-white font-semibold text-lg shadow-lg hover:scale-105 transition-transform disabled:opacity-60"
          onClick={handleDeposit}
          disabled={isDepositing || (isConfirming && isDepositing)}
        >
          {getDepositButtonText()}
        </button>
        {/* Mint Test Tokens Button */}
        <button
          className="w-full py-3 rounded-full bg-yellow-500 text-white font-semibold text-lg shadow-lg hover:scale-105 transition-transform disabled:opacity-60 mt-4"
          onClick={handleMintTestTokens}
          disabled={isMinting || isConfirming}
        >
          {isMinting || (isConfirming && hash) ? 'Minting...' : 'Mint 1000 GEM (Test)'}
        </button>
      </div>
    </section>
  )
}

export default Lend
