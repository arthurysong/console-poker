import React from 'react';

class NewRoomForm extends React.Component {
    state = {
        name: ""
    }

    changeHandler = event => {
        this.setState({
            name: event.target.value
        })
    }

    createRoom = () => {
        const body = JSON.stringify(this.state)
        const token = localStorage.getItem('token');
        const options = {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body
        }
        return fetch(`http://localhost:3001/rooms`, options)
    }

    submitHandler = event => {
        event.preventDefault();
        this.createRoom(this.state)
            .then(resp => resp.json())
            .then(json => this.props.history.push(`/rooms/${json.id}`));
    }

    render() {
        return (
            <div>
                <form onSubmit={this.submitHandler}>
                    <label>
                        Name&nbsp;
                    <input type="text" name="name" onChange={this.changeHandler} value={this.state.name} />
                    </label>&nbsp;
                    <input type="submit" value="Create" />
                </form>
            </div>
        )
    }
}

export default NewRoomForm;