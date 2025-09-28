import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useAccount } from 'wagmi'
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import Lend from './components/Lend'
import Borrow from './components/Borrow'
import Liquidate from './components/Liquidate'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import HowToUse from './components/HowToUse'
import Benefits from './components/Benefits'
import Footer from './components/Footer'

// Landing page component
const LandingPage = () => (
  <>
    <Header />
    <main>
      <Hero />
      <About />
      <HowToUse />
      <Benefits />
    </main>
    <Footer />
  </>
)

// App component with protected routes
const AppContent = () => {
  const { isConnected } = useAccount()

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route 
        path="/dashboard" 
        element={isConnected ? <Dashboard /> : <Navigate to="/" replace />} 
      />
      <Route 
        path="/lend" 
        element={isConnected ? <Lend /> : <Navigate to="/" replace />} 
      />
      <Route 
        path="/borrow" 
        element={isConnected ? <Borrow /> : <Navigate to="/" replace />} 
      />
      <Route 
        path="/liquidate" 
        element={isConnected ? <Liquidate /> : <Navigate to="/" replace />} 
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

function App() {
  console.log('🚀 RWA Vault App is fully loaded and running!')
  const { isConnected } = useAccount()
  
  return (
    <Router>
      <div className="min-h-screen bg-bg-primary text-text-primary">
        {isConnected && <Navbar />}
        <AppContent />
      </div>
    </Router>
  )
}

export default App
