import { motion } from "framer-motion";
import {
  BarChart3,
  Building2,
  ShieldCheck,
  Sparkles,
  Trophy,
  Wallet,
} from "lucide-react";
import Meter from "../components/ui/Meter";
import SectionHeading from "../components/ui/SectionHeading";
import { reveal } from "../constants/motion";
import { programs } from "../data/siteData";

const partnerLogos = [
  { name: "Google", logo: "/logos/google.webp", short: "Google" },
  { name: "Microsoft", logo: "/logos/microsoft.webp", short: "MS" },
  { name: "TCS", logo: "/logos/tcs.webp", short: "TCS" },
  { name: "IBM", logo: "/logos/ibm.webp", short: "IBM" },
  { name: "Infosys", logo: "/logos/infosys.webp", short: "INFY" },
  { name: "Wipro", logo: "/logos/wipro.webp", short: "WIPRO" },
  { name: "HCL", logo: "/logos/hcl.webp", short: "HCL" },
  { name: "KPMG", logo: "/logos/kpmg.webp", short: "KPMG" },
  { name: "Deloitte", logo: "/logos/deloitte.webp", short: "Deloitte" },
  { name: "Amazon", logo: "/logos/amazon.webp", short: "Amazon" },
  { name: "Accenture", logo: "/logos/accenture.webp", short: "Acc" },
  { name: "Cognizant", logo: "/logos/cognizant.webp", short: "Cog" },
];

const successStories = [
  {
    name: "Priya Sharma",
    image: "/girl.png",
    company: "Deloitte",
    program: "MBA 2023",
    quote:
      "GGES gave me the industry exposure and mentorship that landed me my dream consulting role.",
  },
  {
    name: "Rahul Verma",
    image: "/boy.png",
    company: "Amazon",
    program: "MCA 2023",
    quote:
      "The practical projects and internship support made me job-ready from day one.",
    alternate: true,
  },
  {
    name: "Sneha Patel",
    image: "/girl.png",
    company: "Google",
    program: "BTech CSE 2024",
    quote:
      "The technical rigor of the curriculum combined with excellent placement cell support opened doors for me at major tech giants.",
  },
  {
    name: "Vikram Singh",
    image: "/boy.png",
    company: "KPMG",
    program: "BBA 2023",
    quote:
      "The mentorship program was invaluable, guiding me on resume building and mock interviews, which directly contributed to my success.",
    alternate: true,
  },
  {
    name: "Anjali Gupta",
    image: "/girl.png",
    company: "Microsoft",
    program: "MCA 2024",
    quote:
      "The collaborative learning environment and real-world project assignments prepared me for the challenges of the software industry.",
  },
];

export default function PlacementsSection() {
  return (
    <section
      id="placements"
      className="placement-section light-section section-pad"
      style={{ overflow: "hidden" }}
    >
      <SectionHeading
        eyebrow="Placement Success"
        title="Careers That Speak for Themselves"
        description="Our students are placed at India's top companies across every industry."
      />

      <div
        className="placement-stats"
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(min(100%, 200px), 1fr))",
          gap: "2rem",
          margin: "3rem 0",
          textAlign: "center",
        }}
      >
        <motion.div
          {...reveal}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <Trophy />
          <strong>&#8377;12 LPA</strong>
          <span>Highest Package</span>
        </motion.div>

        <motion.div
          {...reveal}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <Wallet />
          <strong>&#8377;5.8 LPA</strong>
          <span>Average Package</span>
        </motion.div>

        <motion.div
          {...reveal}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <ShieldCheck />
          <strong>95%</strong>
          <span>Placement Support</span>
        </motion.div>

        <motion.div
          {...reveal}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <Building2 />
          <strong>500+</strong>
          <span>Recruiting Companies</span>
        </motion.div>
      </div>

      <div
        className="company-marquee"
        style={{
          display: "flex",
          overflow: "hidden",
          whiteSpace: "nowrap",
          padding: "2rem 0",
        }}
      >
        <motion.div
          style={{ display: "flex", gap: "4rem", alignItems: "center" }}
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        >
          {[...partnerLogos, ...partnerLogos].map((company, index) => (
            <div
              className={`company-logo${company.logo ? "" : " fallback-mode"}`}
              key={`${company.name}-${index}`}
            >
              {company.logo ? (
                <img
                  src={company.logo}
                  alt={`${company.name} logo`}
                  loading="lazy"
                />
              ) : null}
              <span className="company-logo-fallback">{company.short}</span>
            </div>
          ))}
        </motion.div>
      </div>

      <div
        className="success-grid"
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
          gap: "3rem",
          alignItems: "start",
          marginTop: "3rem",
        }}
      >
        <div>
          <h3
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "2rem",
            }}
          >
            <Sparkles /> Success Stories
          </h3>

          {successStories.map(
            ({ name, image, company, program, quote, alternate }) => (
              <article
                className="story"
                key={name}
                style={{
                  display: "flex",
                  flexWrap: "nowrap",
                  gap: "1.25rem",
                  alignItems: "flex-start",
                  marginBottom: "2rem",
                }}
              >
                <img
                  src={image}
                  alt={`${name} profile`}
                  className={`avatar${alternate ? " alt" : ""}`}
                  style={{
                    flexShrink: 0,
                    width: "60px",
                    height: "60px",
                    // FIX: Forced an exact 1:1 aspect ratio and block display to guarantee a perfect circle
                    aspectRatio: "1 / 1",
                    display: "block",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.25rem",
                  }}
                >
                  <b style={{ fontSize: "1.1rem" }}>{name}</b>
                  <small style={{ opacity: 0.8, fontWeight: "500" }}>
                    {company} &bull; {program}
                  </small>
                  <p
                    style={{
                      marginTop: "0.5rem",
                      fontStyle: "italic",
                      opacity: 0.9,
                      lineHeight: "1.5",
                    }}
                  >
                    &ldquo;{quote}&rdquo;
                  </p>
                </div>
              </article>
            ),
          )}
        </div>

        <div
          className="placement-side"
          style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}
        >
          <figure
            className="placement-image-card"
            style={{
              margin: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <img
              src="/placement-drive.svg"
              alt="Recruitment and placement drive illustration"
              style={{
                width: "100%",
                height: "auto",
                maxWidth: "400px",
                borderRadius: "8px",
              }}
            />
            <figcaption style={{ fontSize: "0.875rem", opacity: 0.6 }}>
              Recruiter-ready preparation
            </figcaption>
          </figure>

          <div
            className="course-performance"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "0.5rem",
              }}
            >
              <BarChart3 />
              <h4 style={{ margin: 0 }}>Placement Rate by Program</h4>
            </div>
            {Object.keys(programs).map((program, index) => (
              <Meter key={program} label={program} value={92 - index * 2} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
