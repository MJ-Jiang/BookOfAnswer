import './Page4.css';
import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import dialogues from '../assets/dialogues.json';

const Page4 = () => {
  const navigate = useNavigate();
  const chatFrameRef = useRef(null);
  const [messages, setMessages] = useState([{ from: 'system', text: '我在。' }]);
  const [input, setInput] = useState('');

  // 增强版滚动逻辑
  const scrollToBottom = (instant = false) => {
    if (!chatFrameRef.current) return;
    
    const scrollOptions = {
      top: chatFrameRef.current.scrollHeight,
      behavior: instant ? 'auto' : 'smooth'
    };

    // 优先使用scrollTo，fallback到scrollTop
    if (chatFrameRef.current.scrollTo) {
      chatFrameRef.current.scrollTo(scrollOptions);
    } else {
      chatFrameRef.current.scrollTop = scrollOptions.top;
    }
  };

  // 消息更新时滚动到底部
  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToBottom(true); // 首次立即滚动
      setTimeout(() => scrollToBottom(), 100); // 二次平滑滚动
    }, 0);
    return () => clearTimeout(timer);
  }, [messages]);

  // 增强版iOS键盘处理
  useEffect(() => {
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (!isIOS) return;

    let originalHeight = window.innerHeight;
    let keyboardVisible = false;

    const handleFocus = () => {
      document.body.style.height = 'auto';
    };

    const handleBlur = () => {
      restoreLayout();
    };

    const handleResize = () => {
      const newHeight = window.innerHeight;
      const isKeyboardShowing = newHeight < originalHeight * 0.8;
      
      if (isKeyboardShowing && !keyboardVisible) {
        keyboardVisible = true;
      } else if (!isKeyboardShowing && keyboardVisible) {
        keyboardVisible = false;
        restoreLayout();
      }
    };

    const restoreLayout = () => {
      requestAnimationFrame(() => {
        document.body.style.height = `${originalHeight}px`;
        window.scrollTo(0, 0);
        setTimeout(scrollToBottom, 300);
      });
    };

    window.addEventListener('focusin', handleFocus);
    window.addEventListener('focusout', handleBlur);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('focusin', handleFocus);
      window.removeEventListener('focusout', handleBlur);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    // 处理输入框失焦
    const activeElement = document.activeElement;
    if (activeElement?.blur) activeElement.blur();
    if (activeElement?.nodeName === 'INPUT') {
      setTimeout(() => window.scrollTo(0, 0), 100);
    }

    // 更新消息
    const userMsg = { from: 'user', text: trimmed };
    const nextMessages = [...messages, userMsg];

    const index = Math.floor(Math.random() * dialogues.length);
    const dialogue = dialogues[index];

    const systemMsg = {
      from: 'system',
      text: dialogue.content,
      source: dialogue.source,
      audio: Number(dialogue.id) >= 67 && Number(dialogue.id) <= 72 ? null : dialogue.id
    };

    setMessages([...nextMessages, systemMsg]);
    setInput('');
  };

  return (
    <div className="page page4">
      <div className="page4-bg"></div>

      <div className="header-bar">
        <img src="/images/back.png" alt="back" className="back-icon" onClick={() => navigate("/")} />
        <img src="/images/avatar.png" className="chat-avatar" alt="ycy-icon" />
        <span className="chat-name">小羊</span>
      </div>

      <div className="chat-frame" ref={chatFrameRef}>
        {messages.map((msg, index) => (
          <div key={index} className={`chat-bubble ${msg.from === 'user' ? 'right' : 'left'}`}>
            {msg.from !== 'user' && <img src="/images/avatar.png" alt="system" className="bubble-avatar" />}
            <div className="bubble-content">
              {msg.text && (
                <>
                  <p className="bubble-text">{msg.text}</p>
                  {msg.source && <p className="bubble-source">-- {msg.source}</p>}
                </>
              )}
              {msg.audio && (
                <audio controls controlsList="nodownload" src={`/audio/${msg.audio}.mp4`} className="bubble-audio" />
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="input-bar">
        <div className="input-container">
          <input
            type="text"
            className="chat-input"
            placeholder="请输入..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button className="send-button" onClick={handleSend}>发送</button>
        </div>
      </div>
    </div>
  );
};

export default Page4;