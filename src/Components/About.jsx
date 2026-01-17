import React, { useEffect, useRef } from 'react';
import { FaEye, FaGithub, FaLinkedin, FaInstagram, FaTerminal, FaCoffee, FaFilm } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play reverse play reverse"
        }
      });

      // 1. Image pop-up animation
      tl.fromTo(imageRef.current, 
        { y: 100, opacity: 0, scale: 0.8 },
        { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: "power4.out" }
      )
      // 2. Text slide-in
      .fromTo(".about-reveal",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 1, ease: "power3.out" },
        "-=0.8"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="about-section" id="about" ref={sectionRef}>
      <div className="about-container">
        
        {/* Left: Visual */}
        <div className="about-visual">
          <div className="img-wrapper-arch">
             {/* Replace this placeholder with your actual photo */}
             <img 
              ref={imageRef}
              src="/aboutImg.jpg" 
              alt="Ashish Chetia" 
              className="about-img" 
            />
          </div>
          
          {/* Decorative Tag */}
          <div className="about-tag about-reveal">
            <FaTerminal className="tag-icon" />
            <span>Backend Focused</span>
          </div>
        </div>

        {/* Right: Content */}
        <div className="about-content" ref={contentRef}>
            <div className="about-header about-reveal">
              <h4 className="sub-heading">WHO I AM</h4>
              <h2 className="section-title">
                BEYOND THE <span className="outline-text">CODE.</span>
              </h2>
            </div>
            
            <div className="about-text-grid">
              <p className="about-desc about-reveal">
                I am a backend-focused developer based in <strong>Assam, India</strong>, currently pursuing my BCA at 
                <strong> Sibsagar Commerce College (Dibrugarh University)</strong>.
              </p>
              <p className="about-desc about-reveal">
                My passion lies in backend architecture, but I am rapidly evolving into a Full Stack Developer. 
                When I'm not coding, I love watching movies, series, and playing games.
              </p>
            </div>

            {/* Resume & Socials */}
            <div className="about-actions about-reveal">
               <a 
                 href="/resume.pdf" 
                 target="_blank" 
                 rel="noopener noreferrer" 
                 className="resume-btn"
               >
                 <FaEye /> View Resume
               </a>

               <div className="about-socials">
                  <a href="https://github.com/AshisChetia" className="social-circle" target='_blank'><FaGithub /></a>
                  <a href="https://www.linkedin.com/in/ashis-chetia-a981b1351/" className="social-circle" target='_blank'><FaLinkedin /></a>
                  <a href="https://www.instagram.com/_ashischetia_?igsh=MW1nZWFvczM1cXZvbw==" className="social-circle" target='_blank'><FaInstagram /></a>
               </div>
            </div>

            {/* Hobbies / Stats Minimalist */}
            <div className="interests-row about-reveal">
              <div className="interest-pill"><FaCoffee /> Chai</div>
              <div className="interest-pill"><FaFilm /> Movies</div>
              <div className="interest-pill">🎮 Gaming</div>
            </div>
        </div>

      </div>
    </section>
  );
};

export default About;