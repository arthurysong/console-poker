import ActionCable from 'actioncable';
import Console from '../components/Console';

export default function cableMiddleware() {
  const cable = ActionCable.createConsumer(`ws://127.0.0.1:3001/cable?token=${localStorage.getItem('token')}`);

  return ({ dispatch, getState }) => next => (action) => {
    if (typeof(action) === 'function') {
      return next(action)
    }

    const {
      channel,
      room,
      leave,
    } = action;
    // let { received } = action;
    // console.log("in middleware");
    // console.log(action);
    // console.log(cable.subscriptions)

    if (!channel) {
      return next(action);
    }

    if (leave) {
        // console.log(cable.subscriptions)
        const subscription = cable.subscriptions.subscriptions.find(sub => sub.identifier === JSON.stringify({ channel, room }))
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

    // return cable.subscriptions.create({ channel, room }, { received });
    return cable.subscriptions.create({ channel, room }, { received, sendMessage });
    // console.log(cable.subscriptions)
  };
}