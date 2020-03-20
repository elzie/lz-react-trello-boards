import React from 'react';
import Card from './Card';

class List extends React.Component {
    render() {
        return (
            <div>
                <p>List Component</p>
                <Card />
            </div>
        )
    }
}

export default List;