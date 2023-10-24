import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ClerkProvider, SignUp, SignedIn, SignedOut } from "@clerk/clerk-react";
import { useNavigate,Routes,Route,BrowserRouter } from 'react-router-dom';
import About from './Components/About';
import SignIn from './Pages/SignIn'
import FindFacility from './Pages/FindFacility';
import HomePage from './Pages/HomePage';
import Credit from './Pages/Credit';
 
if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}
const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

const ClerkWithRoutes = () =>{
  const navigate = useNavigate()
  return(
    <ClerkProvider 
      publishableKey={clerkPubKey}
      navigate={(to) => navigate(to)}
    >
    <Routes>
      <Route path="/" element={<App />} />
      <Route 
          path="/sign-in/*"
          element={<SignIn redirectUrl={'/'} routing="path" path="/sign-in"/>}
      />
      <Route
        path="/sign-up/*"
        element={<SignUp redirectUrl={'/'} routing="path" path="/sign-up" />}
      />
      
      <Route
          path="/"
          element={
            <>
            <SignedIn>
              <HomePage />
            </SignedIn>
             <SignedOut>
              <HomePage />
           </SignedOut>
            </>
          }
        />
      <Route path="/About" element={<About />}/>
      <Route path='/findfacility' element={<FindFacility />} />
      <Route path='/credits' element={<Credit />} />
    </Routes>
    </ClerkProvider>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ClerkWithRoutes />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
