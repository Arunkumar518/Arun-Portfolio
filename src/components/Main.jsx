import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import profileImg from "../assets/profile.jpg"; // your profile photo

const ADMIN_PASS = "yourpassword";

const initialProjects = [
  {
    id: 1,
    title: "Smart Banking System",
    overview: "Java console banking app (accounts, transfers, file persistence).",
    feature: "Account management, secure transactions, file-based persistence.",
    github: "https://github.com/your-repo/smart-banking",
    stack: "Java",
    img: "/assets/project1.jpg",
  },
  {
    id: 2,
    title: "WorkTrackPro",
    overview: "React app to track workers, jobs & proof photos.",
    feature: "Assign jobs, upload images, compute payments.",
    github: "https://github.com/your-repo/worktrackpro",
    stack: "React",
    img: "/assets/project2.jpg",
  },
  {
    id: 3,
    title: "Portfolio",
    overview: "This portfolio built with React + Framer Motion.",
    feature: "Animated portfolio, theme toggle, modal features.",
    github: "https://github.com/your-repo/portfolio",
    stack: "React",
    img: "/assets/project3.jpg",
  },
];

export default function Main({ dark }) {
  const [projects, setProjects] = useState(initialProjects);
  const [selected, setSelected] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [previewImg, setPreviewImg] = useState(null);

  const formRef = useRef();

  // Add Project
  function handleAddProject() {
    const pass = prompt("Enter admin password to add a project:");
    if (pass === ADMIN_PASS) setShowAddModal(true);
    else alert("Incorrect password!");
  }

  function submitAddProject(e) {
    e.preventDefault();
    const form = e.target;
    const file = form.img.files[0];
    let imageURL = "";
    if (file) {
      imageURL = URL.createObjectURL(file);
    }
    const newProj = {
      id: projects.length + 1,
      title: form.title.value,
      overview: form.overview.value,
      feature: form.feature.value,
      github: form.github.value,
      stack: form.stack.value,
      img: imageURL,
    };
    setProjects([...projects, newProj]);
    setShowAddModal(false);
    setPreviewImg(null);
    form.reset();
  }

  function handleRemoveProject(id, e) {
    e.stopPropagation();
    const pass = prompt("Enter admin password to remove:");
    if (pass === ADMIN_PASS) setProjects(projects.filter((p) => p.id !== id));
    else alert("Incorrect password!");
  }

  function handlePreviewImage(e) {
    const file = e.target.files[0];
    if (file) setPreviewImg(URL.createObjectURL(file));
  }

  return (
    <main>
      {/* About Section */}
      <section className="section about-section" id="home">
        <div className="container">
          <motion.div
            className="about-card"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="about-left">
              <img src={profileImg} alt="Arunkumar S" className="profile-img" />
            </div>
            <div className="about-right">
              <h1>
                Hi — I'm <span className="name-highlight">Arunkumar S</span>
              </h1>
              <h3>Java Full Stack Developer</h3>
              <div className="moving-text">
                <motion.span initial={{ x: -8, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
                  Course: Java Full Stack (Besant Technologies)
                </motion.span>
                <motion.span initial={{ x: -8, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.6 }}>
                  Graduation: B.Sc Computer Science — 2023 — 78%
                </motion.span>
                <motion.span initial={{ x: -8, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 1.0 }}>
                  Skills: React, Java, SQL, Selenium, Linux
                </motion.span>
              </div>
              <p className="about-detail">
                I build practical applications for small businesses — apps that solve real problems with clean code and fast delivery.
              </p>
              <div className="about-actions">
                <a className="primary-btn" href="#projects">See Projects</a>
                <button className="muted-btn" onClick={() => document.getElementById("collab")?.scrollIntoView({ behavior: "smooth" })}>
                  Let's Collaborate
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="section projects-section" id="projects">
        <div className="container projects-head">
          <h2>Projects</h2>
          <div className="projects-actions">
            <button className="small-btn" onClick={handleAddProject}>Add Project</button>
          </div>
        </div>
        <div className="projects-grid">
          {projects.map((p) => (
            <motion.article
              key={p.id}
              className="project-card"
              whileHover={{ scale: 1.03 }}
              onClick={() => setSelected(p)}
            >
              {p.img && <img src={p.img} alt={p.title} className="project-img" />}
              <h3 className="proj-title">{p.title}</h3>
              <p className="proj-desc">{p.overview}</p>
              <div className="proj-stack">{p.stack}</div>
              <div className="proj-footer">
                <button className="muted-btn" onClick={(e) => handleRemoveProject(p.id, e)}>Remove</button>
                <a className="primary-btn" href={p.github} target="_blank" rel="noopener noreferrer">
                  <FaGithub /> View Code
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Add Project Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="modal-card" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }}>
              <button className="modal-close" onClick={() => setShowAddModal(false)}>✕</button>
              <h3>Add New Project</h3>
              <form onSubmit={submitAddProject} className="collab-form">
                <input name="title" placeholder="Project Title" required />
                <textarea name="overview" rows="2" placeholder="Project Overview" required />
                <input name="feature" placeholder="Project Feature(s)" required />
                <input name="github" placeholder="GitHub Link" required />
                <input name="stack" placeholder="Stack (React, Java...)" required />
                <input type="file" name="img" accept="image/*" onChange={handlePreviewImage} />
                {previewImg && <img src={previewImg} alt="preview" />}
                <button className="primary-btn" type="submit">Add Project</button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Project Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelected(null)}>
            <motion.div className="modal-card" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} onClick={e => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setSelected(null)}>✕</button>
              {selected.img && <img src={selected.img} alt={selected.title} className="project-img" />}
              <h3>{selected.title}</h3>
              <div className="modal-meta"><strong>Stack:</strong> {selected.stack}</div>
              <p className="modal-desc">{selected.overview}</p>
              <div className="modal-meta"><strong>Features:</strong> {selected.feature}</div>
              <div className="modal-actions">
                <a className="primary-btn" href={selected.github} target="_blank" rel="noopener noreferrer"><FaGithub /> View Code</a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
