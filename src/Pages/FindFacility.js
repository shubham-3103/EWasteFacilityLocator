import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import axios from 'axios';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
import '../App.css'

function FindFacility() {
  const [locations, setLocations] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    // Fetch your locations data from the server
    axios
      .get('http://localhost:5000/location')
      .then((res) => {
        setLocations(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

    // Get the user's current location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
      },
      (error) => {
        console.error('Error getting user location:', error);
      }
    );
  }, []);

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1Ijoic2h1YmhhbS0zMSIsImEiOiJjbG5saXRvc2UwZ3ZuMnJwYmhrenF5d25nIn0.n2fEAGPLMhRexCdlFJo8AQ';
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [78.9629, 20.5937],
      zoom: 3.8,
      pitchWithRotate: false,
    });

    // Add markers for each location
    locations.forEach((item) => {
      const marker = new mapboxgl.Marker().setLngLat([item.longitude, item.latitude]).addTo(map);

      // Add click event to set the selected location
      marker.getElement().addEventListener('click', () => {
        setSelectedLocation(item);
      });
    });

    // Add a temporary marker for the user's location
    if (userLocation) {
      const userMarker = new mapboxgl.Marker({ color: 'blue' }).setLngLat([userLocation.longitude, userLocation.latitude]).addTo(map);
    }

    // Cleanup function to destroy the map on component unmount
    return () => {
      map.remove();
    };
  }, [locations, userLocation]);

  const handleGetDirections = () => {
    if (userLocation && selectedLocation) {
      const origin = `${userLocation.longitude},${userLocation.latitude}`;
      const destination = `${selectedLocation.longitude},${selectedLocation.latitude}`;

      window.open(`https://www.google.com/maps/dir/?api=1&origin=${userLocation.latitude} ${userLocation.longitude}&destination=${selectedLocation.latitude} ${selectedLocation.longitude}`, '_blank');
    }
  };

  return (
    <div>
      <Navbar />
      <div id='map' style={{ width: '100%', height: '600px' }}></div>
      {selectedLocation && (
        <button className='button-28' onClick={handleGetDirections} style={{ marginTop: '10px' }}>
          Get Directions
        </button>
      )}
    </div>
  );
}

export default FindFacility;
