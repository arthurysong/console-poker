import React from 'react';
import { findDOMNode } from 'react-dom';
import $ from 'jquery';
import terminal from 'jquery.terminal';
import 'jquery.terminal/css/jquery.terminal.css';

class GameConsole extends React.Component {
    state = {
        command: ""
    }
    componentDidMount() {
        const div = findDOMNode(this.refs.jterminal);
        terminal(window, $);
        $(div).terminal((cmd, t) => {
            t.echo('user said ' + cmd);
        }, {
            greetings: 'JQuery Terminal'
        })
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

    // renderForm = () => {
    //    return (
    //         <input id={"console-input"} type="text" onChange={this.changeHandler} value={this.state.command} />
    //    )
        
    // }
    renderTerminal = () => {
        
    }

    render(){
        return (
            <div id={"console"}>
                Console:
                
                {this.renderStatus()}
                {/* {this.renderForm()} */}
                <div ref="jterminal">
                </div> 
            </div>
        )
    }
}

export default GameConsole