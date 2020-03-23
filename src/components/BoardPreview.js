import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class BoardPreview extends React.Component {

    goToBoard = () => {
        const boardId = this.props.board.id;
        console.log(boardId);
        this.props.history.push({
            pathname: `/board/${boardId}`,
            state: {
                title: this.props.board.title,
                background: this.props.board.background
            }
        })
    }

    render() {
        return (
            <div>
                <ul className="board-preview-item"
                    onClick={this.goToBoard}
                    style={{
                        backgroundColor: this.props.board.background
                    }}
                >
                    <li>{this.props.board.title}</li>
                </ul>
            </div>
        )
    }
}

BoardPreview.propTypes = {
    board: PropTypes.object.isRequired
}

export default withRouter(BoardPreview);