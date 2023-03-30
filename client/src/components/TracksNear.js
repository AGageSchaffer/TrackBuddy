import React, { useState } from "react"
import Map from "react-map-gl"
import 'mapbox-gl/dist/mapbox-gl.css';
import { useFetchTrackQuery } from "./features/trackSlice";
import TrackMarker from "./TrackMarker";
import { MBAccessToken } from "../apicode";

function TracksNear(){
    const [zipCode, setZipCode] = useState("")
    const [coordinates, setCoordinates] = useState({})
    const [viewport, setViewport] = useState(null)
    const { data: trackArr = [] } = useFetchTrackQuery()


    const trackMarkers = trackArr?.map((track) => {
      return <TrackMarker key={track.id} track={track} coordinates={coordinates} />
    })

    function handleClick(){
        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${zipCode}.json?access_token=${MBAccessToken}`, {
            method: "GET",
            withCredentials: true,
            headers: {
              "Content-Type": "application/json"
            }
          })
            .then(resp => resp.json())
            .then(function(data) {
              const coord = data.features[0].geometry.coordinates
              setCoordinates(coord)
              setViewport({...viewport,
              latitude: coord[1],
              longitude: coord[0],
              zoom: 8
              });
            })
    }
    
    return(
        <div className="ui grid">
          {/* <div className="five wide column"></div> */}
          <div className="sixteen wide column">
            <div className="ui form">
              <div className="inline fields">
                <div id="zip-search" className="ten wide field">
                  <label>Zipcode: </label>
                  <input value={zipCode} onChange={(e) => setZipCode(e.target.value)} ></input>
                  <button onClick={() => handleClick()} className="ui button">Search</button>
                </div>
              </div>
            </div>
            {viewport ? <Map id="near-map"
              {...viewport}
              style={{width: 800, height: 600}}
              mapStyle="mapbox://styles/mapbox/streets-v9"
              mapboxAccessToken={MBAccessToken}
            >
              {trackMarkers}
            </Map> : null}
          </div>
          {/* <div className="five wide column"></div> */}
        </div>
    )
}

export default TracksNear