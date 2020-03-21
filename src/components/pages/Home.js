import React from 'react';
import PropTypes from 'prop-types';

import BoardPreview from '../BoardPreview';
import CreateBoardForm from '../CreateBoardForm';

class Home extends React.Component {

    render() {
        return (
            <div>
                <h1>Welcome {this.props.match.params.userId}</h1>
                <CreateBoardForm createNewBoard={this.props.createNewBoard} />
                <div className="board-preview-wrapper">
                    {
                        Object.keys(this.props.boards).map((key, index) => (
                            // this.props.boards.map() gives "Cannot read property 'title' of undefined
                            // which is because we are using .map(which is for Arrays) on an Object.
                            // Object.keys() pulls out all of an objects property names and returns an array.
                            <BoardPreview key={key} board={this.props.boards[key]} />
                        ))
                    }
                    {
                        // console.log('home:', this.props.boards)
                    }
                </div>
            </div>
        )
    }
}

Home.propTypes = {
    boards: PropTypes.array.isRequired,
    createNewBoard: PropTypes.func.isRequired
}

export default Home;