import React, { useState } from 'react';
import '../App.css';

const CreditPopup = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
    window.location.reload(); // Refresh the page
  };

  return (
    isOpen && (
      <div className="popup-overlay">
        <div className="popup-content">
          <div className="popup-content-inner">
            <span className='popuptext'>
                <b>Points Credited Sucessfully </b>   
            </span>
          </div>
          <button onClick={handleClose}>X</button>
        </div>
      </div>
    )
  );
};

export default CreditPopup;
