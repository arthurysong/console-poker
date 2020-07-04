import React from 'react';
import handleAuthRedirect from '../redux/handleAuthRedirect';

class Home extends React.Component {
    componentDidMount(){
        this.props.setLogin(this.props.history); // can i pass in the history here? and have the action redirect?
    }

    refresh() {
        if (this.props.history.action === "POP") {
            handleAuthRedirect(this.props.isLoggedIn, this.props.history);
        }
    }

    render() {
        return (
            <div>
                {console.log(this.props.history.action)}
                {this.refresh()}
                {/* Home Component! */}
            </div>
        )
    }

}

export default Home