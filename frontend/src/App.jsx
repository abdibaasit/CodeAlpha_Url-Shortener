import { useState } from 'react';
import './App.css';

function App() {
  const [inputUrl, setInputUrl] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState([]);

  const handleShorten = async (e) => {
    e.preventDefault();
    setError('');
    setResult(null);
    setCopied(false);

    if (!inputUrl.trim()) {
      setError('Please enter a URL to shorten.');
      return;
    }

    try {
      new URL(inputUrl);
    } catch {
      setError('Please enter a valid URL (e.g. https://example.com).');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/urls', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ originalUrl: inputUrl }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message || 'Something went wrong. Try again.');
        return;
      }

      setResult(data.data);
      setHistory((prev) => [data.data, ...prev.slice(0, 4)]);
      setInputUrl('');
    } catch {
      setError('Could not connect to server. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (url) => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="app">
      {/* Background orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      <div className="container">
        {/* Header */}
        <header className="header">
          <div className="logo">
            <div className="logo-icon">⚡</div>
            <span className="logo-text">Snip<span className="logo-accent">URL</span></span>
          </div>
          <p className="tagline">Shorten long links in a snap</p>
        </header>

        {/* Main Card */}
        <div className="card">
          <h1 className="card-title">Make your URL shorter</h1>
          <p className="card-subtitle">Paste your long link below and get a clean, shareable short URL instantly.</p>

          <form className="form" onSubmit={handleShorten}>
            <div className="input-group">
              <span className="input-icon">🔗</span>
              <input
                id="url-input"
                type="text"
                className="url-input"
                placeholder="https://your-very-long-url.com/goes/here..."
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                disabled={loading}
              />
            </div>
            <button
              id="shorten-btn"
              type="submit"
              className={`shorten-btn ${loading ? 'loading' : ''}`}
              disabled={loading}
            >
              {loading ? (
                <span className="spinner-wrap"><span className="spinner" /> Shortening...</span>
              ) : (
                'Shorten URL →'
              )}
            </button>
          </form>

          {/* Error */}
          {error && (
            <div className="alert alert-error">
              <span>⚠️</span> {error}
            </div>
          )}

          {/* Result */}
          {result && (
            <div className="result-card">
              <div className="result-header">
                <span className="result-badge">✅ Done!</span>
              </div>

              <div className="result-row">
                <div className="result-label">Original URL</div>
                <div className="result-original">{result.originalUrl}</div>
              </div>

              <div className="result-divider" />

              <div className="result-row">
                <div className="result-label">Short URL</div>
                <div className="result-short-wrap">
                  <a
                    href={result.shortUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="result-short-url"
                    id="short-url-link"
                  >
                    {result.shortUrl}
                  </a>
                  <button
                    id="copy-btn"
                    className={`copy-btn ${copied ? 'copied' : ''}`}
                    onClick={() => handleCopy(result.shortUrl)}
                  >
                    {copied ? '✓ Copied!' : 'Copy'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* History */}
        {history.length > 0 && (
          <div className="history-section">
            <h2 className="history-title">Recent Links</h2>
            <div className="history-list">
              {history.map((item, i) => (
                <div key={i} className="history-item">
                  <div className="history-original">{item.originalUrl}</div>
                  <div className="history-right">
                    <a
                      href={item.shortUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="history-short"
                    >
                      {item.shortUrl}
                    </a>
                    <button
                      className="history-copy-btn"
                      onClick={() => navigator.clipboard.writeText(item.shortUrl)}
                      title="Copy"
                    >
                      📋
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <footer className="footer">Built with ⚡ SnipURL · {new Date().getFullYear()}</footer>
      </div>
    </div>
  );
}

export default App;
