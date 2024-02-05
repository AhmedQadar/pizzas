import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <div style={iconContainer}>
        <a
          href="https://www.facebook.com/yourcompany"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faFacebook} style={iconStyle("#1877F2")} />
        </a>
        <a
          href="https://www.twitter.com/yourcompany"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faTwitter} style={iconStyle("#1DA1F2")} />
        </a>
        <a
          href="https://www.instagram.com/yourcompany"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faInstagram} style={iconStyle("#E1306C")} />
        </a>
        <a
          href="https://api.whatsapp.com/send?phone=1234567890"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faWhatsapp} style={iconStyle("#25D366")} />
        </a>
      </div>
      <p>
        © {new Date().getFullYear()} Pizza Restaurants. All rights reserved.
      </p>
    </footer>
  );
};

const footerStyle = {
  backgroundColor: "#D7BDE2",
  textAlign: "center",
  padding: "10px",
  marginTop: "20px",
};

const iconContainer = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const iconStyle = (color) => ({
  fontSize: "24px",
  color: color,
  margin: "0 5px",
});

export default Footer;