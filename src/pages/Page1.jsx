
import React, { useEffect,useState } from 'react';
import { useNavigate } from "react-router-dom";
import './Page1.css';

const Page1=() =>{
    const navigate = useNavigate();
    const [showButtons, setShowButtons] = useState(false);
    useEffect(() => {
    document.fonts.ready.then(() => {
      setShowButtons(true);
    });
  }, []);
  //Wait until the page fonts are loaded before continuing.
    return (
        <div className="page1">
            <div className="page1-bg"></div>
            <div className="grid-layout">
                <div className="title-box pixel-font">
                    <h1>答案之书</h1>
                    <h2>向杨而生，超越一切</h2>
                </div>
                <img
                    src="/images/spaceship.png" alt="spaceship" className="spaceship" 
                    />
                </div>

                <img src="/images/star1.png" alt="star1" className="star star1" />
                <img src="/images/star2.png" alt="star2" className="star star2" />
                <img src="/images/star3.png" alt="star3" className="star star3" />
                <img src="/images/star4.png" alt="star4" className="star star4" />
            {showButtons && (<div className="mode-buttons mode-buttons--fixed">
                <div className="mode-button" onClick={() => navigate("/page4")}>对话版</div>
                <div className="mode-button" onClick={() => navigate("/page2")}>答案之书版</div>
            </div>
                )}
                
        </div>

    )

}


export default Page1;