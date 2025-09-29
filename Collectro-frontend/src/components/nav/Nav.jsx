import Search from "./Search";

export default function Nav({getData}) {


    return (
        <>
        <div className="h-32 bg-black w-full flex justify-center">
            <Search getData={getData}/>
        </div>
        </>
    );
}