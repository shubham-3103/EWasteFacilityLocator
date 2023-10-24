import React,{useEffect} from 'react';
import './App.css';
import HomePage from './Pages/HomePage';
import ContextProvider from './context/ContextProvider';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
const truck = ['/Images/garbage-truck.png'];

gsap.registerPlugin(ScrollTrigger);
function App() {
  useEffect(() => {
    const animateTruck = () => {
      gsap.to(".garbagetruck", {
        opacity: 100,
        x: 1520,
        duration: 12,
        ease: "power3.out",
        onComplete: () => {
          // Animation is complete, so restart it
          gsap.set(".garbagetruck", { x: 100 }); // Reset the initial position
          animateTruck(); // Trigger the animation again
        },
      });
    };
  
    animateTruck(); // Start the animation initially
  }, []);
  return (
    <>
    <ContextProvider>
    <HomePage />
    </ContextProvider>
    <div className="d-none d-md-flex z-40 garbagetruck">
      <img src={truck} alt="" className="h-25 bg-cover bg-center rounded-xl" />
    </div>
    </>
  );
}

export default App;
