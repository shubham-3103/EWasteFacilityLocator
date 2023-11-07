import React, { useState } from 'react';
import '../App.css';
import img1 from '../assets/About_Comp/Reward.png'
const CreditPopup = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
    window.location.reload(); // Refresh the page
  };

  return (
    isOpen && (
      // <div className="popup-overlay">
      //   <div className="popup-content">
      //     <div className="popup-content-inner">
      //       <span className='popuptext'>
      //           <b>Points Credited Sucessfully </b>   
      //       </span>
      //     </div>
          
      //     {/* <button onClick={handleClose}>X</button> */}
      //   </div>
      // </div>
          <div className="no-data-popup">
                <img src={img1} style={{ width: '50px' }} />
                <p>Request Send Sucessfully</p>
                <button onClick={handleClose}>Close</button>
          </div>
    )
  );
};

export default CreditPopup;
