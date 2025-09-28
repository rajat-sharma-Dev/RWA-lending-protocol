import { useState, useEffect } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import GemLoanVault from '../abis/GemLoanVault.json';
import RwaGemNFT from '../abis/RwaGemNFT.json';
const GemLoanVaultABI = GemLoanVault.abi;
const RwaGemNFTABI = RwaGemNFT.abi;

const LOAN_VAULT_ADDRESS = '0xdcabc41457851b34c48fcdfbc91117220cf78405';
const RWA_GEM_NFT_ADDRESS = '0x1841dab473e9a731efda381374311ad2d48b161a';

const Borrow = () => {
  const { address, isConnected } = useAccount();

  // State for Request Loan form
  const [collateralId, setCollateralId] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const [duration, setDuration] = useState('');
  const [loanStatus, setLoanStatus] = useState('idle');
  const [loanError, setLoanError] = useState('');
  const [loanTxHash, setLoanTxHash] = useState(null);

  // State for Mint NFT form
  const [assetType, setAssetType] = useState('');
  const [weight, setWeight] = useState('');
  const [purity, setPurity] = useState('');
  const [certificate, setCertificate] = useState('');
  const [physicalAttributes, setPhysicalAttributes] = useState('');
  const [assetDocumentHash, setAssetDocumentHash] = useState('');
  const [metadataURI, setMetadataURI] = useState('');
  const [mintStatus, setMintStatus] = useState('idle');
  const [mintError, setMintError] = useState('');
  const [mintTxHash, setMintTxHash] = useState(null);

  const { writeContract: writeLoan, isPending: isLoanPending, error: loanTxError } = useWriteContract();
  const { writeContract: writeMint } = useWriteContract();

  // Wait for transaction confirmation
  const { isLoading: isConfirming, isSuccess: isConfirmed, isError: isTxError, error: txError } = useWaitForTransactionReceipt({
    hash: loanTxHash,
    enabled: !!loanTxHash,
  });

  // Only one borrowing option: NFT as collateral
  const borrowingOption = {
    id: 1,
    collateral: 'RWA NFT',
    borrowAsset: 'USDC',
    description: 'Borrow against tokenized real estate (NFT as collateral)',
  };

  const [showLoanForm, setShowLoanForm] = useState(false);

  const openLoanForm = () => {
    setShowLoanForm(true);
  };
  const closeLoanForm = () => {
    setShowLoanForm(false);
  };

  // Request Loan handler
  const handleRequestLoan = async (e) => {
    e.preventDefault();
    setLoanStatus('pending');
    setLoanError('');
    setLoanTxHash(null);
    if (!isConnected) {
      setLoanStatus('error');
      setLoanError('Please connect your wallet.');
      return;
    }
    try {
      writeLoan({
        address: LOAN_VAULT_ADDRESS,
        abi: GemLoanVaultABI,
        functionName: 'requestLoan',
        args: [
          Number(collateralId),
          Number(loanAmount),
          Number(duration)
        ],
        // onSuccess will be called with the transaction hash
        onSuccess: (txHash) => {
          setLoanTxHash(txHash);
        },
        onError: (err) => {
          setLoanStatus('error');
          setLoanError(err?.message || 'Transaction failed');
        }
      });
    } catch (err) {
      setLoanStatus('error');
      setLoanError(err?.message || 'Transaction failed');
    }
  };

  // React to transaction confirmation
  useEffect(() => {
    if (isConfirming) setLoanStatus('pending');
    if (isConfirmed) setLoanStatus('success');
    if (isTxError) {
      setLoanStatus('error');
      setLoanError(txError?.message || 'Transaction failed');
    }
  }, [isConfirming, isConfirmed, isTxError, txError]);

  // Mint NFT handler
  const handleMintAsset = async (e) => {
    e.preventDefault();
    setMintStatus('pending');
    setMintError('');
    setMintTxHash(null);
    if (!isConnected) {
      setMintStatus('error');
      setMintError('Please connect your wallet.');
      return;
    }
    try {
      writeMint({
        address: RWA_GEM_NFT_ADDRESS,
        abi: RwaGemNFTABI,
        functionName: 'mintAsset',
        args: [
          address, // user's own address as recipient
          Number(assetType), // enum index: 0=DIAMOND, 1=GOLD, 2=SILVER, 3=OTHER_GEMS
          Number(weight),
          Number(purity),
          certificate,
          physicalAttributes,
          assetDocumentHash.startsWith('0x') ? assetDocumentHash : `0x${assetDocumentHash}`,
          metadataURI
        ],
        onSuccess: (txHash) => {
          setMintTxHash(txHash);
        },
        onError: (err) => {
          setMintStatus('error');
          setMintError(err?.message || 'Transaction failed');
        }
      });
    } catch (err) {
      setMintStatus('error');
      setMintError(err.message || 'Transaction failed');
    }
  };

  // Wait for mint transaction confirmation
  const { isLoading: isMintingConfirming, isSuccess: isMintingConfirmed, isError: isMintTxError, error: mintTxError } = useWaitForTransactionReceipt({
    hash: mintTxHash,
    enabled: !!mintTxHash,
  });

  useEffect(() => {
    if (isMintingConfirming) setMintStatus('pending');
    if (isMintingConfirmed) setMintStatus('success');
    if (isMintTxError) {
      setMintStatus('error');
      setMintError(mintTxError?.message || 'Transaction failed');
    }
  }, [isMintingConfirming, isMintingConfirmed, isMintTxError, mintTxError]);

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary pt-20">
      <div className="max-w-2xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-6">Borrow Page</h1>
        {/* Borrowing Option: NFT as Collateral */}
        <div className="card p-6 flex flex-col gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-accent-primary to-accent-secondary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">{borrowingOption.collateral.slice(0, 2)}</span>
            </div>
            <div>
              <h3 className="text-xl font-semibold">{borrowingOption.collateral} → {borrowingOption.borrowAsset}</h3>
              <p className="text-text-secondary text-sm">{borrowingOption.description}</p>
            </div>
          </div>
          <button
            className="btn-primary w-full"
            onClick={openLoanForm}
          >
            Borrow {borrowingOption.borrowAsset}
          </button>
        </div>
        {/* Loan Form Modal/Inline */}
        {showLoanForm && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-bg-primary rounded-lg shadow-lg p-6 w-full max-w-md relative">
              <button className="absolute top-2 right-2 text-xl" onClick={closeLoanForm}>&times;</button>
              <h2 className="text-xl font-semibold mb-4">Request Loan (RWA NFT as Collateral)</h2>
              <form onSubmit={handleRequestLoan} className="space-y-4">
                <div>
                  <label className="block mb-1 font-medium">Collateral ID</label>
                  <input type="text" className="input" value={collateralId} onChange={e => setCollateralId(e.target.value)} required />
                </div>
                <div>
                  <label className="block mb-1 font-medium">Loan Amount</label>
                  <input type="number" className="input" value={loanAmount} onChange={e => setLoanAmount(e.target.value)} required />
                </div>
                <div>
                  <label className="block mb-1 font-medium">Duration (seconds)</label>
                  <input type="number" className="input" value={duration} onChange={e => setDuration(e.target.value)} required />
                </div>
                <button type="submit" className="btn-primary w-full" disabled={loanStatus === 'pending' || isLoanPending || isConfirming}>
                  {loanStatus === 'pending' || isLoanPending || isConfirming ? 'Requesting...' : 'Request Loan'}
                </button>
                {loanStatus === 'success' && <div className="text-green-600 mt-2">Loan requested successfully!<br/>Tx: {loanTxHash && <a href={`https://etherscan.io/tx/${loanTxHash}`} target="_blank" rel="noopener noreferrer" className="underline">View on Etherscan</a>}</div>}
                {(loanStatus === 'error' || loanTxError) && <div className="text-red-600 mt-2">{loanError || loanTxError?.message}</div>}
              </form>
            </div>
          </div>
        )}
        {/* Mint NFT Form */}
        <div className="card p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Tokenize Asset (Mint NFT)</h2>
          <form onSubmit={handleMintAsset} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Recipient Address</label>
              <input type="text" className="input" value={address} disabled />
            </div>
            <div>
              <label className="block mb-1 font-medium">Asset Type</label>
              <select className="input" value={assetType} onChange={e => setAssetType(e.target.value)} required>
                <option value="">Select Asset Type</option>
                <option value="0">DIAMOND</option>
                <option value="1">GOLD</option>
                <option value="2">SILVER</option>
                <option value="3">OTHER_GEMS</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 font-medium">Weight</label>
              <input type="number" className="input" value={weight} onChange={e => setWeight(e.target.value)} required />
            </div>
            <div>
              <label className="block mb-1 font-medium">Purity</label>
              <input type="number" className="input" value={purity} onChange={e => setPurity(e.target.value)} required />
            </div>
            <div>
              <label className="block mb-1 font-medium">Certificate</label>
              <input type="text" className="input" value={certificate} onChange={e => setCertificate(e.target.value)} required />
            </div>
            <div>
              <label className="block mb-1 font-medium">Physical Attributes (JSON)</label>
              <input type="text" className="input" value={physicalAttributes} onChange={e => setPhysicalAttributes(e.target.value)} required />
            </div>
            <div>
              <label className="block mb-1 font-medium">Asset Document Hash (hex string, 0x...)</label>
              <input type="text" className="input" value={assetDocumentHash} onChange={e => setAssetDocumentHash(e.target.value)} required />
            </div>
            <div>
              <label className="block mb-1 font-medium">Metadata URI</label>
              <input type="text" className="input" value={metadataURI} onChange={e => setMetadataURI(e.target.value)} required />
            </div>
            <button type="submit" className="btn-primary w-full" disabled={mintStatus === 'pending' || isMintingConfirming}>
              {mintStatus === 'pending' || isMintingConfirming ? 'Minting...' : 'Mint NFT'}
            </button>
            {mintStatus === 'success' && <div className="text-green-600 mt-2">NFT minted successfully!<br/>Tx: {mintTxHash && <a href={`https://etherscan.io/tx/${mintTxHash}`} target="_blank" rel="noopener noreferrer" className="underline">View on Etherscan</a>}</div>}
            {mintStatus === 'error' && <div className="text-red-600 mt-2">{mintError}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Borrow;
