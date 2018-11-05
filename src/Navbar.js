import React from "react";

// Components
import Login from "./Login";

const Navbar = props => {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <a className="navbar-brand" href="#">
        Navbar
      </a>
      <Login />
    </nav>
  );
};

export default Navbar;
