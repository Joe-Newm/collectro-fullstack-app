import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';


export default function Card({game}) {
    const [ hovered, setHovered ] = useState(false);

    return (
        <Link to={`/games/${game.id}`} className="!text-white">
            <div className="h-60" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
              <img className="h-full object-cover w-full transition-opacity duration-500 ease-in-out" src={game.background_image} alt={game.name} ></img>
            </div>
            <div className=" h-full  justify-start p-4">
              <h4 className="text-left">{game.name}</h4>
              {game.metacritic ? 
              <p className="text-left">Metacritic: {game.metacritic}</p>
                : null}
              <div className="flex gap-x-2 text-xs text-left flex-wrap gap-y-0">{game.parent_platforms ? (game.parent_platforms.map((item) => (<p key={item.platform.id}>{item.platform.name}</p>))) : null}</div>
            </div>
        </Link>
    )
}