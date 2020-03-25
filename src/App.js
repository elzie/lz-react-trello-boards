import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// import data from './sampleData';
import { boardsRef, listsRef, cardsRef } from './firebase';

import './App.css';

// Components
import Board from './components/Board';
import Home from './components/pages/Home';
import PageNotFound from './components/pages/PageNotFound';

class App extends React.Component {
  state = {
    boards: []
  }

  getBoards = async userId => {
    try {
      this.setState({ boards: [] })
      // [] ensures that any previous boards in state will be removed before making calls to firebase.
      const boards = await boardsRef.get();
      //.get() gets data once, but doesnt listen for changes.

      boards.forEach(board => {
        // console.log(board.data().board);
        const data = board.data().board;
        const boardObj = {
          id: board.id,
          ...data
        }
        this.setState({ boards: [...this.state.boards, boardObj] })
      });

    } catch (error) {
      console.log('Error getting Boards. ', error)
    }
  }
  createNewBoard = async board => {
    try {
      // Push to firebase.
      const newBoard = await boardsRef.add({ board });

      const boardObj = {
        id: newBoard.id,
        ...board
      }

      this.setState({
        boards: [
          ...this.state.boards,
          boardObj
        ]
      })
    } catch (error) {
      console.error('Error creating new Board: ', error);
    }
  }

  deleteList = async (listId) => {
    try {
      const cards = await cardsRef
        .where('card.listId', '==', listId)
        .get();
      if (cards.docs.length !== 0) {
        cards.forEach(card => {
          card.ref.delete();
        });
      }
      const list = await listsRef.doc(listId);
      list.delete();
    } catch (error) {
      console.log('Error deleting list: ', error);
    }
  }

  deleteBoard = async boardId => {
    try {
      const lists = await listsRef
        .where('list.board', '==', boardId)
        .get();

      if (lists.docs.length !== 0) {
        lists.forEach(list => {
          this.deleteList(list.ref.id);
        })
      }


      // alert(boardId);
      const board = await boardsRef.doc(boardId);
      this.setState({
        boards: [
          ...this.state.boards.filter(board => {
            return board.id !== boardId
          })
        ]
      });
      board.delete();
    } catch (error) {
      console.error('Error deleting board: ', error);
    }
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
                  getBoards={this.getBoards}
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
                  deleteBoard={this.deleteBoard}
                  deleteList={this.deleteList}
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
