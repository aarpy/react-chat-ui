import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import UserAvatar from '../common/UserAvatar';
import {chatMessageItemType} from '../../proptypes/chat';
import {filterMessage} from '../../helpers/message';
import DropdownButton from '../common/DropdownButton';
import {formatTimestamp} from '../../helpers/message';
import update from 'react-addons-update';
import BasicListItem from '../common/BasicListItem';

require('../../styles/components/chat-thread-item.scss');

class ThreadItem extends Component {
  handleClick(event) {
    if (this.props.onClick) {
      this.props.onClick(this.props.peer);
    }
  }

  handleDropdownClick(action) {
    if (this.props.onDropdownClick) {
      this.props.onDropdownClick(action, this.props.thread, this.props.threadIndex);
    }
  }

  render() {
    const {thread, peer} = this.props;
    const lastMessage = thread.messages[thread.messages.length - 1];

    let messageText = lastMessage.message.text.substring(0, 70);
    if (messageText.length < lastMessage.message.text.length) {
      messageText += '...';
    }

    const shortenMessage = update(lastMessage, {message: {text: {$set: messageText}}});
    const message = filterMessage(shortenMessage.message);
    let dropdownActions = [
      {action: 'delete', text: 'Delete'},
    ];

    if (lastMessage.seen) {
      dropdownActions.push({action: 'mark_unread', text: 'Mark as unread'});
    }
    else {
      dropdownActions.push({action: 'mark_read', text: 'Mark as read'});
    }

    const listItems = {
      leftItem : <UserAvatar size="medium" user={peer}/>,
      bodyItem : (
        <div>
          <h4 className="media-heading">{peer.first_name}</h4>
          <p className="media-message" dangerouslySetInnerHTML={{__html: message.text}}/>
        </div>
      ),
      rightItem : (
        <div>
          <span className="timestamp">{formatTimestamp(lastMessage.timestamp)}</span>
          <DropdownButton icon="ellipsis-v" dropdown={dropdownActions} onClick={this.handleDropdownClick.bind(this)}/>
        </div>
      ),
    };

    return (
      <BasicListItem {...listItems} onClick={this.handleClick.bind(this)}/>
    );
  }

  static propTypes = {
    thread: PropTypes.shape({
      peer: PropTypes.string,
      messages: PropTypes.arrayOf(
        chatMessageItemType,
      )
    }),
    threadIndex: PropTypes.number,
    onClick: PropTypes.func,
    onDropdownClick: PropTypes.func,
  };
}

const mapStateToProps = (state, ownProps) => {
  const peer = ownProps.thread.peer;
  const friend = state.friends.find((item) => {
    return item.nick == peer;
  });

  return {
    peer: friend,
  };
}

export default connect(mapStateToProps)(ThreadItem);

