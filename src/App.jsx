import React from 'react';
import './App.css';
import HomePage from './Pages/HomePage';
import ContextProvider from './context/ContextProvider';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);
function App() {
  return (
    <>
    <ContextProvider>
    <HomePage />
    </ContextProvider>
    </>
  );
}

export default App;
