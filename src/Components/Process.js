import React from 'react';
import '../App.css'
import Logo from '../assets/Logo.png';
import user from '../assets/programmer.png';
import laptop from '../assets/laptop.png';
import recycling from '../assets/recycling.png';
import company from '../assets/buildings.png';
import Wrapper from './Wrapper';

function Process() {
  return (
    <Wrapper>
      <div className="d-flex flex-column justify-content-center align-items-center mt-5 position-relative container my-5">
        <h1 className="mb-5 font-montserrat font-weight-bold fs-2">
          How we Work
        </h1>
        <div className="d-flex flex-column flex-md-row w-100 justify-content-between align-items-center position-relative">
          <div className="shadow p-3 d-flex justify-content-center align-items-center rounded-xl font-montserrat font-weight-bold"
            style={{ backgroundColor: '#01796f',borderRadius:'5%' }}>
            <img src={user} alt="logo" className="img-fluid" style={{ width: '100px', height: 'auto'  }} />
          </div>
          <div className="p-3 d-flex justify-content-center align-items-center rounded-xl font-montserrat font-weight-bold">
            <img src={laptop} alt="logo" className="img-fluid" style={{ width: '80px', height: 'auto' }} />
          </div>
          <div className="shadow p-3 d-flex justify-content-center align-items-center rounded-xl font-montserrat font-weight-bold"
            style={{ backgroundColor: 'green',borderRadius:'5%' }}>
            <img src={Logo} alt="logo" className="img-fluid" style={{ width: '100px', height: 'auto' }} />
          </div>
          <div className="p-3 d-flex justify-content-center align-items-center rounded-xl font-montserrat font-weight-bold">
            <img src={recycling} alt="logo" className="img-fluid" style={{ width: '80px', height: 'auto' }} />
          </div>
          <div className="shadow p-3 d-flex justify-content-center align-items-center rounded-xl font-montserrat font-weight-bold"
            style={{ backgroundColor: '#01796f',borderRadius:'5%' }}>
            <img src={company} alt="logo" className="img-fluid" style={{ width: '100px', height: 'auto' }} />
          </div>
        </div>
        {/* <div className="position-absolute d-none d-md-flex line"> */}
          <svg width="100%" height="6" className="Stepline">
            <line
              x1="100"
              y1="1"
              x2="95%"
              y2="1"
              stroke="#01796f"
              strokeWidth="5"
               // Add this style
            />
          </svg>
        {/* </div> */}
      </div>
      <div className="d-flex justify-content-center process-text">
        <p className="mt-5 w-50 text-center font-montserrat font-weight-bold">
          We're the link between e-waste recycling companies and eco-conscious consumers. Our platform connects clients with trusted recycling partners, streamlining the recycling process and offering rewards for sustainable choices.
        </p>
      </div>
    </Wrapper>
  );
}

export default Process;
