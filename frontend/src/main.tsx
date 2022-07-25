import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import "bootstrap/dist/css/bootstrap.min.css"
import 'react-confirm-alert/src/react-confirm-alert.css';
import { ClientContextProvider } from './context/ClientContext'
import { LayoutContextProvider } from './context/LayoutContext'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ClientContextProvider>
      <LayoutContextProvider>
        <App />
      </LayoutContextProvider>
    </ClientContextProvider>
  </React.StrictMode>
)
