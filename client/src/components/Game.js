import React from 'react';
import GameBoard from './GameBoard';
import GameConsole from './GameConsole'
import { connect } from 'react-redux';
import { setGameAndConnect, startGameAndConnect, unsubscribeGame } from '../redux/gameActions';

class Game extends React.Component {
    componentDidMount() {
        this.props.setGameAndConnect(this.props.room.id);
    }

    componentWillUnmount(){
        // this.props.deleteGame();
        this.props.unsubscribeGame(this.props.game.id);
    }

    createAndStartGame = () => {
        this.props.startGameAndConnect(this.props.room.id);
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
                    <GameConsole round={this.props.game.active_round} />
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
        game: state.game
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setGameAndConnect: roomId => dispatch(setGameAndConnect(roomId)),
        startGameAndConnect: roomId => dispatch(startGameAndConnect(roomId)),
        unsubscribeGame: gameId => dispatch(unsubscribeGame(gameId))
    }
}
// export default Game;
export default connect(mapStateToProps, mapDispatchToProps)(Game);