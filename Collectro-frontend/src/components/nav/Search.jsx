import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from 'react-router-dom'
import { FaSearch } from "react-icons/fa";
import debounce from "lodash.debounce";

export default function Search({ setSearchParams}) {
    const [ input, setInput ] = useState("");
    const [ searchResults, setSearchResults] = useState([]);
    const [ focused, setFocused ] = useState(false);


    const apiKey = import.meta.env.VITE_RAWG_API_KEY;
    const baseUrl = `https://api.rawg.io/api/games?key=${apiKey}`

    const debouncedFetchData = useMemo(
        () => 
            debounce((value) => {       
            if (!value) return setSearchResults([]);
            const baseUrl = `https://api.rawg.io/api/games?key=${apiKey}&search=${value}`;
            fetch(baseUrl).then(res => res.json()).then(data => setSearchResults(data.results)).catch(err => console.error(err))
            }, 300), [apiKey, setSearchResults]
        );

    const handleChange = (value) => {
        setInput(value);
        debouncedFetchData(value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setSearchParams({ search: input, page: 1 });
    }

    return (
        <div className="flex flex-col gap-2 h-100% mt-10">
            <div className="flex justify-center bg-white p-2 gap-4 rounded-lg items-center">
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