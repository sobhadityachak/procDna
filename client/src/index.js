import React from 'react';
import ReactDOM from 'react-dom/client';
import { ErrorBoundary } from "react-error-boundary";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

function fallbackRender({ error, resetErrorBoundary }) {
  return (
    <div className="error-fallback">
      <div className="error-fallback-modal">
        <div className="error-fallback-header">
          <div className="error-fallback-icon">⚠️</div>
          <h2>Something went wrong</h2>
        </div>
        
        <div className="error-fallback-body">
          <p>We're sorry, but something unexpected happened. This could be due to a temporary issue.</p>
          
          {process.env.NODE_ENV === 'development' && error && (
            <details className="error-details">
              <summary>Error Details (Development Mode)</summary>
              <div className="error-stack">
                <strong>Error:</strong> {error.toString()}
                <br />
                <strong>Stack Trace:</strong>
                <pre>{error.stack}</pre>
              </div>
            </details>
          )}
        </div>
        
        <div className="error-fallback-actions">
          <button 
            onClick={resetErrorBoundary} 
            className="error-fallback-btn-secondary"
            type="button"
          >
            Try Again
          </button>
          <button 
            onClick={() => window.location.reload()} 
            className="error-fallback-btn-primary"
            type="button"
          >
            Refresh Page
          </button>
        </div>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ErrorBoundary
      fallbackRender={fallbackRender}
      onReset={(details) => {
        console.log('ErrorBoundary reset:', details);
      }}
    >
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
reportWebVitals();
