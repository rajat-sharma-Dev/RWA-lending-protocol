import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Web3Provider } from './providers/Web3Provider.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <Web3Provider>
        <App />
      </Web3Provider>
    </ErrorBoundary>
  </StrictMode>,
)
