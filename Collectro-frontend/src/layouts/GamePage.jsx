import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import Card from '../components/Card'
import Nav from '../components/nav/Nav'

export default function GamePage() {
  const [ game, setGame ] = useState(null);
  const [ screenshots, setScreenshots ] = useState(null);
  const [ selectedScr, setSelectedScr] = useState(null);
  const [ series, setSeries ] = useState(null);
  const [ movies, setMovies ] = useState(null);
  const [redditPosts, setRedditPosts ] = useState(null);
    
  const { id } = useParams();
  const { pathname } = useLocation();

  const apiKey = import.meta.env.VITE_RAWG_API_KEY;
  const baseUrl = `https://api.rawg.io/api/games/${id}?key=${apiKey}`
  const screenshotsUrl = `https://api.rawg.io/api/games/${id}/screenshots?key=${apiKey}`
  const gamesSeries = `https://api.rawg.io/api/games/${id}/game-series?key=${apiKey}`
  const moviesUrl = `https://api.rawg.io/api/games/${id}/movies?key=${apiKey}`
  const redditPostsUrl = `https://api.rawg.io/api/games/${id}/reddit?key=${apiKey}`



  useEffect(() => {
    const fetchData = async () => {
        try {
            const gameDataResponse = await fetch(baseUrl);
            const screenshotsResponse = await fetch(screenshotsUrl);
            const seriesResponse = await fetch(gamesSeries);
            const moviesResponse = await fetch(moviesUrl);
            const redditPostsResponse = await fetch(redditPostsUrl);
            if (!gameDataResponse.ok) {
                throw new Error(`response error: ${gameDataResponse.status}`)
            } 
            if (!screenshotsResponse.ok) {
                throw new Error(`response error: ${screenshotsResponse.status}`)
            } 
            if (!seriesResponse.ok) {
                throw new Error(`response error: ${seriesResponse.status}`)
            }
            if (!moviesResponse.ok) {
                throw new Error(`response error: ${moviesResponse.status}`)
            }
            if (!redditPostsResponse.ok) {
                throw new Error(`response error: ${redditPostsResponse.status}`)
            }
            const gameData = await gameDataResponse.json();
            const screenshotsData = await screenshotsResponse.json();
            const seriesData = await seriesResponse.json();
            const moviesData = await moviesResponse.json();
            const redditPostsData = await redditPostsResponse.json();

            setGame(gameData);
            setScreenshots(screenshotsData.results);
            setSelectedScr(screenshotsData.results[0]);
            setSeries(seriesData.results);
            setMovies(moviesData.results);
            setRedditPosts(redditPostsData.results);
        } catch (error) {
            console.error(`error fetching data`)
        }
    }
    fetchData();
    window.scrollTo(0, 0);
  }, [id, pathname]);

    if (!game || !screenshots || !selectedScr || !series ) return (<div className="flex h-screen justify-center items-center"><h2 className="">loading...</h2>{console.log(game, screenshots, selectedScr, series)}</div>)
        
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

          {movies.length > 0 ?
          <div className="bg-black mt-10">
            <video controls width="1920">
                <source src={movies[0].data.max} />
            </video>
            
          </div>
          :
          null
        }

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
                        {game.stores.length > 0 ?
                        <div className="text-left mt-4">
                            <h3 className="font-bold">Stores:</h3>
                            {game.stores.map((store) => (
                            <p key={store.id}>{store.store.name}</p>
                            ))}
                        </div>
                        :
                        null
                    }
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
                        {game.tags.length > 0 ? 
                        <div className="text-left mt-4 flex flex-wrap gap-4 w-fit">
                            <h3 className="font-bold">Tags:</h3>
                            {game.tags.map ((tag) => (
                                <p className="text-sm text-neutral-500" key={tag.id}>{tag.name}</p>
                            ))}
                        </div>
                        :
                        null
                    
                    }
                        </div>
                </div>
            </div>
          </div>

            {redditPosts.length > 0 ? 
          <div>
                <h2 className="font-bold text-left mb-2 mt-10">Recent Posts on Reddit</h2>
                <hr className="text-neutral-500"></hr>
                <div className="flex flex-col gap-1 justify-center w-full">
                {redditPosts.map((post) => (
                    <a target="_blank" key={post.id} className="h-[55px] text-left bg-neutral-700 flex items-center pl-6" href={post.url}>
                        <h3 className="text-lg">{post.name}</h3>
                    </a>
                ))

                }
                </div>
          </div>
          :
          null
        }

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