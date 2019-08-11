import React from 'react';
import logo from './dice.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Pokus o prvú aplikáciu úpravou <code>src/App.js</code> a <code>src/App.css</code>.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ďalšie informácie k React...
        </a>
      </header>
    </div>
  );
}

export default App;
