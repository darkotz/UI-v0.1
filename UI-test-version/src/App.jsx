import React, { useState, useRef, useEffect } from "react";
import { fetchChats, createChat, removeChat } from "./api";
import "./index.css";
import { gsap } from "gsap";
import { themes } from "./themes";
import SeasonalSwitcher from "./SeasonalSwitcher";
import Modal from "./Modal";
const [chats, setChats] = useState([]);

function App() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState("autumn");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chatName, setChatName] = useState("");
  const appRef = useRef(null);
  const [chats, setChats] = useState(["Chat 1", "Chat 2", "Chat 3" ])
  const [message, setMessage] = useState("");
  const textareaRef = useRef(null);
  const [selectedChatIndex, setSelectedChatIndex] = useState(null);
  const [messages, setMessages] = useState({});

const handleInputChange = (e) => {
    setMessage (e.target.value);

    const textarea = textareaRef.current;
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px"
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      console.log("Message sent:", message);
      setMessage("");
      const textarea = textareaRef.current;
      textarea.style.height = "auto";
    }
  }

  useEffect(() => {
    const current = themes[theme] || themes["autumn"];
    gsap.to(appRef.current, {
      backgroundColor: current.background,
      color: current.text,
      duration: 1.2,
      ease: "power2.inOut",
    });
  }, [theme]);

  useEffect(() => {
  let mounted = true;
  async function load() {
    try {
      const data = await fetchChats();
      if (!mounted) return;
      const normalized = data.map((item, idx) =>
        typeof item === "string" ? { id: idx + 1, name: item } : item
      );
      setChats(normalized);
    } catch (err) {
      console.error("Ошибка загрузки чатов:", err);
    }
  }
  load();
  return () => { mounted = false; };
}, []);

 const handleCreateChat = async () => {
  if (chatName.trim() === "") return;

  try {
    const created = await createChat(chatName.trim());
    // Если backend возвращает объект { id, name } — добавим его,
    // если возвращает просто имя — добавляем нормализованный объект
    const chatObj = created && created.id ? created : { id: Date.now(), name: created.name || chatName.trim() };
    setChats(prev => [...prev, chatObj]);
  } catch (err) {
    console.error("Ошибка при создании чата:", err);
  }

  setIsModalOpen(false);
  setChatName("");
};

const handleDeleteChat = async (indexToDelete) => {
  const chatToDelete = chats[indexToDelete];
  if (!chatToDelete) return;

  // если у объекта есть id — используем его, иначе — индекс
  const id = chatToDelete.id;
  try {
    if (id !== undefined) {
      await removeChat(id);
    } else {
      // если бэкенд не поддерживает id — можно отправить имя (вариант fallback)
      await removeChat(chatToDelete.name);
    }
    setChats(prev => prev.filter((_, i) => i !== indexToDelete));
  } catch (err) {
    console.error("Ошибка при удалении чата:", err);
  }
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
              {chats.map((chat, index) => (
                
  <ul
    key={index}
    className="sideBarChatName"
    onClick={() => setSelectedChatIndex(index)}
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      cursor: "pointer",
      backgroundColor: selectedChatIndex === index ? "#434343ff" : "transparent",
      padding: "6px 8px",
      borderRadius: "8px",
    }}
  >
    <span>{chat.name || chat}</span>
    <button
      onClick={(e) => {
        e.stopPropagation(); 
        handleDeleteChat(index);
      }}
      style={{
        background: "none",
        border: "none",
        color: "red",
        cursor: "pointer",
      }}
    >
      ❌
    </button>
  </ul>
))}

              
            <button
                    onClick={() => setIsModalOpen(true)}
                    className="newChatBtn"
                  >
                    Make a new chat
                  </button>
                
            </nav>
          )}
        </aside>

        <header className="header">
          <SeasonalSwitcher onThemeChange={setTheme} />
        </header>

        <main className="main">
          <div className="input-box">
            <textarea placeholder="Ask anything..." type="text" value={message} onChange={handleInputChange} onKeyDown={handleKeyDown} rows={1} ref={textareaRef}/>
          </div>
        </main>

        <footer className="footer"></footer>

        {/* modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
  <h2
    style={{
      fontSize: '1.25rem',
      fontWeight: '600',
      marginBottom: '1rem',
    }}
  >
    Make a new chat
  </h2>

  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
    <input
      type="text"
      placeholder="Chat name"
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
      Ok
    </button>
  </div>
</Modal>
      </div>

      

    </>
  );
}

export default App;
