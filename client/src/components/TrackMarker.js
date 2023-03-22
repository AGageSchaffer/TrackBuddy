import React, { useEffect, useState } from "react";
import Map, { Marker, Popup } from "react-map-gl"
import 'mapbox-gl/dist/mapbox-gl.css';

function TrackMarker({track, coordinates}){
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

    return(
        <>
            {viewport ? <Marker {...viewport} color='blue' >{track.name}</Marker> : null }
        </>
    )
}

export default TrackMarker