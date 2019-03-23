import React, { Component } from 'react';
import logo from './logo.svg';
import Header from './components/Header'
import './App.css';
import Body from './components/Body';


class App extends Component {
  render() {
    return (
      
        <div className="App">
          <header >
            <Header/>
          </header >
          <p className="App-intro">
            <Body style={{background:"#efefef"}}/>
          </p>
        </div>
    );
  }
}

export default App;
