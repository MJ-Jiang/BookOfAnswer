import './Page4.css';
import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import dialogues from '../assets/dialogues.json';
import CustomAudioPlayer from '../components/CustomAudioPlayer'; 
const Page4 = () => {
  const navigate = useNavigate();
  const chatFrameRef = useRef(null);
   /*chatFrameRef is a React ref that references the .chat-frame DOM element*/
  const [messages, setMessages] = useState([{ from: 'system', text: '我在。' }]);
  const [input, setInput] = useState('');

  const scrollToBottom = (instant = false) => {
    /*Receives a parameter instant (the default value is false) to control whether to scroll smoothly*/
    if (!chatFrameRef.current) return;
    /*If chatFrameRef.current is null, it means it has not been loaded yet, return directly without scrolling*/
    const scrollOptions = {
      top: chatFrameRef.current.scrollHeight,  /*Total height of content*/
      behavior: instant ? 'auto' : 'smooth'
     /* 'auto' (instant scrolling) 'smooth', means smooth scrolling to the bottom*/
    };

    if (chatFrameRef.current.scrollTo) {
      chatFrameRef.current.scrollTo(scrollOptions);
      /*Check if the browser supports scrollTo(options), then use the scrollTo({ top, behavior }) method to scroll to the bottom, which supports smooth effects.*/
    } else {
      chatFrameRef.current.scrollTop = scrollOptions.top;
      /*Directly set .scrollTop to the maximum value, and instantly jump to the bottom*/
    }
  };
//initially scroll to the top of the page when the component mounts
  useEffect(() => {
    if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
     window.scrollTo(0, 0); 
    }
  }, []);
 /*Force the page to scroll to the top to fix the problem of some iOS pages being offset after loading*/
  useEffect(() => {
    const chatFrame = chatFrameRef.current;
    if (!chatFrame || !window.visualViewport) return;

    const isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent);

    if (!isIOS) return;

    const updatePadding = () => {
      const keyboardHeight = window.innerHeight - window.visualViewport.height;
      const visiblePadding = Math.max(0, keyboardHeight || 0);
      chatFrame.style.paddingBottom = `calc(3vh + env(safe-area-inset-bottom) + ${visiblePadding}px)`;
    };

    window.visualViewport.addEventListener("resize", updatePadding);
    window.addEventListener("resize", updatePadding);
    updatePadding(); // 初始执行

    return () => {
      window.visualViewport.removeEventListener("resize", updatePadding);
      window.removeEventListener("resize", updatePadding);
    };
  }, []);

/*After each message is updated, scroll to the bottom twice asynchronously (one instant, one smooth) to ensure that the chat box can reliably scroll to the bottom
 in various browsers to avoid problems such as content being blocked or incomplete scrolling.*/
  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToBottom(true); 
      setTimeout(() => scrollToBottom(), 100);  /*Delay 100 milliseconds for smooth scrolling*/
    }, 0);
    return () => clearTimeout(timer);/*Clear the last setTimeout to prevent conflicts or memory leaks caused by multiple executions*/
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
      source: dialogue.source,
      audio: Number(dialogue.id) >= 67 && Number(dialogue.id) <= 72 ? null : dialogue.id
    };

    setMessages([...nextMessages, systemMsg]);
    setInput('');
  
    setTimeout(() => {
      window.scrollTo(0, 0);
      scrollToBottom(true);
    }, 500);
  
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
                <div className="audio-box">
                <CustomAudioPlayer src={`/audio/${msg.audio}.m4a`} />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="input-bar">
        <div className="input-container">
          <input
            type="text"
            inputmode="text"
            className="chat-input"
            placeholder="请输入..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button type="button" className="send-button" onClick={handleSend}>发送</button>
        </div>
      </div>
    </div>
  );
};

export default Page4;