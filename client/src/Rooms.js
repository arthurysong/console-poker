import React from 'react';

class Rooms extends React.Component {
    componentDidMount(){
        // if not logged in, redirect to login page?
        if (!this.props.isLoggedIn) {
            this.props.addError('Please sign in to see rooms.');
            this.props.history.push(`/`)
        }
    }
    clickHandler = () => {
        this.props.logOut(this.props.history)
    }

    render () {
        return (
            <div>
                Rooms
                <button onClick={this.clickHandler}>Log Out</button>
            </div>
        )
    }
}

export default Rooms