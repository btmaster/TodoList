// ./assets/js/components/TodosList.js

import React from 'react';
import TodoItem from './TodoItem';

/**
 * Rendering of the todolist with its TodoItem object
 *
 */
export default function TodosList(props) {
    const listItems = props.todos.map((todo) =>
      <TodoItem key={todo.id} todo={todo} loadTodos={props.loadTodos}/>
    );

    return (
        <div className="list">
            <ul>{listItems}</ul>
        </div>
    );
}
