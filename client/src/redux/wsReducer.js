export default function wsReducer (state = { 
    wsConnected: false, 
    // wsSubscribedRList: false, 
    wsSubscribedRoom: false
}, action ) {
    switch (action.type){
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