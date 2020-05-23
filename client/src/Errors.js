import React from 'react';
import { connect } from 'react-redux';

class Errors extends React.Component {
    componentDidMount() {
        this.props.clearErrors();
    }

    componentWillUnmount(){
        this.props.clearErrors();
    }

    render(){
        return(
            <div>
                {console.log(this.props.errors)}
                {this.props.errors}
            </div> 
        )
    }
}

const mapStateToProps = state => {
    return { errors: state.errors }
}

export default connect(mapStateToProps)(Errors);