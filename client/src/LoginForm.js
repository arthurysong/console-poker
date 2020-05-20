import React from 'react';

class LoginForm extends React.Component {
    state = {
        email: "",
        password: ""
    }

    changeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    submitHandler =  event => {
        event.preventDefault();
        const body = JSON.stringify(this.state)
        const options = {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body
        }

        fetch(`http://locahost:3001/authenticate`, options);
    }

    render() {
        return(
            <div>
                <form onSubmit={this.submitHandler}>
                    <input onChange={this.changeHandler} type="text" name="email" value={this.state.email}/><br/>
                    <input onChange={this.changeHandler} type="password" name="password" value={this.state.password}/><br/>
                    <input type="submit" value="login"/><br/>
                </form>
            </div>
        )
    }
}

export default LoginForm;