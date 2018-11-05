import React from "react";
import { Link } from "react-router-dom";

const Login = props => {
  return (
    <form className="form-inline">
      <input
        className="form-control mr-sm-2"
        type="text"
        placeholder="Username"
      />
      <input
        className="form-control mr-sm-2"
        type="password"
        placeholder="Password"
      />
      <button className="btn btn-primary my-2 my-sm-0 mr-2" type="submit">
        Login
      </button>
      <Link to="/signup" className="btn btn-success my-2 my-sm-0">
        Signup
      </Link>
    </form>
  );
};

export default Login;
