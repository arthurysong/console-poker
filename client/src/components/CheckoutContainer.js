import React from 'react';
import CheckoutForm from './CheckoutForm'
import CurrencyInput from 'react-currency-input';

class CheckoutContainer extends React.Component{
    state = {
        amount: 0,
        error: false
    }

    changeHandler = event => {
        this.setState({
            amount: event.target.value
        })
        // if (this.state.amount !+ )
    }

    render(){
        return(
            <div>
                <CurrencyInput value={this.state.amount} onChangeEvent={this.changeHandler}/>
                <CheckoutForm amount={this.state.amount}/>
            </div>
        )
    }
}

export default CheckoutContainer;