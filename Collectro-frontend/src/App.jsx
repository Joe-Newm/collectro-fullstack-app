import { useState, useEffect } from 'react'
import { useSearchParams, Outlet } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MainGrid from './components/MainGrid.jsx'
import Nav from './components/nav/Nav.jsx'
import Footer from './components/Footer'

function App() {


  return (
    <>
      <Nav />
      <Outlet />
      <Footer />
    </>
  )
}

export default App
