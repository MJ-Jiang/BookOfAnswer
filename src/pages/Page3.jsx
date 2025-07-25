import './Page3.css';
import { useNavigate } from 'react-router-dom';
import { useMemo, useRef,useEffect,useState } from 'react';
import dialogues from '../assets/dialogues.json';
import CustomAudioPlayer from '../components/CustomAudioPlayer'; 
import Header from "../components/Header"; 
const Page3 = () => {
  const navigate = useNavigate()
  const previousIndex = useRef(-1);
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
  document.fonts.ready.then(() => {
    setShowButtons(true);  
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
/*Remember a certain "calculation result" and recalculate it only when the dependency changes, otherwise reuse the last result.*/
  const hideAudio = Number(randomDialogue.id) >= 67 && Number(randomDialogue.id) <= 72;

  return (
      <div className="page page3">
        {/* Background of universe */}
        <Header />
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
                <CustomAudioPlayer src={`/audio/${randomDialogue.id}.m4a`} />
                </div>
            )}
          </div>
        </div>
      </div>

      {showButtons && (
        <div className="mode-buttons mode-buttons--flow">
          <div className="mode-button " onClick={() => navigate("/page2")}>
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
