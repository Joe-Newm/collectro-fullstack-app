import { useEffect, useState } from "react";


export default function Card({game}) {

    return (
        <>
            <div className="h-1/2">
              <img className="h-full object-cover" src={game.background_image} alt={game.name} ></img>
            </div>
            <div className=" h-full  justify-start p-4">
              <h2 className="text-left">{game.name}</h2>
              {game.metacritic ? 
              <p className="text-left">Metacritic: {game.metacritic}</p>
                : null}
              <div className="flex gap-x-2 text-xs text-left flex-wrap gap-y-0">{game.parent_platforms ? (game.parent_platforms.map((item) => (<p key={item.platform.id}>{item.platform.name}</p>))) : null}</div>
            </div>
        </>
    )
}