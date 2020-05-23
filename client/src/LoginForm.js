import React from 'react';
import { loginUser } from './dispatchActions';
import { connect } from 'react-redux';

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
        this.props.loginUser(this.state);
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

const mapDispatchToProps = dispatch => {
    return {
        loginUser: state => dispatch(loginUser(state))
    }
}

export default connect(null, mapDispatchToProps)(LoginForm);