import React from 'react';

const Chatbox = props => {
    const renderMessages = () => {
        if (props.room !== undefined) {
            return (props.messages.map(message => <>{message.user.username} {message.content}</>))
        }
    }

    return (
        <>
            <form onSubmit={props.submitHandler}>
                <input type="textarea" onChange={props.changeHandler} value={props.newMessage}/>
                <input type="submit" value="send"/>
            </form>
        </>
    )
}

export default Chatbox