import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { format } from 'date-fns';
import { FaGithub, FaLinkedin, FaInstagram, FaArrowDown } from 'react-icons/fa';
import './Landing.css';

const Landing = () => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const overlayRef = useRef(null);
  
  const [time, setTime] = useState(new Date());

  // Update Clock
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // 1. Image Reveal
      tl.to(overlayRef.current, {
        height: "0%",
        duration: 1.5,
        ease: "power4.inOut"
      })
      .from(imageRef.current, {
        scale: 1.5,
        duration: 2,
        ease: "power2.out"
      }, "-=1.5")

      // 2. Name Reveal (Above Image)
      .from(".name-reveal", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=1")

      // 3. Main Title Stagger
      .from(".hero-line span", {
        y: 200,
        skewY: 10,
        duration: 1,
        stagger: 0.1,
        ease: "power4.out"
      }, "-=0.5")
      
      // 4. Details Fade In
      .from(".fade-in", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out"
      }, "-=0.5");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="landing-wrapper" ref={containerRef} id="home">
      
      {/* Top Header Widget */}
      <div className="landing-header fade-in">
        <div className="status-widget">
          <div className="status-dot"></div>
          <div className="status-info">
            <span className="location">Guwahati, India</span>
            <span className="time">{format(time, 'hh:mm a')} IST</span>
          </div>
        </div>
      </div>

      <div className="landing-content">
        
        {/* Left: Main Title (Backend Architect) */}
        <div className="text-section">
          
          <h1 className="display-title">
            <div className="hero-line"><span>BACKEND</span></div>
            <div className="hero-line"><span className="italic-serif">ARCHITECT</span></div>
            <div className="hero-line"><span>& FUTURE</span></div>
            <div className="hero-line"><span className="outline">FULLSTACK.</span></div>
          </h1>

          <p className="hero-bio fade-in">
            Engineering robust logic for the web. <br />
            Translating complex data into seamless experiences.
          </p>

          <div className="social-row fade-in">
            <a href="https://github.com/AshisChetia" className="social-btn" target='_blank'><FaGithub /></a>
            <a href="https://www.linkedin.com/in/ashis-chetia-a981b1351/" className="social-btn" target='_blank'><FaLinkedin /></a>
            <a href="https://www.instagram.com/_ashischetia_?igsh=MW1nZWFvczM1cXZvbw==" className="social-btn" target='_blank'><FaInstagram /></a>
          </div>
        </div>

        {/* Right: Name & Visual */}
        <div className="visual-section">
          
          {/* NAME MOVED HERE */}
          <div className="intro-tag name-reveal">
             <span className="dash"></span> Hello, I'm Ashis Chetia
          </div>

          <div className="image-container">
            <div className="reveal-overlay" ref={overlayRef}></div>
            <img 
              ref={imageRef}
              src="/public/heroImg.jpg" 
              alt="Ashish Chetia" 
              className="hero-image"
            />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator fade-in">
        <span>SCROLL</span>
        <FaArrowDown className="bounce-arrow" />
      </div>

    </section>
  );
};

export default Landing;