// src/components/About.js
import React from 'react';
import '../App.css'; // Import CSS file for styling
function About() {
  return (
    <div className="about-container container my-5" id="about-section">
      <div className="about-description">
        <h2>About Us</h2>
        <p>
          In an effort to combat the growing issue of electronic waste (e-waste), our project is dedicated to responsible recycling and disposal. We provide convenient drop-off locations for old electronics, ensuring they are recycled or refurbished, reducing environmental impact and promoting a sustainable future.
        </p>
      </div>
      <div className="about-image">
        <img src="/Images/about.jpg" alt="About Us" />
      </div>
    </div>
  );
}

export default About;
