import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import TasksFilter from './TasksFilter';

class Footer extends PureComponent {
  render() {
    const { count, currentFilter, setCurrentFilter, clearCompleted } = this.props;
    return (
      <footer className="footer">
        <span className="todo-count">{count} items left</span>

        <TasksFilter currentFilter={currentFilter} setCurrentFilter={setCurrentFilter} />

        <button type="button" className="clear-completed" onClick={clearCompleted}>
          Clear completed
        </button>
      </footer>
    );
  }
}

Footer.propTypes = {
  count: PropTypes.number.isRequired,
  currentFilter: PropTypes.string.isRequired,
  setCurrentFilter: PropTypes.func.isRequired,
  clearCompleted: PropTypes.func.isRequired,
};

export default Footer;
