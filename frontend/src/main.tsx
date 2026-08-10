import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@flaticon/flaticon-uicons/css/all/all.css';

import './index.css'
import App from './app/App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)