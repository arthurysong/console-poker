import React from 'react';
import CheckoutForm from './CheckoutForm'
import CurrencyInput from 'react-currency-input';
import { connect } from 'react-redux';
import { addChips, fetchChips, unsetChips } from '../redux/dispatchActions';
// import { fetchWithToken } from '../utilities/fetchWithToken';

class CheckoutContainer extends React.Component{
    state = {
        amount: 0,
        name: "",
        errors: "",
        success: ""
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

    handleErrors = errors => {
        this.setState({
            errors: errors
        })

    }

    renderErrors = () => {
        if (this.state.errors) {
            return (
                <span className="nes-text is-error">
                    {this.state.errors}
                </span>
            )
        }
    }

    handleSuccess = () => {
        this.setState({
            success: "Deposit Successful!"
        })
    }

    renderSuccess = () => {
        if (this.state.success) {
            return(
                <span className="nes-text is-success">
                    {this.state.success}
                </span>
            )
        }
    }
    render(){
        return(
            <div id="checkout_form">
                {this.renderUser()}<br/><br/>
                {/* {this.props.user.username} ({this.props.chips})<br/><br/> */}

                {this.renderErrors()}
                {this.renderSuccess()}
                1 USD = 10000 Chips<br/>
                <label> 
                    {/* input must be at least .50 */}
                <CurrencyInput className="nes-input" name="amount" value={this.state.amount} onChangeEvent={this.changeHandler}/>
                </label><br/><br/>

                <div>
                    <label>
                        <span className="label">Full Name</span><br/>
                        <input className="nes-input" type="text" name="name" value={this.state.name} onChange={this.changeHandler}/>
                    </label><br/>
                    <label>
                        <span className="label">Card Details</span><br/>
                    <CheckoutForm handleErrors={this.handleErrors} handleSuccess={this.handleSuccess}
                    amount={this.state.amount} name={this.state.name} user={this.props.user} addChips={this.props.addChips}/>
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