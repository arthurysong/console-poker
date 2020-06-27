import React from 'react';
import "nes.css/css/nes.min.css";


class Chatbox extends React.Component {
    state = {
        newMessage: ""
    }

    submitHandler = event => {
        event.preventDefault();
        this.props.subscription.sendMessage(this.state.newMessage);
        this.setState({ newMessage: "" })
    }

    changeHandler = event => {
        this.setState({
            newMessage: event.target.value
        })
    }

    renderMessages = () => {
        if (this.props.messages !== undefined) {
            return (this.props.messages.map((message, index) => <li key={index}>{message.username}: {message.payload}</li>))
        } 
    }

    render() {
        return (
            // <div>
            <div className="nes-container">
                Hello???
                <p>
                <ul>
                    {this.renderMessages()}
                </ul>
                <form onSubmit={this.submitHandler}>
                    <input type="textarea" onChange={this.changeHandler} value={this.state.newMessage}/>
                    <input type="submit" value="send"/>
                </form>
                </p>
            </div>
        )
    }
}

export default Chatbox