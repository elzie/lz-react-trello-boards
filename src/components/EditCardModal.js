import React from 'react';
import { cardsRef } from '../firebase';
import PropTypes from 'prop-types';
import TextareaAutosize from 'react-autosize-textarea';

class EditCardModal extends React.Component {
    state = {
        availableLabels: [
            '#80ccff',
            '#80ffaa',
            '#f94a1e',
            '#ffb3ff',
            '#bf00ff',
            '#ffad33',
        ],
        selectedLabels: []
    }
    componentDidMount() {
        this.setState({
            selectedLabels: this.props.cardData.labels
        })
    }
    textInput = React.createRef();
    updateCard = async e => {
        try {
            e.preventDefault();
            const cardId = this.props.cardData.id;
            const newText = this.textInput.current.value;
            const labels = this.state.selectedLabels;
            const card = await cardsRef.doc(cardId);

            card.update({
                'card.text': newText,
                'card.labels': labels
            })

            this.props.toggleModal();
        } catch (error) {
            console.error('Error updating card:', error);
        }
    }
    setLabel = label => {
        const labels = [...this.state.selectedLabels];
        // Selected labels stored into state - copy them and save them into 'labels' const.

        // check if label user has clicked is allready in 'labels' array
        if (labels.includes(label)) {
            // if yes, run this section
            // filter out the current label and save the rest into 'newLabels' array
            const newLabels = labels.filter((element) => {
                return element !== label
            });
            // Push to state, once label has been removed
            this.setState({ selectedLabels: newLabels })
        } else {
            // If label clicked on is NOT stored into state,
            // instead run this section and add the new label into
            // 'labels' array
            labels.push(label);
            // And save to state 

            this.setState({ selectedLabels: labels });
        }
    }
    render() {
        return (
            <div className="modal-wrapper"
                style={{ display: this.props.modalOpen ? 'block' : 'none' }}>
                <div className="modal-body">
                    <form onSubmit={this.updateCard}>
                        <div>
                            <span className="modal-close" onClick={this.props.toggleModal}>&times;</span>
                            <p className="label-title">Add / Remove labels</p>
                            {this.state.availableLabels.map((label) => {
                                return <span
                                    onClick={() => this.setLabel(label)}
                                    className="label"
                                    style={{ background: label }}
                                    key={label}></span>
                            })}
                            <hr />
                        </div>
                        <div className="edit-area">
                            <span className="edit-icon">&#x270E;</span>
                            {/*<input
                                className="textbox-edit"
                                defaultValue={this.props.cardData.text}
                                ref={this.textInput}
                            ></input>*/}
                            <TextareaAutosize
                                className="textbox-edit"
                                defaultValue={this.props.cardData.text}
                                ref={this.textInput}
                            ></TextareaAutosize>
                        </div>
                        <div>
                            <p className="label-title">Labels:</p>
                            {this.state.selectedLabels.map((label) => {
                                return <span className="label" style={{ background: label }} key={label}></span>
                            })}
                        </div>
                        <button type="submit">Save Changes</button>
                    </form>
                </div>
            </div>
        )
    }
}

EditCardModal.propTypes = {
    modalOpen: PropTypes.bool.isRequired,
    toggleModal: PropTypes.func.isRequired,
    cardData: PropTypes.object.isRequired
}

export default EditCardModal;