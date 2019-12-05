// ./assets/js/components/TodosList.js

import React from 'react';
import TodoItem from './TodoItem';

export default function TodosList(props) {
    const listItems = props.todos.map((todo) =>
      <TodoItem key={todo.id} todo={todo} />
    );

    return (
        <ul>{listItems}</ul>
    );
}
