import React, {useEffect} from 'react';
import gsap from 'gsap';
const truck = [
    '/Images/garbage-truck.png',
];
function Truck() {
    
    
        gsap.to(".garbagetruck" ,{            
            opacity :100,
            x:1000,
            duration :1,
            ease : "power3.out",
            repeat : -1,
            repeatDelay: 1,
        })

  return (
    <div className="hidden md:flex w-full fixed bottom-[-4vh]  z-40  garbagetruck">
          <img
            src={process.env.PUBLIC_URL+truck}
            alt=""
            className="h-[20vh] bg-cover bg-center rounded-xl"
          />
    </div>
  )
}

export default Truck