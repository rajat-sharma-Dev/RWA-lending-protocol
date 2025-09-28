import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          padding: '20px', 
          backgroundColor: '#000', 
          color: '#fff', 
          minHeight: '100vh',
          fontFamily: 'monospace'
        }}>
          <h1 style={{ color: '#ff0000' }}>❌ Something went wrong</h1>
          <details style={{ whiteSpace: 'pre-wrap', marginTop: '20px' }}>
            <summary style={{ color: '#00ffff', cursor: 'pointer' }}>Error Details</summary>
            <p style={{ color: '#ff007f', marginTop: '10px' }}>
              {this.state.error && this.state.error.toString()}
            </p>
            <p style={{ color: '#bf00ff' }}>
              {this.state.errorInfo.componentStack}
            </p>
          </details>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
