import React from 'react';

class Game extends React.Component {
    state = {
        game: undefined
    }

    componentDidMount() {
        // check if there is game for this room
        // GET /rooms/:id/game?
        // Set this.state.game with JSON
        // If game is found, subscribe to games channel
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
                if (json.game) {
                    // show board
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
            }).then(resp => resp.json())
                .then(json => {
                    console.log(json);
                    this.setState({
                        game: json
                    })
                })
        }
    }

    renderButton = () => {
        // if game is loaded don't render button
        if (this.state.game === undefined) {
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