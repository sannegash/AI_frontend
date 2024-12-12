import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-10">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} FuturisticApp. All rights reserved.
        </p>
        <div className="flex justify-center mt-4 space-x-4">
          <a
            href="#"
            className="text-gray-400 hover:text-white transition"
            aria-label="Facebook"
          >
            <i className="fab fa-facebook-f"></i> {/* Add a font-awesome icon or similar */}
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-white transition"
            aria-label="Twitter"
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-white transition"
            aria-label="Instagram"
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-white transition"
            aria-label="LinkedIn"
          >
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>
        <div className="text-gray-500 text-xs mt-2">
          Designed and Developed with ❤️ by YourName.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
