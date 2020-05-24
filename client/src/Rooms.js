import React from 'react';

class Rooms extends React.Component {
    
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