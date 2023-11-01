import React, { useState } from 'react';
import '../App.css';
import img1 from "../assets/About_Comp/Reward.png";

const RedeemPopup = () => {
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
            <img src={img1} alt="Redeemed" className='popup'/>
            <span className='popuptext'>
                <b>Points Redeemed Sucessfully </b>   
            </span>
          </div>
          <button onClick={handleClose}>X</button>
        </div>
      </div>
    )
  );
};

export default RedeemPopup;
