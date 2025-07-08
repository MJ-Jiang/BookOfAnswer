import './Page3.css';
import { useNavigate } from 'react-router-dom';
import { useMemo, useRef } from 'react';
import dialogues from '../assets/dialogues.json';

const Page3 = () => {
  const navigate = useNavigate();

  // 上一次使用的 index
  const previousIndex = useRef(-1);

  // 抽一个不重复的 index
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
      <div className="page3-bg"></div>

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
          <audio controls src={`/audio/${randomDialogue.id}.mp4`} />
        </div>
      )}
    </div>
  </div>
</div>


      <div className="mode-buttons">
        <div className="mode-button" onClick={() => navigate("/page2")}>
          再问一次
        </div>
        <div className="mode-button" onClick={() => navigate("/")}>
          回到首页
        </div>
      </div>
    </div>
  );
};

export default Page3;
