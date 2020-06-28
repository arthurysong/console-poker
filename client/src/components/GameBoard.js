import React from 'react';
import { connect } from 'react-redux';
import { hashStringToColor } from '../utilities/colorHash'

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
        if (user.dealer) {
            return "(D)"
        }
    }

    renderPlayers = () => {
        return (
            <>
                {this.props.round.ordered_users.map((user,index) => 
                    <li className="board_user" key={index}><span style={{color: `${hashStringToColor(user.username)}`}}>{user.username}</span><span className="board_user_chips">({user.chips})</span> {this.renderPlayerCards(user)} {this.renderDealerButton(user)}</li>)}
            </>
        )
    }

    renderCardsAndPot = () => {
        return (
            <>
                <span id="phase">{this.props.round.access_community_cards === "" ? "<PREFLOP>" : this.props.round.access_community_cards}</span><br/>
                Pot {this.props.round.pot}<br/>
                Bet {this.props.round.highest_bet_for_phase}<br/>
            </>
        )
    }

    render() {
        return(
            <>
                {/* Players: */}
                <ul>
                    {this.renderPlayers()}<br/>
                    {this.renderCardsAndPot()}<br/>
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