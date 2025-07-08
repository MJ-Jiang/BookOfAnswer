import { use, useEffect } from "react";  
import { useNavigate } from "react-router-dom";
import './Page1.css';

const Page1=() =>{
    const navigate = useNavigate();
    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         navigate("/page2");
    //     }, 3000); // Redirect after 3 seconds

    //     return () => clearTimeout(timer); // Cleanup the timer on unmount
    // }, [navigate]);
    return (
        <div className="page page1">
            {/* Background of universe */}
            <div className="page1-bg"></div>

            <div className="grid-layout">
                <div className="title-box pixel-font" >
                    <h1>答案之书</h1>
                    <h2>向杨而生，超越一切</h2>
                </div>
                <img 
                src="/images/spaceship.png"
                alt="spaceship"
                className="spaceship"
                onClick={()=> navigate("/page2")} // Navigate to page2 on click
            />

            </div>
            

            

            {/* stars */}
            <img src= "/images/star1.png" alt="star1" className="star star1" />
            <img src= "/images/star2.png" alt="star2" className="star star2" />
            <img src= "/images/star3.png" alt="star3" className="star star3" />
        </div>
    )

}


export default Page1;