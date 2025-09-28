import { useEffect, useState } from "react";

import { FaSearch } from "react-icons/fa";


export default function Search() {
    const [ input, setInput ] = useState("");

    const fetchData = (value) => {
        fetch("https://jsonplaceholder.typicode.com/users").then((response) => response.json()).then((json) => {
            const results = json.filter((user) => {
                return value && user && user.name && user.name.toLowerCase().includes(value.toLowerCase());
            })
            console.log(results)
        });
    }

    const handleChange = (value) => {
        setInput(value);
        fetchData(value);
    }

    return (
        <div className="flex justify-center bg-white p-2 gap-4 rounded-sm items-center">
            <FaSearch className="text-black" id="search-icon" />
            <input className=" bg-white w-lg text-black outline-0" placeholder="Type to search..." value={input} onChange={(e) => handleChange(e.target.value)}/>
        </div>
    )
}