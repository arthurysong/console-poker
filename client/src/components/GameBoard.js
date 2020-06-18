import React from 'react';
import { connect } from 'react-redux';
import GameConsole from './GameConsole';

class GameBoard extends React.Component {
    renderPlayerCards = user => {
        if (user.playing === true) {
            if (user.username === this.props.user.username) {
                return (user.cards)
            } else {
                return "Xx Xx"
            }
        } else {
            return "*FOLD*"
        }
    }
    
    renderDealerButton = user => {
        if (user.id === this.props.round.dealer_id) {
            return "(D)"
        }
    }

    renderPlayers = () => {
        return (
            <>
                {this.props.round.ordered_users.map((user,index) => 
                    <li key={index}>{user.username} ({user.chips}): {this.renderPlayerCards(user)} {this.renderDealerButton(user)}</li>)}
            </>
        )
    }

    renderCommunityCards = () => {
        return (
            <>
                Community Cards:<br/>
                {this.props.round.access_community_cards}
            </>
        )
    }

    render() {
        return(
            <>
                Players:
                <ul>
                    {this.renderPlayers()}<br/>
                    {this.renderCommunityCards()}<br/>
                </ul>
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