import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Main from "./components/Main";


export default function App() {
  const [dark, setDark] = useState(
    localStorage.getItem("darkMode") === "true" || true
  );

  const toggleDark = () => {
    setDark(!dark);
    localStorage.setItem("darkMode", !dark);
  };

  return (
    <div className={`site ${dark ? "dark" : "light"}`}>
      <Navbar dark={dark} toggleDark={toggleDark} />
      <Main dark={dark} />
      <footer className="footer">
        &copy; {new Date().getFullYear()} Arunkumar S — All Rights Reserved
      </footer>
    </div>
  );
}
