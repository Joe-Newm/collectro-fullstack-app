import { useEffect, useState } from "react";

import { FaSearch } from "react-icons/fa";


export default function Search({getData}) {
    const [ input, setInput ] = useState("");
    const [ searchResults, setSearchResults] = useState([]);
    const [ focused, setFocused ] = useState(false);


    const apiKey = import.meta.env.VITE_RAWG_API_KEY;
    const baseUrl = `https://api.rawg.io/api/games?key=${apiKey}`

    const fetchData = async (value) => {
        if (!value) return setSearchResults([]);
        const baseUrl = `https://api.rawg.io/api/games?key=${apiKey}&search=${value}`
        const response = await fetch(baseUrl);
        const results = await response.json();
        setSearchResults(results.results);
    }

    const handleChange = (value) => {
        setInput(value);
        fetchData(value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        getData(baseUrl, input);
    }

    return (
        <div className="flex flex-col gap-2 h-100% mt-10">
            <div className="flex justify-center bg-white p-2 gap-4 rounded-sm items-center">
                <form onSubmit={handleSubmit}>
                <input onBlur={() => setFocused(false)} onFocus={() => setFocused(true)} className=" bg-white w-lg text-black outline-0" placeholder="Type to search..." value={input} onChange={(e) => handleChange(e.target.value)}/>
                <button className="w-14" type="submit"><FaSearch /></button>
                </form>
            </div>
            {input && focused ? 
            <div className="bg-white flex flex-col text-black z-0">
                <ul>
                    {searchResults.map((game) => (
                              <li key={game.id}>
                                <p>{game.name}</p>
                              </li>
                            ))} 
                </ul>
            </div>
            :
            null
            }
        </div>
    )
}