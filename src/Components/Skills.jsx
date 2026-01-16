import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaServer, FaCode, FaDatabase, FaTools } from 'react-icons/fa';
import './Skills.css';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const el = sectionRef.current;
    
    // Clear any existing ScrollTriggers to prevent conflicts
    let ctx = gsap.context(() => {
      
      // 1. Animate Title (Slide in from left)
      gsap.fromTo(titleRef.current,
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 70%", // Triggers when top of section hits 70% of viewport
            toggleActions: "play reverse play reverse"
          }
        }
      );

      // 2. Animate Columns (Stagger up)
      gsap.fromTo(cardsRef.current, 
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".tech-grid", // Trigger based on the grid container
            start: "top 75%",
            toggleActions: "play reverse play reverse"
          }
        }
      );

    }, sectionRef); // Scope to this component

    return () => ctx.revert(); // Cleanup
  }, []);

  const addToRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) cardsRef.current.push(el);
  };

  const categories = [
    {
      id: "01",
      title: "BACKEND",
      sub: "ARCHITECTURE",
      icon: <FaServer />,
      items: ["Node.js", "Express", "REST API", "JWT Auth", "NestJS"]
    },
    {
      id: "02",
      title: "FRONTEND",
      sub: "EXPERIENCE",
      icon: <FaCode />,
      items: ["HTML", "CSS", "Javascript", "React", "GSAP", "Next.js"]
    },
    {
      id: "03",
      title: "DATABASE",
      sub: "STORAGE",
      icon: <FaDatabase />,
      items: ["MongoDB", "MySQL", "Mongoose", "PostgreSQL", "Redis"]
    },
    {
      id: "04",
      title: "TOOLS",
      sub: "WORKFLOW",
      icon: <FaTools />,
      items: ["Git/GitHub", "Postman", "VS Code", "Docker", "AWS"]
    }
  ];

  return (
    <section className="tech-section" ref={sectionRef} id="skills">
      <div className="tech-container">
        
        {/* Design Layout: Title Bottom Left, Grid Top Right/Center */}
        <div className="layout-wrapper">
          
          {/* The Big Title */}
          <div className="tech-title-wrapper" ref={titleRef}>
            <h2 className="tech-header">
              TECH <br />
              <span className="outline-text">STACK.</span>
            </h2>
            <div className="tech-line"></div>
          </div>

          {/* The 4 Columns */}
          <div className="tech-grid">
            {categories.map((cat, index) => (
              <div className="tech-card" key={cat.id} ref={addToRefs}>
                <div className="card-top">
                  <span className="card-icon">{cat.icon}</span>
                  <span className="card-num">{cat.id}</span>
                </div>
                
                <h3 className="card-title">{cat.title}</h3>
                <p className="card-sub">{cat.sub}</p>
                
                <div className="card-divider"></div>
                
                <ul className="tech-list">
                  {cat.items.map((item, i) => (
                    <li key={i}>
                      <span className="bullet">•</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Skills;