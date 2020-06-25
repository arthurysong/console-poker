import React from 'react';
import { findDOMNode } from 'react-dom';
import $ from 'jquery';
import terminal from 'jquery.terminal';
import 'jquery.terminal/css/jquery.terminal.css';
import { postMoveWithToken, startNewRound } from '../utilities/fetchWithToken';


class GameConsole extends React.Component {
    componentDidMount() {
        const div = findDOMNode(this.refs.jterminal);
        const gameId = this.props.gameId
        terminal(window, $);
        this.term = $(div).terminal([
            {
                start: function(){
                    startNewRound(gameId);
                },
                fold: function(){
                    postMoveWithToken({ command: 'fold' })
                },
                check: function() {
                    postMoveWithToken({ command: 'check' })
                },
                call: function() {
                    postMoveWithToken({ command: 'call' })
                },
                raise: function(x) {
                    postMoveWithToken({ command: 'raise', amount: x })
                },
                allin: function() {
                    postMoveWithToken({ command: 'allin' })
                }
    
            },
        // (cmd, t) => {
        //     t.echo('user said ' + cmd);
        // }
    ], {
            greetings: 'Game Terminal:'
        })
        this.props.status.forEach(s => this.term.echo(s))
    }

    shouldComponentUpdate(nextProps) {
        if (this.props.roundId !== nextProps.roundId) {
            nextProps.status.forEach(s => this.term.echo(s));
        } else if (nextProps.gameErrors) {
            this.term.echo(nextProps.gameErrors);
            this.props.clearGameErrors();
        } {
            const newStatusMessages = nextProps.status.slice(this.props.status.length)
            newStatusMessages.forEach(s => this.term.echo(s))
        }

        return false;
    }



    render(){
        return (
            <div id={"console"}>
                <div ref="jterminal" id="jterminal">
                </div> 
            </div>
        )
    }
}

export default GameConsole