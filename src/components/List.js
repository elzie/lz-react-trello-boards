import React from 'react';
import PropTypes from 'prop-types';

import Card from './Card';

class List extends React.Component {
    state = {
        currentCards: []
    }

    nameInput = React.createRef()

    createNewCard = (e) => {
        e.preventDefault();
        const card = {
            text: this.nameInput.current.value,
            listId: 'abcd1234',
            labels: [],
            createdAt: new Date()
        }
        if (card.text) {
            this.setState({ currentCards: [...this.state.currentCards, card] })
        }
        this.nameInput.current.value = '';
        // console.log('new card added: ', card.text);
    }

    render() {
        return (
            <div className="list">
                <div className="list-header">
                    <p>{this.props.list.title}</p>
                </div>
                {Object.keys(this.props.list.cards).map(key => (
                    <Card
                        key={key}
                        data={this.props.list.cards[key]} />
                ))}
                <form
                    onSubmit={this.createNewCard}
                    className="new-card-wrapper">
                    <input type="text" name="name" placeholder="+ New card" ref={this.nameInput} />
                </form>
            </div>
        )
    }
}

List.propTypes = {
    list: PropTypes.object.isRequired
}

export default List;