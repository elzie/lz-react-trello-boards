import React from 'react';

class UserForm extends React.Component {
    emailInput = React.createRef();
    passwordInput = React.createRef();

    render() {
        return (
            <React.Fragment>
                <div className="sign-up-wrapper">
                    <h2>Sign in or Create account</h2>
                    <form className="sign-up-form">
                        <div>
                            <input
                                ref={this.emailInput}
                                type="email"
                                name="email"
                                placeholder="Email"
                            />
                        </div>
                        <div>
                            <input
                                ret={this.passwordInput}
                                type="password"
                                name="password"
                                placeholder="Password"
                            />
                        </div>
                        <div>
                            <button>Sign Up</button>
                        </div>
                    </form>
                </div>
            </React.Fragment>
        )
    }
}

export default UserForm;