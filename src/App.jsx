import React from 'react';
import Landing from './Components/Landing';
import Skills from './Components/Skills';
import Projects from './Components/Projects';
import About from './Components/About';
import Contact from './Components/Contact'; // Import
import Dock from './Components/Dock';

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