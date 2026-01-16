import React from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { projectData } from '../data/projectData'; // Import your data
import './Projects.css';

const Projects = () => {
  return (
    <section className="projects-wrapper" id="projects">
      
      <div className="projects-header">
        <h2 className="section-title">SELECTED <br /><span className="outline-text">WORKS.</span></h2>
      </div>

      <div className="cards-container">
        {projectData.map((project, index) => (
          <div 
            className="project-card" 
            key={project.id} 
            // We use 'top' to create the stacking offset dynamically
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
                  <a href={project.repo} className="link-btn"><FaGithub /> Code</a>
                  <a href={project.link} className="link-btn"><FaExternalLinkAlt /> Live Demo</a>
                </div>
              </div>

              {/* Right: Image (16:9 Aspect Ratio) */}
              <div className="project-visual">
                <div className="image-container">
                  <img src={project.img} alt={project.title} className="project-img" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;