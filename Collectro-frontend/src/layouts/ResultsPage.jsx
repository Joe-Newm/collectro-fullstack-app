import MainGrid from '../components/MainGrid'

export default function ResultsPage({games, page, query, setSearchParams, pageCount}) {

    return (
        <>
        <MainGrid games={games} page={page} query={query} setSearchParams={setSearchParams} pageCount={pageCount}/>
        </>
    )
}