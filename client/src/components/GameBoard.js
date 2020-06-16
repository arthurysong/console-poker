import React from 'react';

class GameBoard extends React.Component {

    renderBoard = () => {
        if (this.state.game !== undefined){
            return (
                <>
                    {this.state.game.active_round.}
                </>
            )
        }
    }
    
    render() {
        return(
            <>
                {this.renderBoard()}
            </>
        )
    }
}

export default GameBoard;