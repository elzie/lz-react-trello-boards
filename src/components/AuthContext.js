import React from 'react';

const AuthContext = React.createContext()

//ProviderComponent will provide data to other components
class AuthProvider extends React.Component {
    state = {
        user: {
            name: 'Djan K. Blom'
        }
    }
    render() {
        return (
            // AuthContext.Provider will allow other components to subscibe to any data-changes
            <AuthContext.Provider
                value={{ user: this.state.user }}>
                {this.props.children}
            </AuthContext.Provider>
        )
    }
}

//ConsumerComponent will get data and be subscribed to any changes
const AuthConsumer = AuthContext.Consumer;

export { AuthProvider, AuthConsumer }