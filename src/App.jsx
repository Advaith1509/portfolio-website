import React from "react";
import { Navbar } from "./components/Navbar";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Experience } from "./pages/Experience";
import { Home } from "./pages/home";
import { Projects } from "./pages/Projects";

import ParticlesBackground from "./components/ParticlesBackground";
import CustomCursor from "./components/CustomCursor";
import Intro from "./components/Intro";

function App() {
  return (
    <div className="App">
      <Intro />
      <CustomCursor />
      <ParticlesBackground />
      <Navbar>
        <Home />
        <About />
        <Projects />
        <Experience />
        <Contact />
      </Navbar>
    </div>
  );
}

export default App;
