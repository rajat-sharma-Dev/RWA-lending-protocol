import { Zap } from 'lucide-react'

const Dashboard = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-primary px-4 py-24">
      <div className="w-full max-w-xl mx-auto glass-strong rounded-3xl border border-border-primary shadow-2xl p-10 flex flex-col items-center bg-bg-card">
        <div className="flex flex-col items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-full bg-accent-primary/10 flex items-center justify-center">
            <Zap className="w-7 h-7 text-accent-primary" />
          </div>
          <h1 className="text-3xl font-display font-bold gradient-text">Welcome to Your Dashboard</h1>
        </div>
        <p className="text-lg text-text-secondary text-center mb-2">Access your lending, borrowing, and liquidation actions from the navigation above.</p>
        <p className="text-base text-text-muted text-center">All your RWA DeFi activity in one place. Simple. Secure. Professional.</p>
      </div>
    </section>
  )
}

export default Dashboard
