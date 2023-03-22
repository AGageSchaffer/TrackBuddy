import React, { useEffect, useState } from "react"
import PostForm from "./PostForm"
import Posts from "./Posts"
import Map, { Marker } from "react-map-gl"
import 'mapbox-gl/dist/mapbox-gl.css';


function TrackListing({track, user, posts, setPosts}){
    const [showForm, setShowForm] = useState(false)
    const [trackCoord, setTrackCoord] = useState([])
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


    function revealPost(){
        setShowForm(true)
    }

    function createPost(){


        setShowForm(false)
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
        <Posts posts={posts} setPosts={setPosts} user={user} track={track} />
        {showForm ? <PostForm track={track} user={user} posts={posts} setPosts={setPosts}/> : 
        <button onClick={() => revealPost()}>Create Post</button>}
    </div>
    )
}

export default TrackListing