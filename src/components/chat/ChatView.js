import React, {Component} from 'react';
import {connect} from 'react-redux';
import ThreadList from './ThreadList';
import Actionbar from '../common/Actionbar';
import ui from 'redux-ui';
import SearchBox from '../common/SearchBox';
import ViewWithActionbar from '../common/ViewWithActionbar';
import {BTN_CANCEL} from '../common/Modal';
import appStore from '../../stores/appStore';
import {deleteThread} from '../../actions/chat';
import SendNewMessage from '../common/SendNewMessage';
import {notImplemented} from '../../helpers/common';

require('../../styles/components/chat-view.scss');

@ui()
class ChatView extends ViewWithActionbar {
  constructor() {
    super();
    this.state.filterText = '';
  }

  handleClick(peer) {
    this.props.updateUI('activeChatPeer', peer);
  }

  handleSearchTextChange(text) {
    this.setState(Object.assign({}, this.state, {filterText: text}));
  }

  getActionPopup(actionId) {
    switch (actionId) {
      case 'search':
        return <SearchBox placeholder="Search friend..." 
                          onTextChange={this.handleSearchTextChange.bind(this)}
                          actionIcon="comment-o"/>;

      default:
        return null;
    }
  }

  handleSendMessageBack() {
    this.setActiveAction('');
  }

  handleSendMessageAction(action, data) {
    this.setActiveAction('');
    switch (action.id) {
      case 'send':
        break;
    }
  }

  getActionView(actionId) {
    switch (actionId) {
      case 'message':
        return <SendNewMessage onBack={this.handleSendMessageBack.bind(this)}
                               onSend={this.handleSendMessageAction.bind(this)}/>;
    }
  }

  handleActionbarClick(action) {
    if (action.id == 'call') {
      notImplemented(this);
    }
    else {
      super.handleActionbarClick(action);
    }
  }

  getActions() {
    return [
      {id: 'search',  icon: 'search'},
      {id: 'call',    icon: 'phone'},
      {id: 'message', icon: 'comment-o'},
    ];
  }

  getClassName() {
    return 'chat-thread';
  }

  onModalResult(button, data) {
    if (button == 'delete') {
      appStore.dispatch(deleteThread(data.threadIndex));
    }
  }

  handleDropdownClick(action, thread, threadIndex) {
    switch (action) {
      case 'delete':
      {
        this.props.updateUI('modal', {
          title: 'Delete entire conversation?',
          message: 'Once you delete your copy of the conversation, it cannot be undone',
          size: 'sm',
          buttons: [
            BTN_CANCEL,
            {action: 'delete', text: 'Delete', type: 'danger'},
          ],
          initiator: this,
          data: {
            thread: thread,
            threadIndex: threadIndex,
          }
        });
        break;
      }

      default:
        notImplemented(this);
        break;
    }
  }

  getChildView() {
    let threads = this.props.threads;

    if (this.state.filterText && this.state.filterText.length > 0) {
      const filterText = this.state.filterText.toLowerCase();

      threads = threads.filter((chat) => {
        const nick = chat.peer;
        const peer = this.props.friends.find((friend) => {
          return friend.nick == nick;
        });

        if (!peer) {
          return false;
        }
        const name = peer.first_name + ' ' + peer.last_name;
        return name.toLowerCase().indexOf(filterText) >= 0;
      });
    }

    return <ThreadList threads={threads} 
                       onDropdownClick={this.handleDropdownClick.bind(this)}
                       onClick={this.handleClick.bind(this)}/>;
  }
}

const mapStateToProps = (state, ownProps) => ({
  threads: state.chat,
  friends: state.friends,
});

export default connect(mapStateToProps)(ChatView); 
