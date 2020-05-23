import React from 'react';
import { connect } from 'react-redux';
import { clearErrors } from './dispatchActions';

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
                {/* {console.log(this.props.errors)} */}
                {this.props.errors}
            </div> 
        )
    }
}

const mapStateToProps = state => {
    return { errors: state.errors }
}

const mapDispatchToProps = dispatch => {
    return { clearErrors: () => dispatch(clearErrors())}
}
export default connect(mapStateToProps, mapDispatchToProps)(Errors);