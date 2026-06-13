import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, BarChart3, Rocket, Sparkles } from "lucide-react";
import Meter from "../components/ui/Meter";
import SectionHeading from "../components/ui/SectionHeading";
import { programs } from "../data/siteData";
import { useAdmissionsModal } from "../components/AdmissionsModal";

export default function ProgramsSection() {
  const [selectedProgram, setSelectedProgram] = useState("BBA");
  const program = programs[selectedProgram];
  const ProgramIcon = program.icon;
  const { openAdmissionsModal } = useAdmissionsModal();

  return (
    <section id="programs" className="light-section section-pad">
      <SectionHeading
        eyebrow="Explore Programs"
        title="Find Your Perfect Program"
        description="Six industry-aligned programs designed to launch your career."
      />

      <div className="program-tabs" role="tablist" aria-label="Programs">
        {Object.keys(programs).map((name) => (
          <button
            key={name}
            className={selectedProgram === name ? "selected" : ""}
            type="button"
            role="tab"
            aria-selected={selectedProgram === name}
            onClick={() => setSelectedProgram(name)}
          >
            {name}
          </button>
        ))}
      </div>

      <motion.div
        className="program-panel"
        key={selectedProgram}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="program-overview">
          <div className="program-title">
            <span className="square-icon">
              <ProgramIcon />
            </span>
            <h3>{selectedProgram}</h3>
          </div>
          <p>
            A future-ready {program.title} program blending strong academic
            foundations with hands-on industry projects to shape tomorrow&apos;s
            professionals.
          </p>
          <div className="duration">
            <span>Duration</span>
            <b>{program.duration}</b>
          </div>
          <Meter label="Industry Demand" value={program.demand} />
          <Meter label="Salary Potential" value={program.salary} color="dark" />
          <Meter label="Future Growth" value={program.growth} color="primary" />
        </div>

        <div className="career-side">
          <h4>
            <Sparkles /> Career Opportunities
          </h4>
          <div className="career-grid">
            {program.careers.map((career, index) => (
              <div key={career}>
                <span>{index % 2 ? <Rocket /> : <BarChart3 />}</span>
                {career}
              </div>
            ))}
          </div>
          <div className="salary-box">
            <span>Salary Range</span>
            <strong>{program.range}</strong>
            <span className="salary-line" />
          </div>
        </div>

        <button type="button" className="program-apply" onClick={() => openAdmissionsModal(selectedProgram)}>
          Apply for {selectedProgram} <ArrowRight />
        </button>
      </motion.div>
    </section>
  );
}
