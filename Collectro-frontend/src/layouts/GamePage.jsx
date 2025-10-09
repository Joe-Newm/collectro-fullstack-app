import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Nav from '../components/nav/Nav'

export default function GamePage() {
  const [ game, setGame ] = useState(null);
  const [ screenshots, setScreenshots ] = useState(null);
  const [ selectedScr, setSelectedScr] = useState(null);
    
  const { id } = useParams();

  const apiKey = import.meta.env.VITE_RAWG_API_KEY;
  const baseUrl = `https://api.rawg.io/api/games/${id}?key=${apiKey}`
  const screenshotsUrl = `https://api.rawg.io/api/games/${id}/screenshots?key=${apiKey}`


  useEffect(() => {
    const fetchData = async () => {
        try {
            const gameDataResponse = await fetch(baseUrl);
            const screenshotsResponse = await fetch(screenshotsUrl);
            if (!gameDataResponse.ok) {
                throw new Error(`response error: ${gameDataResponse.status}`)
            } 
            if (!screenshotsResponse.ok) {
                throw new Error(`response error: ${screenshotsResponse.status}`)
            } 
            const gameData = await gameDataResponse.json();
            const screenshotsData = await screenshotsResponse.json();
            setGame(gameData);
            setScreenshots(screenshotsData.results);
            setSelectedScr(screenshotsData.results[0]);
        } catch (error) {
            console.error(`error fetching data`)
        }
    }
    fetchData();

  }, [id]);

    if (!game || !screenshots || !selectedScr ) return (<div className="flex h-screen justify-center items-center"><h2 className="">loading...</h2></div>)
        
    return (
        <div>
        <div className="relative">
            <div>
                <img className="w-full h-[600px] object-cover z-0" src={game.background_image} alt={game.name} />
                <div className="absolute top-0 w-full h-[600px] bg-black z-10 opacity-70"></div>
            </div>
            <div className="inset-0 flex flex-col container mx-auto absolute z-20 items-center justify-center text-white">
                <h1>{game.name}</h1>
                <p> {game.description_raw} </p>
              <div className="mt-5 justify-center flex gap-x-2 text-xs text-left flex-wrap gap-y-0">{game.parent_platforms ? (game.parent_platforms.map((item) => (<p key={item.platform.id}>{item.platform.name}</p>))) : null}</div>
              <a className="mt-5 underline" href={game.website} target="_blank">{game.website ? game.website : null}</a>
              <p>{game.developer}</p>
            </div>
        </div>
        <div className="container mx-auto">
            <div className="flex gap-6 justify-between">
            <div>
                <img className="mt-10 max-w-2xl max-h-[600px]" key={selectedScr.id} src={selectedScr.image} alt="game screenshot"/>
            </div>
            <div className="grid grid-cols-3 gap-4 h-fit">
                {screenshots.map((game) => (
                    <a className="cursor-pointer" key={game.id} onClick={(e) => {e.preventDefault(); setSelectedScr(game)}}>
                        <img className={`mt-10 w-64 h-fit ${selectedScr === game ? "outline outline-blue-400" : null}`} src={game.image} alt="game screenshot"/>
                    </a>
                ))}
            </div>
            </div>
        </div>
        </div>
    )
}