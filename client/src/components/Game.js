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
        if (!this.props.game.active_round) {
            return <button onClick={this.startGame}>Start Game</button>
        }
    }

    renderGame = () => {
        if (this.props.game.active_round !== undefined) {
            console.log(this.props.game);
            console.log(this.props.game.active_round.status)
            return (
                <>
                    <GameBoard round={this.props.game.active_round} />
                    <GameConsole 
                        gameId={this.props.game.id}
                        roundId={this.props.game.active_round.id} 
                        status={this.props.game.active_round.status} 
                        gameErrors={this.props.gameErrors}
                        user={this.props.user}/>
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
        user: state.user,
        gameErrors: state.gameErrors
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