import React, { useState, useRef, useEffect } from "react";
import "./index.css";
import { gsap } from "gsap";
import { themes } from "./themes";
import SeasonalSwitcher from "./SeasonalSwitcher";

function App() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState("autumn");
  const appRef = useRef(null);

  useEffect(() => {
    const current = themes[theme];
    gsap.to(appRef.current, {
      backgroundColor: current.background,
      color: current.text,
      duration: 1.2,
      ease: "power2.inOut",
    });
  }, [theme]);

  return (
    <>
      <div ref={appRef} className="grid-container">
        <aside className={`sidebar ${open ? "expanded" : ""}`}>
          <button className="menu-btn" onClick={() => setOpen(!open)}>
            ☰
          </button>
          {open && (
            <nav className="menu">
              <li className="chatList">
                <ul className="sideBarChatName">Chat 1</ul>
                <ul className="sideBarChatName">Chat 2</ul>
                <ul className="sideBarChatName">Chat 3</ul>
              </li>
            </nav>
          )}
        </aside>
        <header className="header">
          <SeasonalSwitcher onThemeChange={setTheme} />
        </header>
        <main className="main">
          <div className="input-box">
            <textarea placeholder="Ask anything..." type="text" />
          </div>
        </main>
        <footer className="footer"></footer>
      </div>
    </>
  );
}

export default App;
