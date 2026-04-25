import { useState } from 'react'
import './style.css'

function WebhookSender() {
  const [webhookUrl, setWebhookUrl] = useState('')
  const [repoLink, setRepoLink] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setMessage('')

    try {
      const response = await fetch('http://localhost:8080/api/webhooks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          webhookUrl,
          repository: repoLink,
          timestamp: new Date().toISOString()
        }),
      })

      if (response.ok) {
        setStatus('success')
        setMessage('Webhook sent successfully!')
        setWebhookUrl('')
        setRepoLink('')
      } else {
        setStatus('error')
        setMessage('Failed to send webhook')
      }
    } catch (err) {
      setStatus('error')
      setMessage(`Error: ${err instanceof Error ? err.message : 'Connection failed'}`)
    }
  }

  return (
    <div className="container">
      <div className="card">
        <h1>Webhook Sender</h1>
        <p className="subtitle">Connect to Spring Boot Microservice</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="webhookUrl">Webhook URL</label>
            <input
              id="webhookUrl"
              type="url"
              placeholder="https://webhook.site/xxx or http://localhost:8080/webhook"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="repoLink">Repository Link</label>
            <input
              id="repoLink"
              type="url"
              placeholder="https://github.com/username/repo"
              value={repoLink}
              onChange={(e) => setRepoLink(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-submit"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Sending...' : 'Send to Microservice'}
          </button>
        </form>

        {message && (
          <p className={`message ${status}`}>{message}</p>
        )}
      </div>
    </div>
  )
}

export default WebhookSender