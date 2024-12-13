import React from "react";
import { FaFacebookF, FaYoutube, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { SiTiktok } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-800 text-white py-6 fixed bottom-0">
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Company Name on the Bottom Left */}
        <p className="text-sm font-medium">
          © {new Date().getFullYear()} Awash Insurance. All rights reserved.
        </p>

        {/* Social Media Icons on the Bottom Right */}
        <div className="flex space-x-4">
          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition"
          >
            <SiTiktok size={20} />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition"
          >
            <FaYoutube size={20} />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition"
          >
            <FaFacebookF size={20} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition"
          >
            <FaInstagram size={20} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition"
          >
            <FaLinkedinIn size={20} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition"
          >
            <FaTwitter size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
