import React,{ useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar'
import { Container, Row, Col, Form, Button, Image } from 'react-bootstrap';
import '../App.css'
import axios from 'axios';

import img1 from "../assets/rewards/1.jpg";
import img2 from "../assets/rewards/2.jpg";
import img3 from "../assets/rewards/3.jpg";
import img4 from "../assets/rewards/4.jpg";
import img5 from "../assets/rewards/5.jpg";
import img6 from "../assets/rewards/6.jpg";
import img7 from "../assets/rewards/7.jpg";
import img8 from "../assets/rewards/8.jpg";
import Footer from '../Components/Footer';
import RedeemPopup from './RedeemPopup';
import CreditPopup from './CreditPopup';

function Credit() {
  const [otp, setOtp] = useState('');
  const { user } = useUser();
  const navigate = useNavigate();

  const [size, setSize] = useState("Small Electronics");
  const [item, setItem] = useState("Smartphone");
  const [itemCount,setItemCount] = useState(0)

  const [count, setWeight] = useState(0);
  const [points, setPoints] = useState(0);

  const [redeemSuccess, setRedeemSuccess] = useState(false);
  const [creditSuccess, setCreditSuccess] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [creditOpen, creditIsOpen] = useState(false);
  const isSubmitted = useState(false);
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);

  const openPopUp = () => {
    setIsPopUpOpen(true);
  };

  const closePopUp = () => {
    setIsPopUpOpen(false);
  };
  
  useEffect(() => {
    if (user) {
      const clerkEmailId = user?.primaryEmailAddress.emailAddress;
      const addEmailToDatabase = async (email) => {
        try {
          const response = await axios.post('http://localhost:5000/addEmail', { email });

          if (response.status === 201) {
            console.log('Email added to the database.');
          } else if (response.status === 200) {
            console.log('Email already exists in the database.');
          }
        } catch (error) {
          console.error('Error adding email to the database:', error);
        }
      };

      addEmailToDatabase(clerkEmailId);
    //   console.log(user.primaryEmailAddress.id);
    }
  }, [user]);

  const calculatePoints = () => {
    if (size === "Small Electronics") {
      setPoints(1 * count);
      setWeight(count);
    } else if (size === "Medium Electronics") {
      setPoints(2 * count);
      setWeight(count);
    } else if (size === "Large Electronics") {
      setPoints(3 * count);
      setWeight(count);
    }
  }

  const handleSubmit = async () => {
    try {
      if (user) {
        const email = user?.primaryEmailAddress.emailAddress;
        if(points==0){
          openPopUp();
        }else{
          const response = await axios.post('http://localhost:5000/addEmail/authenticate', { email, item, isSubmitted, points, count });
          if (response.status === 200) {
              console.log('Data goes to Facility from frontend');
              setCreditSuccess(true);
    
              setTimeout(() => {
                setCreditSuccess(false);
                creditIsOpen(true);
                console.log("Credit testing")
              },0); // Auto-hide the success message after 3 seconds
            } 
        }
      }
    } catch (error) {
      // Handle any errors, e.g., show an error message
      console.error('Error in Data going:', error);
    }
  }
  const handleRedeem = (redeemPoints) => {
    try {
      if (user) {
        const email = user?.primaryEmailAddress.emailAddress;
        // Send the email and points to your backend
        axios.post('http://localhost:5000/addEmail/reducePoints', { email, points: redeemPoints })
          .then(response => {
            // Handle the successful response
            console.log('Points updated successfully', response);
  
            setRedeemSuccess(true);
  
            setTimeout(() => {
              setRedeemSuccess(false);
              setIsOpen(true);
              console.log("timeout testing")
            },0); // Auto-hide the success message after 3 seconds
          })
          .catch(error => {
            // Handle any errors
            console.error('Error updating points:', error);
          });
      }
    } catch (error) {
      console.error('Error in handleRedeem:', error);
    }
  };

  if (!user) {
    navigate('/sign-in');
    return null;
  }     

  return (
    <div>
      <Navbar />
      
      {isOpen && <RedeemPopup />}
      {creditOpen && <CreditPopup />}
      <section className="text-gray-600 body-font relative">
                <Container>
                    <Row className="text-center mb-4">
                        <Col>
                            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Redeem Your Code</h1>
                            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Choose the type of your disposal to check the points.</p>
                        </Col>
                    </Row>
                </Container>
            </section >

            <section className="text-gray-600 flex justify-center w-auto mb-5 body-font">
                <Container>
                    <Row>
                        <Col md={6}>
                            <Form>
                              <Form.Group className="mb-3">
                              <Form.Label>Electronics Size</Form.Label>
                              <Form.Select onChange={(e) => setSize(e.target.value)}>
                                <option value="Small Electronics">Small Electronics</option>
                                <option value="Medium Electronics">Medium Electronics</option>
                                <option value="Large Electronics">Large Electronics</option>
                              </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3">
                              <Form.Label>Item</Form.Label>
                              {size === "Small Electronics" && (
                                <Form.Select onChange={(e) => setItem(e.target.value)}>
                                  <option value="Smartphone">Smartphone</option>
                                  <option value="Charger">Charger</option>
                                  <option value="Cables">Cables</option>
                                  <option value="Earphones">Earphones</option>
                                  <option value="Digital Camera">Camera</option>
                                </Form.Select>
                              )}
                              {size === "Medium Electronics" && (
                                <Form.Select onChange={(e) => setItem(e.target.value)}>
                                  <option value="Gaming Console">Console</option>
                                  <option value="DVD Player">Player</option>
                                  <option value="Tablets">Tablets</option>
                                  <option value="Laptops">Laptops</option>
                                  <option value="Desktop Computer">Computer</option>
                                  <option value="Printer">Printer</option>
                                </Form.Select>
                              )}
                              {size === "Large Electronics" && (
                                <Form.Select onChange={(e) => setItem(e.target.value)}>
                                  <option value="Refrigerators">Refrigerators</option>
                                  <option value="Washing Machine">Machine</option>
                                  <option value="Dishwasher">Dishwasher</option>
                                  <option value="Microwave">Microwave</option>
                                  <option value="Home Theatre">Speakers</option>
                                </Form.Select>
                              )}
                            </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Number of Items</Form.Label>
                                    <Form.Control type="text" value={count} onChange={(e) => setWeight(e.target.value)} />
                                </Form.Group>
                                <Button /*variant="primary"*/ className='button-27' onClick={calculatePoints}>Calculate Points</Button>
                            </Form>
                        </Col>
                        <Col md={6}>
                            <div className="text-center">
                                <div className="rounded-lg border border-gray-100 px-4 py-4 text-center">
                                    <p className="text-lg font-medium text-gray-500">Points</p>
                                    <h3 className="text-4xl font-extrabold text-green-600 md:text-5xl">{points}</h3>
                                </div>
                            </div>
                    <div className="d-flex justify-content-center align-items-center w-100">
                      {/* <div className="d-flex flex-wrap"> */}
                        {/* <div className="mb-3">
                          <label htmlFor="name" className="form-label">Enter Coupon Code to verify.</label>
                          <input type="text" placeholder="xx-xx" id="name" name="name" className="form-control" />
                        </div> */}
                        <div className="mt-3">
                            <button className="button-27" onClick={handleSubmit}>Submit</button>
                        </div>
                    </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            <section className="text-gray-600 body-font ">
                <Container>
                    <Row xs={1} sm={2} md={3} lg={4} >
                          <Col className='credititem' >
                              <div className="h-48 rounded overflow-hidden">
                                  <Image src={img1} alt="Certificate" fluid />
                              </div>
                              <div className="mt-4">
                                  <div className="flex flex-row justify-between">
                                      <h2 className="text-gray-900 title-font text-lg font-medium">Certificate</h2>
                                      <h3 className="text-gray-500 text-xs tracking-widest title-font">1 Point</h3>
                                  </div>
                                  <Button variant="success" className="mt-2 flex justify-center" onClick={() => handleRedeem(1)}>Redeem</Button>
                              </div>
                          </Col>
                          <Col className='credititem'>
                              <div className="h-48 rounded overflow-hidden">
                                  <Image src={img2} alt="Certificate" fluid />
                              </div>
                              <div className="mt-4">
                                  <div className="flex flex-row justify-between">
                                      <h2 className="text-gray-900 title-font text-lg font-medium">T-Shirt</h2>
                                      <h3 className="text-gray-500 text-xs tracking-widest title-font">3 Point</h3>
                                  </div>
                                  <Button variant="success" className="mt-2 flex justify-center" onClick={() => handleRedeem(3)}>Redeem</Button>
                              </div>
                          </Col>
                          <Col className='credititem'>
                              <div className="h-48 rounded overflow-hidden">
                                  <Image src={img3} alt="Certificate" fluid />
                              </div>
                              <div className="mt-4">
                                  <div className="flex flex-row justify-between">
                                      <h2 className="text-gray-900 title-font text-lg font-medium">T-Shirt</h2>
                                      <h3 className="text-gray-500 text-xs tracking-widest title-font">3 Point</h3>
                                  </div>
                                  <Button variant="success" className="mt-2 flex justify-center" onClick={() => handleRedeem(3)}>Redeem</Button>
                              </div>
                          </Col>
                          <Col className='credititem'>
                              <div className="h-48 rounded overflow-hidden">
                                  <Image src={img4} alt="Certificate" fluid />
                              </div>
                              <div className="mt-4">
                                  <div className="flex flex-row justify-between">
                                      <h2 className="text-gray-900 title-font text-lg font-medium">Poster</h2>
                                      <h3 className="text-gray-500 text-xs tracking-widest title-font">4 Point</h3>
                                  </div>
                                  <Button variant="success" className="mt-2 flex justify-center" onClick={() => handleRedeem(4)}>Redeem</Button>
                              </div>
                          </Col>
                          <Col className='credititem'>
                              <div className="h-48 rounded overflow-hidden">
                                  <Image src={img5} alt="Certificate" fluid />
                              </div>
                              <div className="mt-4">
                                  <div className="flex flex-row justify-between">
                                      <h2 className="text-gray-900 title-font text-lg font-medium">Metal Badge</h2>
                                      <h3 className="text-gray-500 text-xs tracking-widest title-font">5 Point</h3>
                                  </div>
                                  <Button variant="success" className="mt-2 flex justify-center" onClick={() => handleRedeem(3)}>Redeem</Button>
                              </div>
                          </Col>
                          <Col className='credititem'>
                              <div className="h-48 rounded overflow-hidden">
                                  <Image src={img6} alt="Certificate" fluid />
                              </div>
                              <div className="mt-4">
                                  <div className="flex flex-row justify-between">
                                      <h2 className="text-gray-900 title-font text-lg font-medium">Diary</h2>
                                      <h3 className="text-gray-500 text-xs tracking-widest title-font">6 Point</h3>
                                  </div>
                                  <Button variant="success" className="mt-2 flex justify-center" onClick={() => handleRedeem(6)}>Redeem</Button>
                              </div>
                          </Col>
                          <Col className='credititem'>
                              <div className="h-48 rounded overflow-hidden">
                                  <Image src={img7} alt="Certificate" fluid />
                              </div>
                              <div className="mt-4">
                                  <div className="flex flex-row justify-between">
                                      <h2 className="text-gray-900 title-font text-lg font-medium">Cap</h2>
                                      <h3 className="text-gray-500 text-xs tracking-widest title-font">6 Point</h3>
                                  </div>
                                  <Button variant="success" className="mt-2 flex justify-center" onClick={() => handleRedeem(6)}>Redeem</Button>
                              </div>
                          </Col>
                          <Col className='credititem'>
                              <div className="h-48 rounded overflow-hidden">
                                  <Image src={img8} alt="Certificate" fluid />
                              </div>
                              <div className="mt-4">
                                  <div className="flex flex-row justify-between">
                                      <h2 className="text-gray-900 title-font text-lg font-medium">Bottle</h2>
                                      <h3 className="text-gray-500 text-xs tracking-widest title-font">7 Point</h3>
                                  </div>
                                  <Button variant="success" className="mt-2 flex justify-center" onClick={() => handleRedeem(7)}>Redeem</Button>
                              </div>
                          </Col>
                    </Row>
                </Container>
            </section >
            <Footer />

            {isPopUpOpen && (
              <div className="no-data-popup">
                <p>Please Enter Number of Items</p>
                <button onClick={closePopUp}>Close</button>
              </div>
            )}
    </div>
  )
}

export default Credit;