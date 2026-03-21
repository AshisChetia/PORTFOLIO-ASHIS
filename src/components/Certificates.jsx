import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { certificateData } from '../data/certificateData';
import './Certificates.css';
import { FaArrowRight } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const Certificates = () => {
  const sectionRef = useRef(null);
  const listRef = useRef(null);
  const cursorImgRef = useRef(null);
  const [activeImg, setActiveImg] = useState(certificateData[0]?.img || "");

  useEffect(() => {
    // Reveal Animations
    let ctx = gsap.context(() => {
      // Massive Title reveal
      gsap.from(".cert-huge-title span", {
        y: "120%",
        duration: 1.2,
        ease: "power4.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        }
      });

      // Staggered list row reveal
      gsap.from(".cert-row", {
        opacity: 0,
        y: 60,
        duration: 1.2,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: listRef.current,
          start: "top 80%",
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Floating Image Mouse Move Effect (The Awwwards touch)
  useEffect(() => {
    // QuickTo for buttery smooth cursor trailing
    let xTo = gsap.quickTo(cursorImgRef.current, "x", { duration: 0.5, ease: "power3" });
    let yTo = gsap.quickTo(cursorImgRef.current, "y", { duration: 0.5, ease: "power3" });

    // Center the image relative to the mouse pointer
    gsap.set(cursorImgRef.current, { xPercent: -50, yPercent: -50, scale: 0 });

    const moveImage = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener("mousemove", moveImage);
    return () => window.removeEventListener("mousemove", moveImage);
  }, []);

  const handleMouseEnter = (img) => {
    setActiveImg(img);
    gsap.to(cursorImgRef.current, { scale: 1, opacity: 1, duration: 0.5, ease: "power4.out" }); // Pop in
  };

  const handleMouseLeave = () => {
    gsap.to(cursorImgRef.current, { scale: 0, opacity: 0, duration: 0.4, ease: "power3.in" }); // Pop out
  };

  return (
    <section className="certificates-awwwards" id="certificates" ref={sectionRef}>
      
      {/* Absolute floating image tied to mouse coords */}
      <div className="cert-cursor-img" ref={cursorImgRef}>
        <img src={activeImg} alt="Certificate preview" />
        <div className="view-badge">View</div>
      </div>

      <div className="cert-inner">
        
        {/* Top Header */}
        <div className="cert-head">
          <h2 className="cert-huge-title">
            <div className="title-overflow"><span>HONORS &</span></div>
            <div className="title-overflow"><span className="outline">AWARDS.</span></div>
          </h2>
          <p className="cert-intro">
            A curated collection of my professional credentials and achievements. 
            Hover over the list to preview the proofs of my expertise.
          </p>
        </div>

        {/* Huge Interactive Text List */}
        <div className="cert-list" ref={listRef}>
          {certificateData.map((cert, index) => (
            <a 
              href={cert.link} 
              target="_blank" 
              rel="noopener noreferrer"
              key={cert.id} 
              className="cert-row"
              onMouseEnter={() => handleMouseEnter(cert.img)}
              onMouseLeave={handleMouseLeave}
            >
              {/* Left Side: Number + Title */}
              <div className="cert-row-left">
                <span className="cert-num">0{index + 1}</span>
                <h3 className="cert-item-title">{cert.title}</h3>
              </div>
              
              {/* Mobile Only Inline Image (Hidden on Desktop) */}
              <img src={cert.img} alt={cert.title} loading="lazy" className="cert-mobile-img" />
              
              {/* Right Side: Issuer + Date + Arrow */}
              <div className="cert-row-right">
                <div className="cert-details">
                   <span className="cert-issuer">{cert.issuer}</span>
                   <span className="cert-divider">/</span>
                   <span className="cert-date">{cert.date}</span>
                </div>
                <div className="cert-arrow"><FaArrowRight /></div>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Certificates;
