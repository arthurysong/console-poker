import React from 'react';
import { findDOMNode } from 'react-dom';
import $ from 'jquery';
import terminal from 'jquery.terminal';
import 'jquery.terminal/css/jquery.terminal.css';
import { postMoveWithToken } from '../utilities/fetchWithToken';


class GameConsole extends React.Component {
    componentDidMount() {
        const div = findDOMNode(this.refs.jterminal);
        const userId = this.props.user.id
        terminal(window, $);
        this.term = $(div).terminal([
            {
                fold: function(){
                    postMoveWithToken({ command: 'fold' })
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
        this.props.status.forEach(s => this.term.echo(s))
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log(this.props.status);
        // const newStatusMessages = nextProps.status.slice(this.props.status.length)
        // newStatusMessages.forEach(s => this.term.echo(s))

        // return false;
        return true
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