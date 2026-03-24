import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/AuthContext.jsx'
import { ClaimProvider } from './context/ClaimContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <ClaimProvider>
        <App />
      </ClaimProvider>
    </AuthProvider>
  </React.StrictMode>,
)
