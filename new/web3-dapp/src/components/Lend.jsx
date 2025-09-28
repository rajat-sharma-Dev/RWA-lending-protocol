import { useState, useEffect } from 'react'
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseUnits, formatUnits } from 'viem'
import { Coins, TrendingUp, Clock, Users } from 'lucide-react'
import GemLendingPoolABI from '../abis/GemLendingPool.json'
import GemStablecoinABI from '../abis/GemStablecoin.json'

const LENDING_POOL_ADDRESS = '0x97b31f3370cc5c2c4ccf9e4227ad2b9b602f8b13'
const STABLECOIN_ADDRESS = '0xb0a0bc4c23f05f714f7e2a78953836225a09a04f'

const Lend = () => {
  const { address, isConnected } = useAccount()
  const { writeContract, data: hash, error: writeError, isPending } = useWriteContract()
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

  // Read pool stats
  const { data: poolStats } = useReadContract({
    address: LENDING_POOL_ADDRESS,
    abi: GemLendingPoolABI.abi,
    functionName: 'getPoolStats',
  })

  // Get user's position
  const { data: userPosition } = useReadContract({
    address: LENDING_POOL_ADDRESS,
    abi: GemLendingPoolABI.abi,
    functionName: 'getUserPosition',
    args: [address],
    enabled: !!address,
  })

  const handleDeposit = async () => {
    if (!depositAmount || !address || isDepositing) return
    
    try {
      const amount = parseUnits(depositAmount, 18)
      
      console.log('Starting deposit process with params:', {
        amount: amount.toString(),
        contractAddress: LENDING_POOL_ADDRESS,
        userAddress: address,
        balance: balance?.toString()
      })

      // Check if user has sufficient balance
      if (balance && amount > balance) {
        throw new Error('Insufficient balance')
      }
      
      setIsDepositing(true)
      console.log('🚀 Starting deposit transaction...')
      
      writeContract({
        address: LENDING_POOL_ADDRESS,
        abi: GemLendingPoolABI.abi,
        functionName: 'deposit',
        args: [amount],
      })
      
      console.log('📤 Deposit transaction sent to MetaMask')
    } catch (error) {
      console.error('Deposit process failed:', error)
      console.error('Error details:', {
        message: error.message,
        cause: error.cause,
        stack: error.stack
      })
      
      // More detailed error message
      let errorMessage = 'Transaction failed'
      if (error.message) {
        errorMessage = error.message
      } else if (error.cause?.message) {
        errorMessage = error.cause.message
      } else if (typeof error === 'string') {
        errorMessage = error
      }
      alert(`Deposit failed: ${errorMessage}`)
      setIsDepositing(false)
    }
  }

  const handleApprove = async () => {
    if (!depositAmount || !address || isApproving) return
    
    try {
      const amount = parseUnits(depositAmount, 18)
      
      console.log('Starting approval process with params:', {
        amount: amount.toString(),
        spender: LENDING_POOL_ADDRESS,
        userAddress: address,
        balance: balance?.toString()
      })

      // Check if user has sufficient balance
      if (balance && amount > balance) {
        throw new Error('Insufficient balance')
      }
      
      setIsApproving(true)
      console.log('🔄 Starting approval transaction...')
      
      writeContract({
        address: STABLECOIN_ADDRESS,
        abi: GemStablecoinABI.abi,
        functionName: 'approve',
        args: [LENDING_POOL_ADDRESS, amount],
      })
      
      console.log('📤 Approval transaction sent to MetaMask')
    } catch (error) {
      console.error('Approval process failed:', error)
      console.error('Error details:', {
        message: error.message,
        cause: error.cause,
        stack: error.stack
      })
      
      // More detailed error message
      let errorMessage = 'Transaction failed'
      if (error.message) {
        errorMessage = error.message
      } else if (error.cause?.message) {
        errorMessage = error.cause.message
      } else if (typeof error === 'string') {
        errorMessage = error
      }
      alert(`Approval failed: ${errorMessage}`)
      setIsApproving(false)
    }
  }

  const handleMintTestTokens = async () => {
    if (!address) return
    
    try {
      setIsMinting(true)
      const amount = parseUnits('1000', 18) // Mint 1000 GEM for testing
      
      await writeContract({
        address: STABLECOIN_ADDRESS,
        abi: GemStablecoinABI.abi,
        functionName: 'mint',
        args: [address, amount],
      })
    } catch (error) {
      console.error('Mint failed:', error)
      setIsMinting(false)
    }
  }

  // Reset form on successful transaction
  useEffect(() => {
    if (isConfirmed) {
      console.log('✅ TRANSACTION CONFIRMED! Resetting form...')
      setDepositAmount('')
      setIsDepositing(false)
      setIsMinting(false)
      setIsApproving(false)
    }
  }, [isConfirmed])

  // Reset loading state on error
  useEffect(() => {
    if (hash && !isConfirming && !isConfirmed) {
      // Transaction completed but check if it failed
      const timer = setTimeout(() => {
        setIsDepositing(false)
        setIsMinting(false)
        setIsApproving(false)
      }, 2000)
      
      return () => clearTimeout(timer)
    }
  }, [hash, isConfirming, isConfirmed])

  // Monitor hash changes to log transaction status
  useEffect(() => {
    if (hash) {
      console.log('Transaction hash received:', hash)
    }
  }, [hash])

  // Monitor write errors
  useEffect(() => {
    if (writeError) {
      console.error('Write contract error:', writeError)
      setIsDepositing(false)
      setIsMinting(false)
      setIsApproving(false)
      alert(`Transaction failed: ${writeError.message}`)
    }
  }, [writeError])

  // Monitor isPending state
  useEffect(() => {
    console.log('isPending changed:', isPending)
  }, [isPending])

  const depositAmountBigInt = depositAmount && !isNaN(Number(depositAmount)) && Number(depositAmount) > 0 
    ? parseUnits(depositAmount, 18) 
    : BigInt(0)

  const isValidAmount = depositAmount && !isNaN(Number(depositAmount)) && Number(depositAmount) > 0
  const hasEnoughBalance = balance && isValidAmount ? depositAmountBigInt <= balance : false
  const needsApproval = !allowance || (isValidAmount && allowance < depositAmountBigInt)
  const isApprovalSufficient = allowance && isValidAmount && allowance >= depositAmountBigInt
  
  // Debug logging
  useEffect(() => {
    if (balance) {
      console.log('Contract balance data:', {
        balance: balance.toString(),
        balanceFormatted: formatUnits(balance, 18)
      })
    }
  }, [balance])

  useEffect(() => {
    if (depositAmount && balance) {
      console.log('Balance check debug:', {
        depositAmount,
        depositAmountBigInt: depositAmountBigInt.toString(),
        balance: balance.toString(),
        isValidAmount,
        hasEnoughBalance,
        comparison: depositAmountBigInt <= balance
      })
    }
  }, [depositAmount, balance, depositAmountBigInt, hasEnoughBalance, isValidAmount])
  
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

  const lendingPools = [
    {
      id: 1,
      asset: 'GEM Stablecoin',
      apy: poolStats ? ((poolStats[2] - BigInt('1000000000000000000')) * BigInt(100) / BigInt('1000000000000000000')).toString() : '8.5',
      totalSupplied: poolStats ? `$${formatUnits(poolStats[0], 18)}` : '$0',
      utilization: poolStats ? `${poolStats[3]}%` : '0%',
      description: 'Earn yield by lending GEM stablecoins to borrowers'
    }
  ]

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary pt-20">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-display font-bold mb-4 gradient-text">
            Lend Assets
          </h1>
          <p className="text-xl text-text-secondary max-w-3xl">
            Earn competitive returns by lending your GEM stablecoins to borrowers in our decentralized lending pools.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-accent-primary/10 rounded-lg mb-4">
              <Coins className="w-6 h-6 text-accent-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-1">
              {poolStats ? `$${Number(formatUnits(poolStats[0], 18)).toLocaleString()}` : '$0'}
            </h3>
            <p className="text-text-secondary text-sm">Total Value Locked</p>
          </div>

          <div className="card p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-accent-success/10 rounded-lg mb-4">
              <TrendingUp className="w-6 h-6 text-accent-success" />
            </div>
            <h3 className="text-2xl font-bold mb-1">7.3%</h3>
            <p className="text-text-secondary text-sm">Average APY</p>
          </div>

          <div className="card p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-accent-secondary/10 rounded-lg mb-4">
              <Users className="w-6 h-6 text-accent-secondary" />
            </div>
            <h3 className="text-2xl font-bold mb-1">
              {poolStats ? Number(formatUnits(poolStats[1], 18)).toFixed(0) : '0'}
            </h3>
            <p className="text-text-secondary text-sm">Total Shares</p>
          </div>

          <div className="card p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-text-secondary/10 rounded-lg mb-4">
              <Clock className="w-6 h-6 text-text-secondary" />
            </div>
            <h3 className="text-2xl font-bold mb-1">
              {poolStats ? `${poolStats[3]}%` : '0%'}
            </h3>
            <p className="text-text-secondary text-sm">Pool Utilization</p>
          </div>
        </div>

        {/* User Position */}
        {isConnected && userPosition && (
          <div className="card p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">Your Position</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-text-secondary text-sm mb-1">Shares Balance</p>
                <p className="text-2xl font-bold">{formatUnits(userPosition[0] || BigInt(0), 18)}</p>
              </div>
              <div>
                <p className="text-text-secondary text-sm mb-1">Stablecoin Value</p>
                <p className="text-2xl font-bold">
                  ${Number(formatUnits(userPosition[1] || BigInt(0), 18)).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Deposit Section */}
        {isConnected && (
          <div className="card p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">Deposit GEM Stablecoins</h2>
            
            {/* Test Mint Button */}
            <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-700 mb-3">
                For testing: Need GEM tokens? Mint 1000 test tokens
              </p>
              <button
                onClick={handleMintTestTokens}
                disabled={isMinting || isConfirming}
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-yellow-600 transition-colors"
              >
                {isMinting || (isConfirming && hash) ? 'Minting...' : 'Mint 1000 GEM (Test)'}
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Amount to Deposit</label>
                <div className="relative">
                  <input
                    type="number"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full px-4 py-3 bg-bg-secondary border border-border-primary rounded-lg focus:ring-2 focus:ring-accent-primary focus:border-accent-primary"
                  />
                  <div className="absolute right-3 top-3">
                    <span className="text-text-secondary text-sm">GEM</span>
                  </div>
                </div>
                {balance && (
                  <p className="text-text-secondary text-sm mt-2">
                    Balance: {Number(formatUnits(balance, 18)).toFixed(2)} GEM
                  </p>
                )}
                {address && (
                  <p className="text-blue-500 text-xs mt-1">
                    Wallet: {address.slice(0, 8)}... | Connected: {isConnected.toString()}
                  </p>
                )}
                {depositAmount && (
                  <p className="text-blue-500 text-xs mt-1">
                    Debug: Amount={depositAmountBigInt.toString()}, Balance={balance?.toString()}, Valid={isValidAmount.toString()}, HasEnough={hasEnoughBalance.toString()}
                  </p>
                )}
                {depositAmount && !hasEnoughBalance && isValidAmount && (
                  <p className="text-red-500 text-sm mt-2">Insufficient balance</p>
                )}
              </div>
              
              <div className="flex flex-col justify-end space-y-3">
                {/* Approve Button */}
                <button
                  onClick={handleApprove}
                  disabled={!isValidAmount || !hasEnoughBalance || isApproving || (isConfirming && isApproving)}
                  className={`w-full py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                    needsApproval ? 'btn-primary' : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  {needsApproval ? getApproveButtonText() : '✓ Approved'}
                </button>

                {/* Deposit Button */}
                <button
                  onClick={handleDeposit}
                  disabled={!isValidAmount || !hasEnoughBalance || !isApprovalSufficient || isDepositing || (isConfirming && isDepositing)}
                  className="w-full btn-primary py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {getDepositButtonText()}
                </button>
                
                {isConfirmed && (
                  <p className="text-accent-success text-sm mt-2">Transaction successful!</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Lending Pool */}
        <div className="grid grid-cols-1 gap-6">
          {lendingPools.map((pool) => (
            <div key={pool.id} className="card p-6 hover:bg-bg-secondary/50 transition-all duration-300 group">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent-primary to-accent-secondary rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">G</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{pool.asset}</h3>
                    <p className="text-text-secondary text-sm">{pool.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-accent-success">{pool.apy}%</div>
                  <div className="text-text-secondary text-sm">APY</div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Total Supplied</span>
                  <span className="font-medium">{pool.totalSupplied}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Utilization</span>
                  <span className="font-medium">{pool.utilization}</span>
                </div>
                <div className="w-full bg-bg-secondary rounded-full h-2">
                  <div 
                    className="bg-accent-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: pool.utilization }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* How It Works Section */}
        <div className="mt-12 card p-8">
          <h2 className="text-2xl font-bold mb-6">How Lending Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-accent-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-accent-primary font-bold text-xl">1</span>
              </div>
              <h3 className="font-semibold mb-2">Deposit Stablecoins</h3>
              <p className="text-text-secondary text-sm">Deposit your GEM stablecoins into the lending pool</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-accent-primary font-bold text-xl">2</span>
              </div>
              <h3 className="font-semibold mb-2">Earn Shares</h3>
              <p className="text-text-secondary text-sm">Receive pool shares that represent your stake in the lending pool</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-accent-primary font-bold text-xl">3</span>
              </div>
              <h3 className="font-semibold mb-2">Earn Interest</h3>
              <p className="text-text-secondary text-sm">Start earning interest as borrowers use your deposited assets</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Lend
