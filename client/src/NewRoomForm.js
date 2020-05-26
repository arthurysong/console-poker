import React from 'react';

function NewRoomForm ({ createRoom }) {
    return (
        <form onSubmit={createRoom}>
            <label>
                Name
            <input type="text" name="name" value={this.props.name} onChange={changeHandler}/><br/>
            </label>
            <input type="submit" value="Create" />
        </form>
    )
}

export default NewRoomForm;