import React,{ useState, useEffect } from 'react';
import { UserButton } from "@clerk/clerk-react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from 'react-router-dom';
import logo from '../assets/Logo.png'
import '../App.css';
import axios from 'axios';

function Navbar() {
  const { user } = useUser();
  const navigate = useNavigate();
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about-section');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const userNameContent = user?.fullName;
  

  
  const [userPoints, setUserPoints] = useState(null);
  
  useEffect(() => {
    const email = user?.primaryEmailAddress.emailAddress;
    if (user) {
    axios
      .get(`http://localhost:5000/addEmail/${email}`, {
        params: {
          email: user.email, // Pass the user's email to the API request
        },
      })
      .then((response) => {
        setUserPoints(response.data.points);
      })
      .catch((error) => {
        console.error(error);
      });
  }
}, [user]);

return (
    <>
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img src={logo} width='50px' height='40px' className='navbarLogo' />
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">Home</a>
              </li>
              <li className="nav-item">
              <a href="#about-section" className="nav-link" onClick={scrollToAbout}>About Us</a>
              </li> 
              <li className="nav-item">
                <a className="nav-link" href="/findfacility">Find Facility</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/credits">Rewards</a>
              </li>
            </ul>
          </div>
          <div className='userName'>
          {userPoints !== null ? (
            <div>Total Points:  <b>{userPoints}</b></div>
          ) : (<p></p>)}
          </div>
          <div className='userName'>{
            userNameContent
          }</div>
          {!user ? (
            <div className="nav-item">
              <button
                // className="nav-link btn btn-primary"
                onClick={() => navigate('/sign-in')} className="h-4 w-4 text-black ml-2" size="sm" variant="premium" > Sign In
                    </button>
                  </div>
                ) :<UserButton />}
          </div>
        </nav>
      </div>
      </>
  )
}

export default Navbar;
