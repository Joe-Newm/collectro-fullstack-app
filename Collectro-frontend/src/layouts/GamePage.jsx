import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Nav from '../components/nav/Nav'

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
        <div>
        <Nav />
        <div className="relative">
            <div>
                <img className="w-full h-[600px] object-cover z-0" src={game.background_image} alt={game.name} />
                <div className="absolute top-0 w-full h-[600px] bg-black z-10 opacity-70"></div>
            </div>
            <div className="inset-0 flex flex-col container mx-auto absolute z-20 items-center justify-center text-white">
                <h1>{game.name}</h1>
                <p> {game.description_raw} </p>
            </div>
        </div>
        </div>
    )
}