import React from 'react';
import LoginForm from './LoginForm';

class Home extends React.Component {
    componentDidMount(){
        if (this.props.isLoggedIn){
            this.props.history.push(`/rooms`)
        }
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