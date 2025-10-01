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

    if (!game) return (<div className="flex h-screen justify-center items-center"><h2 >loading...</h2></div>)
        
    return (
        <h1>{game.name}</h1>
    )
}