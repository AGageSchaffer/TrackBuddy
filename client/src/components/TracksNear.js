import React, { useEffect, useState } from "react"
import ReactMapGl from 'react-map-gl'
// import 'mapbox-gl/dist/mapbox-gl.css'

function TracksNear({trackArr}){
    const [zipCode, setZipCode] = useState("")
    const [coordinates, setCoordinates] = useState({})
    const [trackCoorArr, setTrackCoorArr] = useState([])
    const [viewport, setViewport] = useState({
      lat: 70,
      lng: 40,
      zoom: 8
    })


    const tracksSearch = trackArr?.map((track) => {
        return track.name.replace(/\W+/g, '%20').toLowerCase()
    })

    // mapboxgl.accessToken = 'pk.eyJ1IjoiYWdzY2hhZmZlciIsImEiOiJjbGZodTdheGgwYWEzM3FsajljaHJobHNiIn0.ICfZrAzQIqA6N_OY9KQTdg';
    //   const map = new mapboxgl.Map({
    //   container: 'map', // container ID
    //   style: 'mapbox://styles/mapbox/streets-v12', // style URL
    //   center: [coordinates], // starting position [lng, lat]
    //   zoom: 9, // starting zoom
    //   });

    // const trackCoord = tracksSearch.map((track) => {
    //     fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${track}.json?access_token=pk.eyJ1IjoiYWdzY2hhZmZlciIsImEiOiJjbGZodTdheGgwYWEzM3FsajljaHJobHNiIn0.ICfZrAzQIqA6N_OY9KQTdg`, {
    //         method: "GET",
    //         withCredentials: true,
    //         headers: {
    //           "Content-Type": "application/json"
    //         }
    //       })
    //         .then(resp => resp.json())
    //         .then((data) => {return data.features[0].geometry.coordinates}
    //         )
    //     })

    //     console.log(trackCoord)
    
    function handleClick(){
        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${zipCode}.json?access_token=pk.eyJ1IjoiYWdzY2hhZmZlciIsImEiOiJjbGZodTdheGgwYWEzM3FsajljaHJobHNiIn0.ICfZrAzQIqA6N_OY9KQTdg`, {
            method: "GET",
            withCredentials: true,
            headers: {
              "Content-Type": "application/json"
            }
          })
            .then(resp => resp.json())
            .then(function(data) {
              const coord = data.features[0].geometry.coordinates
              setViewport({...viewport,
              latitude: coord[0],
              longitude: coord[1]
              });
            })
    }

    return(
        <div>
            <label>Zipcode: </label>
            <input value={zipCode} onChange={(e) => setZipCode(e.target.value)} ></input>
            <button onClick={() => handleClick()}>Search</button>
            <ReactMapGl 
            mapboxAccessToken="pk.eyJ1IjoiYWdzY2hhZmZlciIsImEiOiJjbGZqMHNwdGgwOW83NDJvNzdjendienhwIn0.4-lCaBNDcdYYKqyXw1u54Q"
            {...viewport} onViewPortChange={(newView) => setViewport(newView)}
             ></ReactMapGl>
        </div>
    )
}

export default TracksNear