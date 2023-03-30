import React, { useEffect, useState } from "react"
import PostForm from "./PostForm"
import Posts from "./Posts"
import Map, { Marker } from "react-map-gl"
import 'mapbox-gl/dist/mapbox-gl.css';
import Leaderboard from "./Leaderboard";
import { MBAccessToken } from "../apicode";


function TrackListing({track, user, timescores, setTimeScoreArr, posts, setPosts}){
    const [showForm, setShowForm] = useState(false)
    const [viewport, setViewport] = useState(null)

    const trackAddress = track.address.replace(/\W+/g, '%20').toLowerCase() + '%20' + track.city + '%20' + track.state
    useEffect(() => {
        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${trackAddress}.json?access_token=${MBAccessToken}`, {
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
        <div className="ui grid">
          <div className="one wide column"></div>
          <div className="six wide column">
                  <div className="ui huge centered header">{track.name}</div>
                  <div className="ui small centered header">{track.style}</div>
                  <div className="ui tiny centered header">{track.address}, {track.city}, {track.state}</div>
                  <div className="ui medium centered header">{track.length} {track.length < 1 ? "Mile" : "Miles"}</div>
                {viewport ? <Map id="track-map"
                      {...viewport}
                      
                      mapStyle="mapbox://styles/mapbox/streets-v9"
                      mapboxAccessToken={MBAccessToken}
                    >
                      <Marker {...viewport} />
                    </Map> : null}
          </div>
          <div className="three wide column">
            <div className="ui huge centered header">LeaderBoard</div>
              <Leaderboard timescores={filteredTimescores} />
          </div>
          <div className="five wide column">
          <div className="ui huge centered header">Posts</div>
            <Posts user={user} track={track} timescores={timescores} setTimeScoreArr={setTimeScoreArr} posts={posts} setPosts={setPosts} />
            {showForm ? <PostForm setShowForm={setShowForm} track={track} user={user} timescoreArr={timescores} setTimescoreArr={setTimeScoreArr} posts={posts} setPosts={setPosts} /> : 
            <button onClick={() => revealPost()} className="ui button">Create Post</button>}
          </div>
          <div className="one wide column"></div>
        </div>
    )
}

export default TrackListing