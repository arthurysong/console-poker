import React from 'react';
import GameBoard from './GameBoard';
import GameConsole from './GameConsole'
import { connect } from 'react-redux';
import { startGame, subscribeGame, unsubscribeGame } from '../redux/gameActions';

class Game extends React.Component {
    componentDidMount() {
        this.props.subscribeGame(this.props.gameId);
    }

    componentWillUnmount(){
        this.props.unsubscribeGame(this.props.game.id);
    }

    startGame = () => {
        this.props.startGame(this.props.game.id); //this action needs to rebroadcast to everyone streaming from room
    }

    renderButton = () => {
        if (!this.props.game.active_round || this.props.game.active_round.is_playing === false) {
            return <button onClick={this.startGame}>Start Game</button>
        }
    }

    renderGame = () => {
        if (this.props.game.active_round !== undefined) {
            return (
                <>
                    <GameBoard round={this.props.game.active_round} />
                    <GameConsole status={this.props.game.active_round.status} user={this.props.user}/>
                </>
            )
        }
    }
    
    render() {
        return (
            <>
                {this.renderGame()}
                {this.renderButton()}
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        game: state.game,
        user: state.user
        // status: state.status
    }
}

const mapDispatchToProps = dispatch => {
    return {
        startGame: roomId => dispatch(startGame(roomId)),
        subscribeGame: gameId => dispatch(subscribeGame(gameId)),
        unsubscribeGame: gameId => dispatch(unsubscribeGame(gameId))
    }
}
// export default Game;
export default connect(mapStateToProps, mapDispatchToProps)(Game);