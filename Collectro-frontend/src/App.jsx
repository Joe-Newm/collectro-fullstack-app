import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MainGrid from './components/MainGrid.jsx'
import Nav from './components/nav/Nav.jsx'

function App() {
  const [games, setGames] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [pageCount, setPageCount ] = useState(0);


  const query = searchParams.get("search") || "";
  const page = searchParams.get("page") || 1;

  const apiKey = import.meta.env.VITE_RAWG_API_KEY;
  const baseUrl = `https://api.rawg.io/api/games?key=${apiKey}`


    async function getData() {
      const url = query ? `https://api.rawg.io/api/games?key=${apiKey}&search=${query}&page=${page}` : `https://api.rawg.io/api/games?key=${apiKey}&page=${page}`;

      try {
        const response = await fetch(url)

        if (!response.ok) {
          throw new Error(`Error ${response.status}`)
        }

        const data = await response.json();
        setGames(data.results);
        setPageCount(data.count);
      }
      catch {
        console.error("fetch error:", error);
      }
    }

  useEffect(() => {
    getData();
    console.log(pageCount)
  }, [query, page]);

  return (
    <>
      <Nav getData={getData} setSearchParams={setSearchParams}/>
      <MainGrid games={games} page={page} query={query} setSearchParams={setSearchParams} pageCount={pageCount}  />
    </>
  )
}

export default App
