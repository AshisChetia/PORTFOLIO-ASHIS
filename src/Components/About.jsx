import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaGraduationCap, FaCode, FaLaptopCode, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. Image Parallax (Moves slightly as you scroll)
      gsap.to(imageRef.current, {
        yPercent: 20, // Moves down 20% while scrolling
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // 2. Text Reveal Animation
      gsap.from(".about-line", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="about-section" id="about" ref={sectionRef}>
      <div className="about-container">
        
        {/* Left: Image (Masked) */}
        <div className="about-visual">
          <div className="image-mask">
            <img 
              ref={imageRef}
              src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1000&auto=format&fit=crop" 
              alt="Profile" 
              className="about-img" 
            />
          </div>
        </div>

        {/* Right: Content */}
        <div className="about-content" ref={textRef}>
          <h2 className="section-title">
            <div className="overflow-hidden"><span className="about-line d-block">BEYOND</span></div>
            <div className="overflow-hidden"><span className="about-line d-block outline-text">THE CODE.</span></div>
          </h2>

          <div className="about-body">
            <div className="overflow-hidden">
              <p className="about-line">
                I am a <strong>BCA Final Year Student</strong> (Class of 2026) with a passion for logic-heavy backend systems. 
                While others focus on pixels, I focus on performance, scalability, and clean architecture.
              </p>
            </div>
            <div className="overflow-hidden">
              <p className="about-line">
                My journey started with C and Java, but I found my home in the <strong>MERN Stack</strong>. 
                Now, I am bridging the gap to becoming a full-stack engineer who understands the entire lifecycle of an app.
              </p>
            </div>
          </div>

          <div className="about-socials about-line">
            <a href="#" className="about-social-link"><FaGithub /></a>
            <a href="#" className="about-social-link"><FaLinkedin /></a>
            <a href="#" className="about-social-link"><FaInstagram /></a>
          </div>

          {/* Stats / Highlights Row */}
          <div className="about-stats">
            <div className="stat-item about-line">
              <FaGraduationCap className="stat-icon" />
              <div>
                <span className="stat-val">2026</span>
                <span className="stat-label">Graduation</span>
              </div>
            </div>
            <div className="stat-item about-line">
              <FaCode className="stat-icon" />
              <div>
                <span className="stat-val">15+</span>
                <span className="stat-label">Projects</span>
              </div>
            </div>
            <div className="stat-item about-line">
              <FaLaptopCode className="stat-icon" />
              <div>
                <span className="stat-val">500+</span>
                <span className="stat-label">Commits</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;