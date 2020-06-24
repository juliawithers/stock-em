import React, { Component } from 'react';

export default class Login extends Component {

    // validation code here

    render() {
        return (
            <div className="component-div">
                <h2>Login</h2>
                <p>User Flows:</p>
                <ul>
                    <li>User enters a valid username and password - home screen (inventory page)</li>
                    <li>User enters a valid username/password and invalid password/username - error message appears</li>
                </ul>
                <p>Please use username: UseThisUser and password: hello123! to login as a grader</p>
                <br />
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor="login-username">Username: </label>
                        <input className="login-username" type="text" name='login-username' id='login-username' />
                    </div>
                    <div>
                        <label htmlFor="login-password">Password: </label>
                        <input className="login-password" type="password" name='login-password' id='login-password' />
                    </div>
                    <button type='submit'>Login</button>
                </form>
            </div>
        )
    }
}