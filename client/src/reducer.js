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
        default:
            return state;
    }

}