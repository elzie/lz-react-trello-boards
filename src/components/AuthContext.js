import React from 'react';
import { firebaseAuth } from '../firebase';

const AuthContext = React.createContext()

//ProviderComponent will provide data to other components
class AuthProvider extends React.Component {
    state = {
        user: {}
    }

    UNSAFE_componentWillMount() {
        firebaseAuth.onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    user: {
                        id: user.uid,
                        email: user.email,
                    }
                })
            } else {
                this.setState({
                    user: {}
                })
            }
        })
    }

    signUp = async (email, password, e) => {
        try {
            e.preventDefault();
            await firebaseAuth.createUserWithEmailAndPassword(email, password);
        } catch (error) {
            // will add error handling soon
        }
    }

    logIn = async (email, password, e) => {
        try {
            e.preventDefault();
            await firebaseAuth.signInWithEmailAndPassword(email, password);
            console.log('Logged in!');
        } catch (error) {
            // will add error handling soon
        }
    }

    logOut = () => {
        try {
            firebaseAuth.signOut();
            this.setState({
                user: {}
            });
            console.log('Logged out!');
        } catch (error) {
            // will add error handling soon
        }
    }

    render() {
        return (
            // AuthContext.Provider will allow other components to subscibe to any data-changes
            <AuthContext.Provider
                value={{
                    user: this.state.user,
                    signUp: this.signUp,
                    logIn: this.logIn,
                    logOut: this.logOut
                }}>
                {this.props.children}
            </AuthContext.Provider>
        )
    }
}

//ConsumerComponent will get data and be subscribed to any changes
const AuthConsumer = AuthContext.Consumer;

export { AuthProvider, AuthConsumer }