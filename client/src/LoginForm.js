import React from 'react';
import { loginUser } from './dispatchActions';
import { connect } from 'react-redux';
import Errors from './Errors';
import { Link } from 'react-router-dom';

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
        this.props.loginUser(this.state, this.props.history)
    }

    renderRegister = () => {
        return (
            <>
                Don't have an account? <Link to="/register">Register!</Link>
            </>
        )
    }
    render() {
        return(
            <div>
                <Errors />
                <form onSubmit={this.submitHandler}>
                    <label>
                        Email
                    <input onChange={this.changeHandler} type="text" name="email" value={this.state.email}/><br/>
                    </label>
                    <label>
                        Password
                    <input onChange={this.changeHandler} type="password" name="password" value={this.state.password}/><br/>
                    </label>
                    <input type="submit" value="login"/><br/>
                    {this.renderRegister()}
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loginUser: (state, history) => dispatch(loginUser(state, history))
    }
}

export default connect(null, mapDispatchToProps)(LoginForm);