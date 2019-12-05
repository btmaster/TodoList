// ./assets/js/components/TodoItem.js

import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import SweetAlert from 'sweetalert';
import CONFIG from '../../config.json';

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

    removeTodo() {
        swal({
          title: "Are you sure?",
          text: "Are you sure that you want to leave this page?",
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
                      this.props.loadTodos();
                      swal("Success!", "Your task is removed!", "success");
                  } else {
                      swal("Oops!", "Something went wrong!", "error");
                  }
              });
          }
        });
    }

    handleDescriptionChange(event) {
        this.state.todo.description = event.target.value;
        this.setState({
            todo: this.state.todo,
        });
    }

    handleSubmitDescription(event) {
        event.preventDefault();
        fetch(CONFIG.API_URL + '/todo/' + this.state.todo.id, {
            method: 'put',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                "description": this.state.todo.description
            })
        }).then((result) => {
            console.log(result);
            if (result.status == 200) {
                this.setState({
                    edit: false
                })
                this.props.loadTodos();
                swal("Success!", "Your task is updated!", "success");
            } else {
                swal("Oops!", "Something went wrong!", "error");
            }
        });
    }

    render() {
        console.log(this.state.todo.description);
        return (
            <li>
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
                            <input type="text" value={this.state.todo.description} onChange={(e) => this.handleDescriptionChange(e)} />
                            {
                                this.state.todo.description
                                ?
                                <a onClick={(e) => this.handleSubmitDescription(e)}>
                                    <FontAwesomeIcon icon={faCheck} />
                                </a>
                                :
                                <span className="disabled">
                                    <FontAwesomeIcon icon={faCheck} />
                                </span>
                            }
                        </span>
                        :
                        <span>
                            {this.state.todo.description}
                            <a onClick={() => this.setState({edit: !this.state.edit})}>
                                <FontAwesomeIcon icon={faPencilAlt} />
                            </a>
                        </span>
                    }
                    <a onClick={() => this.removeTodo()}>
                        <FontAwesomeIcon icon={faTrashAlt} />
                    </a>
                </p>
            </li>
        )
    }
}

export default TodoItem;
