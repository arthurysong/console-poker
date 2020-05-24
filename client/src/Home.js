import React from 'react';

class Home extends React.Component {
    componentDidMount(){
        this.props.setLogin(this.props.history); // can i pass in the history here? and have the action redirect?
    }

    render() {
        return (
            <div>
                Home Component!
            </div>
        )
    }

}

export default Home