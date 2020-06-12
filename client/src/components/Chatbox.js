import React from 'react';

const Chatbox = props => {
    const renderMessages = () => {
        if (props.messages !== undefined) {
            return (props.messages.map((message, index) => <li key={index}>{message.username} {message.payload}</li>))
        }
    }

    return (
        <>
            {/* {console.log(props.messages)} */}
            {renderMessages()}
            {/* hi */}
            <form onSubmit={props.submitHandler}>
                <input type="textarea" onChange={props.changeHandler} value={props.newMessage}/>
                <input type="submit" value="send"/>
            </form>
        </>
    )
}

export default Chatbox