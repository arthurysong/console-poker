export default function resourceReducer (state = {
        rooms: [],
        room: {}
    }, action
) {
    switch (action.type) {
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
        default:
            return state;
    }

}