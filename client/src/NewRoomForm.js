import React from 'react';

class NewRoomForm extends React.Component {
    render() {
        return (
            <div>
                <form onSubmit={this.props.createRoom}>
                    <label>
                        Name
                    <input type="text" name="name" onChange={this.props.changeHandler} value={this.props.name} /><br/>
                    </label>
                    <input type="submit" value="Create" />
                </form>
            </div>
        )
    }
}

export default NewRoomForm;