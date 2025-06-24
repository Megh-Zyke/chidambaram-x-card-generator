import { useState, useRef, useEffect } from "react";
import "../css/IDCard.css";
import QRCodeGenerator from "./QRCodeGenerator";
import html2canvas from "html2canvas";
import Draggable from "react-draggable";
import Xlogo from "../assets/logo.svg";
import { useLocation, useNavigate } from "react-router-dom";

const IDCard = () => {
  const [flipped, setFlipped] = useState(false);
  const cardRef = useRef(null);
  const nodeRef = useRef(null);
  const [showShine, setShowShine] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;

  const [year, month] = data.joined.split("-");
  const formattedDate = new Date(year, month - 1).toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  const rankLabel =
    data.followers < 20
      ? "NEWBIE"
      : data.followers >= 100000
      ? "ULTRABIE"
      : data.followers >= 1000
      ? "HIGHBIE"
      : "LOWBIE";

  if (!data) {
    return (
      <div>
        <h2>No data found</h2>
        <button onClick={() => navigate("/")}>Go Back</button>
      </div>
    );
  }

  useEffect(() => {
    setShowShine(true);
  }, []);

  const handleDownload = async () => {
    const card = nodeRef.current;
    if (!card) return;

    const wasFlipped = flipped;
    const hadShine = showShine;

    setFlipped(false);
    setShowShine(false);

    await new Promise((res) => setTimeout(res, 100));

    const cardWrapper = card.querySelector(".card");
    const back = card.querySelector("#card-back");
    const front = card.querySelector("#card-front");

    // Hide back
    back.style.display = "none";

    // Wait for layout to apply
    await new Promise((res) => setTimeout(res, 50));

    // Capture the full card (which has the border)
    const canvas = await html2canvas(cardWrapper, {
      backgroundColor: null,
      scale: 2,
      useCORS: true,
    });

    // Create and click download link
    const dataURL = canvas.toDataURL("image/png", 1.0);
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "id_card.png";
    link.click();

    // Revert state
    back.style.display = "";
    setFlipped(wasFlipped);
    setShowShine(hadShine);
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
              <div className="user-rank">{rankLabel} ⊛</div>

              <div className="user-details">
                <div className="followers">
                  <div className="heading">FOLLOWERS</div>
                  <div className="followers-count">{data.followers}</div>
                </div>
                <div className="joining-date">
                  <div className="heading">JOINED</div>
                  <div className="date">{formattedDate}</div>
                </div>
              </div>

              <hr className="break-line" />

              <div className="handle">{`@${data.handle}`}</div>
              <div className="name">{data.name}</div>

              <div className="qr-bio">
                <div className="qr-container">
                  <QRCodeGenerator value={data.handle} />
                </div>

                <div className="bio">
                  <div className="about">ABOUT</div>
                  <div className="desc">{data.bio}</div>
                  <div className="website-label">WEBSITE</div>
                  <div className="website">{data.website}</div>
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
