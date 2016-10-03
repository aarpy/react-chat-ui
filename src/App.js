import React, { Component } from 'react';
import Toolbar from './components/common/Toolbar';
import {connect} from 'react-redux';
import ui from 'redux-ui';
import ChatView from './components/chat/ChatView';
import ChatComposer from './components/chat/ChatComposer';
import FriendListView from './components/friend/FriendListView';
import Modal from './components/common/Modal';
import GroupchatView from './components/groupchat/GroupchatView';
import SettingView from './components/setting/SettingView';

require('font-awesome/css/font-awesome.css');
require('./styles/components/app.scss');

// UI state for the whole app.
@ui({
  state: {
    // Active toolbar item.
    activeToolbarItem: 'chat',
    activeChatPeer: null,
    activeChatGroup: null,
    modal: null,
  }
})

class App extends Component {
  handleToolbarClick(action) {
    this.props.updateUI('activeToolbarItem', action.id);
  }

  handleModalCancel() {
    this.props.updateUI('modal', null);
  }

  handleModalClick(button) {
    const modal = this.props.ui.modal;

    if (modal.initiator && modal.initiator.onModalResult) {
      modal.initiator.onModalResult(button, modal.data);
    }
    this.props.updateUI('modal', null);
  }

  render() {
    const toolbarItems = [
      {id: 'chat',    icon: 'commenting-o'},
      {id: 'group',   icon: 'users'},
      {id: 'friends', icon: 'list-ul'},
      {id: 'setting', icon: 'cog'},
    ];

    let ActiveView;

    switch (this.props.ui.activeToolbarItem) {
      case 'chat':
        ActiveView = ChatView;
        break;

      case 'friends':
        ActiveView = FriendListView;
        break;

      case 'group':
        ActiveView = GroupchatView;
        break;

      case 'setting':
        ActiveView = SettingView;
        break;

      default:
        ActiveView = null;;
    }

    let chatComposer = null;
    if (this.props.ui.activeChatPeer) {
      chatComposer = <ChatComposer peer={this.props.ui.activeChatPeer}/>;
    }
    else if (this.props.ui.activeChatGroup) {
      chatComposer = <ChatComposer group={this.props.ui.activeChatGroup}/>;
    }

    let modal = null;
    if (this.props.ui.modal) {
      modal = <Modal {...this.props.ui.modal} 
                     onClick={this.handleModalClick.bind(this)}
                     onCancel={this.handleModalCancel.bind(this)}/>;
    }

    return (
      <div className="chat-ui">
        <Toolbar items={toolbarItems} activeItem={this.props.ui.activeToolbarItem} onClick={this.handleToolbarClick.bind(this)}/>
        <div className="view">
          <ActiveView/>
        </div>
        {chatComposer}
        {modal}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  chat: state.chat,
  friends: state.friends,
  groupChat: state.groupChat,
});
const mapDispatchToProps = (dispatch) => ({
});
const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;
