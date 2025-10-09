import { useState, useEffect } from 'react';
import Card from '../components/Card';

export default function HomePage() {
    const [newGames, setNewGames] = useState(null);
    const [featuredGames, setFeaturedGames] = useState(null);

    // get now date plus last three months date for range of most played recent games
    const now = new Date();
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(now.getMonth() - 3);

    const formatDate = (d) => d.toISOString().split("T")[0];


  const apiKey = import.meta.env.VITE_RAWG_API_KEY;
  const newGamesUrl = `https://api.rawg.io/api/games?key=${apiKey}&ordering=-released&platforms=4,187,18,1,7&stores=1,2,3,6&page_size=4`
  const featuredGamesUrl =  `https://api.rawg.io/api/games?key=${apiKey}` +
                            `&dates=${formatDate(threeMonthsAgo)},${formatDate(now)}` +
                            `&ordering=-added` +
                            `&platforms=4,187,18,1,186,7` +
                            `&stores=1,2,3,6` +
                            `&page_size=8`;

    useEffect(() => {
        fetch(newGamesUrl).then((res) => res.json()).then((data) => setNewGames(data.results));
        fetch(featuredGamesUrl).then((res) => res.json()).then((data) => setFeaturedGames(data.results));
    }, [])
   
    if (!newGames || !featuredGames) return (<div className="flex h-screen justify-center items-center"><h2 className="">loading...</h2></div>)

    return (
        <div className="container mx-auto mt-10 flex flex-col">
            <div>
            <h2 className="font-bold text-left mb-2">Featured Games</h2>
            <ul className="grid grid-rows grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {featuredGames.map((game) => (
                    <li key={game.id} className="bg-black h-96 rounded-lg overflow-hidden max-w-90">
                        <Card game={game}/>
                    </li>
                ))}
            </ul> 
            </div>
            <div>           
            <h2 className="font-bold text-left mb-2 mt-10">New Releases</h2>
            <ul className="grid grid-rows grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 container mx-auto">
                {newGames.map((game) => (
                    <li key={game.id} className="bg-black h-96 rounded-lg overflow-hidden max-w-90">
                        <Card game={game}/>
                    </li>
                ))}

            </ul>
            </div>
            </div>
            
    )
}