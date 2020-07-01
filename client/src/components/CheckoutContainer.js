import React from 'react';
import CheckoutForm from './CheckoutForm'
import CurrencyInput from 'react-currency-input';
import { connect } from 'react-redux';
import { addChips, fetchChips } from '../redux/dispatchActions';

class CheckoutContainer extends React.Component{
    state = {
        chips: 0,
        amount: 0
    }

    componentDidMount() {
        // get user's current amount.
        fetchChips().then(json => this.setState({
            chips: json.chips
        }))
    }

    changeHandler = event => {
        this.setState({
            amount: event.target.value
        })
    }

    render(){
        return(
            <div>
                1 USD = 10000 Chips<br/>
                <label>
                $<CurrencyInput value={this.state.amount} onChangeEvent={this.changeHandler}/>
                </label>
                <CheckoutForm amount={this.state.amount} addChips={this.props.addChips}/>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchChips: () => dispatch(fetchChips()),
        addChips: amount => dispatch(addChips(amount))
    }
}

export default connect(null, mapDispatchToProps)(CheckoutContainer);