import { getDefaultConfig, RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit'
import { WagmiProvider } from 'wagmi'
import { mainnet, polygon, optimism, arbitrum, base, sepolia } from 'wagmi/chains'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import '@rainbow-me/rainbowkit/styles.css'

const config = getDefaultConfig({
  appName: 'RWA Lending Platform',
  projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || '2f05a7cac472eca401ffd52a3a45f8a9',
  chains: [mainnet, sepolia, polygon, optimism, arbitrum, base],
  ssr: false,
})

const queryClient = new QueryClient()

export function Web3Provider({ children }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={darkTheme()}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}