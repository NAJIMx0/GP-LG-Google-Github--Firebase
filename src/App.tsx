import { useState } from 'react'
import './style.css'
import Login from './Login.tsx'
import WebhookSender from './WebhookSender.tsx'

function App() {
  const [view, setView] = useState<'login' | 'webhook'>('login')

  return (
    <>
      <nav className="nav">
        <button 
          className={`nav-btn ${view === 'login' ? 'active' : ''}`}
          onClick={() => setView('login')}
        >
          Login
        </button>
        <button 
          className={`nav-btn ${view === 'webhook' ? 'active' : ''}`}
          onClick={() => setView('webhook')}
        >
          Webhook
        </button>
      </nav>
      {view === 'login' ? <Login /> : <WebhookSender />}
    </>
  )
}

export default App