import React from 'react';
import { connect } from 'react-redux';

class GameBoard extends React.Component {
    renderPlayerCards = user => {
        if (user.username === this.state.user.username) {
            return (user.cards)
        } else {
            return "Xx Xx"
        }
    }

    renderPlayers = () => {
        return (
            <>
                {this.props.round.ordered_users.map((user,index) => <li key={index}>{user.username} ({user.chips}): {this.renderPlayerCards(user)}</li>)}
            </>
        )
    }

    render() {
        return(
            <>
                Players:
                {this.renderPlayers()}
            </>
        )
    }
}
const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(GameBoard);