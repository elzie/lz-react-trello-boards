import React from 'react';
import logo from './logo.svg';
import './App.css';

// Components
import Board from './components/Board';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Board />
        <img src={logo} className="App-logo" alt="logo" />
        <p>I am getting awesome at React!</p>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
