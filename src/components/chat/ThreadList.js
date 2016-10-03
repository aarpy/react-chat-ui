import React, {Component, PropTypes} from 'react';
import ThreadItem from './ThreadItem';
import {chatMessageItemType} from '../../proptypes/chat';

export default class ThreadList extends Component {
  handleClick(peer) {
    if (this.props.onClick) {
      this.props.onClick(peer);
    }
  }

  handleDropdownClick(action, thread, threadIndex) {
    if (this.props.onDropdownClick) {
      this.props.onDropdownClick(action, thread, threadIndex);
    }
  }

  render() {
    const threads = this.props.threads.map((thread, index) => (
      <ThreadItem key={thread.peer} thread={thread} threadIndex={index}
                  onDropdownClick={this.handleDropdownClick.bind(this)}
                  onClick={this.handleClick.bind(this)}/>
    ));

    return (
      <ul className="list-group">
        {threads}
      </ul>
    );
  }

  static propTypes = {
    threads: PropTypes.arrayOf(PropTypes.shape({
      peer: PropTypes.string,
      messages: PropTypes.arrayOf(
        chatMessageItemType,
      ),
    })),
    onClick: PropTypes.func,
  };
}

