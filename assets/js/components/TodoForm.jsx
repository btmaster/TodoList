// ./assets/js/components/TodoItem.js

import React, {Component} from 'react';
import CONFIG from '../../config.json';

class TodoForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: ""
        }
    }

    handleChange(event) {
        this.setState({description: event.target.value});
    }

    handleSubmit(event)  {
        event.preventDefault();
        if (this.state.description) {
            console.log(this.state.description);
            fetch(CONFIG.API_URL + '/todo', {
                method: 'post',
                headers: {'Content-Type':'application/json'},
                body: {
                    "description": this.state.description
                }
            }).then((result) => {
                console.log(result);
            });
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
                        defaultValue={this.state.description}
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
