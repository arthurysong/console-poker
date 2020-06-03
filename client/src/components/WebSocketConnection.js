import React from 'react';
import { connect } from 'react-redux';
import { wsConnect } from '../redux/wsActions';

class WebSocketConnection extends React.Component {
    // i can return a promise here in connect
    // await that..?
    // this componentDidMount is fired after all it's children are fired.
    // so that kind of defeats the whole purpose...
    componentDidMount() {
        this.props.dispatch(wsConnect(this.props.host));
    }
    
    render() {
        return <div>{this.props.children}</div>
        // return <div></div>
    }
}

export default connect()(WebSocketConnection);

