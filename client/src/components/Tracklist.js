import React from "react"
import { Link } from "react-router-dom"
import { useFetchTrackQuery } from "../components/features/trackSlice";


function Tracklist({user, faveTracks, setFaveTracks}){
    // const [trackArr, setTrackArr] = useState([])
    const { data: trackArr = [] } = useFetchTrackQuery()
    // useEffect(() => {
    //     fetch('/tracks')
    //     .then((r) => r.json())
    //     .then((tracks) => setTrackArr(tracks))
    // }, [])

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
        return <div key={track.id} className="card" >
            <Link to={endPoint}>
                <div className="center aligned header">{track.name}</div>
            </Link>
            <div className="center aligned meta">Length: {track.length} {track.length < 1 ? "Mile" : "Miles"}</div>
            <div className="center aligned description">{track.address}, {track.city}, {track.state}</div>
            <button className="ui bottom attached button" onClick={() => handleClick(track.id)}>{faveTracks?.map((fave) => fave.racetrack.id === track.id).includes(true) ? "Unfavorite" : "Favorite"}</button>
            </div>})

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

export default Tracklist