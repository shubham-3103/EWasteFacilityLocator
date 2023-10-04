// src/components/PhotoGallery.js
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const SlidingPhoto = ({ images }) => {
const imageHeight = '650px';
const imageStyle = {
    height: imageHeight,
};
  return (
    <div className="slidingphoto">
      <Carousel
        showArrows={true}
        showThumbs={false}
        showStatus={false}
        infiniteLoop={true}
        autoPlay={true}
        interval={4000}
      >
        {images.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Image ${index}`} style={imageStyle} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default SlidingPhoto;
