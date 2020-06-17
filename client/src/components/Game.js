import React from 'react';
import GameBoard from './GameBoard';

class Game extends React.Component {
    state = {
        game: undefined
    }

    componentDidMount() {
        const token = localStorage.getItem("token");
        if (token) {
            fetch(`http://localhost:3001/rooms/${this.props.room.id}/games`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(resp => resp.json())
                .then(json => {
                    console.log(json);
                    if (!json.error) {
                        this.setState({
                            game: json
                        })
                    }
                })
        }
    }

    createAndStartGame = () => {
        const token = localStorage.getItem("token");
        if (token) {
            fetch(`http://localhost:3001/rooms/${this.props.room.id}/games`, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(resp => resp.json())
                .then(json => {
                    console.log(json);
                    this.setState({
                        game: json
                    })
                })
        }
    }

    renderButton = () => {
        if (this.state.game === undefined) {
            return <button onClick={this.createAndStartGame}>Start Game</button>
        }
    }

    renderGameBoard = () => {
        if (this.state.game !== undefined) {
            return <GameBoard round={this.state.game.active_round} />
        }
    }
    
    render() {
        return (
            <>
                {this.renderGameBoard()}
                {/* {this.renderConsole()} */}
                {this.renderButton()}
            </>
        )
    }

}

export default Game;