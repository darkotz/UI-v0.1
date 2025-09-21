import "./index.css";
import { useState } from "react";
import SendSymbol from "../public/direct.png"

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
              <li className="chatList">
                <ul className="sideBarChatName">Chat 1</ul>
                <ul className="sideBarChatName">Chat 2</ul>
                <ul className="sideBarChatName">Chat 3</ul>
              </li>
            </nav>
          )}
        </aside>
        <header className="header">Header</header>
        <main className="main">
          <div className="input-box">
            <textarea placeholder="Ask anything..." type="text" />
            <button className="send-button">
              <img src={SendSymbol} alt="" className="SendSymbol" />
            </button>
          </div>
        </main>
        <footer className="footer">123</footer>
      </div>
    </>
  );
}

export default App;
