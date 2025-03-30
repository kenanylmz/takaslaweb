import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Profile from "./pages/Profile";
import ProfileEditPage from "./pages/ProfileEditPage";
import HowItWorksPage from "./pages/HowItWorksPage";
import AboutUsPage from "./pages/AboutUsPage";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/giris" element={<LoginPage />} />
        <Route path="/kayit" element={<RegisterPage />} />
        <Route path="/profil" element={<Profile />} />
        <Route path="/profil-duzenle" element={<ProfileEditPage />} />
        <Route path="/nasil-calisir" element={<HowItWorksPage />} />
        <Route path="/hakkimizda" element={<AboutUsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
