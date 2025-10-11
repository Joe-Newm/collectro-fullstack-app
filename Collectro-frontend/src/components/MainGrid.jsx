import { useEffect, useState } from "react";
import { useSearchParams } from 'react-router-dom'
import Card from "./Card.jsx";



export default function MainGrid() {

    const [games, setGames] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [pageCount, setPageCount ] = useState(0);


  const query = searchParams.get("search") || "";
  const page = searchParams.get("page") || 1;
  const genre = searchParams.get("genre") || "";

  const apiKey = import.meta.env.VITE_RAWG_API_KEY;
  const baseUrl = `https://api.rawg.io/api/games?key=${apiKey}`

    let url = "";
    async function getData() {
      if (query) {
        url = `https://api.rawg.io/api/games?key=${apiKey}&search=${query}&page=${page}`
      } else if (genre) {
        url = `https://api.rawg.io/api/games?key=${apiKey}&genres=${genre}&page=${page}`
      } else {
        url = `https://api.rawg.io/api/games?key=${apiKey}&page=${page}`;
      }

      try {
        const response = await fetch(url)

        if (!response.ok) {
          throw new Error(`Error ${response.status}`)
        }

        const data = await response.json();
        setGames(data.results);
        setPageCount(Math.ceil(data.count / 20));
      }
      catch {
        console.error("fetch error:", error);
      }
    }

  useEffect(() => {
    getData();
  }, [query, page]);


  // grid for skeleton games when loading
    let items = [];
    for (let i = 0; i < 20; i++) {
      items.push(
          <li className="bg-neutral-700 h-70 rounded-lg max-w-80 min-w-60 overflow-hidden relative">
            <div className="absolute bottom-0 w-full h-20 bg-neutral-900/50"></div>
          </li>
      )
    }

  if (!games) return (
    <> 
      <div className="flex justify-center pt-8">  
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 2xl:grid-cols-5 container mx-auto">
        {items}
      </ul>
      </div>
  </>
  
        )

  return (
    <>
        <ul>
      <div className="flex justify-center pt-8">  
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 2xl:grid-cols-5 container mx-auto">
        {games.map((game) => (
          <li key={game.id} className=" rounded-lg overflow-hidden max-w-80">
            <Card game={game}></Card>
          </li>
        ))} 
      </div>
      </div>
        </ul>
        <div className="flex flex-row justify-center gap-4 m-8">
          <button 
          onClick={() => {
            if (Number(page) === 1) {
              query ? setSearchParams({search: query, page: Number(page)}) : setSearchParams({genre: genre, page: Number(page)})
            } else {
              query ? setSearchParams({search: query, page: Number(page) - 1}) : setSearchParams({genre: genre, page: Number(page) - 1})
            }
            window.scrollTo({top: 0, behavior: "smooth"});
          
          }
        }
          className="h-20 w-20 !bg-gray-600"

          >prev</button>
          <button
          onClick={() => {
            if (!pageCount || Number(page) >= pageCount) {
              query ? setSearchParams({search: query, page: Number(page)}) : setSearchParams({genre: genre, page: Number(page)})
            } else {
              query ? setSearchParams({search: query, page: Number(page) + 1}) : setSearchParams({genre: genre, page: Number(page) + 1})
            }
            window.scrollTo({top: 0, behavior: "smooth"})
            }
          } 
          className="h-20 w-20 !bg-gray-600"
          href="#top"

          >next</button>
        </div>
    </>
  );
}
