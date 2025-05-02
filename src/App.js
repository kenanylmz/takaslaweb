import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Profile from "./pages/Profile";
import ProfileEditPage from "./pages/ProfileEditPage";
import ListingPage from "./pages/ListingPage";
import MyListingsPage from "./pages/MyListingsPage";
import EditListingPage from "./pages/EditListingPage";
import HowItWorksPage from "./pages/HowItWorksPage";
import AboutUsPage from "./pages/AboutUsPage";
import ExplorePage from "./pages/ExplorePage";
import ListingDetailPage from "./pages/ListingDetailPage";
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
        <Route path="/ilan-ekle" element={<ListingPage />} />
        <Route path="/ilanlarim" element={<MyListingsPage />} />
        <Route path="/ilan-duzenle/:id" element={<EditListingPage />} />
        <Route path="/nasil-calisir" element={<HowItWorksPage />} />
        <Route path="/hakkimizda" element={<AboutUsPage />} />
        <Route path="/kesfet" element={<ExplorePage />} />
        <Route path="/listings/:id" element={<ListingDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
