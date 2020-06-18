import React from 'react';

class GameConsole extends React.Component {
    state = {
        command: ""
    }

    renderStatus = () => {
        return (
            <ul>
                {this.props.round.status.map((s,index) => <li key={index}>{s}</li>)}
            </ul>
        )
    }

    changeHandler = event => {
        console.log(event.key);
    }

    renderForm = () => {
       return (
            <input id={"console-input"} type="text" onChange={this.changeHandler} value={this.state.command} />
       )
        
    }
    render(){
        return (
            <div id={"console"}>
                Console:
                
                {this.renderStatus()}
                {this.renderForm()}
            </div>
        )
    }
}

export default GameConsole