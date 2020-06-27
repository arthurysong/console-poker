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

    createNewArray = () => {
        let i = 0
        let j = 0
        let bubble = {}
        let temp = []
        while (i < this.props.messages.length) {
            if (this.props.messages[j+1] === undefined || this.props.messages[j].username !== this.props.messages[j+1].username) {
                bubble["username"] = this.props.messages[j].username
                bubble["messages"] = this.props.messages.slice(i, j+1)
                temp.push(bubble)
                bubble = {}
                i = ++j
            } else {
                // if j+1 is equal to j.. the we go to next j
                j++
            }
        }
        return temp
    }

    renderMessages = () => {
        if (this.props.messages !== undefined) {
            return (
                this.createNewArray().map((bubble, index) => 
                    <section key={index} className="message -left">
                        {bubble.username}&nbsp;
                        <div className="nes-balloon from-left">
                            {bubble.messages.map((message, index2) => <div key={index2}>{message.payload}<br/></div>)}
                        </div>
                    </section>
            ))
        } 
    }

    render() {
        return (
            <div id="chatbox_container" className="nes-container">
                <div id="messages_container" className="nes-container">

                    <section className="message-list">
                        {this.renderMessages()}
                    </section>
                    
                </div>
                <form id="new_message_form" onSubmit={this.submitHandler}>
                    <input type="textarea" id="textarea_field" className="nes-textarea" onChange={this.changeHandler} value={this.state.newMessage}/>
                    <input type="submit" value="send"/>
                </form>
            </div>
        )
    }
}

export default Chatbox