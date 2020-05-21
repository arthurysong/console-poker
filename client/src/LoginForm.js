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
        console.log(this.state);
        const body = JSON.stringify(this.state)
        console.log(body);
        const options = {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body
        }

        fetch(`http://localhost:3001/authenticate`, options)
            .then(resp => resp.json())
            .then(json => {
                console.log(json);
                localStorage.setItem("token", json.auth_token);
            });
        // fetch(`http://localhost:3001/test`);
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