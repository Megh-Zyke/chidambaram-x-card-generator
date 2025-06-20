import { useNavigate } from "react-router-dom";
import { useState } from "react";
import RotatingCard from "./RotatingCard";
import "../css/LandingPage.css";
import Logo from "../assets/logo.svg";

const LandingPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    handle: "",
    followers: "",
    joined: "",
    bio: "",
    website: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/card", { state: formData });
  };

  return (
    <div className="landing-page">
      <div className="left-section">
        <div className="landing-page-title">
          <img src={Logo} alt="Logo" className="xlogo" />
          <h1 className="title">Digital ID Generator</h1>
        </div>

        <RotatingCard />
        <p className="subtitle">Create elegant profile cards in seconds.</p>
      </div>

      <div className="right-section">
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="handle"
            placeholder="@handle"
            value={formData.handle}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="followers"
            placeholder="Followers"
            value={formData.followers}
            onChange={handleChange}
            required
          />
          <input
            type="month"
            name="joined"
            value={formData.joined}
            onChange={handleChange}
            required
          />
          <textarea
            name="bio"
            placeholder="Bio"
            value={formData.bio}
            onChange={handleChange}
            rows={3}
            required
          />
          <input
            type="text"
            name="website"
            placeholder="Website"
            value={formData.website}
            onChange={handleChange}
            required
          />
          <button type="submit">Generate Card</button>
        </form>
      </div>
    </div>
  );
};

export default LandingPage;
