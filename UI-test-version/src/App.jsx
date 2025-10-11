import React, { useState, useRef, useEffect } from "react";
import "./index.css";
import { gsap } from "gsap";
import { themes } from "./themes";
import SeasonalSwitcher from "./SeasonalSwitcher";
import Modal from "./Modal";

function App() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState("autumn");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chatName, setChatName] = useState("");
  const appRef = useRef(null);

  useEffect(() => {
    const current = themes[theme] || themes["autumn"];
    gsap.to(appRef.current, {
      backgroundColor: current.background,
      color: current.text,
      duration: 1.2,
      ease: "power2.inOut",
    });
  }, [theme]);

  const handleCreateChat = () => {
    console.log("Создан новый чат:", { chatName, theme });
    setIsModalOpen(false);
    setChatName("");
  };

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
                <ul>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    style={{ color: "grey" }}
                  >
                    Создать новый чат
                  </button>
                </ul>
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

      {/* МОДАЛКА */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
  <h2
    style={{
      fontSize: '1.25rem',
      fontWeight: '600',
      marginBottom: '1rem',
    }}
  >
    Создать новый чат
  </h2>

  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
    <input
      type="text"
      placeholder="Название чата"
      value={chatName}
      onChange={(e) => setChatName(e.target.value)}
      style={{
        width: '100%',
        border: '1px solid #ccc',
        padding: '0.5rem 0.75rem',
        borderRadius: '8px',
        fontSize: '1rem',
      }}
    />

    <button
      onClick={handleCreateChat}
      style={{
        backgroundColor: '#16a34a',
        color: '#fff',
        padding: '0.5rem 1rem',
        borderRadius: '8px',
        width: '100%',
        border: 'none',
        fontSize: '1rem',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
      }}
      onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#15803d')}
      onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#16a34a')}
    >
      Создать
    </button>
  </div>
</Modal>

    </>
  );
}

export default App;
