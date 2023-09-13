import React from "react";
import AddTodo from "./AddTodo";
import { toast } from "react-toastify";


class TodoList extends React.Component {
    state = {
        listTodos: [
            { id: 'todo1', task: 'doing homework' },
            { id: 'todo2', task: 'doing homework1' },
            { id: 'todo3', task: 'doing homework2' },
        ],
        editTodo: {}
    }
    addNewTodo = (todo) => {
        this.setState({
            listTodos: [...this.state.listTodos, todo]
        })
        toast.success('Wow so easy!')
    }

    handleDeleteTodo = (todo) => {
        let currentTodo = this.state.listTodos;
        currentTodo = currentTodo.filter(item => item.id !== todo.id)
        this.setState({
            listTodos: currentTodo
        })
        toast.success('Delete Succesfully!')
    }

    handleEditTodo = (todo) => {
        let { editTodo, listTodos } = this.state;
        let isEmptyObj = Object.keys(editTodo).length === 0;
        if (isEmptyObj === false && editTodo.id === todo.id) {
            let listTodosCopy = [...listTodos];
            //Find index of specific object using findIndex method.    
            let objIndex = listTodosCopy.findIndex((item => item.id === todo.id));
            // Log object to Console.
            console.log("Before update: ", listTodosCopy[objIndex])
            //Update object's name property.
            listTodosCopy[objIndex].task = editTodo.task;
            this.setState({
                listTodos: listTodosCopy,
                editTodo: {}
            })
            toast.success('Update Task Succesfully!')
            return;
        }
        this.setState({
            editTodo: todo
        })
    }

    handleOnChangeEdit = (e) => {
        let editTodoCopy = { ...this.state.editTodo }
        editTodoCopy.task = e.target.value;
        this.setState({
            editTodo: editTodoCopy
        })
    }
    render() {
        let { listTodos, editTodo } = this.state;
        let isEmptyObj = Object.keys(editTodo).length === 0;
        console.log('>> check empty object: ', isEmptyObj)
        return (
            <div className="list-Todo-container">
                <AddTodo addNewTodo={this.addNewTodo} />
                <div className="list-todo-content">
                    {listTodos && listTodos.length > 0 && listTodos.map((item, index) => {
                        return (
                            <div className="todo-child" key={item.id}>
                                {isEmptyObj === true ?
                                    <span> {index + 1} - {item.task}</span>
                                    :
                                    <>
                                        {editTodo.id === item.id ?
                                            <span>
                                                {index + 1} - <input value={editTodo.task} onChange={(e) => this.handleOnChangeEdit(e)} />
                                            </span>
                                            :
                                            <span>
                                                {index + 1} - {item.task}
                                            </span>
                                        }
                                    </>
                                }
                                <button className="edit" onClick={() => this.handleEditTodo(item)}> {isEmptyObj === false && editTodo.id === item.id ? 'Save' : 'Edit'}
                                    {/* Edit */}
                                </button>
                                <button className="delete" onClick={() => this.handleDeleteTodo(item)}>Delete</button>
                            </div>
                        )
                    })
                    }
                </div>
            </div>
        )
    }
}

export default TodoList;