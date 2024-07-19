import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { GameContextProvider } from './context/GameContext.tsx'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GameContextProvider>
      <App />
    </GameContextProvider>
  </React.StrictMode>,
)
