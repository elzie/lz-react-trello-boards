import React from 'react';
import { AuthConsumer } from './AuthContext';

// No need for class-based component since this component 
// just takes in information and renders it to the screen

const Header = () => (
    <header>
        <AuthConsumer>
            {({ user, logOut }) => (
                <React.Fragment>
                    <a href="/">
                        <span role="img" aria-label="house emoji">&#127968;</span>
                    </a>
                    <h1>React Trello Boards by Elzie</h1>
                    <div className="user-area">
                        <small>user: {user.email}</small>
                        <button onClick={(e) => logOut(e)}>Log out!</button>
                        <small>Please sign in..</small>
                    </div>
                </React.Fragment>
            )}
        </AuthConsumer>
    </header>
)

export default Header;