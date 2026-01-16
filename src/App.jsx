import React from 'react';
import Landing from './components/Landing';
import Skills from './components/Skills';
import Projects from './components/Projects';
import About from './components/About';
import Contact from './components/Contact'; // Import
import Dock from './components/Dock';

function App() {
  return (
    <div className="app-container">
      {/* <div className="noise-overlay"></div> */}
      <main>
        <Landing />
        <Skills />
        <Projects />
        <About />
        <Contact /> {/* Add Contact */}
      </main>
      <Dock />
    </div>
  );
}

export default App;