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

    renderUser = () => {
        if (this.props.user) {
            return (
                <>
                    {this.props.user.username} ({this.props.chips})
                </>
            )
        }
    }

    render(){
        return(
            <div id="checkout_form">
                {this.renderUser()}<br/><br/>
                {/* {this.props.user.username} ({this.props.chips})<br/><br/> */}

                1 USD = 10000 Chips<br/>
                <label>
                <CurrencyInput name="amount" value={this.state.amount} onChangeEvent={this.changeHandler}/> $
                </label><br/>

                <div>
                    <label>
                        <span className="label">Full Name</span><br/>
                        <input type="text" name="name" value={this.state.name} onChange={this.changeHandler}/>
                    </label><br/>
                    <label>
                        <span className="label">Card Details</span><br/>
                    <CheckoutForm amount={this.state.amount} name={this.state.name} user={this.props.user} addChips={this.props.addChips}/>
                    </label>
                </div>
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