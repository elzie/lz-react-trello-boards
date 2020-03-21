import React from 'react';

class BoardPreview extends React.Component {
    render() {
        return (
            <div>
                {this.props.board.title}
                <p>_</p>
            </div>
        )
    }
}

export default BoardPreview;