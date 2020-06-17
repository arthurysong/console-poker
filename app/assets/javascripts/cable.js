// app/assets/javascripts/cable.js
//= require action_cable
//= require_self
//= require_tree ./channels

(function() {
    this.App || (this.App = {});
  
    App.cable = ActionCable.createConsumer(`ws://some.host:28080`);
  }).call(this);