import React from 'react';
// import PropTypes from 'prop-types';
import data from '../sampleData';

import List from './List';

class Board extends React.Component {
    state = {
        currentLists: []
    }

    componentDidMount() {
        this.setState({
            currentLists: data.lists
        })
    }

    addBoardInput = React.createRef();

    createNewList = (e) => {
        e.preventDefault();
        // console.log(this.addBoardInput);
        const list = {
            id: Math.random(),
            title: this.addBoardInput.current.value,
            board: 300,
            createdAt: new Date(),
            cards: [
                {
                    id: 1,
                    text: 'card 1'
                },
                {
                    id: 2,
                    text: 'card 2'
                }
            ]
        }
        if (list.title) {
            this.setState({
                currentLists: [
                    ...this.state.currentLists,
                    list
                ]
            })
        }
        this.addBoardInput.current.value = '';
    }
    render() {
        return (
            <div>
                <div className="lists-wrapper">
                    {Object.keys(this.state.currentLists).map((key) => (
                        <List
                            key={this.state.currentLists[key].id}
                            list={this.state.currentLists[key]}
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

// Board.propTypes = {
//     boards: PropTypes.array.isRequired
// }

export default Board;