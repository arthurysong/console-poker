import React from 'react';

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
        // create a game that belongs to room
        // POST /rounds/:id/games? Nested Route
        // set this.state.game with JSON
        // subscribe to game_channel
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

    renderBoard = () => {
        if (this.state.game !== undefined){
            return (
                <>
                    Hellos
                </>
            )
        }
    }

    renderButton = () => {
        if (this.state.game === undefined) {
            return <button onClick={this.createAndStartGame}>Start Game</button>
        }
    }
    
    render() {
        return (
            <>
                {this.renderBoard()}
                {/* {this.renderConsole()} */}
                {this.renderButton()}
            </>
        )
    }

}

export default Game;