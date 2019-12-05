// ./assets/js/components/TodoList.js

import React, {Component} from 'react';
import CONFIG from '../../config.json';

// Components
import Loading from '../common/Loading';
import Messages from '../common/Messages';
import TodoForm from './TodoForm';
import TodosList from './TodosList';

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            loading: true,
            success: false,
            error: false
        }
        this.loadTodos();
    }

    loadTodos() {
        fetch(CONFIG.API_URL + '/todo')
            .then(res => res.json())
            .then((result) => {
                console.log(result);
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
        console.log(this.state.todos);
        return (
            <div>
                <Messages error={this.state.error} success={this.state.success} />
                <h1>Todo's</h1>
                {
                    this.state.loading
                    ?
                    <Loading />
                    :
                    <div>
                        <TodoForm
                            loadTodos={() => this.loadTodos()}
                            setSuccessMessage={(message) => this.setMessage(message, "success")}
                            setErrorMessage={(message) => this.setMessage(message, "error")}
                        />
                        <TodosList todos={this.state.todos} />
                    </div>
                }
            </div>
        )
    }
}

export default TodoList;
