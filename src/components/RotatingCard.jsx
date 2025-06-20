import React from "react";
import "../css/RotatingCard.css";
import logo from "../assets/logo.svg";
import pfp from "../assets/chiddu-pfp.jpg";

const RotatingCard = () => {
  return (
    <div className="flip-card-container">
      <div className="flip-card">
        <div className="flip-card-front">
          <div className="x-logo">
            <img src={logo} alt="" />
          </div>
          <div className="caption">Get your custom X Card</div>
        </div>
        <div className="flip-card-back">
          <div className="user-logo">
            <img src={pfp} alt="" />
          </div>
          <div className="chidu-name">@itssss_chidu</div>
        </div>
      </div>
    </div>
  );
};
export default RotatingCard;
