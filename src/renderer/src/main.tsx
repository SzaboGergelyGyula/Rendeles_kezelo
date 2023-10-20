import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/index.css'
import App from './App'
import GlobalContextProvider from './components/context/GlobalContext'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GlobalContextProvider>
      <App />
    </GlobalContextProvider>
  </React.StrictMode>
)
