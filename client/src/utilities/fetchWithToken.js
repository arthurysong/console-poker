export function fetchWithToken(url, options = {}){
    const token = localStorage.getItem("token");
    return fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            Authorization: `Bearer ${token}`
        }
    })
}

export function postMoveWithToken(commandObj) {
    const body = JSON.stringify(commandObj);
    const options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body
    }
    fetchWithToken(`http://localhost:3001/users/make_move`, options);
}