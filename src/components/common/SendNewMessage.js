import React, {Component, PropTypes} from 'react';
import Navbar from './Navbar';
import SearchBox from './SearchBox';
import SelectableFriendList from './SelectableFriendList';
import update from 'react-addons-update';
import MessageEditor from './MessageEditor';
import appStore from '../../stores/appStore';
import {newMessage} from '../../actions/chat';
import SelectableFriendView from './SelectableFriendView';

require('../../styles/components/send-message.scss');

export default class SendNewMessage extends Component {
  constructor() {
    super();
    this.state = {
      recipients: [],
    };
  }

  handleDismiss() {
    if (this.props.onBack) {
      this.props.onBack();
    }
  }

  handleAction(action) {
    switch (action.id) {
      case 'send':
        if (this.props.onSend) {
          this.props.onSend(this.state);
        }
        break;
    }
  }

  handleItemClick(selected, friend) {
    if (selected) {
      const newState = update(this.state, {recipients: {$push: [friend]}});
      this.setState(newState);
    }
    else {
      const index = this.state.recipients.findIndex((recipient) => {
        return recipient.nick == friend.nick;
      });
      if (index >= 0) {
        this.setState(update(this.state, {recipients: {$splice: [[index, 1]]}}));
      }
    }
  }

  handleSendMessage(message) {
    this.state.recipients.forEach((recipient) => {
      appStore.dispatch(newMessage('<me>', recipient.nick, message)); 
    });
  }

  handleSelectedListChange(friends) {
    this.setState(update(this.state, {recipients: {$set: friends}}));
  }

  render() {
    const actions = [
      {id: 'send', icon: 'check'},
    ];

    return (
      <div className="send-new-message">
        <Navbar actions={actions} 
                title="Send new message"
                onAction={this.handleAction.bind(this)}
                onBack={this.handleDismiss.bind(this)}/>
        <div className="content-wrapper">
          <SelectableFriendView selectionLabel="Send to" onListChange={this.handleSelectedListChange.bind(this)}/>
          <MessageEditor onSend={this.handleSendMessage.bind(this)}/>
        </div>
      </div>
    );
  }

  static propTypes = {
    onBack: PropTypes.func,
    onSend: PropTypes.func,
  };
}
