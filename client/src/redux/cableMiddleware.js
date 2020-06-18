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
      leave,
    } = action;
    const token = localStorage.getItem('token')

    if (!channel) {
      return next(action);
    }

    if (leave) {
        // console.log(cable.subscriptions)
        const subscription = cable.subscriptions.subscriptions.find(sub => sub.identifier === JSON.stringify({ channel, room, token }))
        // console.log(subscription)
    //   _.find(
    //     cable.subscriptions.subscriptions,
    //     sub => sub.identifier === JSON.stringify({ channel, room }),
    //   );
        cable.subscriptions.remove(subscription);
        dispatch({ type: 'DELETE_ROOM' })
        dispatch({ type: 'CLEAR_MESSAGES' })
        return 
    }

    // if (typeof(received) === 'string') {
    //   received = result => dispatch({ type: received, result })
    // }

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

    const setUser = function(){
      this.perform('set_user', {
        token: `${localStorage.getItem('token')}`
      })
    }


    // return cable.subscriptions.create({ channel, room }, { received });
    return cable.subscriptions.create({ channel, room, token }, { received, sendMessage });
    // when subscription connects, perform setUser to set user.

    // console.log(cable.subscriptions)
  };
}