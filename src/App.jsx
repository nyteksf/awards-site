import { useRef } from "react";

import Hero from "./components/Hero";
import About from "./components/About";
import Story from "./components/Story";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Contact from "./components/Contact";
import Features from "./components/Features";

const App = () => {
  const sectionRefs = {
    hero: useRef(null),
    about: useRef(null),
    features: useRef(null),
    story: useRef(null),
    contact: useRef(null),
    footer: useRef(null),
  };

  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <Navbar sectionRefs={sectionRefs} />
      <div ref={sectionRefs.hero}>
        <Hero />
      </div>
      <div ref={sectionRefs.about}>
        <About />
      </div>
      <div ref={sectionRefs.features}>
        <Features />
      </div>
      <div ref={sectionRefs.story}>
        <Story />
      </div>
      <div ref={sectionRefs.contact}>
        <Contact />
      </div>
      <div ref={sectionRefs.footer}>
        <Footer />
      </div>
    </main>
  );
};

export default App;
