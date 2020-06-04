import React from 'react';

const User = ({ user }) => {

    const renderUser = () => {
        if (user) {
            return (<>{user.username}</>)
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