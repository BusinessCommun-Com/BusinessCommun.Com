import React from "react";
import "./Home.css";
import SlideShow from "../../Component/SlideShow/SlideShow";
import icon2 from "../../assets/UI_Images/icon2.jpg";
import Compnies_listing from "../Companies_listing/Compnies_listing";
import Footer from "../../Component/Footer/Footer";

export default function Home() {
  return (
    <>
      <SlideShow />
      <div>
        <Compnies_listing />
      </div>
      <Footer />
    </>
  );
}
