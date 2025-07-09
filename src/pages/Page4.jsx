import './Page4.css';
import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import dialogues from '../assets/dialogues.json';

const Page4 = () => {
  const navigate = useNavigate();
  const chatEndRef = useRef(null);
  const [messages, setMessages] = useState([
    { from: 'system', text: '我在。' }
  ]);
  const [input, setInput] = useState('');

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
/*Define a function called scrollToBottom to automatically scroll the page to the bottom.*/
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  /*When the message variable (usually the chat history) changes, execute scrollToBottom() once.
*/
  const handleSend = () => {
    const trimmed = input.trim();
    /*    Remove all spaces, line breaks, tabs, and other "whitespace characters" at the beginning and end of a string
*/
    if (!trimmed) return;

    const userMsg = { from: 'user', text: trimmed };
    const nextMessages = [...messages, userMsg];

    const index = Math.floor(Math.random() * dialogues.length);
    const dialogue = dialogues[index];

    const systemMsg = {
      from: 'system',
      text: dialogue.content,
      source: dialogue.source,
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

      <div className="header-bar">
        <img src="/images/back.png" alt="back" className="back-icon" onClick={() => navigate("/")}/>
        <img src="/images/avatar.png" className="chat-avatar" alt="小羊头像" />
        <span className="chat-name">小羊</span>
      </div>


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
                  {msg.text && (
                       <>
                  <p className="bubble-text">{msg.text}</p>
                      {msg.source && <p className="bubble-source">-- {msg.source}</p>}
                    </>
                    )}
                {msg.audio && (
                    <audio controls src={`/audio/${msg.audio}.mp4`} className="bubble-audio" />
                  )}
              </div>

          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <div className="input-bar">
          <div className="input-container">
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

    </div>
  );
};

export default Page4;
