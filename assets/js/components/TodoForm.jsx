// ./assets/js/components/TodoItem.js

import React, {Component} from 'react';
import CONFIG from '../../config.json';

class TodoForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: "",
            error: false,
            success: false
        }
    }

    handleChange(event) {
        this.setState({
            description: event.target.value
        });
    }

    handleSubmit(event)  {
        event.preventDefault();
        if (this.state.description) {
            fetch(CONFIG.API_URL + '/todo', {
                method: 'post',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({
                    "description": this.state.description
                })
            }).then((result) => {
                if (result.status == 200) {
                    this.setState({
                        description: ""
                    });
                    this.props.loadTodos();
                    this.props.setSuccessMessage("Task is successfully added");
                } else {
                    this.props.setErrorMessage("There was an error when adding the task");
                }
            });
        } else {
            this.props.setErrorMessage("There is no description filled in");
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <input
                        type="text"
                        placeholder="Todo"
                        name="description"
                        value={this.state.description}
                        onChange={(e) => this.handleChange(e)}
                    />
                    {
                        !this.state.description
                        ?
                        <input
                            type="submit"
                            value="Add"
                            disabled
                        />
                        :
                        <input
                            type="submit"
                            value="Add"
                        />
                    }
                </form>
            </div>
        )
    }
}

export default TodoForm;
