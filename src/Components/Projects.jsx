import React, { useRef, useState } from 'react';
import { FaGithub, FaExternalLinkAlt, FaPlay } from 'react-icons/fa';
import { projectData } from '../Data/projectData';
import './Projects.css';

// --- Sub-Component for Video Logic ---
const ProjectCard = ({ project, index }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleMouseEnter = () => {
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0; // Reset to start
    }
  };

  return (
    <div 
      className="project-card" 
      style={{ top: `calc(15vh + ${index * 30}px)` }} 
    >
      <div className="project-content">
        
        {/* Left: Text */}
        <div className="project-text">
          <span className="project-cat">{project.category}</span>
          <h3 className="project-title">{project.title}</h3>
          <p className="project-desc">{project.desc}</p>
          
          <div className="project-stack">
            {project.stack.map((tech, i) => (
              <span key={i} className="tech-tag">{tech}</span>
            ))}
          </div>

          <div className="project-links">
            <a href={project.repo} target="_blank" rel="noreferrer" className="link-btn">
              <FaGithub /> Code
            </a>
            <a href={project.link} target="_blank" rel="noreferrer" className="link-btn">
              <FaExternalLinkAlt /> Live Demo
            </a>
          </div>
        </div>

        {/* Right: Visual (Image -> Video Swap) */}
        <div 
          className="project-visual"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="image-container">
            
            {/* 1. Video Element (Hidden by default) */}
            <video
              ref={videoRef}
              src={project.video}
              className={`project-video ${isPlaying ? 'active' : ''}`}
              muted
              loop
              playsInline
            />

            {/* 2. Static Image (Visible by default) */}
            <img 
              src={project.img} 
              alt={project.title} 
              className={`project-img ${isPlaying ? 'hidden' : ''}`} 
            />

            {/* 3. Play Icon Overlay (Optional hint) */}
            <div className={`play-overlay ${isPlaying ? 'hidden' : ''}`}>
               <FaPlay className="play-icon" />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main Component ---
const Projects = () => {
  return (
    <section className="projects-wrapper" id="projects">
      <div className="projects-header">
        <h2 className="section-title">SELECTED <br /><span className="outline-text">WORKS.</span></h2>
      </div>

      <div className="cards-container">
        {projectData.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Projects;