import { useEffect, useState } from "react";
import { useSearchParams } from 'react-router-dom'
import Card from "./Card.jsx";



export default function MainGrid() {

    const [games, setGames] = useState(null);
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
        setPageCount(Math.ceil(data.count / 20));
      }
      catch {
        console.error("fetch error:", error);
      }
    }

  useEffect(() => {
    getData();
    console.log(pageCount)
  }, [query, page]);

  if (!games) return (
    <> 
      <div className="flex justify-center pt-8">  
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 2xl:grid-cols-5 container mx-auto">
          <li className="bg-black h-96 rounded-lg max-w-80 min-w-60 overflow-hidden"></li>
          <li className="bg-black h-96 rounded-lg max-w-80 min-w-60 overflow-hidden"></li>
          <li className="bg-black h-96 rounded-lg max-w-80 min-w-60 overflow-hidden"></li>
          <li className="bg-black h-96 rounded-lg max-w-80 min-w-60 overflow-hidden"></li>
          <li className="bg-black h-96 rounded-lg max-w-80 min-w-60 overflow-hidden"></li>
          <li className="bg-black h-96 rounded-lg max-w-80 min-w-60 overflow-hidden"></li>
          <li className="bg-black h-96 rounded-lg max-w-80 min-w-60 overflow-hidden"></li>
          <li className="bg-black h-96 rounded-lg max-w-80 min-w-60 overflow-hidden"></li>
          <li className="bg-black h-96 rounded-lg max-w-80 min-w-60 overflow-hidden"></li>
          <li className="bg-black h-96 rounded-lg max-w-80 min-w-60 overflow-hidden"></li>
          <li className="bg-black h-96 rounded-lg max-w-80 min-w-60 overflow-hidden"></li>
          <li className="bg-black h-96 rounded-lg max-w-80 min-w-60 overflow-hidden"></li>
          <li className="bg-black h-96 rounded-lg max-w-80 min-w-60 overflow-hidden"></li>
          <li className="bg-black h-96 rounded-lg max-w-80 min-w-60 overflow-hidden"></li>
          <li className="bg-black h-96 rounded-lg max-w-80 min-w-60 overflow-hidden"></li>
          <li className="bg-black h-96 rounded-lg max-w-80 min-w-60 overflow-hidden"></li>
          <li className="bg-black h-96 rounded-lg max-w-80 min-w-60 overflow-hidden"></li>
          <li className="bg-black h-96 rounded-lg max-w-80 min-w-60 overflow-hidden"></li>
          <li className="bg-black h-96 rounded-lg max-w-80 min-w-60 overflow-hidden"></li>
          <li className="bg-black h-96 rounded-lg max-w-80 min-w-60 overflow-hidden"></li>
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
          <li key={game.id} className="bg-black h-96 rounded-lg overflow-hidden max-w-80">
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
            setSearchParams({search: query, page: Number(page)})
            } else {
            setSearchParams({search: query, page: Number(page) - 1})
            }
            window.scrollTo({top: 0, behavior: "smooth"});
          
          }
        }
          className="h-20 w-20 !bg-gray-600"

          >prev</button>
          <button
          onClick={() => {
            if (!pageCount || Number(page) >= pageCount) {
              setSearchParams({search: query, page: Number(page)})
            } else {
              setSearchParams({search: query, page: Number(page) + 1})
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
