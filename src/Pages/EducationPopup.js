import React, { useState } from 'react';
import '../App.css'
const EducationPopup = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    isOpen && (
      <div className="popup-overlay">
        <div className="popup-content">
          <p>It's essential to recycle your e-waste through authorized facilities.<br /> 
            Many electronics retailers and recycling centers accept old devices for proper recycling.<br />  
            By doing so, you contribute to reducing pollution, conserving resources, and protecting the environment.</p>
          <button onClick={handleClose}>Close</button>
        </div>
      </div>
    )
  );
};

export default EducationPopup;
