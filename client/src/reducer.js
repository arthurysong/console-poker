export default function reducer (state = {
        rooms: [],
        processing_auth: false,
        isLoggedIn: false,
        user: {},
        errors: []
    }, action
) {
    switch (action.type) {
        case 'AUTH_REQUEST':
            return {
                ...state,
                processing_auth: true
            }
        case 'LOGIN':
            return {
                ...state,
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
                errors: [...state.errors, ...action.errors]
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