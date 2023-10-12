import React from 'react';
import { UserButton } from "@clerk/clerk-react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const { user } = useUser();

  const navigate = useNavigate();
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/protected">E-Waste Locator</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/protected">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/About">About E-Waste</a>
              </li> 
              <li className="nav-item">
                <a className="nav-link" href="/facility">Find Facility</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/reward">Earn Rewards</a>
              </li>
            </ul>
          </div>
          {!user ? (
  <div className="nav-item">
    <button
      // className="nav-link btn btn-primary"
      onClick={() => navigate('/sign-in')} className="h-4 w-4 text-black ml-2" size="sm" variant="premium" > Sign In
          </button>
        </div>
      ) : <UserButton />}
        </div>
      </nav>
    </div>
  )
}

export default Navbar;
