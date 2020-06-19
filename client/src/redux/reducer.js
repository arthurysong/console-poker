export default function resourceReducer (state = {
    processingAuth: false,
    isLoggedIn: false,
    user: undefined,
    errors: [],
    room: undefined,
    messages: [],
    game: undefined
}, action
) {
switch (action.type) {
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
    case 'SET_ROOM':
        return {
            ...state,
            room: action.room
        }
    case 'DELETE_ROOM':
        return {
            ...state,
            room: undefined
        }
    case 'NEW_MESSAGE':
        return {
            ...state,
            messages: [...state.messages, action.message]
        }
    case 'CLEAR_MESSAGES':
        return {
            ...state,
            messages: []
        }
    case 'SET_GAME':
        return {
            ...state,
            game: action.game
        }
    case 'DELETE_GAME':
        return {
            ...state,
            game: undefined
        }
    case 'UPDATE_STATUS':
        return {
            ...state,
            game: {
                ...state.game,
                status: action.status
            }
        }
    default:
        return state;
}
}