import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MainGrid from './components/MainGrid.jsx'
import Nav from './components/nav/Nav.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Nav />
      <MainGrid />
    </>
  )
}

export default App
