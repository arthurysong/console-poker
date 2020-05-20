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

    render() {
        return(
            <div>
                <form onSubmit={this.submitHandler}>
                    <input type="text" name="email" value={this.state.email}/>
                    <input type="password" name="password" value={this.state.password}/>
                    <input type="submit" />
                </form>
            </div>
        )
    }
}

export default LoginForm;