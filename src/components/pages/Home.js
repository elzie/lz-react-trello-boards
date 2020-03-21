import React from 'react';
import PropTypes from 'prop-types';

import BoardPreview from '../BoardPreview';

class Home extends React.Component {
    newBoard = () => {
        // Grab all data from our form - then call createNewBoard function
        const board = {
            title: 'Courses to Finish',
            background: '#80ffaa',
            createdAt: new Date()
        }
        this.props.createNewBoard(board);
    }
    render() {
        return (
            <div>
                <h1>Home Page</h1>
                <button onClick={this.newBoard}>New Board</button>
                {
                    Object.keys(this.props.boards).map((key, index) => (
                        // this.props.boards.map() gives "Cannot read property 'title' of undefined
                        // which is because we are using .map(which is for Arrays) on an Object.
                        // Object.keys() pulls out all of an objects property names and returns an array.
                        <BoardPreview key={key} board={this.props.boards[key]} />
                    ))
                }
                {console.log('home:', this.props.boards)}
            </div>
        )
    }
}

Home.propTypes = {
    boards: PropTypes.array.isRequired,
    createNewBoard: PropTypes.func.isRequired
}

export default Home;