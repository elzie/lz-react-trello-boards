import React from 'react';
import PropTypes from 'prop-types';
// import data from '../sampleData';
import { boardsRef, listsRef } from '../firebase';

import List from './List';

class Board extends React.Component {
    state = {
        currentBoard: {},
        currentLists: []
    }

    componentDidMount() {
        this.getBoard(this.props.match.params.boardId);
        // grab the boardId which is stored in the URL parameters
        // therefor access the router params and use the current ID
        this.getLists(this.props.match.params.boardId);
    }

    getLists = async boardId => {
        try {
            const lists = await listsRef
                .where('list.board', '==', boardId)
                .orderBy('list.createdAt')
                .onSnapshot(snapshot => {
                    snapshot.docChanges()
                        .forEach(change => {
                            // console.log(change.doc.data());
                            if (change.type === 'added') {
                                const doc = change.doc;
                                const list = {
                                    id: doc.id,
                                    title: doc.data().list.title
                                }
                                this.setState({
                                    currentLists: [...this.state.currentLists, list]
                                });
                            }
                            if (change.type === 'removed') {
                                this.setState({
                                    currentLists: [
                                        ...this.state.currentLists.filter(list => {
                                            // Grab all lists from state
                                            return list.id !== change.doc.id
                                            // return only lists that doesnt match the list being removed
                                        })
                                    ]
                                })
                            }
                        });
                });
            //     .get();
            // lists.forEach(list => {
            //     const data = list.data().list;
            //     const listObj = {
            //         id: list.id,
            //         ...data
            //     }
            //     this.setState({ currentLists: [...this.state.currentLists, listObj] })
            // });

        } catch (error) {
            console.log('Error fetching Lists: ', error);
        }
    }

    getBoard = async boardId => {
        try {
            const board = await boardsRef.doc(boardId).get();
            this.setState({ currentBoard: board.data().board });
        } catch (error) {
            console.log('Error getting boards.', error)
        }
    }
    addBoardInput = React.createRef();

    createNewList = async (e) => {
        try {
            e.preventDefault();
            // console.log(this.addBoardInput);
            const list = {
                title: this.addBoardInput.current.value,
                board: this.props.match.params.boardId,
                createdAt: new Date(),

            }
            if (list.title && list.board) {
                await listsRef.add({ list })
            }
            this.addBoardInput.current.value = '';
        } catch (error) {
            console.error('Error creating new List: ', error);

        }
    }
    deleteBoard = async () => {
        const boardId = this.props.match.params.boardId;
        this.props.deleteBoard(boardId);
    }

    updateBoard = e => {
        const boardId = this.props.match.params.boardId;
        const newTitle = e.currentTarget.value;
        if (boardId && newTitle) {
            this.props.updateBoard(boardId, newTitle);
        }
    }
    render() {
        return (
            <div
                className="board-wrapper"
                style={{
                    backgroundColor: this.state.currentBoard.background
                }}
            >
                <div className="lists-wrapper">
                    <div className="board-header">
                        {/* <h3>{this.state.currentBoard.title}</h3> */}
                        <input
                            type="text"
                            name="boardTitle"
                            onChange={this.updateBoard}
                            defaultValue={this.state.currentBoard.title}
                        />
                        <button onClick={this.deleteBoard}>Delete Board</button>
                    </div>
                    {Object.keys(this.state.currentLists).map((key) => (
                        <List
                            key={this.state.currentLists[key].id}
                            list={this.state.currentLists[key]}
                            deleteList={this.props.deleteList}
                        />
                    ))}
                </div>
                <form onSubmit={this.createNewList}
                    className="new-list-wrapper">
                    <input
                        type="text"
                        ref={this.addBoardInput}
                        name="name"
                        placeholder="+ New list" />
                </form>
            </div>
        )
    }
}

Board.propTypes = {
    deleteBoard: PropTypes.func.isRequired,
    deleteList: PropTypes.func.isRequired,
    updateBoard: PropTypes.func.isRequired
}

export default Board;