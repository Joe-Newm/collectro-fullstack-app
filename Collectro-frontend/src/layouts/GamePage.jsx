import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import Card from '../components/Card'
import Nav from '../components/nav/Nav'

export default function GamePage() {
  const [ game, setGame ] = useState(null);
  const [ screenshots, setScreenshots ] = useState(null);
  const [ selectedScr, setSelectedScr] = useState(null);
  const [ series, setSeries ] = useState(null);
    
  const { id } = useParams();

  const apiKey = import.meta.env.VITE_RAWG_API_KEY;
  const baseUrl = `https://api.rawg.io/api/games/${id}?key=${apiKey}`
  const screenshotsUrl = `https://api.rawg.io/api/games/${id}/screenshots?key=${apiKey}`
  const gamesSeries = `https://api.rawg.io/api/games/${id}/game-series?key=${apiKey}`


  useEffect(() => {
    const fetchData = async () => {
        try {
            const gameDataResponse = await fetch(baseUrl);
            const screenshotsResponse = await fetch(screenshotsUrl);
            const seriesResponse = await fetch(gamesSeries);
            if (!gameDataResponse.ok) {
                throw new Error(`response error: ${gameDataResponse.status}`)
            } 
            if (!screenshotsResponse.ok) {
                throw new Error(`response error: ${screenshotsResponse.status}`)
            } 
            if (!seriesResponse.ok) {
                throw new Error(`response error: ${seriesResponse.status}`)
            }
            const gameData = await gameDataResponse.json();
            const screenshotsData = await screenshotsResponse.json();
            const seriesData = await seriesResponse.json();

            setGame(gameData);
            setScreenshots(screenshotsData.results);
            setSelectedScr(screenshotsData.results[0]);
            setSeries(seriesData.results);
        } catch (error) {
            console.error(`error fetching data`)
        }
    }
    fetchData();
  }, [id]);

    if (!game || !screenshots || !selectedScr || !series ) return (<div className="flex h-screen justify-center items-center"><h2 className="">loading...</h2></div>)
        
    return (
        <div>
        <div className="relative">
            <div>
                <img className="w-full h-[400px] object-cover z-0" src={game.background_image} alt={game.name} />
                <div className="absolute top-0 w-full h-[400px] bg-black z-10 opacity-70"></div>
            </div>
            <div className="inset-0 flex flex-col container mx-auto absolute z-20 items-center justify-center text-white">
                <h1>{game.name}</h1>
              <div className="mt-5 justify-center flex gap-x-2 text-xs text-left flex-wrap gap-y-0">{game.parent_platforms ? (game.parent_platforms.map((item) => (<p key={item.platform.id}>{item.platform.name}</p>))) : null}</div>
              <a className="mt-5 underline" href={game.website} target="_blank">{game.website ? game.website : null}</a>
              <p>{game.developer}</p>
            </div>
        </div>
        <div className="container mx-auto">
          <div className="bg-black p-6 mt-10 rounded-lg flex gap-6 flex-col lg:flex-row">
            <div className="flex flex-col gap-6 w-full lg:w-1/2 ">
                <div className="w-full">
                    <img className=" max-w-full max-h-[600px]" key={selectedScr.id} src={selectedScr.image} alt="game screenshot"/>
                </div>
                <div className="grid grid-cols-3 gap-4 h-fit items-start">
                    {screenshots.map((game) => (
                        <a className="cursor-pointer" key={game.id} onClick={(e) => {e.preventDefault(); setSelectedScr(game)}}>
                            <img className={` w-64 h-fit ${selectedScr === game ? "outline outline-blue-400" : null}`} src={game.image} alt="game screenshot"/>
                        </a>
                    ))}
                </div>
            </div>
            <div className="w-full lg:w-1/2 text-left flex flex-col">
                <p> {game.description_raw} </p>
                <div className="mt-4 text-wrap">
                        <hr className="text-neutral-600"></hr>
                        <div className="flex gap-10 flex-wrap">
                        <div className="text-left mt-4">
                            <h3 className="font-bold">Developers:</h3>
                            {game.developers.map((dev) => (
                            <p key={dev.id}>{dev.name}</p>
                            ))}
                        </div>
                        <div className="text-left mt-4">
                            <h3 className="font-bold">Publishers:</h3>
                            {game.publishers.map((pub) => (
                            <div key={pub.id}>
                                <p>{pub.name}</p>
                            </div>
                            ))}

                        </div>
                        <div className="text-left mt-4">
                            <h3 className="font-bold">Genres:</h3>
                            {game.genres.map((genre) => (
                            <p key={genre.id}>{genre.name}</p>
                            ))}
                        </div>
                        <div className="text-left mt-4">
                            <h3 className="font-bold">Stores:</h3>
                            {game.stores.map((store) => (
                            <p key={store.id}>{store.name}</p>
                            ))}
                        </div>
                        <div className="text-left mt-4">
                            <h3 className="font-bold">Metacritic:</h3>
                            <p>{game.metacritic}</p>
                        </div>
                        {game.esrb_rating ? 
                        <div className="text-left mt-4">
                            <h3 className="font-bold">ESRB Rating:</h3>
                            <p>{game.esrb_rating.name}</p>
                        </div>
                        :
                        null
                    
                    }
                        </div>
                </div>
            </div>
          </div>
          <div>
            {series.length === 0 ? 
            null
            :
            <div>
                <h2 className="font-bold text-left mb-2 mt-10">Games in the Series</h2>
                <ul>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 2xl:grid-cols-5 ">
                        {series.map((game) => (
                        <li key={game.id} className="bg-black h-96 rounded-lg overflow-hidden max-w-80">
                            <Card game={game}></Card>
                        </li>
                        ))} 
                    </div>
                </ul>
            </div>
            }

          </div>
        </div>
        </div>
    )
}