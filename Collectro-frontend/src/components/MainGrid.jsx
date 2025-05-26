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
      <h1>This is my main Grid</h1>
        <ul>
        
      <div className="grid grid-cols-6 gap-4">
        {games.map((game) => (
          <li key={game.id} className="bg-black h-96 rounded-lg overflow-hidden w-72">
            <div className="h-1/2">
              <img className="h-full object-cover" src={game.background_image} alt={game.name} ></img>
            </div>
            <h2>{game.name}</h2>
          </li>
        ))} 
      </div>
        </ul>
    </>
  );
}
