import React from 'react';
import PropTypes from 'prop-types';
import { listsRef, cardsRef } from '../firebase';
import Card from './Card';

class List extends React.Component {
    state = {
        currentCards: []
    }
    componentDidMount() {
        this.fetchCards(this.props.list.id);
    }

    fetchCards = async listId => {
        try {
            await cardsRef
                .where('card.listId', '==', listId)
                .orderBy('card.createdAt')
                .onSnapshot(snapshot => {
                    snapshot.docChanges()
                        .forEach(change => {
                            const doc = change.doc;
                            const card = {
                                id: doc.id,
                                text: doc.data().card.text,
                                labels: doc.data().card.labels
                            }
                            if (change.type === 'added') {
                                // Merge in the current cards
                                this.setState({ currentCards: [...this.state.currentCards, card] });
                            }
                            if (change.type === 'removed') {
                                // filter out by id
                                this.setState({
                                    currentCards: [
                                        ...this.state.currentCards.filter(card => {
                                            return card.id !== change.doc.id
                                        })
                                    ]
                                })
                            }
                            if (change.type === 'modified') {
                                const index = this.state.currentCards.findIndex(item => {
                                    // return the card where the Id is equal to the one being changed
                                    return item.id === change.doc.id
                                });
                                const cards = [
                                    ...this.state.currentCards
                                ]
                                cards[index] = card;
                                this.setState({ currentCards: cards });
                            }
                        });
                });
            //     .get();
            // cards.forEach(card => {
            //     const data = card.data().card;
            //     const cardObj = {
            //         id: card.id,
            //         ...data
            //     }
            //     // console.log(cardObj);
            //     this.setState({ currentCards: [...this.state.currentCards, cardObj] });
            // });
        } catch (error) {
            console.error('Error fetching cards: ', error);
        }
    }
    nameInput = React.createRef();

    createNewCard = async (e) => {
        try {
            e.preventDefault();
            const card = {
                text: this.nameInput.current.value,
                listId: this.props.list.id,
                labels: [],
                createdAt: new Date()
            }
            if (card.text && card.listId) {
                // this.setState({ currentCards: [...this.state.currentCards, card] })
                await cardsRef.add({ card });
            }
            this.nameInput.current.value = '';
            // console.log('new card added: ', card.text);
        } catch (error) {
            console.error('Error creating new Card: ', error);

        }
    }
    deleteList = () => {
        const listId = this.props.list.id;
        this.props.deleteList(listId);
    }
    updateList = async e => {
        try {
            const listId = this.props.list.id;
            const newTitle = e.currentTarget.value;
            const list = await listsRef.doc(listId);
            list.update({ 'list.title': newTitle });
        } catch (error) {
            console.error('Error updating list title: ', error)
        }
    }
    render() {
        return (
            <div className="list">
                <div className="list-header">
                    {/*<p>{this.props.list.title}</p>*/}
                    <input
                        type="text"
                        name="listTitle"
                        onChange={this.updateList}
                        defaultValue={this.props.list.title}
                    />
                    <span onClick={this.deleteList}>&times;</span>
                </div>
                {Object.keys(this.state.currentCards).map(key => (
                    <Card
                        key={key}
                        data={this.state.currentCards[key]} />
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
    list: PropTypes.object.isRequired,
    deleteList: PropTypes.func.isRequired
}

export default List;