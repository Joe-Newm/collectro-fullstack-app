import { useEffect, useState } from "react";



export default function MainGrid() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    async function getData() {
      const apiKey = import.meta.env.VITE_RAWG_API_KEY;
      const url = `https://api.rawg.io/api/games?key=${apiKey}`

      try {
        const response = await fetch(url)

        if (!response.ok) {
          throw new Error(`Error ${response.status}`)
        }

        const data = await response.json();
        setGames(data.results);
      }
      catch {
        console.error("fetch error:", error);
      }
    }

    getData();
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
              <p className="text-left">Rating: {game.rating}</p>
            </div>
          </li>
        ))} 
      </div>
      </div>
        </ul>
    </>
  );
}
