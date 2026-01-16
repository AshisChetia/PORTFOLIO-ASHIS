import React from 'react';
import './Dock.css';
import { FaHome, FaCode, FaProjectDiagram, FaUser, FaEnvelope } from 'react-icons/fa'; // Example icons
import gsap from 'gsap';

const Dock = () => {
  
  // Simple hover animation scaling using GSAP inline or CSS
  const handleMouseEnter = (e) => {
    gsap.to(e.currentTarget, { scale: 1.3, duration: 0.2, ease: "power2.out" });
    // Optional: Animate neighbors for the "wave" effect (advanced)
  };

  const handleMouseLeave = (e) => {
    gsap.to(e.currentTarget, { scale: 1, duration: 0.2, ease: "power2.out" });
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'home', icon: <FaHome />, label: 'Home' },
    { id: 'skills', icon: <FaCode />, label: 'Skills' },
    { id: 'projects', icon: <FaProjectDiagram />, label: 'Work' },
    { id: 'about', icon: <FaUser />, label: 'About' },
    { id: 'contact', icon: <FaEnvelope />, label: 'Contact' },
  ];

  return (
    <nav className="mac-dock-container">
      <div className="mac-dock">
        {navItems.map((item) => (
          <div 
            key={item.id} 
            className="dock-item"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => scrollToSection(item.id)}
          >
            <span className="dock-icon">{item.icon}</span>
            <span className="dock-tooltip">{item.label}</span>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Dock;