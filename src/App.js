import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';
import data from './sampleData';

// Components
import Board from './components/Board';
import Home from './components/pages/Home';
import PageNotFound from './components/pages/PageNotFound';

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
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path="/:userId/boards"
              render={(props) => (
                <Home
                  {...props}
                  boards={this.state.boards}
                  createNewBoard={this.createNewBoard} />
              )}
            />
            <Route
              path="/board/:boardId"
              render={props => (
                <Board
                  {...props}
                />
              )} />
            <Route component={PageNotFound} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
