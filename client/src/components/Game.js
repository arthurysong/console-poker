import React from 'react';
import GameBoard from './GameBoard';
import GameConsole from './GameConsole'
import { connect } from 'react-redux';
import { setGame, startGame, subscribeGame, unsubscribeGame } from '../redux/gameActions';

class Game extends React.Component {
    componentDidMount() {
        this.props.setGame(this.props.room.id);
    }

    componentWillUnmount(){
        this.props.unsubscribeGame(this.props.game.id);
    }

    createAndStartGame = () => {
        this.props.startGame(this.props.room.id); //this action needs to rebroadcast to everyone streaming from room
    }

    renderButton = () => {
        if (this.props.game === undefined) {
            return <button onClick={this.createAndStartGame}>Start Game</button>
        }
    }

    renderGame = () => {
        if (this.props.game !== undefined) {
            return (
                <>
                    <GameBoard round={this.props.game.active_round} />
                    <GameConsole status={this.props.status} user={this.props.user}/>
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
        status: state.status
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setGame: roomId => dispatch(setGame(roomId)),
        startGame: roomId => dispatch(startGame(roomId)),
        subscribeGame: gameId => dispatch(subscribeGame(gameId)),
        unsubscribeGame: gameId => dispatch(unsubscribeGame(gameId))
    }
}
// export default Game;
export default connect(mapStateToProps, mapDispatchToProps)(Game);