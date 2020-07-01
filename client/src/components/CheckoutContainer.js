import React from 'react';
import CheckoutForm from './CheckoutForm'
import CurrencyInput from 'react-currency-input';
import { connect } from 'react-redux';
import { addChips } from '../redux/dispatchActions';

class CheckoutContainer extends React.Component{
    state = {
        amount: 0,
        error: false
    }

    changeHandler = event => {
        this.setState({
            amount: event.target.value
        })
    }

    render(){
        return(
            <div>
                <CurrencyInput value={this.state.amount} onChangeEvent={this.changeHandler}/>
                <CheckoutForm amount={this.state.amount} addChips={this.props.addChips}/>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addChips: amount => dispatch(addChips(amount))
    }
}

export default connect(null, mapDispatchToProps)(CheckoutContainer);