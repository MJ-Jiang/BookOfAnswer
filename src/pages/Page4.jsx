import './Page4.css';
import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import dialogues from '../assets/dialogues.json';

const Page4 = () => {
  const navigate = useNavigate();
  const chatEndRef = useRef(null);
  const [messages, setMessages] = useState([
    { from: 'system', text: '你有什么问题吗？' }
  ]);
  const [input, setInput] = useState('');

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg = { from: 'user', text: trimmed };
    const nextMessages = [...messages, userMsg];

    const index = Math.floor(Math.random() * dialogues.length);
    const dialogue = dialogues[index];

    const systemMsg = {
      from: 'system',
      text: dialogue.content,
      audio: Number(dialogue.id) >= 67 && Number(dialogue.id) <= 72
        ? null
        : dialogue.id
    };

    setMessages([...nextMessages, systemMsg]);
    setInput('');
  };

  return (
    <div className="page page4">
      <div className="page4-bg"></div>

      {/* 顶部栏 */}
      <div className="header-bar">
        <span className="back-icon" onClick={() => navigate("/")}>←</span>
        <img src="/images/avatar.png" className="chat-avatar" alt="小羊头像" />
        <span className="chat-name">小羊</span>
      </div>

      {/* 聊天记录区 */}
      <div className="chat-frame">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-bubble ${msg.from === 'user' ? 'right' : 'left'}`}
          >
            {msg.from !== 'user' && (
              <img
                src="/images/avatar.png"
                alt="system"
                className="bubble-avatar"
              />
            )}

            <div className="bubble-content">
              {msg.text && <p className="bubble-text">{msg.text}</p>}
              {msg.audio && (
                <audio controls src={`/audio/${msg.audio}.mp4`} className="bubble-audio" />
              )}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* 输入栏 */}
      <div className="input-bar">
        <input
          type="text"
          className="chat-input"
          placeholder="请输入..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSend();
          }}
        />
        <button className="send-button" onClick={handleSend}>发送</button>
      </div>
    </div>
  );
};

export default Page4;
