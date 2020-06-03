export default function resourceReducer (state = {
    rooms: [],
    room: undefined,
    processingAuth: false,
    isLoggedIn: false,
    user: {},
    errors: [],
    wsConnected: false
}, action
) {
switch (action.type) {
    //resources
    case 'ADD_ROOMS':
        return {
            ...state,
            rooms: action.rooms
        }
    case 'SET_ROOM':
        return {
            ...state,
            room: action.room
        }

        //websockets
    case 'WS_CONNECTED':
        console.log('this is not firing is it');
        return {
            ...state,
            wsConnected: true
        }
    case 'WS_DISCONNECTED':
        return {
            ...state,
            wsConnected: false
        }
    // case 'WS_ROOM_SUBSCRIBED':
    //     return {
    //         ...state,
    //         wsSubscribedToRoom: true
    //     }
    case 'WS_ROOM_UNSUBSCRIBED':
        return {
            ...state,
            room: undefined
        }

        //auth
    case 'AUTH_REQUEST':
        return {
            ...state,
            processingAuth: true
        }
    case 'AUTH_FAIL':
        return {
            ...state,
            processingAuth: false,
            isLoggedIn: false,
            user: {}
        }
    case 'AUTH_SUCCESS':
        return {
            ...state,
            processingAuth: false,
            isLoggedIn: true,
            user: action.user
        }
    case 'LOGOUT':
        return {
            ...state,
            isLoggedIn: false,
            user: {}
        }
    case 'ADD_ERRORS':
        return {
            ...state,
            errors: action.errors
        }
    case 'CLEAR_ERRORS':
        return {
            ...state,
            errors: []
        }
    // case 'WS_ROOMSLIST_SUBSCRIBED':
    //     return {
    //         ...state,
    //         wsSubscribedRList: true
    //     }
    // case 'WS_ROOMSLIST_UNSUBSCRIBED':
    //     return {
    //         ...state,
    //         wsSubscribedRList: false
    //     }
    default:
        return state;

}

}