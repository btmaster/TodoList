// ./assets/js/components/Todos.js

import React, {Component} from 'react';
import CONFIG from '../../config.json';

// Components
import Loading from '../common/Loading';
import TodoForm from './TodoForm';
import TodosList from './TodosList';

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            loading: true
        }
        this.loadTodos();
    }

    loadTodos() {
        fetch(CONFIG.API_URL + '/todo')
            .then(res => res.json())
            .then((result) => {
                this.setState({
                    loading: false,
                    todos: result
                });
            });
    }

    setMessage(message, type) {
        this.setState({
            [type]: message
        });
    }

    render() {
        return (
            <div>
                <h1>Todo's</h1>
                {
                    this.state.loading
                    ?
                    <Loading />
                    :
                    <div>
                        <TodoForm
                            loadTodos={() => this.loadTodos()}
                        />
                        <TodosList
                            todos={this.state.todos}
                            loadTodos={() => this.loadTodos()}
                        />
                    </div>
                }
            </div>
        )
    }
}

export default TodoList;
