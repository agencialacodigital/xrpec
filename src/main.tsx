import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import SalesPage from './sales/SalesPage'
import './index.css'

/**
 * Rotas:
 *  /           → página de vendas
 *  /xrpec      → página de vendas (alias)
 *  /consulta   → consulta rápida de oferta (só e-mail)
 */
const path = window.location.pathname.replace(/\/+$/, '').toLowerCase()
const isConsulta = path === '/consulta'

ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode>{isConsulta ? <App /> : <SalesPage />}</React.StrictMode>)
