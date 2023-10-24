import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import '../App.css';
import About from '../Components/About';
import EducationPopup from './EducationPopup';
import MapPage from '../Components/MapPage';
import Process from '../Components/Process';
import Footer from '../Components/Footer';


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
      </div>
    </>
  )
}

export default HomePage