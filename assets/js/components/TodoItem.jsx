// ./assets/js/components/TodoItem.js

import React, {Component} from 'react';
import CONFIG from '../../config.json';

class TodoItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todo: props.todo
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
      if (nextProps.todo !== prevState.todo) {
        return ({ todo: nextProps.todo })
      }

      return null;
    }

    handleCheckbox() {
        fetch(CONFIG.API_URL + '/todo/done/' + this.state.todo.id, {
            method: 'put',
            headers: {'Content-Type':'application/json'}
        }).then((result) => {
            if (result.status == 200) {
                this.state.todo.done = !this.state.todo.done;
                this.setState({
                    todo: this.state.todo
                });
            } else {
                this.props.setErrorMessage("There was an error");
            }
        });
    }

    render() {
        return (
            <li>
                <p>
                    <input
                        type="checkbox"
                        checked={this.state.todo.done}
                        onChange={() => this.handleCheckbox()}
                    />
                    {this.state.todo.description}
                </p>
            </li>
        )
    }
}

export default TodoItem;
