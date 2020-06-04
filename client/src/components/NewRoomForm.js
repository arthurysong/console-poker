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

    submitHandler = event => {
        event.preventDefault();
        this.props.createRoom(this.state)
            .then(json => this.props.history.push(`/rooms/${json.id}`));
    }

    render() {
        return (
            <div>
                <form onSubmit={this.submitHandler}>
                    <label>
                        Name&nbsp;
                    <input type="text" name="name" onChange={this.changeHandler} value={this.state.name} /><br/>
                    </label>
                    <input type="submit" value="Create" />
                </form>
            </div>
        )
    }
}

export default NewRoomForm;