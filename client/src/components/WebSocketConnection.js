import React from 'react';
import { connect } from 'react-redux';
import { wsConnect } from '../redux/wsActions';

class WebSocketConnection extends React.Component {
    componentDidMount() {
        this.props.dispatch(wsConnect(this.props.host));
    }
    
    render() {
        return <div>{this.props.children}</div>
        // return <div></div>
    }
}

export default connect()(WebSocketConnection);

