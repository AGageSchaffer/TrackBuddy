import React from "react"
import { Link } from "react-router-dom";


function FavoriteTracks({faveTracks, setFaveTracks}){

    function handleClick(id){
        const removeFavorite = faveTracks.filter(track => track.id !== id)
        setFaveTracks(removeFavorite)
        fetch(`/favorites/${id}`, {method: "DELETE"})
        
    }

    
    const tracks = faveTracks.map((fave) => {
        const endPoint = '/tracks/' + fave.racetrack.name.replace(/\W+/g, '-').toLowerCase();
        
        return <div key={fave.racetrack.id}>
            <Link to={endPoint}>
                <h3>{fave.racetrack.name}</h3>
            </Link>
            <button onClick={() => handleClick(fave.id)}>Unfavorite</button>
            <p>{fave.racetrack.length} {fave.racetrack.length < 1 ? "Mile" : "Miles"}</p>
            <p>{fave.racetrack.address}, {fave.racetrack.city}, {fave.racetrack.state}</p>
            </div>
            })

    return(
        <div>
            {tracks}
        </div>
    )
}

export default FavoriteTracks