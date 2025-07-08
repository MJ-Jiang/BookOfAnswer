import { useNavigate } from "react-router-dom";
import './Page2.css';
const Page2 =() =>{
    const navigate = useNavigate();
    
    return(
        <div className="page page2">
            {/* Background of universe */}
            <div className="page2-bg"></div>

            <h1 className="header pixel-font" >答案之书</h1>

            <div className="main-frame">
                <div className="top-frame">
                    <p className="top-text">
                        心中默念你的问题，<br />
                        跟随内心的引导
                    </p>
                </div>
            </div>
              <div className="bottom-frame" onClick={()=> navigate("/page3")}>
                    <img src="/images/ycy.png" alt="ycy" className="ycy-icon" />
                    <p>超越对你说</p>
                    <img src="/images/send.png" alt="send" className="send-icon" />
                </div>
        </div>
    )

}
export default Page2;