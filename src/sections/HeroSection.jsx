import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Download,
  Globe2,
} from "lucide-react";
import Stat from "../components/ui/Stat";
import { heroChips } from "../data/siteData";
import { useAdmissionsModal } from "../components/AdmissionsModal";

const heroStats = [
  ["3,000+", "Students"],
  ["500+", "Recruiters"],
  ["95%", "Placement Support"],
  ["20+", "Years of Excellence"],
];

export default function HeroSection() {
  const heroHighlight = "Industry-Focused";
  const [typedHighlight, setTypedHighlight] = useState("");
  const { openAdmissionsModal } = useAdmissionsModal();

  useEffect(() => {
    let cancelled = false;
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const runTypewriter = async () => {
      while (!cancelled) {
        for (let index = 1; index <= heroHighlight.length; index += 1) {
          setTypedHighlight(heroHighlight.slice(0, index));
          await sleep(85);
          if (cancelled) return;
        }

        await sleep(1200);
        if (cancelled) return;

        for (let index = heroHighlight.length - 1; index >= 0; index -= 1) {
          setTypedHighlight(heroHighlight.slice(0, index));
          await sleep(45);
          if (cancelled) return;
        }

        await sleep(250);
      }
    };

    runTypewriter();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section 
      id="home" 
      className="hero-section dark-section"
      style={{ 
        minHeight: "100vh", 
        height: "auto", 
        paddingBottom: "3rem" 
      }}
    >
      <div className="stars" />
      {heroChips.map(({ label, className, duration }) => (
        <motion.span
          key={label}
          className={`course-chip ${className}`}
          animate={{ y: [0, -12, 0] }}
          transition={{ duration, repeat: Infinity }}
        >
          {label}
        </motion.span>
      ))}

      <div 
        className="hero-inner"
      >
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>
            Shape Your Future
            <br />
            with <span className="typewriter-slot" aria-label={heroHighlight}>
              <span className="typewriter-reserve" aria-hidden="true">
                {heroHighlight}
              </span>
              <span className="typewriter-word">
                {typedHighlight}
                <span className="typewriter-cursor" aria-hidden="true" />
              </span>
            </span>{" "}
            Education
          </h1>
          <p>
            Build a successful career in Management, Technology, and Pharmacy
            through future-ready programs designed for tomorrow&apos;s
            opportunities.
          </p>
          
          <motion.div
            className="hero-mobile-showcase"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            style={{ position: "relative" }} 
          >
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />

            <img
              className="mobile-hero-image"
              src="/hero.png"
              alt="Layered education technology illustration"
              style={{ position: "relative", zIndex: 1 }} 
            />
            <div className="admission-open-layer mobile">
              <span className="admission-open-eyebrow">Admission Open 2026</span>
              <strong>Apply now for the 2026 intake</strong>
              <small>
                Seats open across management, technology, and pharmacy
                programs.
              </small>
            </div>
            
            <div className="mobile-program-strip" style={{ position: "relative", zIndex: 2 }}>
              {heroChips.slice(0, 4).map(({ label }) => (
                <span key={label}>{label}</span>
              ))}
            </div>
          </motion.div>

          <div className="hero-actions">
            <button className="btn primary" type="button" onClick={() => openAdmissionsModal()}>
              Apply Now <ArrowRight />
            </button>
            <a className="btn outline" href="#admissions">
              <Download /> Download Brochure
            </a>
          </div>
          <div className="hero-stats">
            {heroStats.map(([value, label]) => (
              <Stat key={label} value={value} label={label} />
            ))}
          </div>
        </motion.div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.75 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <img
            className="hero-main-image"
            src="/hero.png"
            alt="Layered education technology illustration"
          />
          <div className="admission-open-layer">
            <span className="admission-open-eyebrow">Admission Open 2026</span>
            <strong>Apply now for the 2026 intake</strong>
            <small>Seats open across all flagship UG and PG programs.</small>
          </div>
          <div className="globe">
            <Globe2 />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
