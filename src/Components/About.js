// src/components/About.js
import React from 'react';
import '../App.css'; // Import CSS file for styling

function About() {
  return (
    <div className="about-container">
      <div className="about-description">
        <h2>About Us</h2>
        <p>
          Website that tells you the location of the nearest e-waste collection and recycling facility.
          Offers educational pop-ups on the harmful components of your e-waste and their effects on the environment
          and human health if not disposed correctly. There could be an option to input the model of your old device
          and earn credit points relative to the amount of precious metals recovered from the device if disposed correctly.
        </p>
      </div>
      <div className="about-image">
        <img src="/Images/about.jpg" alt="About Us" />
      </div>
    </div>
  );
}

export default About;
