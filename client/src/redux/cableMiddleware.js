import ActionCable from 'actioncable';

export default function cableMiddleware() {
  // const cable = ActionCable.createConsumer(`ws://127.0.0.1:3001/cable?token=${localStorage.getItem('token')}`);
  const cable = ActionCable.createConsumer(`ws://127.0.0.1:3001/cable`);

  return ({ dispatch, getState }) => next => (action) => {
    if (typeof(action) === 'function') {
      return next(action)
    }

    const {
      channel,
      room,
      leave
    } = action;
    const token = localStorage.getItem('token')
    const identifier = Object.assign({}, action, { token } )
    // console.log(identifier);

    if (!channel) {
      return next(action);
    }

    if (leave) {
        const subscription = cable.subscriptions.subscriptions.find(sub => sub.identifier === JSON.stringify(identifier))
        cable.subscriptions.remove(subscription);
        dispatch({ type: 'DELETE_ROOM' })
        dispatch({ type: 'CLEAR_MESSAGES' })
        return 
    }

    const received = result => {
        console.log(result)
        switch (result.type) {
            case 'current_room':
                dispatch({ type: 'SET_ROOM', room: result.room });
                break;
            case 'new_message':
                dispatch({ type: 'NEW_MESSAGE', message: result.message });
                break;
            default:
                break;
        }
    }

    const sendMessage = function(message) {
        this.perform('create_message', {
            content: message
        });
    }

    return cable.subscriptions.create( identifier, { received, sendMessage });
  };
}