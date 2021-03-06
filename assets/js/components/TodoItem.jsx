// ./assets/js/components/TodoItem.js

import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import SweetAlert from 'sweetalert';
import CONFIG from '../../config.json';

/**
 * A todo item from the todo list
 *
 */
class TodoItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todo: props.todo,
            edit: false
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
      if (nextProps.todo !== prevState.todo) {
        return ({ todo: nextProps.todo })
      }

      return null;
    }

    /**
     * Handle the change of the checkbox field and set the todo done or not done with api call
     *
     */
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
                swal("Oops!", "Something went wrong!", "error");
            }
        });
    }

    /**
     * Remove a todo from the list
     *
     */
    removeTodo() {
        swal({
          title: "Are you sure?",
          text: "Are you sure that you want to remove this todo?",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
        .then(willDelete => {
          if (willDelete) {
              fetch(CONFIG.API_URL + '/todo/' + this.state.todo.id, {
                  method: 'delete',
                  headers: {'Content-Type':'application/json'}
              }).then((result) => {
                  if (result.status == 200) {
                      //Load todo list again, so removed item dissapears
                      this.props.loadTodos();
                      swal("Success!", "Your todo is removed!", "success");
                  } else {
                      swal("Oops!", "Something went wrong!", "error");
                  }
              });
          }
        });
    }

    /**
     * Handle the change of the description input field
     *
     * @param {object} event
     */
    handleDescriptionChange(event) {
        this.state.todo.description = event.target.value;
        this.setState({
            todo: this.state.todo,
        });
    }

    /**
    * Handle the form submit of a edit of a existing todo item
     *
     * @param {object} event
     */
    handleSubmitDescription(event) {
        event.preventDefault();
        fetch(CONFIG.API_URL + '/todo/' + this.state.todo.id, {
            method: 'put',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                "description": this.state.todo.description
            })
        }).then((result) => {
            if (result.status == 200) {
                this.setState({
                    edit: false
                });

                //Load list of todo's again with the todo edited
                this.props.loadTodos();
                swal("Success!", "Your task is updated!", "success");
            } else {
                swal("Oops!", "Something went wrong!", "error");
            }
        });
    }

    render() {
        return (
            <li className={this.state.todo.done ? "done" : "not-done"}>
                <p>
                    <input
                        type="checkbox"
                        checked={this.state.todo.done}
                        onChange={() => this.handleCheckbox()}
                    />
                    {
                        this.state.edit
                        ?
                        <span>
                            <input
                                type="text"
                                value={this.state.todo.description}
                                onChange={(e) => this.handleDescriptionChange(e)}
                            />
                            {
                                this.state.todo.description
                                ?
                                <span className="icon check-icon">
                                    <a onClick={(e) => this.handleSubmitDescription(e)}>
                                        <FontAwesomeIcon icon={faCheck} />
                                    </a>
                                </span>
                                :
                                <span className="icon disabled-icon">
                                    <FontAwesomeIcon icon={faCheck} />
                                </span>
                            }
                        </span>
                        :
                        <span>
                            <span className="description">{this.state.todo.description}</span>
                            <span className="icon edit-icon">
                                <a onClick={() => this.setState({edit: !this.state.edit})}>
                                    <FontAwesomeIcon icon={faPencilAlt} />
                                </a>
                            </span>
                        </span>
                    }
                    <span className="icon remove-icon">
                        <a onClick={() => this.removeTodo()}>
                            <FontAwesomeIcon icon={faTrashAlt} />
                        </a>
                    </span>
                </p>
            </li>
        )
    }
}

export default TodoItem;
