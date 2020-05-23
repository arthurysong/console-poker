export default function reducer (state = {
        rooms: [],
        isLoggedIn: false,
        user: {},
        errors: []
    }, action
) {
    switch (action.type) {
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
                errors: [...action.errors]
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