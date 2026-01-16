import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaPaperPlane, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import './Contact.css';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);
  
  // Form State
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // 'success' or 'error'
  const [showToast, setShowToast] = useState(false);

  // GSAP Animation (Same as before)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-reveal", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play reverse play reverse"
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Validation Logic
  const validate = () => {
    let tempErrors = {};
    if (!formData.user_name) tempErrors.user_name = "Name is required";
    if (!formData.user_email) {
      tempErrors.user_email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.user_email)) {
      tempErrors.user_email = "Email is invalid";
    }
    if (!formData.message) tempErrors.message = "Message cannot be empty";
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  // --- FORMSPREE SUBMIT LOGIC ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      
      const response = await fetch("https://formspree.io/f/xykkkyab", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: formData.user_name,
          email: formData.user_email,
          message: formData.message,
          // THIS IS THE MAGIC KEY FOR GMAIL FILTERING
          _subject: `PORTFOLIO_CONTACT: New message from ${formData.user_name}` 
        })
      });

     if (response.ok) {
        setStatus('success');
        setFormData({ user_name: '', user_email: '', message: '' }); // Clear form
        setShowToast(true); // Show toast
        setTimeout(() => {
            setShowToast(false); // Hide after 4s
            setStatus(null);
        }, 4000);
      } else {
        setStatus('error');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 4000);
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact-section" id="contact" ref={sectionRef}>
      <div className="contact-container">
        
        {/* Header */}
        <div className="contact-header contact-reveal">
          <h2 className="section-title">
            LET'S <span className="outline-text">TALK.</span>
          </h2>
          <p className="contact-sub">
            Have a project in mind or just want to say hi? 
            My inbox is always open for new opportunities.
          </p>
        </div>

        <div className="contact-grid">
          {/* Left: Contact Info */}
          <div className="contact-info contact-reveal">
            <div className="info-item">
              <FaEnvelope className="info-icon" />
              <div>
                <h4>Email</h4>
                <p>your.email@example.com</p>
              </div>
            </div>
            <div className="info-item">
              <FaMapMarkerAlt className="info-icon" />
              <div>
                <h4>Location</h4>
                <p>Assam, India</p>
              </div>
            </div>
          </div>
          <div className={`toast-notification ${showToast ? 'show' : ''} ${status}`}>
          {status === 'success' ? (
             <>
               <FaCheckCircle className="toast-icon toast-success-icon" />
               <div>
                 <strong>Message Sent!</strong>
                 <p style={{fontSize: '0.8rem', color: '#aaa', margin: 0}}>I'll get back to you soon.</p>
               </div>
             </>
          ) : (
             <>
               <FaExclamationCircle className="toast-icon toast-error-icon" />
               <div>
                 <strong>Error</strong>
                 <p style={{fontSize: '0.8rem', color: '#aaa', margin: 0}}>Something went wrong.</p>
               </div>
             </>
          )}
       </div>

          {/* Right: The Form */}
          <form className="contact-form contact-reveal" onSubmit={handleSubmit}>
            
            <div className="form-group">
              <input 
                type="text" 
                name="user_name" 
                placeholder="What's your name?" 
                className={`form-input ${errors.user_name ? 'input-error' : ''}`}
                value={formData.user_name}
                onChange={handleChange}
              />
              {errors.user_name && <span className="error-text">{errors.user_name}</span>}
            </div>

            <div className="form-group">
              <input 
                type="email" 
                name="user_email" 
                placeholder="Your email address" 
                className={`form-input ${errors.user_email ? 'input-error' : ''}`}
                value={formData.user_email}
                onChange={handleChange}
              />
              {errors.user_email && <span className="error-text">{errors.user_email}</span>}
            </div>

            <div className="form-group">
              <textarea 
                name="message" 
                rows="4" 
                placeholder="Tell me about your project..." 
                className={`form-input ${errors.message ? 'input-error' : ''}`}
                value={formData.message}
                onChange={handleChange}
              ></textarea>
              {errors.message && <span className="error-text">{errors.message}</span>}
            </div>

            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : (
                <>Send Message <FaPaperPlane /></>
              )}
            </button>

            {status === 'success' && (
              <div className="status-msg success">Message sent! I'll get back to you soon.</div>
            )}
            {status === 'error' && (
              <div className="status-msg error">Oops! Something went wrong. Please try again.</div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;