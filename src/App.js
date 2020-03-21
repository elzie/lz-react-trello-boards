import React from 'react';
// import logo from './logo.svg';
import './App.css';
import data from './sampleData';

// Components
import Board from './components/Board';
import Home from './components/pages/Home';

class App extends React.Component {
  state = {
    boards: []
  }
  componentDidMount() {
    this.setState({ boards: data.boards });

  }
  createNewBoard = board => {
    this.setState({
      boards: [
        ...this.state.boards,
        board
      ]
    })
  }
  render() {
    return (
      <div>
        <Home
          boards={this.state.boards}
          createNewBoard={this.createNewBoard} />
        <Board />
      </div>
    );
  }
}

export default App;
