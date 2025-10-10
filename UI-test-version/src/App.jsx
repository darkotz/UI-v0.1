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
        <h2 className="text-xl font-semibold mb-4">Создать новый чат</h2>

        <div className="space-y-3">
          <input
            type="text"
            placeholder="Название чата"
            value={chatName}
            onChange={(e) => setChatName(e.target.value)}
            className="w-full border p-2 rounded-lg"
          />

          <button
            onClick={handleCreateChat}
            className="bg-green-600 text-white px-4 py-2 rounded-lg w-full hover:bg-green-700 transition"
          >
            Создать
          </button>
        </div>
      </Modal>
    </>
  );
}

export default App;
