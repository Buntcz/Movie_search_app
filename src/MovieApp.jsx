import { useEffect, useState } from "react"
import { APIkey } from "./APIKey"
import SearchIcon from "./search.svg"
import { MovieCard } from "./MovieCard"


function MovieApp() {
    const URL = `http://www.omdbapi.com/?apikey=${APIkey}&`
    const [movies,setMovies] = useState([])
    const [search, setSearch] = useState("")

    const searchMovies = async(title) => {
        const response = await fetch(`${URL}&s=${title}`)
        const data = await response.json()

        setMovies(data.Search)
    }

    useEffect(() => {
        searchMovies(search)
    }, [])
    
    return (
        <div className="app" >
            <h1>MovieSearchApp</h1>
        <div className="search">
            <input type="text" value={search} placeholder="which movie do you want to watch?" onChange={(e) => setSearch(e.target.value)} />
            <img src={SearchIcon} width={25} height={25} onClick={() => searchMovies(search)}/>
        </div>
        {
            movies?.length > 0 ? (
                <div className="container">
                {movies.map((movie,index) => {
                   return (
                       <MovieCard movie={movie} key={index} />
                   )
                }) }
               </div>
            ) : (
                <div className="Empty">
                    <h2>No movies found</h2>
                </div>
            )
        } 
        </div>
    )
}

export {MovieApp}