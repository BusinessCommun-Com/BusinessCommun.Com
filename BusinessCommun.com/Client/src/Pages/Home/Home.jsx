import React, { useEffect } from "react";
import { useAuth } from "../../Providers/AuthProvider";
import "./Home.css";
import SlideShow from "../../Component/SlideShow/SlideShow";
import icon2 from "../../assets/UI_Images/icon2.jpg";
import Compnies_listing from "../Companies_listing/Compnies_listing";
import Footer from "../../Component/Footer/Footer";
import Navbar from "../../Component/Navbar/Navbar";
import { Outlet } from "react-router-dom";

export default function Home() {
  //for testing purpose remove it later
  //=======================================
  const { user } = useAuth();

  // Helper to decode JWT without external library
  const parseJwt = (token) => {
    try {
      if (!token) return null;
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);
    } catch (e) {
      return null;
    }
  };

  useEffect(() => {
    console.log("=== TOKEN ROLE CHECK ===");
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = parseJwt(token);
      console.log("Decoded Token:", decoded);
      console.log("User Role:", decoded?.role);
    } else {
      console.log("No token found");
    }
  }, [user]); // Re-run if user context changes (which might imply login/logout)
  //================================================

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '70px' }}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
