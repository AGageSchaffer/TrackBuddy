import React, { useEffect, useState } from "react";
import { Popup } from "react-map-gl"
import 'mapbox-gl/dist/mapbox-gl.css';
import { Link } from "react-router-dom";
import { MBAccessToken } from "../apicode";

function TrackMarker({track}){
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

    const endPoint = '/tracks/' + track.name.replace(/\W+/g, '-').toLowerCase();

    return(
        <>
            {viewport ? <Popup {...viewport} color='blue' ><Link to={endPoint}>{track.name}</Link></Popup> : null }
        </>
    )
}

export default TrackMarker