import React from 'react';
import CheckoutForm from './CheckoutForm'
import CurrencyInput from 'react-currency-input';
import { connect } from 'react-redux';
import { addChips, fetchChips, unsetChips } from '../redux/dispatchActions';
// import { fetchWithToken } from '../utilities/fetchWithToken';

class CheckoutContainer extends React.Component{
    state = {
        amount: 0,
        name: ""
    }

    componentDidMount() {
        // get user's current amount.
        this.props.fetchChips();
    }

    componentWillUnmount(){
        this.props.unsetChips();
    }

    changeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render(){
        return(
            <div>
                Your Account: {this.props.chips} Chips<br/><br/>

                1 USD = 10000 Chips<br/>
                <label>
                $<CurrencyInput name="amount" value={this.state.amount} onChangeEvent={this.changeHandler}/>
                </label><br/>
                <label>
                    Full Name&nbsp;
                    <input type="text" name="name" value={this.state.name} onChange={this.changeHandler}/>
                </label>
                <CheckoutForm amount={this.state.amount} name={this.state.name} user={this.props.user} addChips={this.props.addChips}/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        chips: state.chips
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchChips: userId => dispatch(fetchChips(userId)),
        addChips: (amount, userId) => dispatch(addChips(amount, userId)),
        unsetChips: () => dispatch(unsetChips())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutContainer);