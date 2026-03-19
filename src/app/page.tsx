import About from "./components/about";
import Contact from "./components/contact";
import Hero from "./components/hero";
import Projects from "./components/project";
import Certificates from "./components/certificates";
import Skills from "./components/skills";

export default function Page() {
  return (
    <main className="scroll-smooth">
      <Hero />
      <About />
      <Skills />
      <Certificates />
      <Projects />
      <Contact />
    </main>
  );
}
