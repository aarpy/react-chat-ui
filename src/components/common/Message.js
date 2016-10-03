import React, {Component, PropTypes} from 'react';
import {checkEmoticon} from '../../helpers/message';
import {chatMessageType} from '../../proptypes/chat';
import {filterMessage} from '../../helpers/message';
import {formatTimestamp} from '../../helpers/message';

export default class Message extends Component {
  render() {
    const message = filterMessage(this.props.message.message);
    return (
      <div className="message">
        <div className="wrapper">
          <p dangerouslySetInnerHTML={{__html: message.text}}/>
          <span className="timestamp">{formatTimestamp(this.props.message.timestamp, 'long')}</span>
        </div>
      </div>
    );
  }

  static propTypes = {
    message: chatMessageType,
  };
}
