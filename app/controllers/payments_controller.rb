require 'stripe'

class PaymentsController < ApplicationController
    skip_before_action :authenticate_request
    Stripe.api_key = "sk_test_51GqNn2Kj8jVe4aIuNY5sxkfGCrpv5HAPSmMQdzkpJkvnTNYk2LCMQ0TD9jRpG9G8HmwmrUZRiizGcc2sFHaxgeEo00RsFY5nMT"
    
    def secret
        intent = Stripe::PaymentIntent.create({
            amount: 1000,
            currency: 'usd',
            # Verify your integration in this guide by including this parameter
            metadata: {integration_check: 'accept_a_payment'},
          })
        render json: { client_secret: intent.client_secret }
    end

    private
    
    def payment_params

    end
end
