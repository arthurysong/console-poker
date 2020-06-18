import React from 'react';

class GameConsole extends React.Component {
    renderStatus = () => {
        return (
            <>
                {this.props.round.status.map((s,index) => <li key={index}>{s}</li>)}
            </>
        )
    }
    render(){
        return (
            <div id={"console"}>
                Console:
                {this.renderStatus()}
            </div>
        )
    }
}

export default GameConsole