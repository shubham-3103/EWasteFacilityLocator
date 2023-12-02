import React, { useState } from 'react';
import '../App.css';
import img1 from "../assets/About_Comp/Reward.png";
import axios from 'axios';
import { useUser } from "@clerk/clerk-react";


const RedeemPopup = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { user } = useUser();


  const handleClose = async() => {
    setIsOpen(false);
    try {
      await axios.post('http://localhost:5000/addEmail/send-email', {
        to: user?.primaryEmailAddress.emailAddress, // Replace with the recipient email
        subject: 'Successfully redemption of prize',
        body: 'You have successfully redeemed your points to order the prize. Your order has been created successfully, and it will be delivered in 7 days. Thanks for shopping!',
      });
    } catch (error) {
      console.error('Error sending email:', error);
    }
    window.location.reload(); // Refresh the page
  };

  return (
    isOpen && (
      <div className="no-data-popup">
        <img src={img1} style={{ width: '50px' }} />
        <p>Points Reedemed Sucessfully</p>
        <button onClick={handleClose}>Close</button>
      </div>
    )
  );
};

export default RedeemPopup;
