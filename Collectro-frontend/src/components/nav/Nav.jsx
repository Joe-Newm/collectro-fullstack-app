import Search from "./Search";

export default function Nav({setSearchParams}) {


    return (
        <>
        <div className="h-32 bg-black w-full flex justify-center">
            <Search setSearchParams={setSearchParams}/>
        </div>
        </>
    );
}