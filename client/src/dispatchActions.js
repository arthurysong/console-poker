export const loginUser = (state) => {
    return dispatch => {
        const body = JSON.stringify(state)
        const options = {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body
        }

        dispatch({type: 'AUTH_REQUEST'})
        fetch(`http://localhost:3001/authenticate`, options)
            .then(resp => resp.json())
            .then(json => {
                console.log("in loginUser action", json);
                if (json.user) {
                    dispatch({type: 'AUTH_SUCCESS', user: json.user})
                    localStorage.setItem("token", json.auth_token);
                } else if (json.errors) {
                    dispatch({type: 'AUTH_FAIL'});
                    dispatch({type: 'ADD_ERRORS', errors: [json.errors.user_authentication] })
                }
            })
    }
}

export const setLogin = history => {
    return dispatch => {
        const token = localStorage.getItem("token");
        if (token) {
            dispatch({type: 'AUTH_REQUEST'});
            fetch(`http://localhost:3001/set_login`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(resp => resp.json())
                .then(json => {
                    console.log("in setLogin action", json);
                    if (json.user) {
                        dispatch({type: 'AUTH_SUCCESS', user: json.user})
                        history.push(`/rooms`);
                    } else if (json.error) {
                        dispatch({type: 'AUTH_FAIL'});
                    }
                })
        } else {
            history.push(`/login`);
        }
    }
}

export const logOut = history => {
    // I don't need to send anything to database.
    return dispatch => {
        localStorage.clear();
        dispatch({type: 'LOGOUT'})
        history.push(`/`);
    }
}

export const clearErrors = () => {
    return dispatch => {
        dispatch({type: 'CLEAR_ERRORS'});
    }
}

export const addError = (error) => {
    return dispatch => {
        dispatch({type: 'ADD_ERRORS', errors: [error]}) //add_errors accept an array of errors, so i can add both singular and plural errors
    }
}