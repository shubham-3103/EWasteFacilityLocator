import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import SlidingPhoto from '../Components/SlidingPhoto';
import '../App.css';
import About from '../Components/About';
import axios from 'axios';
import EducationPopup from './EducationPopup';
var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

const images = [
    '/Images/nature1.webp',
    '/Images/nature2.jpeg',
    '/Images/nature3.webp',
  ];

function HomePage() {
const [locations, setLocations] = useState([]);
  useEffect(() => {
    axios
      .get('/location')
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
      center: [20.5937, 78.9629],
      zoom: 2
    });

    // Add markers to the map
  locations.forEach((item) => {
    const marker = new mapboxgl.Marker() // Ensure that this creates a marker
      .setLngLat([item.longitude, item.latitude]) // Check if longitude and latitude are used correctly
      .addTo(map); // Verify that the marker is added to the map
  });
}, [locations]);

  console.log(locations);
  return (
    <>
    <div>
        <EducationPopup />
        <Navbar />
        <SlidingPhoto images={images}/>
        <About />
        <div id='map' style={{ width: '100%', height: '400px' }}></div>
      </div>
      {locations.map((item, index)=>(
        <tr key={index} className='h-8'>
          <td className='border border-slate-700 rounded-md text-center'>{item.name}</td>
          <td className='border border-slate-700 rounded-md text-center'>{item.latitude}</td>
        </tr>
      ))}
    </>
  )
}

export default HomePage