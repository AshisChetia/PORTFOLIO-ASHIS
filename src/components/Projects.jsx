import React, { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FaGithub, FaExternalLinkAlt, FaTimes, FaLayerGroup, FaCode, FaExpandAlt, FaHandPointer } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { fullstackProjects } from '../data/fullstackProjects';
import { uiProjects } from '../data/uiProjects';
import './Projects.css';

gsap.registerPlugin(ScrollTrigger);

// Quadruple items to ensure track is wider than any screen resolution for endless scrolling
const createReelItems = (projectsList) => {
  if (!projectsList || projectsList.length === 0) return [];
  let result = [...projectsList];
  while (result.length < 12) {
    result = [...result, ...projectsList];
  }
  return result;
};

const Projects = () => {
  const sectionRef = useRef(null);
  const trackViewportRef = useRef(null);
  const trackContentRef = useRef(null);

  // States
  const [activeCategory, setActiveCategory] = useState(null); // null = landing, 'fullstack' or 'ui'
  const [selectedProject, setSelectedProject] = useState(null); // Modal state

  // Butter-Smooth Physics Engine Refs
  const isInteractingRef = useRef(false);
  const scrollPosRef = useRef(0);
  const targetScrollPosRef = useRef(0);
  const velocityRef = useRef(0.8); // Base auto speed
  const lastMouseXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const dragDistanceRef = useRef(0);
  const animFrameRef = useRef(null);

  const currentProjects = activeCategory === 'ui' ? uiProjects : fullstackProjects;
  const reelProjects = createReelItems(currentProjects);
  const repetitionsCount = currentProjects.length > 0 ? reelProjects.length / currentProjects.length : 1;

  // Category switch
  const handleSelectCategory = (cat) => {
    setActiveCategory(cat);
  };

  // Video hover preview inside cards
  const handleMouseEnterCard = (e) => {
    const video = e.currentTarget.querySelector('video');
    if (video) {
      video.play().catch(() => {});
    }
  };

  const handleMouseLeaveCard = (e) => {
    const video = e.currentTarget.querySelector('video');
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

  // --- BUTTER-SMOOTH HIGH-FPS RAF TICKER ENGINE ---
  useEffect(() => {
    if (!activeCategory || !trackViewportRef.current || !trackContentRef.current) return;

    const viewport = trackViewportRef.current;
    const content = trackContentRef.current;
    const baseSpeed = 0.8;

    // Reset positions
    scrollPosRef.current = viewport.scrollLeft || 100;
    targetScrollPosRef.current = scrollPosRef.current;

    const loop = () => {
      if (!viewport || !content) return;

      const totalWidth = content.scrollWidth;
      const oneSetWidth = totalWidth / repetitionsCount;

      if (!isInteractingRef.current) {
        // Smoothly decay flick velocity or recover base auto-scroll speed
        if (Math.abs(velocityRef.current) > baseSpeed) {
          velocityRef.current *= 0.95; // Inertia friction decay
        } else {
          // Smoothly recover positive base auto-scroll speed
          velocityRef.current += (baseSpeed - velocityRef.current) * 0.08;
        }

        targetScrollPosRef.current += velocityRef.current;
      }

      // Butter-Smooth Linear Interpolation (Lerp) for 60/120/144Hz displays
      scrollPosRef.current += (targetScrollPosRef.current - scrollPosRef.current) * 0.25;

      // Infinite seamless wrap math in both directions
      if (oneSetWidth > 0) {
        if (scrollPosRef.current >= oneSetWidth * 2) {
          scrollPosRef.current -= oneSetWidth;
          targetScrollPosRef.current -= oneSetWidth;
        } else if (scrollPosRef.current <= 0) {
          scrollPosRef.current += oneSetWidth;
          targetScrollPosRef.current += oneSetWidth;
        }
      }

      viewport.scrollLeft = scrollPosRef.current;
      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [activeCategory, repetitionsCount]);

  // --- GLOBAL MOUSE/TOUCH LISTENERS TO PREVENT STUCK AUTO-SCROLL ---
  useEffect(() => {
    const handleGlobalEnd = () => {
      if (isInteractingRef.current) {
        isInteractingRef.current = false;
      }
    };

    window.addEventListener('mouseup', handleGlobalEnd);
    window.addEventListener('touchend', handleGlobalEnd);
    window.addEventListener('touchcancel', handleGlobalEnd);

    return () => {
      window.removeEventListener('mouseup', handleGlobalEnd);
      window.removeEventListener('touchend', handleGlobalEnd);
      window.removeEventListener('touchcancel', handleGlobalEnd);
    };
  }, []);

  // --- RESPONSIVE FLICK & DRAG HANDLERS ---
  const handleDragStart = (e) => {
    if (!trackViewportRef.current) return;
    isInteractingRef.current = true;
    dragDistanceRef.current = 0;

    const clientX = e.pageX || (e.touches && e.touches[0].clientX) || 0;
    lastMouseXRef.current = clientX;
    lastTimeRef.current = performance.now();
    velocityRef.current = 0;
    
    scrollPosRef.current = trackViewportRef.current.scrollLeft;
    targetScrollPosRef.current = scrollPosRef.current;
  };

  const handleDragMove = (e) => {
    if (!isInteractingRef.current || !trackViewportRef.current) return;

    const clientX = e.pageX || (e.touches && e.touches[0].clientX) || 0;
    const now = performance.now();
    const deltaX = clientX - lastMouseXRef.current;
    const deltaTime = Math.max(now - lastTimeRef.current, 1);

    dragDistanceRef.current += Math.abs(deltaX);

    // Calculate instantaneous velocity for realistic flick inertia
    const instVelocity = -deltaX / (deltaTime / 16);
    velocityRef.current = instVelocity;

    targetScrollPosRef.current -= deltaX;

    lastMouseXRef.current = clientX;
    lastTimeRef.current = now;
  };

  const handleDragEnd = () => {
    isInteractingRef.current = false;
  };

  const handleCardClick = (project) => {
    // Only trigger modal if user didn't drag the track
    if (dragDistanceRef.current < 6) {
      setSelectedProject(project);
    }
  };

  // Modal Lock / Unlock Body Scroll
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
      isInteractingRef.current = true; // Pause reel while modal is active
    } else {
      document.body.style.overflow = 'auto';
      isInteractingRef.current = false;
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedProject]);

  // --- ENTRY ANIMATION ---
  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        ['.projects-badge', '.section-title', '.projects-subtext', '.category-card-btn'],
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="projects-wrapper" ref={sectionRef} id="projects">
      
      {/* --- INITIAL LANDING / TOP SWITCHER HEADER --- */}
      <div className={`projects-header-wrapper ${activeCategory ? 'compact-header' : 'hero-header'}`}>
        <div className="projects-hero-content">
          
          <span className="projects-badge">
            <FaLayerGroup /> PORTFOLIO SHOWCASE
          </span>

          <h2 className="section-title">
            SELECTED <br />
            <span className="outline-text">WORKS.</span>
          </h2>

          {!activeCategory && (
            <p className="projects-subtext">
              Choose a section below to explore interactive project showcases.
            </p>
          )}

          {/* TWO MEDIUM CATEGORY SELECTION CARDS */}
          <div className="category-cards-wrapper">
            <button 
              className={`category-card-btn ${activeCategory === 'fullstack' ? 'active' : ''}`}
              onClick={() => handleSelectCategory('fullstack')}
            >
              <div className="cat-btn-inner">
                <div className="cat-icon-box">
                  <FaCode />
                </div>
                <div className="cat-info">
                  <span className="cat-title">FULLSTACK PROJECTS</span>
                  <span className="cat-desc">Backend architecture + dynamic web applications</span>
                </div>
                <span className="cat-count-badge">{fullstackProjects.length}</span>
              </div>
            </button>

            <button 
              className={`category-card-btn ${activeCategory === 'ui' ? 'active' : ''}`}
              onClick={() => handleSelectCategory('ui')}
            >
              <div className="cat-btn-inner">
                <div className="cat-icon-box">
                  <FaLayerGroup />
                </div>
                <div className="cat-info">
                  <span className="cat-title">UI / FRONTEND</span>
                  <span className="cat-desc">Modern interfaces, design systems & animations</span>
                </div>
                <span className="cat-count-badge">{uiProjects.length}</span>
              </div>
            </button>
          </div>

        </div>
      </div>

      {/* --- REEL SHOWCASE (HORIZONTAL INFINITE TRACK) --- */}
      {activeCategory && (
        <div className="reel-section-container">
          
          {/* Controls & Hints Bar */}
          <div className="reel-meta-bar">
            <span className="reel-hint">
              <FaHandPointer className="hint-arrow" /> Drag or swipe left/right • Click card to inspect
            </span>
            <div className="reel-stats">
              <span>SECTION: {activeCategory.toUpperCase()} ({currentProjects.length})</span>
            </div>
          </div>

          {/* Endless Drag & Scroll Track Viewport */}
          <div 
            className="horizontal-reel-viewport"
            ref={trackViewportRef}
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEnd}
          >
            <div className="horizontal-reel-track" ref={trackContentRef}>
              {reelProjects.map((project, idx) => (
                <div 
                  key={`${project.id}-${idx}`}
                  className="reel-card"
                  onMouseEnter={handleMouseEnterCard}
                  onMouseLeave={handleMouseLeaveCard}
                  onClick={() => handleCardClick(project)}
                >
                  {/* Card Visual Top */}
                  <div className="reel-card-visual">
                    <img 
                      src={project.img} 
                      alt={project.title} 
                      className="reel-card-img" 
                      draggable="false"
                      loading="lazy"
                    />
                    {project.video && (
                      <video 
                        src={project.video} 
                        className="reel-card-video" 
                        muted 
                        loop 
                        playsInline 
                      />
                    )}
                    <div className="reel-card-overlay">
                      <span className="expand-badge">
                        <FaExpandAlt /> Inspect
                      </span>
                    </div>
                  </div>

                  {/* Card Content Bottom */}
                  <div className="reel-card-info">
                    <span className="reel-card-cat">{project.category}</span>
                    <h3 className="reel-card-title">{project.title}</h3>
                    
                    <div className="reel-card-tags">
                      {project.stack.slice(0, 3).map((tech, i) => (
                        <span key={i} className="mini-tag">{tech}</span>
                      ))}
                      {project.stack.length > 3 && (
                        <span className="mini-tag count">+{project.stack.length - 3}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* --- POP-OUT LIGHTBOX MODAL (RENDERED VIA PORTAL DIRECTLY TO BODY) --- */}
      {selectedProject && createPortal(
        <div className="project-modal-backdrop" onClick={() => setSelectedProject(null)}>
          <div className="project-modal-card" onClick={(e) => e.stopPropagation()}>
            
            <button className="modal-close-btn" onClick={() => setSelectedProject(null)} aria-label="Close modal">
              <FaTimes />
            </button>

            <div className="modal-grid">
              
              {/* Left Column: Visual / Media */}
              <div className="modal-media-col">
                <div className="modal-media-container">
                  {selectedProject.video ? (
                    <video 
                      src={selectedProject.video} 
                      className="modal-video" 
                      controls 
                      autoPlay 
                      loop 
                      muted 
                      playsInline
                    />
                  ) : (
                    <img 
                      src={selectedProject.img} 
                      alt={selectedProject.title} 
                      className="modal-img" 
                    />
                  )}
                </div>
              </div>

              {/* Right Column: Project Details & Links */}
              <div className="modal-details-col">
                <div>
                  <span className="modal-cat">{selectedProject.category}</span>
                  <h2 className="modal-title">{selectedProject.title}</h2>
                  <p className="modal-desc">{selectedProject.desc}</p>
                </div>

                <div>
                  <div className="modal-stack-section">
                    <span className="modal-section-label">TECHNOLOGY STACK</span>
                    <div className="modal-tags">
                      {selectedProject.stack.map((tech, i) => (
                        <span key={i} className="modal-tag">{tech}</span>
                      ))}
                    </div>
                  </div>

                  <div className="modal-actions">
                    {selectedProject.repo && (
                      <a 
                        href={selectedProject.repo} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="modal-action-btn primary"
                      >
                        <FaGithub /> Source Code
                      </a>
                    )}
                    {selectedProject.link ? (
                      <a 
                        href={selectedProject.link} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="modal-action-btn secondary"
                      >
                        <FaExternalLinkAlt /> Live Demo
                      </a>
                    ) : (
                      <span className="modal-action-btn disabled">
                        <FaExternalLinkAlt /> Not Deployed
                      </span>
                    )}
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>,
        document.body
      )}

    </section>
  );
};

export default Projects;