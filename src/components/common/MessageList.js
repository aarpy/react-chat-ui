import React, {Component, PropTypes} from 'react';
import MessageItem from './MessageItem';
import {chatMessageItemType} from '../../proptypes/chat';
import ReactDom from 'react-dom';

require('../../styles/components/message-list.scss');

export default class MessageList extends Component {
  componentWillUpdate() {
    const node = ReactDom.findDOMNode(this);
    this.shouldScrollBottom = (node.scrollTop + node.offsetHeight === node.scrollHeight);
  }

  componentDidUpdate() {
    if (this.shouldScrollBottom) {
      let node = ReactDom.findDOMNode(this);
      node.scrollTop = node.scrollHeight
    }
  }

  render() {
    const messages = this.props.messages.map((message, index) => (
      <MessageItem message={message} key={index}/>
    ));
    return (
      <div className="message-list">
        {messages}
      </div>
    );
  }

  static propTypes = {
    messages: PropTypes.arrayOf(
      chatMessageItemType,
    ),
  };
}
