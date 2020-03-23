import React from 'react';
import PropTypes from 'prop-types';

class CreateBoardForm extends React.Component {
    state = {
        title: '',
        background: '#80ccff'
    }
    newBoardRef = React.createRef();
    handleSubmit = (e) => {
        e.preventDefault();
        // console.log('form: ', this.state);
        const board = {
            title: this.state.title,
            background: this.state.background,
            createdAt: new Date(),
            user: 'user'
        }
        if (board.title && board.background) {
            this.props.createNewBoard(board);
            this.newBoardRef.current.value = '';
        }
    }
    render() {
        return (
            <div>
                <p>Create Board Form</p>
                <form
                    className="create-board-wrapper"
                    onSubmit={this.handleSubmit}
                >
                    <input
                        type="text"
                        name="name"
                        placeholder="Board name"
                        onChange={(e) => this.setState({ title: e.target.value })}
                        ref={this.newBoardRef}
                    />
                    <select name="background"
                        onChange={(e) => this.setState({ background: e.target.value })}>
                        <option value="#80ccff">Blue</option>
                        <option value="#80ffaa">Green</option>
                        <option value="#f94a1e">red</option>
                        <option value="#ffb3ff">Pink</option>
                        <option value="#bf00ff">Purple</option>
                        <option value="#ffad33">Orange</option>
                    </select>
                    <button type="submit">Create new Board</button>
                </form>
            </div>
        )
    }
}
CreateBoardForm.propTypes = {
    createNewBoard: PropTypes.func.isRequired
}
export default CreateBoardForm;