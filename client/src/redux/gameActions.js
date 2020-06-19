export const setGame = roomId => dispatch => 
    new Promise((res, err) => {
        const token = localStorage.getItem("token");
        if (token) {
            fetch(`http://localhost:3001/rooms/${roomId}/games`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(resp => resp.json())
                .then(json => {
                    if (!json.error){
                        dispatch({ type: 'SET_GAME', game: json });
                        dispatch({ type: 'SET_STATUS', status: json.active_round.status })
                    }
                    res(json);
                });
        }
    }
)

export const startGame = roomId => {
    return dispatch => {
        const token = localStorage.getItem("token");
        if (token) {
            fetch(`http://localhost:3001/rooms/${roomId}/games`, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(resp => resp.json())
                .then(json => {
                    console.log(json);
                    dispatch({ type: 'SET_GAME', game: json })
                })
        }
    }
}

export function subscribeGame(gameId) {
    return {
      channel: 'GameChannel',
      game: `${gameId}`
    }
}

export function unsubscribeGame(gameId) {
    return {
      channel: 'GameChannel',
      game: `${gameId}`,
      leave: true
    }
}   