import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { COMPLETED, EDITING } from '../constants';

class Task extends Component {
  constructor(props) {
    super(props);

    this.interval = null;
    this.task = props.task;
    this.inputRef = createRef();
    this.changeH = this.changeH.bind(this);
    this.keydownH = this.keydownH.bind(this);
    this.state = {
      created: '',
      localDesc: this.task.desc,
    };
  }


  componentDidMount() {
    const { task } = this.props;

    this.setState({
      created: formatDistanceToNow(task.timestamp, {
        addSuffix: true,
        includeSeconds: true,
      }),
    });

    this.interval = setInterval(() => {
      this.setState({
        created: formatDistanceToNow(task.timestamp, {
          addSuffix: true,
          includeSeconds: true,
        }),
      });
    }, 1000);
  }

  componentDidUpdate() {
    const input = this.inputRef.current;

    if (input) input.focus();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  changeH = (event) => {
    this.setState({ localDesc: event.target.value })
  };

  keydownH = (event) => {
    if (event.key === 'Enter') {
      const { task } = this.props;
      const { id } = task;
      const { updateSelf } = this.props;
      const { localDesc } = this.state;

      updateSelf(id, localDesc);
    }
  };

  render() {
    const {
      task,
      toggleCompletedSelf,
      toggleEditingSelf,
      deleteSelf,
    } = this.props;
    const { mod, id } = task;
    const { created, localDesc } = this.state;

    return (
      <li className={mod}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            onChange={toggleCompletedSelf}
            checked={mod === COMPLETED}
          />

          <label>
            <span className="description">{localDesc}</span>
            <span className="created">{created}</span>
          </label>

          <button
            type="button"
            aria-label="изменить задачу"
            className="icon icon-edit"
            onClick={() => toggleEditingSelf(id)}
          />

          <button
            type="button"
            aria-label="удалить задачу"
            className="icon icon-destroy"
            onClick={deleteSelf}
          />
        </div>
        {
          mod === EDITING &&
          <input
            type="text"
            className="edit"
            ref={this.inputRef}
            value={localDesc}
            onChange={this.changeH}
            onKeyDown={this.keydownH}
          />
        }
      </li>
    );
  }
}

Task.propTypes = {
  toggleCompletedSelf: PropTypes.func.isRequired,
  toggleEditingSelf: PropTypes.func.isRequired,
  updateSelf: PropTypes.func.isRequired,
  deleteSelf: PropTypes.func.isRequired,

  task: PropTypes.exact({
    timestamp: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    mod: PropTypes.string.isRequired,
  }).isRequired,
};

export default Task;
