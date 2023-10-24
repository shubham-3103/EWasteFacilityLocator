import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar'
import axios from 'axios';
var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');


function FindFacility() {
    const [locations, setLocations] = useState([]);
    useEffect(() => {
      axios
        .get('http://localhost:5000/location')
        .then((res) => {
          setLocations(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
  }, []);
    
  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1Ijoic2h1YmhhbS0zMSIsImEiOiJjbG5saXRvc2UwZ3ZuMnJwYmhrenF5d25nIn0.n2fEAGPLMhRexCdlFJo8AQ';
    var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [78.9629, 20.5937],
      zoom: 3.8,
      pitchWithRotate: false
    });
    locations.forEach((item) => {
      const marker = new mapboxgl.Marker() 
        .setLngLat([item.longitude, item.latitude]) 
        .addTo(map); 
    });
  }, [locations]);
  return (
    <div>
        <Navbar />
        <div id='map' style={{ width: '100%', height: '600px' }}></div>
    </div>
  )
}

export default FindFacility