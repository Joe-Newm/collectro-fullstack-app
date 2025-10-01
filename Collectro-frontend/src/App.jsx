import { useState, useEffect } from 'react'
import { useSearchParams, Outlet } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MainGrid from './components/MainGrid.jsx'
import Nav from './components/nav/Nav.jsx'

function App() {


  return (
    <>
      <Nav />
      <Outlet />
    </>
  )
}

export default App
