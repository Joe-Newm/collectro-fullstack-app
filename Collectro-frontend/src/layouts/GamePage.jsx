import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function GamePage() {
  const [ game, setGame ] = useState(null);
    
  const { id } = useParams();

  const apiKey = import.meta.env.VITE_RAWG_API_KEY;
  const baseUrl = `https://api.rawg.io/api/games/${id}?key=${apiKey}`


  useEffect(() => {
    fetch(baseUrl).then((res) => res.json()).then((data) => setGame(data))
  }, [id]);

    if (!game) return (<div className="flex h-screen justify-center items-center"><h2 className="">loading...</h2></div>)
        
    return (
        <div className="">
            <div>
                <img className="w-full h-[700px] object-cover" src={game.background_image} alt={game.name} />
            </div>
            <div className="flex flex-col container mx-auto">
                <h1>{game.name}</h1>
                <p> {game.description_raw} </p>
            </div>
        </div>
    )
}