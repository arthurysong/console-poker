import React from 'react';

const User = ({ user }) => {
    const clickHandler = () => {
        this.props.logOut(this.props.history)
    }

    const renderUser = () => {
        if (user) {
            return (<>{user.username} <button onClick={clickHandler}>Log Out</button></>)
        }
    }

    console.log('in user component', user);

    return (
        <>
            {renderUser()}
        </>
    )
}

export default User