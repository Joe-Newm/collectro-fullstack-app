import { useEffect, useState } from "react";



export default function MainGrid() {
  const [games, setGames] = useState([]);
  const [next, setNext ] = useState([]);
  const [prev, setPrev ] = useState([]);


  const apiKey = import.meta.env.VITE_RAWG_API_KEY;
  const baseUrl = `https://api.rawg.io/api/games?key=${apiKey}`


    async function getData(url) {

      try {
        const response = await fetch(url)

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
    getData(baseUrl);
  }, []);

  return (
    <>
        <ul>
      <div className="flex justify-center pt-8">  
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 xl:grid-cols-5">
        {games.map((game) => (
          <li key={game.id} className="bg-black h-96 rounded-lg overflow-hidden max-w-72">
            <div className="h-1/2">
              <img className="h-full object-cover" src={game.background_image} alt={game.name} ></img>
            </div>
            <div className=" h-full  justify-start p-4">
              <h2 className="text-left">{game.name}</h2>
              <p className="text-left">Metacritic: {game.metacritic}</p>
              <div className="flex gap-x-2 text-xs text-left flex-wrap gap-y-0">{game.parent_platforms.map((item) => (<p key={item.platform.id}>{item.platform.name}</p>))}</div>
            </div>
          </li>
        ))} 
      </div>
      </div>
        </ul>
        <div className="flex flex-row justify-center gap-4 m-8">
          <button 
          onClick={() => {if (prev) {
            getData(prev); 
            window.scrollTo({top: 0, behavior: "smooth"});
          }
          }
        }
          className="h-20 w-20 !bg-gray-600"

          >prev</button>
          <button
          onClick={() => {if (next)
            getData(next)
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
