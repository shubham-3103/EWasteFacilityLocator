import React, { useState, useEffect } from 'react';
import Navbar from './Components/Navbar';
import SlidingPhoto from './Components/SlidingPhoto';
import './App.css';
import About from './Components/About';
const images = [
  '/Images/nature1.webp',
  '/Images/nature2.jpeg',
  '/Images/nature3.webp',
];
function App() {  
  const [locations, setLocations] = useState([]);
  
    useEffect(() => {
      // Fetch location data from your API or database
      // Replace this with your actual data fetching logic
      fetch('/api/locations')
        .then((response) => response.json())
        .then((data) => setLocations(data));
    }, []);
  return (
    <>
    <div>
      <Navbar />
      <SlidingPhoto images={images}/>
      <About />
      {/* <LocationForm /> */}
    </div>
    </>
  );
}

export default App;
