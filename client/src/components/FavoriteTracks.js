import React from "react"
import { Link } from "react-router-dom";
import { useFetchFavoritesQuery } from "./features/favoritesSlice";

function FavoriteTracks({faveTracks, setFaveTracks}){

    const { data } = useFetchFavoritesQuery()

    function handleClick(id){
        const removeFavorite = faveTracks.filter(track => track.id !== id)
        setFaveTracks(removeFavorite)
        fetch(`/favorites/${id}`, {method: "DELETE"})
        
    }
    
    const tracks = faveTracks?.map((fave) => {
        const endPoint = '/tracks/' + fave.racetrack.name.replace(/\W+/g, '-').toLowerCase();
        
        return <div key={fave.racetrack.id} className="card">
            <Link to={endPoint}>
                <div className="center aligned header">{fave.racetrack.name}</div>
            </Link>
            <div className="center aligned meta">{fave.racetrack.length} {fave.racetrack.length < 1 ? "Mile" : "Miles"}</div>
            <div className="center aligned description">{fave.racetrack.address}, {fave.racetrack.city}, {fave.racetrack.state}</div>
            <button onClick={() => handleClick(fave.id)} className="ui bottom attached button">Unfavorite</button>
            </div>
            })

    return(
        <div className="ui grid">        
            <div className="five wide column"></div>
            <div className="six wide column">
                <div className="ui centered cards">
                    {tracks}
                </div>
            </div>
            <div className="five wide column"></div>
        </div>
    )
}

export default FavoriteTracks