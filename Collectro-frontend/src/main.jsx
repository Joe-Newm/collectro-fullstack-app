import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Nav from "./components/nav/Nav"
import GamePage from "./layouts/GamePage.jsx"
import HomePage from './layouts/HomePage.jsx'
import ResultsPage from './layouts/ResultsPage.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="/games/:id" element={<GamePage />} />
        <Route path="/results" element={<ResultsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
