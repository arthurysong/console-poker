export default function reducer (state = {
        rooms: [],
        isLoggedIn: false,
        user: {}
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
        default:
            return state;
    }

}