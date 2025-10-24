import React, { useState } from "react";
import { FaInstagram, FaLinkedin, FaGithub, FaMoon, FaSun, FaBars, FaTimes } from "react-icons/fa";

export default function Navbar({ dark, toggleDark }) {
  const [followOpen, setFollowOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-inner">
        {/* Logo */}
        <div className="logo">
          Arun <span className="logo-last">Portfolio</span>
        </div>

        {/* Hamburger for mobile */}
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </div>

        {/* Nav Links */}
        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <a className="nav-link" href="#home" onClick={() => setMenuOpen(false)}>Home</a>
          <a className="nav-link" href="#projects" onClick={() => setMenuOpen(false)}>Projects</a>
          <a className="nav-link" href="#collab" onClick={() => setMenuOpen(false)}>Contact</a>
        </div>

        {/* Right: Follow + Dark toggle */}
        <div className="nav-right">
          <div className="follow-wrapper">
            <button className="follow-btn" onClick={() => setFollowOpen(!followOpen)}>Follow Me</button>
            {followOpen && (
              <div className="follow-pop">
                <a href="https://instagram.com/" target="_blank">Instagram</a>
                <a href="https://linkedin.com/" target="_blank">LinkedIn</a>
                <a href="https://github.com/" target="_blank">GitHub</a>
              </div>
            )}
          </div>
          <button className="theme-toggle" onClick={toggleDark}>
            {dark ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      </div>
    </nav>
  );
}
