import React from 'react';
import PropTypes from 'prop-types';

class Card extends React.Component {
    render() {
        return (
            <div className="card">
                <div className="card-body">
                    <p>Card Component</p>
                    {this.props.data.text}
                </div>
            </div>
        )
    }
}

Card.propTypes = {
    data: PropTypes.object.isRequired
}

export default Card;