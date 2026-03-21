import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { certificateData } from '../data/certificateData';
import './Certificates.css';
import { FaArrowRight, FaTimes, FaExternalLinkAlt } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const Certificates = () => {
  const sectionRef = useRef(null);
  const listRef = useRef(null);
  const cursorImgRef = useRef(null);
  
  const [activeImg, setActiveImg] = useState(certificateData[0]?.img || "");
  const [selectedCert, setSelectedCert] = useState(null); // Modal State

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
    // Disable entirely for mobile/touch screens to prevent bugs
    if(window.matchMedia("(max-width: 1024px)").matches) return;

    let xTo = gsap.quickTo(cursorImgRef.current, "x", { duration: 0.5, ease: "power3" });
    let yTo = gsap.quickTo(cursorImgRef.current, "y", { duration: 0.5, ease: "power3" });

    gsap.set(cursorImgRef.current, { xPercent: -50, yPercent: -50, scale: 0 });

    const moveImage = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener("mousemove", moveImage);
    return () => window.removeEventListener("mousemove", moveImage);
  }, []);

  // Ensure background scrolling stops when modal is open
  useEffect(() => {
    if (selectedCert) {
      document.body.style.overflow = "hidden";
      // Hide cursor if modal is open
      gsap.to(cursorImgRef.current, { scale: 0, opacity: 0, duration: 0.2, overwrite: "auto" });
    } else {
      document.body.style.overflow = "auto";
    }
    return () => { document.body.style.overflow = "auto"; };
  }, [selectedCert]);

  // Aggressive Cursor Hide on List Leave to fix the "Stuck" bug
  const forceHideCursor = () => {
    gsap.to(cursorImgRef.current, { scale: 0, opacity: 0, duration: 0.3, ease: "power3.in", overwrite: "auto" });
  };

  const handleRowEnter = (img) => {
    if (selectedCert) return; // Don't show cursor proxy if looking at modal
    setActiveImg(img);
    gsap.to(cursorImgRef.current, { scale: 1, opacity: 1, duration: 0.4, ease: "power4.out", overwrite: "auto" }); // Pop in
  };

  const openModal = (cert, e) => {
    e.preventDefault();
    setSelectedCert(cert);
    forceHideCursor(); // Kill custom cursor instantly
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
            <div className="title-overflow"><span className="outline">CERTIFICATES.</span></div>
          </h2>
          <p className="cert-intro">
            A curated collection of my professional credentials and achievements. 
            Click any certificate to view its details and verified proofs.
          </p>
        </div>

        {/* Huge Interactive Text List */}
        <div 
          className="cert-list" 
          ref={listRef} 
          onMouseLeave={forceHideCursor} // Failsafe killswitch off list boundaries
        >
          {certificateData.map((cert, index) => (
            <div 
              key={cert.id} 
              className="cert-row"
              onClick={(e) => openModal(cert, e)}
              onMouseEnter={() => handleRowEnter(cert.img)}
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
            </div>
          ))}
        </div>

      </div>

      {/* --- MODAL / LIGHTBOX OVERLAY --- */}
      {selectedCert && (
        <div className="cert-modal-overlay" onClick={() => setSelectedCert(null)}>
          <div className="cert-modal-content" onClick={(e) => e.stopPropagation()}>
            
            <button className="cert-modal-close" onClick={() => setSelectedCert(null)}>
              <FaTimes />
            </button>
            
            <div className="cert-modal-visual">
              <img src={selectedCert.img} alt={selectedCert.title} />
            </div>

            <div className="cert-modal-info">
              <span className="cert-modal-issuer">{selectedCert.issuer}</span>
              <h2>{selectedCert.title}</h2>
              <p>{selectedCert.desc}</p>
              
              <div className="cert-modal-tags">
                  {selectedCert.tags && selectedCert.tags.map((tag, idx) => (
                    <span key={idx} className="cert-tag">{tag}</span>
                  ))}
              </div>

              {selectedCert.link && selectedCert.link !== "#" && (
                <a href={selectedCert.link} target="_blank" rel="noopener noreferrer" className="verify-btn">
                  Verify Link <FaExternalLinkAlt />
                </a>
              )}
            </div>

          </div>
        </div>
      )}

    </section>
  );
};

export default Certificates;
