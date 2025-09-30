import { useEffect, useState } from "react";
import Card from "./Card.jsx";



export default function MainGrid({games, query, page, setSearchParams, pageCount}) {



  return (
    <>
        <ul>
      <div className="flex justify-center pt-8">  
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 xl:grid-cols-5">
        {games.map((game) => (
          <li key={game.id} className="bg-black h-96 rounded-lg overflow-hidden max-w-72">
            <Card game={game}></Card>
          </li>
        ))} 
      </div>
      </div>
        </ul>
        <div className="flex flex-row justify-center gap-4 m-8">
          <button 
          onClick={() => {
            if (Number(page) === 1) {
            setSearchParams({search: query, page: Number(page)})
            } else {
            setSearchParams({search: query, page: Number(page) - 1})
            }
            window.scrollTo({top: 0, behavior: "smooth"});
          
          }
        }
          className="h-20 w-20 !bg-gray-600"

          >prev</button>
          <button
          onClick={() => {
            if (Number(page) === pageCount || pageCount === 0) {
            setSearchParams({search: query, page: Number(page)})
            } else {
            setSearchParams({search: query, page: Number(page) + 1})
            }
            window.scrollTo({top: 0, behavior: "smooth"})
            }
          } 
          className="h-20 w-20 !bg-gray-600"
          href="#top"

          >next</button>
        </div>
    </>
  );
}
