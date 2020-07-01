import React from 'react';
import CheckoutForm from './CheckoutForm'
import CurrencyInput from 'react-currency-input';
import { connect } from 'react-redux';
import { addChips } from '../redux/dispatchActions';
import { fetchWithToken } from '../utilities/fetchWithToken';

class CheckoutContainer extends React.Component{
    state = {
        chips: 0,
        amount: 0
    }

    componentDidMount() {
        // get user's current amount.
        console.log(this.props.match);
        fetchWithToken(`http://localhost:3001/users/${this.props.match.params.id}/get_chips`)
            .then(resp => resp.json())
            .then(json => {
                console.log(json)
                this.setState({
                    chips: json.chips
                })
            })
    }

    changeHandler = event => {
        this.setState({
            amount: event.target.value
        })
    }

    render(){
        return(
            <div>
                Your Account: {this.state.chips} Chips<br/><br/>

                1 USD = 10000 Chips<br/>
                <label>
                $<CurrencyInput value={this.state.amount} onChangeEvent={this.changeHandler}/>
                </label>
                <CheckoutForm amount={this.state.amount} user={this.props.user} addChips={this.props.addChips}/>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addChips: (amount, userId) => dispatch(addChips(amount, userId))
    }
}

export default connect(null, mapDispatchToProps)(CheckoutContainer);