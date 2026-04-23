import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Awards from "@/components/Awards";
import Projects from "@/components/Projects";
import Career from "@/components/Career";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main style={{ paddingBottom: "80px" }}>
        <Hero />
        <Services />
        <About />
        <Awards />
        <Projects />
        <Career />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
