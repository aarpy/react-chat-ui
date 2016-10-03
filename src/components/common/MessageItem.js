import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Message from './Message';
import UserAvatar from './UserAvatar';
import {chatMessageItemType} from '../../proptypes/chat';

require('../../styles/components/message-item.scss');

class MessageItem extends Component {
  render() {
    let avatar = null, className='message-item type-' + this.props.message.message.type;

    // Don't show avatar for me.
    if (this.props.message.sender !== '<me>') {
      avatar = <UserAvatar user={this.props.user} size="medium"/>;
    }
    else {
      className += ' me';
    }

    return (
      <div className={className}>
        {avatar}
        <Message message={this.props.message}/>
      </div>
    );
  }

  static propTypes = {
    message: chatMessageItemType,
  }
}

const mapStateToProps = (state, ownProps) => {
  const sender = ownProps.message.sender;
  const user = state.friends.find((friend) => {
    return friend.nick == sender;
  });

  return {
    user: user,
  }
};

export default connect(mapStateToProps)(MessageItem);
