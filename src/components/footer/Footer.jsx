import React from "react";
import { FaLinkedinIn, FaTwitter, FaFacebook, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container-fluid pb-4 pt-4 padding">
        <div className="container padding">
          <footer className="footer">
            <p className="footer_title">
              CopyRights &copy; <span>Ramy Ibrahim</span>
            </p>
            <div className="social_icons">
              <a href="#">
                <FaLinkedinIn />
              </a>
              <a href="#">
                <FaTwitter />
              </a>
              <a href="#">
                <FaFacebook />
              </a>
              <a href="#">
                <FaYoutube />
              </a>
            </div>
          </footer>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
