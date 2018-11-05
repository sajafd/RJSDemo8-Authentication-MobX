import React from "react";

const Login = props => {
  return (
    <form class="form-inline">
      <input class="form-control mr-sm-2" type="text" placeholder="Username" />
      <input
        class="form-control mr-sm-2"
        type="password"
        placeholder="Password"
      />
      <button class="btn btn-primary my-2 my-sm-0" type="submit">
        Login
      </button>
    </form>
  );
};

export default Login;
