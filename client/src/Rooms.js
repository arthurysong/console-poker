import React from 'react';

class Rooms extends React.Component {
    componentDidMount(){
        this.props.loadRooms();
    }
    
    clickHandler = () => {
        this.props.logOut(this.props.history)
    }

    renderRooms = () => (this.props.rooms.map((room, index) => <li key={index}>{room.name}<br/>{room.no_users}/8</li>))

    render () {
        return (
            <div>
                Rooms
                <ul>
                    {this.renderRooms()}
                </ul>
                <button onClick={this.clickHandler}>Log Out</button>
            </div>
        )
    }
}

export default Rooms