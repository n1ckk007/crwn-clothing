import React from "react";
import { ReactComponent as Bighead } from "../../assets/bighead.svg";
import "./ContactPage.scss";

export default function ContactPage() {
  return (
    <div>
      <h1>Contact Us</h1>
      <div className="contact">
        <div className="bh-container">
          <Bighead />
        </div>
        <div className="text">
          <h2>Nick Antonellos</h2>
          <h3>antonellos101@gmail.com</h3>
        </div>
      </div>
    </div>
  );
}
