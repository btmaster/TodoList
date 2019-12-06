// ./assets/js/components/Todos.js

import React, {Component} from 'react';
import CONFIG from '../../config.json';

// Components
import Loading from '../common/Loading';
import TodoForm from './TodoForm';
import TodosList from './TodosList';

/**
 * The overview list of todos
 *
 */
class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            loading: true
        }
        this.loadTodos();
    }

    /**
     * Load list of todos via the api call and set loading on false and put the result on the state
     *
     */
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
