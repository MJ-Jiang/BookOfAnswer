import './Page3.css';
import { useNavigate } from 'react-router-dom';
import { useMemo, useRef,useEffect,useState } from 'react';
import dialogues from '../assets/dialogues.json';

const Page3 = () => {
  const navigate = useNavigate()
  const previousIndex = useRef(-1);
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
  document.fonts.ready.then(() => {
    setShowButtons(true);  // 字体加载完成后再显示按钮
  });
}, []);

  const randomDialogue = useMemo(() => {
    let index;
    do {
      index = Math.floor(Math.random() * dialogues.length);
    } while (index === previousIndex.current);
    previousIndex.current = index;
    return dialogues[index];
  }, []);

  const hideAudio =
    Number(randomDialogue.id) >= 67 && Number(randomDialogue.id) <= 72;
  return (
    <div className="page page3">
      {/* Background of universe */}
      <h1 className="header pixel-font">答案之书</h1>
      <div className="main-frame">
        <div className="top-frame">
          <div className="dialog-content">
              <p className="top-text">{randomDialogue.content}</p>
              <div className="footer-box">
                <span className="source-text">--{randomDialogue.source}</span>
                <img
                    src="/images/avatar.png"
                    alt="ycy"
                    className="avatar-inline"
                />
              </div>

            {!hideAudio && (
            <div className="audio-box">
                <audio controls controlsList="nodownload" src={`/audio/${randomDialogue.id}.mp4`} />
            </div>
            )}
          </div>
        </div>
      </div>

      {showButtons && (
        <div className="mode-buttons">
          <div className="mode-button" onClick={() => navigate("/page2")}>
            再问一次
          </div>
          <div className="mode-button" onClick={() => navigate("/")}>
            回到首页
          </div>
        </div>
      )}
    </div>
  );
};

export default Page3;
