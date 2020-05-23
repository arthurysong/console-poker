import React from 'react';
import LoginForm from './LoginForm';

class Home extends React.Component {
    componentDidMount(){
        this.props.setLogin(); // can i pass in the history here? and have the action redirect?
    }

    render() {
        return (
            <div>
                <LoginForm/>
            </div>
        )
    }

}

export default Home