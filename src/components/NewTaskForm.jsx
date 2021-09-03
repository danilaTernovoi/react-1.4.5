import React, { Component } from 'react';
import PropTypes from 'prop-types';
import upperFirstLetter from '../upperFirstLetter';

class NewTaskForm extends Component {
  state = {
    value: '',
  };

  changeHandler = (event) => {
    this.setState({ value: event.target.value });
  };

  keydownHandler = (event) => {
    if (event.key === 'Enter') {
      const { onCreate: createTask } = this.props;
      const { value } = this.state;
      createTask(upperFirstLetter(value));
      this.setState({ value: '' });
    }
  };

  render() {
    const { list } = this.props;
    const { value } = this.state;

    const isClone = !!list.find((task) => task.desc === upperFirstLetter(value).trim());
    const isVoid = !value;
    const isValid = !isClone && !isVoid;
    return (
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        value={value}
        onChange={this.changeHandler}
        onKeyDown={isValid ? this.keydownHandler : () => {}}
        style={{
          outline: isValid ? '' : '1px solid crimson',
        }}
      />
    );
  }
}

NewTaskForm.propTypes = {
  onCreate: PropTypes.func.isRequired,
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default NewTaskForm;
