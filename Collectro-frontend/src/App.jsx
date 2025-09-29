import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MainGrid from './components/MainGrid.jsx'
import Nav from './components/nav/Nav.jsx'

function App() {
  const [games, setGames] = useState([]);
  const [next, setNext ] = useState([]);
  const [prev, setPrev ] = useState([]);

  const apiKey = import.meta.env.VITE_RAWG_API_KEY;
  const baseUrl = `https://api.rawg.io/api/games?key=${apiKey}`


    async function getData(url, searchQuery) {
      let search = `&search=${searchQuery}`;
      if (searchQuery === undefined) {
        search = "";
      } 

      try {
        const response = await fetch(url + search)

        if (!response.ok) {
          throw new Error(`Error ${response.status}`)
        }

        const data = await response.json();
        setGames(data.results);
        setNext(data.next);
        setPrev(data.previous)
      }
      catch {
        console.error("fetch error:", error);
      }
    }

  useEffect(() => {
    getData(baseUrl, "");
  }, []);

  return (
    <>
      <Nav getData={getData}/>
      <MainGrid getData={getData} games={games} next={next} prev={prev} />
    </>
  )
}

export default App
