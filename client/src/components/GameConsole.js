import React from 'react';
import { findDOMNode } from 'react-dom';
import $ from 'jquery';
import terminal from 'jquery.terminal';
import 'jquery.terminal/css/jquery.terminal.css';
import { postMoveWithToken } from '../utilities/fetchWithToken';


class GameConsole extends React.Component {
    state = {
        command: ""
    }

    componentDidMount() {
        const div = findDOMNode(this.refs.jterminal);
        const userId = this.props.user.id
        terminal(window, $);
        this.term = $(div).terminal([
            {
                fold: function(){
                    postMoveWithToken({ command: 'fold' })
                    // this equals terminal
                },
                check: function() {
                    console.log('check');
                    // this.props.subscription.make_move('check')
                },
                call: function() {
                    console.log('call')
                    // this.props.subscription.make_move('call')
                },
                raise: function(x) {
                    console.log('raise ', x)
                    // this.props.subscription.make_move('raise')
                },
                allin: function() {
                    console.log('allin')
                    // this.props.subscription.make_move('allin')
                }
    
            },
        // (cmd, t) => {
        //     t.echo('user said ' + cmd);
        // }
    ], {
            greetings: 'Game Terminal:'
        })
        this.props.round.status.forEach(s => this.term.echo(s))
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