import "./index.css";
import { useState } from "react";

function App() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {" "}
      <div className="grid-container">
        <aside className={`sidebar ${open ? "expanded" : ""}`}>
          <button className="menu-btn" onClick={() => setOpen(!open)}>
            ☰
          </button>
          {open && (
            <nav className="menu">
              <a href="#">Main</a>
              <a href="#">Profile</a>
              <a href="#">Settings</a>
            </nav>
          )}
        </aside>
        <header className="header">Header</header>
        <main className="main">
          <div className="input-box">
            <textarea type="text" />
          </div>
        </main>
        <footer className="footer">123</footer>
      </div>
    </>
  );
}

export default App;
