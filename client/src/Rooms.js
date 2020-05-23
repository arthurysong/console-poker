import React from 'react';

class Rooms extends React.Component {
    componentDidMount(){
        // if not logged in, redirect to login page?
    }
    logOut(){
        // this.props.logOut()
    }

    render () {
        return (
            <div>
                Rooms
                <button onClick={this.logOut}>Log Out</button>
            </div>
        )
    }
}

export default Rooms