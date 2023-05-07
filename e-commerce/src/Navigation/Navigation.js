import React, { useState,useEffect } from 'react';
import Header from '../Hedaer/header';
import Navbar from '../Navbar/Navbar';

const Navigation = () => {
    const [showNavbar,setShowNavbar] = useState(true);
    
    useEffect(()=>{
      window.addEventListener('scroll', handleScroll);
      return() => window.addEventListener('scroll', handleScroll);
    },[showNavbar]);
    const handleScroll = () =>{
      const scrollPosition = window.scrollY;
      
      if(scrollPosition > 40){
        setShowNavbar(false);
      }
      else{
        setShowNavbar(true);
      }
    }
    
  return (
    <div>
      { showNavbar ? <Header /> : <Navbar />}
     
    </div>
  )
}

export default Navigation