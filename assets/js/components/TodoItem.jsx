// ./assets/js/components/TodoItem.js

import React, {Component} from 'react';

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

    render() {
        return (
            <li>
                <p>{this.state.todo.description}</p>
            </li>
        )
    }
}

export default TodoItem;
