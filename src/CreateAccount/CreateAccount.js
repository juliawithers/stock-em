import React, { Component }  from 'react';
import context from '../context';

export default class CreateAccount extends Component {

    render() {
        return (
            <div className="component-div">
                <h2>Create your account today!</h2>
                <form onSubmit={this.sendUserData}>
                    <div>
                        <label htmlFor="username">Username(must be between 4 and 12 characters): </label>
                        <br />
                        <input className="username" type="text" name='username' id='username' />
                    </div>
                    <div>
                        <label htmlFor="password">Password (must be between 7 and 15 characters and include at least one digit
                    and one special character): </label>
                        <br />
                        <input className="password" type="password" name='password' id='password' />
                    </div>
                    <button type='submit'>Sign Up!</button>
                </form>
            </div>
        )
    }
}