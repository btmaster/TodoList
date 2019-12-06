// ./assets/js/components/TodoForm.js

import React, {Component} from 'react';
import CONFIG from '../../config.json';
import SweetAlert from 'sweetalert';

/**
 * A form to add a new todo to the overview
 *
 */
class TodoForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            description: "",
            error: false,
            success: false
        }
    }

    /**
     * Handle change on input field
     *
     * @param {object} event
     */
    handleChange(event) {
        this.setState({
            description: event.target.value
        });
    }

    /**
     * Handle the form submit of a new todo item
     *
     * @param {object} event
     */
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
                    
                    //Load todo list again, so new item shows up.
                    this.props.loadTodos();
                    swal("Success!", "Your task is added!", "success");
                } else {
                    swal("Oops!", "Something went wrong!", "error");
                }
            });
        } else {
            swal("Oops!", "Description is empty", "error");
        }
    }

    render() {
        return (
            <div className="form-add">
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
