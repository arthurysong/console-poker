import * as actions from './wsActions';
import { createConsumer } from "@rails/actioncable";
import { updateRooms, setRoom } from './dispatchActions';

const socketMiddleware = () => {
    let connection = null;
    let roomSub = null;
    let roomListSub = null;

    const onConnect = store => event => {
        console.log('websocket connected');
        store.dispatch(actions.wsConnected(event.target.url));
    }

    const onDisconnect = store => event => {
        console.log('websocket disconnected');
        store.dispatch(actions.wsDisconnected);
    }

    // const onMessage = store => (event) => {
    //     let payload = JSON.parse(event.data);
    //     console.log('receiving server message');
    //     console.log(payload.message)
        
    //     payload = payload.message || payload
    //     switch (payload.type) {
    //         case 'update_rooms':
    //             console.log('update_rooms switch case');
    //             store.dispatch(updateRooms(payload.rooms));
    //             break;
    //         case 'set_room':
    //             console.log('setting room');
    //             store.dispatch(setRoom(payload.room))
    //             break;
    //         default:
    //             break;
    //     }
    // }

    const onReceive = store => event => {
        console.log(event);
    }


    //middleware part of function
    return store => next => action => {
        switch (action.type) {
            case 'WS_CONNECT':
                if (connection !== null){
                    connection = null;
                }

                console.log('ws connecting');
                connection = createConsumer(action.host); 
                
                break;
            case 'WS_DISCONNECT':
                // if (socket !== null){
                //     socket.close();
                // }
                // socket = null;
                connection = null;
                console.log('websocket closed');
                break;

            case 'WS_SUBSCRIBE_ROOMS_LIST':
                connection.subscriptions.create("RoomsListChannel", {
                    connected(){
                        this.onConnect();
                    },
                    disconnected(){
                        this.onDisconnect();
                    },
                    received: data => {
                        console.log('received', data)
                    }


                })
                // socket.send(JSON.stringify({"command": "subscribe","identifier":"{\"channel\":\"RoomsListChannel\"}"})) 
                break;
            case 'WS_UNSUBSCRIBE_ROOMS_LIST':
                // socket.send(JSON.stringify({"command": "unsubscribe","identifier":"{\"channel\":\"RoomsListChannel\"}"}));
                break;
            case 'WS_CREATE_ROOM':
                // const create_room_info = {
                //     command: 'message',
                //     identifier: JSON.stringify({channel: "RoomsListChannel"}),
                //     data: JSON.stringify({action: "create_room", content: action.state})
                // }
                // socket.send(JSON.stringify(create_room_info));
                break;

            case 'WS_SUBSCRIBE_ROOM':
                // const subscribe_room_info = {
                //     command: 'subscribe',
                //     identifier: JSON.stringify({channel: "RoomChannel", room: action.roomId })
                // }
                // socket.send(JSON.stringify(subscribe_room_info)); 
                // console.log('subscribing to room', action.roomId);
                break;
            case 'WS_UNSUBSCRIBE_ROOM':
                // console.log('unsubscribing from room channel...')
                // const unsubscribe_room_info = {
                //     command: 'unsubscribe',
                //     identifier: JSON.stringify({channel: "RoomChannel" })
                // }
                // socket.send(JSON.stringify(unsubscribe_room_info));
                // store.dispatch(actions.wsUnsubscribedRoom());
                break;

            
            case 'NEW_MESSAGE':
                // console.log('sending message', action.msg);
                break;
            default:
                console.log('the next action: ', action);
                return next(action);
        }
    }

}

export default socketMiddleware();