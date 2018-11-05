import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// Components
import Home from "./Home";
import Navbar from "./Navbar";
import Signup from "./Signup";

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="container-fluid">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/signup" component={Signup} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
