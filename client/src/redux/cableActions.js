export function subscribeRoom(roomId) {
    return {
      channel: 'RoomChannel',
      room: `${roomId}`
    //   received: NEW_MESSAGE,
    }
  }
  
  export function unsubscribeRoom(roomId) {
    return {
      channel: 'RoomChannel',
      room: `${roomId}`,
      leave: true,
    }
  }
  
  // Action creator with received function:
//   export function subscribeRoom(roomId) {
//     return dispatch => dispatch({
//       channel: 'RoomChannel',
//       room: `${roomId}`,
//       received: data => {
//         switch (data.type) {
//             case 'current_room':
//                 dispatch({ type: 'SET_ROOM', room: data.room });
//                 // this.setState({ room: data.room })
//                 break;
//             case 'new_message':
//                 dispatch({ type: 'NEW_MESSAGE', message: data.message });
//                 // this.setState(prevState => ({ messages: [ ...prevState.messages, data.message ]}))
//                 break;
//             default:
//                 break;
//         }
//       }
//     //   dispatch({
//     //     type: NEW_MESSAGE,
//     //     payload: data.room,
//     //   })
//       ,
//     });
//   }