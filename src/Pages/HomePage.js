import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import SlidingPhoto from '../Components/SlidingPhoto';
import '../App.css';
import About from '../Components/About';
import EducationPopup from './EducationPopup';
import MapPage from '../Components/MapPage';
import Process from '../Components/Process';
import Footer from '../Components/Footer';

const images = [
    '/Images/nature1.webp',
    '/Images/nature2.jpeg',
    '/Images/nature3.webp',
  ];

function HomePage() {
  
  return (
    <>
      <div>
          <EducationPopup />
          <Navbar />
          <MapPage />
          <About />
          <Process />
          <Footer />
          {/* <SlidingPhoto images={images}/> */}
      </div>
    </>
  )
}

export default HomePage