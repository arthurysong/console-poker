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


        fetch(`http://localhost:3001/authenticate`, options)
            .then(resp => resp.json())
            .then(json => {
                console.log("in loginUser action", json);
                if (json.user) {
                    dispatch({type: 'LOGIN', user: json.user})
                    localStorage.setItem("token", json.auth_token);
                // }
                } else if (json.error) {
                    dispatch({type: 'ADD_ERRORS', errors: [json.error.user_authentication] })
                }
            })
            // .catch(errors => { // i don't know how to catch bad request using catch.. hmm
            //     console.log('hello? catch the error?');
            //     console.log(errors);
            // });
    }
}

export const setLogin = () => {
    return dispatch => {
        const token = localStorage.getItem("token");
        if (token) {
            fetch(`http://localhost:3001/set_login`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(resp => resp.json())
                .then(json => {
                    console.log("in setLogin action", json);
                    if (json.user) {
                        dispatch({type: 'LOGIN', user: json.user})
                    }
                })
        } 
    }
}

export const logOut = () => {
    // I don't need to send anything to database.
    return dispatch => {
        localStorage.clear();
        dispatch({type: 'LOGOUT'})
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