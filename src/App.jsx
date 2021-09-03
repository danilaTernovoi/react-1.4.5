import React, { Component } from 'react';

import NewTaskForm from './components/NewTaskForm';
import TaskList from './components/TaskList';
import Footer from './components/Footer';

import { ACTIVE, COMPLETED, EDITING } from './constants';

class App extends Component {
  state = {
    currentFilter: 'all',
    tasks: [],
  };

  componentDidMount() {
    this.setState({
      tasks: JSON.parse(localStorage.getItem('tasks')) || [],
    });
  }

  componentDidUpdate() {
    const { tasks } = this.state;
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  getTask = (id) => {
    const { tasks } = this.state;
    return tasks.find((task) => task.id === id);
  }

  toggleCompleted = (id) => {
    const { tasks } = this.state;
    const toggledTask = tasks.find((task) => task.id === id);
    toggledTask.mod = toggledTask.mod === ACTIVE ? COMPLETED : ACTIVE;
    this.forceUpdate();
  };

  toggleEditing = (id) => {
    const { tasks } = this.state;
    const toggledTask = tasks.find((task) => task.id === id);
    toggledTask.mod = toggledTask.mod === ACTIVE ? EDITING : ACTIVE;
    this.forceUpdate();
  };

  createTask = (desc) => {
    const newTask = {
      desc,
      id: `${Date.now()}-${desc}`,
      mod: ACTIVE,
      timestamp: Date.now(),
    };

    this.setState((state) => ({
      tasks: [...state.tasks, newTask],
    }));
  };

  updateTasks = (id, newDescription) => {
    const taskToUpdate = this.getTask(id);
    taskToUpdate.desc = newDescription;
    taskToUpdate.mod = ACTIVE;
    this.forceUpdate();
  }

  deleteTask = (id) => {
    this.setState((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    }));
  };

  clearCompleted = () => {
    this.setState((state) => ({
      tasks: state.tasks.filter((task) => task.mod !== COMPLETED),
    }));
  };

  render() {
    const { tasks, currentFilter } = this.state;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>

          <NewTaskForm onCreate={this.createTask} list={tasks} />
        </header>

        <section className="main">
          <TaskList
            list={tasks.filter((task) => (currentFilter === 'all' ? task : task.mod === currentFilter))}
            onToggleCompleted={this.toggleCompleted}
            onToggleEditing={this.toggleEditing}
            onUpdateTask={this.updateTasks}
            onDeleteTask={this.deleteTask}
          />

          <Footer
            count={tasks.length}
            currentFilter={currentFilter}
            setCurrentFilter={(newFilter) => this.setState({ currentFilter: newFilter })}
            clearCompleted={this.clearCompleted}
          />
        </section>
      </section>
    );
  }
}

export default App;
