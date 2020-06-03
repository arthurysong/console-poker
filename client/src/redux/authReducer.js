export default function authReducer (state = {
    processingAuth: false,
    isLoggedIn: false,
    user: {},
    errors: []
}, action) {
    switch(action.type){
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
        default:
            return state;
    }
}