import React,{ useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar'
import { Container, Row, Col, Form, Button, Image } from 'react-bootstrap';
import '../App.css'

import img1 from "../assets/rewards/1.jpg";
import img2 from "../assets/rewards/2.jpg";
import img3 from "../assets/rewards/3.jpg";
import img4 from "../assets/rewards/4.jpg";
import img5 from "../assets/rewards/5.jpg";
import img6 from "../assets/rewards/6.jpg";
import img7 from "../assets/rewards/7.jpg";
import img8 from "../assets/rewards/8.jpg";
import Footer from '../Components/Footer';

function Credit() {
  const { user } = useUser();
  const navigate = useNavigate();
  // Check if the user is signed in
  const [size, setSize] = useState("Small Electronics");
  const [item, setItem] = useState("Smartphone");
  const [weight, setWeight] = useState(0);
  const [points, setPoints] = useState(0);
  
  const calculatePoints = () => {
    if (size === "Small Electronics") {
      setPoints(1 * weight);
    } else if (size === "Medium Electronics") {
      setPoints(2 * weight);
    } else if (size === "Large Electronics") {
      setPoints(3 * weight);
    }
  }
  if (!user) {
    navigate('/sign-in');
    return null;
  }     

  return (
    <div>
      <Navbar />
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
                                  <option value="Digital Camera">Digital Camera</option>
                                </Form.Select>
                              )}
                              {size === "Medium Electronics" && (
                                <Form.Select onChange={(e) => setItem(e.target.value)}>
                                  <option value="Gaming Console">Gaming Console</option>
                                  <option value="DVD Player">DVD Player</option>
                                  <option value="Tablets">Tablets</option>
                                  <option value="Laptops">Laptops</option>
                                  <option value="Desktop Computer">Desktop Computer</option>
                                  <option value="Printer">Printer</option>
                                </Form.Select>
                              )}
                              {size === "Large Electronics" && (
                                <Form.Select onChange={(e) => setItem(e.target.value)}>
                                  <option value="Refrigerators">Refrigerators</option>
                                  <option value="Washing Machine">Washing Machine</option>
                                  <option value="Dishwasher">Dishwasher</option>
                                  <option value="Microwave">Microwave</option>
                                  <option value="Home Theatre">Home Theatre</option>
                                </Form.Select>
                              )}
                            </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Number of Items</Form.Label>
                                    <Form.Control type="text" value={weight} onChange={(e) => setWeight(e.target.value)} />
                                </Form.Group>
                                <Button /*variant="primary"*/ className='button-27' onClick={calculatePoints}>Calculate Points</Button>
                            </Form>
                        </Col>
                        <Col md={6}>
                            <div className="text-center">
                                <div className="rounded-lg border border-gray-100 px-4 py-4 text-center">
                                    <p className="text-lg font-medium text-gray-500">Total Points</p>
                                    <h3 className="text-4xl font-extrabold text-green-600 md:text-5xl">{points}</h3>
                                </div>
                            </div>
                    <div className="d-flex justify-content-center align-items-center w-100">
                      {/* <div className="d-flex flex-wrap"> */}
                        <div className="mb-3">
                          <label htmlFor="name" className="form-label">Enter Coupon Code to verify.</label>
                          <input type="text" placeholder="xxx-xxx" id="name" name="name" className="form-control" />
                        </div>
                        <div className="mt-3">
                          <button className="button-27">Submit</button>
                        </div>
                      {/* </div> */}
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
                                  <Button variant="success" className="mt-2 flex justify-center">Redeem</Button>
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
                                  <Button variant="success" className="mt-2 flex justify-center">Redeem</Button>
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
                                  <Button variant="success" className="mt-2 flex justify-center">Redeem</Button>
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
                                  <Button variant="success" className="mt-2 flex justify-center">Redeem</Button>
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
                                  <Button variant="success" className="mt-2 flex justify-center">Redeem</Button>
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
                                  <Button variant="success" className="mt-2 flex justify-center">Redeem</Button>
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
                                  <Button variant="success" className="mt-2 flex justify-center">Redeem</Button>
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
                                  <Button variant="success" className="mt-2 flex justify-center">Redeem</Button>
                              </div>
                          </Col>
                    </Row>
                </Container>
            </section >
            <Footer />
    </div>
  )
}

export default Credit;