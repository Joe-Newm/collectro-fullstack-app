import Search from "./Search";
import { Link } from "react-router-dom";

export default function Nav({setSearchParams}) {


    return (
        <>
        <div className="bg-black">
        <div className="h-32 bg-black w-full flex justify-between container mx-auto flex-col md:flex-row">
            <div className="flex items-center">
                <Link to="/" className="font-black text-xl text-white">COLLECTRO</Link>
            </div>
            <div className="">
                <Search setSearchParams={setSearchParams}/>
            </div>
        </div>
        </div>
        </>
    );
}