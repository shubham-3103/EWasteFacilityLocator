import React, { useState } from 'react';
import '../App.css';

const EducationPopup = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    isOpen && (
      <div className="popup-overlay">
        <div className="popup-content">
          <div className="popup-content-inner">
            <img src="/Images/popupmock.webp" alt="Garbage Truck" />
            <p>
              It's essential to recycle your e-waste through authorized facilities. Many electronics retailers and recycling centers accept old devices for proper recycling. By doing so, you contribute to reducing pollution, conserving resources, and protecting the environment.
            </p>
          </div>
          <button onClick={handleClose}>X</button>
        </div>
      </div>
    )
  );
};

export default EducationPopup;
