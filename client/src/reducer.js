export default function reducer (state = {
        rooms: [],
        processingAuth: false,
        isLoggedIn: false,
        wsConnected: false,
        user: {},
        errors: []
    }, action
) {
    switch (action.type) {
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
        case 'ADD_ROOMS':
            return {
                ...state,
                rooms: action.rooms
            }
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
        default:
            return state;
    }

}