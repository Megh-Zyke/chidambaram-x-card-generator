import { useState, useRef, useEffect } from "react";
import "../css/IDCard.css";
import html2canvas from "html2canvas";
import Draggable from "react-draggable";
import Xlogo from "../assets/logo.svg";
import QRCode from "../assets/qr.svg";

const IDCard = () => {
  const [flipped, setFlipped] = useState(false);
  const cardRef = useRef(null);
  const nodeRef = useRef(null);
  const [showShine, setShowShine] = useState(false);

  useEffect(() => {
    setShowShine(true);
  }, []);

  const handleDownload = async () => {
    console.log("Button pressed");
    const card = nodeRef.current;
    if (!card) return;

    if (flipped) {
      setFlipped(false);
    }

    // Get front and back sides
    const front = card.querySelector("#card-front");
    const back = card.querySelector("#card-back");

    // Hide back and force-show front
    back.style.display = "none";
    front.style.display = "block";

    // Capture front side
    const canvas = await html2canvas(front, {
      backgroundColor: null,
      scale: 2,
    });

    // Revert visibility
    back.style.display = "";
    front.style.display = "";

    const dataURL = canvas.toDataURL("image/png", 1.0);
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "id_card.png";
    link.click();
  };

  const animationComplete = () => {
    setShowShine(false);

    const card = nodeRef.current;
    if (card) {
      const cardDiv = card.querySelector(".card");
      if (cardDiv) {
        cardDiv.style.overflow = "visible"; // or "initial" if needed
      }
    }
  };

  return (
    <Draggable nodeRef={nodeRef}>
      <div ref={nodeRef} className="card-container">
        <div
          onClick={() => setFlipped(!flipped)}
          className={`card ${flipped ? "flipped" : ""} ${
            showShine ? "shine" : ""
          }`}
          onAnimationEnd={() => animationComplete()}
        >
          {/* FRONT SIDE */}
          <div className={`card-front `} id="card-front">
            <div className="hole"></div>

            <div className="logo">
              <img src={Xlogo} className="logo-img" alt="X logo" />
            </div>

            <div className="user-information">
              <div className="user-rank">HIGHBIE ⊛</div>

              <div className="user-details">
                <div className="followers">
                  <div className="heading">FOLLOWERS</div>
                  <div className="followers-count">14,700</div>
                </div>
                <div className="joining-date">
                  <div className="heading">JOINED</div>
                  <div className="date">OCTOBER 2022</div>
                </div>
              </div>

              <hr className="break-line" />

              <div className="handle">@amritwt</div>
              <div className="name">AMRIT</div>

              <div className="qr-bio">
                <div className="qr-container">
                  <img src={QRCode} className="qr-img" alt="QR code" />
                </div>

                <div className="bio">
                  <div className="about">ABOUT</div>
                  <div className="desc">21, engineer.</div>
                  <div className="website-label">WEBSITE</div>
                  <div className="website">amritwt.me</div>
                </div>
              </div>
            </div>
          </div>

          {/* BACK SIDE */}
          <div className="card-back" id="card-back">
            <div className="hole"></div>
            <div className="logo">
              <img src={Xlogo} className="logo-img" alt="X logo" />
            </div>

            <div className="credits">
              <p>
                Code by <a href="https://x.com/megh3s">@megh3s</a>. Style by{" "}
                <a href="https://x.com/itsss_chidu">@itssss_chidu</a>.{" "}
              </p>
              <p>
                Blame the bugs on the former, admire the beauty from the latter.
              </p>
            </div>
          </div>
        </div>
        <div className="btn">
          <button onClick={handleDownload} className="download-btn">
            Get your Card !
          </button>
        </div>
      </div>
    </Draggable>
  );
};

export default IDCard;
