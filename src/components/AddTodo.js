import React from "react";

class AddTodo extends React.Component {
    state = {
        task: ''
    }

    handleOnChangeTask = (e) => {
        this.setState({
            task: e.target.value
        })
    }

    handleAddTask = () => {
        if (!this.state.task) {
            alert('Please type the task!')
            return;
        }
        const todo = {
            id: Math.floor(Math.random() * 10000),
            task: this.state.task
        }
        this.props.addNewTodo(todo)
    }
    render() {
        const { task } = this.state;
        return (
            <div className="add-todo">
                <input type="text" value={task} placeholder="What is the task today?"
                    onChange={(e) => this.handleOnChangeTask(e)} />
                <button type="button" className="add-task" onClick={() => this.handleAddTask()}>Add Task</button>
            </div>
        )
    }
}

export default AddTodo;