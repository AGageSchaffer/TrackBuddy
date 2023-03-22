import React, { useState, useEffect } from "react"
import { Link, Route, Routes } from "react-router-dom"


function Tracklist({user, faveTracks, setFaveTracks}){
    const [trackArr, setTrackArr] = useState([])
    useEffect(() => {
        fetch('/tracks')
        .then((r) => r.json())
        .then((tracks) => setTrackArr(tracks))
    }, [])

    function handleClick(id){
        if(faveTracks?.map((fave) => fave.racetrack.id !== id).includes(false) === false){
            const newFavorite = {
                racetrack_id: id,
                user_id: user.id,
            }
            fetch("/favorites", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newFavorite)
            }).then((r) => {
                if (r.ok) {
                    r.json().then((track) => setFaveTracks([...faveTracks, track]))
                }
            })
        } else {
            const removeFavorite = faveTracks.filter(track => track.user_id !== user.id ? track : null)
            const newFaveArr = faveTracks.filter(track => track.id !== removeFavorite[0].id ? track : null)
            setFaveTracks(newFaveArr)
            fetch(`/favorites/${removeFavorite[0].id}`, {method: "DELETE"})
        }
    }
    
    
    const tracks = trackArr?.map((track) => {
        const endPoint = track.name.replace(/\W+/g, '-').toLowerCase();
        return <div key={track.id}>
            <Link to={endPoint}>
                <h3>{track.name}</h3>
            </Link>
            <button onClick={() => handleClick(track.id)}>{faveTracks?.map((fave) => fave.racetrack.id === track.id).includes(true) ? "Unfavorite" : "Favorite"}</button>
            <p>{track.address}, {track.city}, {track.state}</p>
            <p>Length: {track.length} {track.length < 1 ? "Mile" : "Miles"}</p>
            </div>})

    return(
        <div>
            {tracks}
        </div>
    )
}

export default Tracklist