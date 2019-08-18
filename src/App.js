import React, { Component } from "react";
import logo from "./logo.svg";
import Header from "./components/shared/Header/Header";
import "./App.css";
import Body from "./components/Body";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <p className="App-intro">
          <Body style={{ background: "#efefef" }} />
        </p>
      </div>
    );
  }
}

export default App;
