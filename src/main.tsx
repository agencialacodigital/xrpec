import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import SalesPage from './sales/SalesPage'
import './index.css'

/** Página de vendas em /xrpec; a consulta de oferta continua na raiz. */
const isSales = /^\/xrpec\/?$/i.test(window.location.pathname)

ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode>{isSales ? <SalesPage /> : <App />}</React.StrictMode>)
