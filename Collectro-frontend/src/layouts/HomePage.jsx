import { useState, useEffect } from 'react';
import Card from '../components/Card';

export default function HomePage() {
    const [newGames, setNewGames] = useState(null);

  const apiKey = import.meta.env.VITE_RAWG_API_KEY;
  const baseUrl = `https://api.rawg.io/api/games?key=${apiKey}&ordering=-released&page_size=5`

    useEffect(() => {
        fetch(baseUrl).then((res) => res.json()).then((data) => setNewGames(data.results));
    }, [])
   
    if (!newGames) return (<h2>Loading...</h2>)

    return (
        <div className="container mx-auto mt-10">
            <h2 className="font-bold text-left mb-2">New Releases</h2>
            <ul className="grid grid-rows grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 2xl:grid-cols-5">
                {newGames.map((game) => (
                    <li key={game.id} className="bg-black h-96 rounded-lg overflow-hidden max-w-72">
                        <Card game={game}/>
                    </li>
                ))}

            </ul>
            </div>
            
    )
}