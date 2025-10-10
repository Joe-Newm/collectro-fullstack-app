import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';


export default function Card({game}) {
    const [ hovered, setHovered ] = useState(false);

    return (
        <Link to={`/games/${game.id}`} className="!text-white">
            <div className="h-70 bg-neutral-700 relative" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
              <img className="h-full object-cover w-full transition-opacity duration-500 ease-in-out flex items-center justify-center" src={game.background_image} alt={game.name} ></img>
            <div className="bg-black/70 h-20 w-full justify-start px-4 pt-2 absolute bottom-0">
              <h4 className="text-left font-bold">{game.name}</h4>
              {/* {game.metacritic ? 
              <p className="text-left">Metacritic: {game.metacritic}</p>
                : null} */}
              <div className="flex gap-x-2 text-xs text-left flex-wrap gap-y-0 text-neutral-300">{game.parent_platforms ? (game.parent_platforms.map((item) => (<p key={item.platform.id}>{item.platform.name}</p>))) : null}</div>
            </div>
            </div>
        </Link>
    )
}