import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <main className="bg-background min-h-[100dvh]">
        <BrowserRouter>
            <App />
        </BrowserRouter>
      </main>
  </StrictMode>,
)
