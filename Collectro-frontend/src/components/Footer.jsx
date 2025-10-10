import { Link } from "react-router-dom";


export default function Footer() {


    return (
        <div className="bg-black w-full h-40 mt-10 bottom-0">
            <div className="flex items-center justify-center h-full flex-col">
                <Link to="/" className="font-black text-xl text-white">COLLECTRO</Link>
                <p>Created by Joseph Newman using the RAWG.io API</p>
            </div>
        </div>
    )
}