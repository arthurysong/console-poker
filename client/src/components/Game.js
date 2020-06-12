import React from 'react';

class Game extends React.Component {
    state = {
        game: {}
    }

    componentDidMount() {
        // check if there is game for this room
        // GET /rooms/:id/game?
        // Set this.state.game with JSON
        // If game is found, subscribe to games channel
    }

    createAndStartGame = () => {
        // create a game that belongs to room
        // POST /rounds/:id/games? Nested Route
        // set this.state.game with JSON
        // subscribe to game_channel
    }

    renderButton = () => {
        // if game is loaded don't render button
        if (!this.state.game) {
            return <button onClick={this.createAndStartGame}>Start Game</button>
        }
    }
    
    render() {
        return (
            <>
                {this.renderButton()}
            </>
        )
    }

}

export default Game;