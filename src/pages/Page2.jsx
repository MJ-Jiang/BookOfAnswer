import { useNavigate } from "react-router-dom";
import './Page2.css';
const Page2 =() =>{
    const navigate = useNavigate();
    
    return(
        <div className="page page2">
            <div className="page2-bg bg-animated bg-speed-slow"></div>
            <h1 className="header pixel-font" >答案之书</h1>
            <div className="main-frame pixel-font">
                <div className="top-frame">
                    <p className="top-text">
                        心中默念你的问题，<br />
                        跟随内心的引导
                    </p>
                </div>
            </div>
              <div className="bottom-frame pixel-font " onClick={()=> navigate("/page3")}>
                    <img src="/images/ycy.png" alt="ycy" className="ycy-icon" />
                    <p>超越对你说</p>
                
                </div>
        </div>
    )

}
export default Page2;