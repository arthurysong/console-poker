import React from 'react';
import { connect } from 'react-redux';

class Errors extends React.Component {
    render(){
        return(
            <div>
                {this.props.errors}
            </div> 
        )
    }
}


export default connect({ errors })(Errors)