import IDCard from "./components/IdCard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";

import "./index.css";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/card" element={<IDCard />} />
      </Routes>
    </Router>
  );
}

export default App;
