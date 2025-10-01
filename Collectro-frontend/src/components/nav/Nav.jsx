import Search from "./Search";
import { Link } from "react-router-dom";

export default function Nav({setSearchParams}) {


    return (
        <>
        <div className="h-32 bg-black w-full flex justify-between">
            <div className="flex items-center ml-10">
                <Link to="/" className="font-black text-xl text-white">COLLECTRO</Link>
            </div>
            <div className="mr-10">
                <Search setSearchParams={setSearchParams}/>
            </div>
        </div>
        </>
    );
}