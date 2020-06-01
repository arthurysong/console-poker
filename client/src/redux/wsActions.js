
export const wsConnect = host => ({ type: 'WS_CONNECT', host });
export const wsConnecting = host => ({ type: 'WS_CONNECTING', host });
export const wsConnected = host => ({ type: 'WS_CONNECTED', host });
export const wsDisconnect = host => ({ type: 'WS_DISCONNECT', host });
export const wsDisconnected = host => ({ type: 'WS_DISCONNECTED', host });

export const wsSubscribeRoomsList = host => ({ type: 'SUBSCRIBE_ROOMS_LIST', host });
export const wsUnsubscribeRoomsList = host => ({ type: 'UNSUBSCRIBE_ROOMS_LIST', host });
export const wsCreateRoom = state => ({ type: 'CREATE_ROOM', state });

export const wsSubscribeRoom = roomId => ({ type: 'SUBSCRIBE_ROOM', roomId });
export const wsUnsubscribeRoom = host => ({ type: 'UNSUBSCRIBE_ROOM', host });

export const wsSend = msg => ({ type: 'NEW_MESSAGE', msg });