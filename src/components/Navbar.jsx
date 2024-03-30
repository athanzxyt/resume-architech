import React from "react"
import logo from "../assets/logo.png";
import {navItems} from "../constants";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 py-4 backdrop-blur-lg border-b border-neutral-700/80">
      <div className="container px-4 mx-auto relative text-lg">
        <div className="flex justify-between items-center">
          <div className="flex items-center flex-shrink-0">
            <img className="h-10 w-10 mr-2" src={logo} alt="logo"/>
            <span className="span.text-xl.tracking-tight">Resume Architech</span>
          </div>
        </div>
      </div>
    </nav>
  )
};

export default Navbar;
