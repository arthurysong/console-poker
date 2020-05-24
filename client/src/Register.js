import React from 'react';

class Register extends React.Component {
    state = {
        username: "",
        password: "",
        password_confirm: "",
        email: ""
    }

    changeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    submitHandler = event => {
        event.preventDefault();
        
    }

    render() {
        return (
            <div>
                <form onSubmit={this.submitHandler} >
                    <label>
                        Username
                    <input type="text" name="username" value={this.state.username} onChange={this.changeHandler}/><br/>
                    </label>
                    <label>
                        Email
                    <input type="text" name="email" value={this.state.email} onChange={this.changeHandler}/><br/>
                    </label>
                    <label>
                        Password
                    <input type="text" name="password" value={this.state.password} onChange={this.changeHandler}/><br/>
                    </label>
                    <label>
                        Password Confirmation
                    <input type="text" name="password_confirm" value={this.state.password_confirm} onChange={this.changeHandler}/><br/>
                    </label>
                    <input type="submit" value="Create Account"/><br/>
                </form>
            </div>
        )
    }

}

export default Register;