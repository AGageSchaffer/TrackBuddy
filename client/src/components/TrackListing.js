import React, { useEffect, useState } from "react"
import PostForm from "./PostForm"
import Posts from "./Posts"
import Map, { Marker } from "react-map-gl"
import 'mapbox-gl/dist/mapbox-gl.css';
import Leaderboard from "./Leaderboard";



function TrackListing({track, user, timescores, setTimeScoreArr, posts, setPosts}){
    const [showForm, setShowForm] = useState(false)
    const [viewport, setViewport] = useState(null)

    const trackAddress = track.address.replace(/\W+/g, '%20').toLowerCase() + '%20' + track.city + '%20' + track.state
    useEffect(() => {
        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${trackAddress}.json?access_token=pk.eyJ1IjoiYWdzY2hhZmZlciIsImEiOiJjbGZodTdheGgwYWEzM3FsajljaHJobHNiIn0.ICfZrAzQIqA6N_OY9KQTdg`, {
            method: "GET",
            withCredentials: true,
            headers: {
              "Content-Type": "application/json"
            }
          })
            .then(resp => resp.json())
            .then((data) => {
                const coord = data.features[0].geometry.coordinates
                setViewport({...viewport,
                latitude: coord[1],
                longitude: coord[0],
                zoom: 10
                })
            })
    }, [])
    const filteredTimescores = timescores?.filter((timescore) => timescore.post.racetrack_id === track.id).sort((a,b) => a.time.replace(/:/, '') - b.time.replace(/:/, ''))
    function revealPost(){
        setShowForm(true)
    }

    return(
        <div>
          <h1>{track.name}</h1>
          <p>Track Type: {track.style}</p>
          <p>{track.address}, {track.city}, {track.state}</p>
          <p>Length: {track.length} {track.length < 1 ? "Mile" : "Miles"}</p>
          {viewport ? <Map
                {...viewport}
                style={{width: 800, height: 600}}
                mapStyle="mapbox://styles/mapbox/streets-v9"
                mapboxAccessToken='pk.eyJ1IjoiYWdzY2hhZmZlciIsImEiOiJjbGZqMHNwdGgwOW83NDJvNzdjendienhwIn0.4-lCaBNDcdYYKqyXw1u54Q'
              >
                <Marker {...viewport} />
              </Map> : null}
          <h3>Posts</h3>
          <Posts user={user} track={track} timescores={timescores} setTimeScoreArr={setTimeScoreArr} posts={posts} setPosts={setPosts} />
          {showForm ? <PostForm track={track} user={user} timescoreArr={timescores} setTimescoreArr={setTimeScoreArr} posts={posts} setPosts={setPosts} /> : 
          <button onClick={() => revealPost()}>Create Post</button>}
          <h3>LeaderBoard</h3>
          <Leaderboard timescores={filteredTimescores} />
        </div>
    )
}

export default TrackListing