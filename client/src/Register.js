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

    render() {
        return (
            <div>
                <form onSubmit={this.submitHandler} >
                    <label>
                        Username
                    <input type="text" name="username" value={this.state.username} onChange={this.changeHandler}/>
                    </label>
                    <label>
                        Email
                    <input type="text" name="email" value={this.state.email} onChange={this.changeHandler}/>
                    </label>
                    <label>
                        Password
                    <input type="text" name="password" value={this.state.password} onChange={this.changeHandler}/>
                    </label>
                    <label>
                        Password Confirmation
                    <input type="text" name="password_confirm" value={this.state.password_confirm} onChange={this.changeHandler}/>
                    </label>
                    <input type="submit" value="Create Account"/>
                </form>
            </div>
        )
    }

}

export default Register;