import { useEffect, useState } from "react";



export default function MainGrid() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    async function getData() {
      const apiKey = process.env.REACT_APP_RAWG_API_KEY;
      const url = `https://api.rawg.io/api/games?key=${apiKey}`

      try {
        const response = await fetch(url)

        if (!response.ok) {
          throw new Error(`Error ${response.status}`)
        }

        const data = await response.json();
        setGames(data.results);
        console.log(data);
        console.log(apiKey);
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
      <div>

      </div>
    </>
  );
}
