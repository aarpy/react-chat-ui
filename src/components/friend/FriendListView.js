import React, {Component} from 'react';
import FriendList from './FriendList';
import Actionbar from '../common/Actionbar';
import ui from 'redux-ui';
import SearchBox from '../common/SearchBox';
import {formatName} from '../../helpers/user';
import {BTN_OK, BTN_NO} from '../common/Modal';
import UserAvatar from '../common/UserAvatar';
import appStore from '../../stores/appStore';
import {deleteFriend} from '../../actions/friends';
import {formatTimestamp} from '../../helpers/message';
import {notImplemented} from '../../helpers/common';

require('../../styles/components/friend-list.scss');

@ui()
export default class FriendListView extends Component {
  constructor() {
    super();
    this.state = {
      onlineOnly: false,
      activeAction: '',
      searchText: '',
    };
  }

  handleFriendClick(friend) {
    this.props.updateUI('activeChatPeer', friend);
  }

  handleDropdownClick(action, friend) {
    switch (action) {
      case 'chat':
        this.handleFriendClick(friend);
        break;

      case 'contact_info':
      {
        let message;
        if (friend.online) {
          message = <span className="label label-success">Active now</span>;
        }
        else {
          message = <label>Last active: {formatTimestamp(friend.last_online, 'long')}</label>;
        }
        this.props.updateUI('modal', {
          title: (<div className="media">
                    <div className="media-left">
                      <UserAvatar user={friend} size="medium"/>
                    </div>
                    <div className="media-right">
                      <h4>{formatName(friend)}</h4>
                    </div>
                  </div>),
          message: message,
          buttons: [
            BTN_OK,
            {action: 'send_message', text: 'Send message', type: 'primary'},
          ],
          size: 'sm',
          initiator: this,
          data: {
            friend: friend,
          },
          initiator: this,
        });
        break;
      }

      case 'delete':
        this.props.updateUI('modal', {
          title: (<div className="media">
                    <div className="media-left">
                      <UserAvatar user={friend} size="medium"/>
                    </div>
                    <div className="media-right">
                      <h4>{formatName(friend)}</h4>
                    </div>
                  </div>),
          message: 'Do you really want to remove this friend from your list? This action cannot be undone.',
          buttons: [
            BTN_NO,
            {action: 'delete_friend', text: 'Delete', type: 'danger'},
          ],
          size: 'sm',
          initiator: this,
          data: {
            friend: friend,
          },
          initiator: this,
        });
        break;
    }
  }

  onModalResult(button, data) {
    switch(button) {
      case 'send_message':
        this.props.updateUI('activeChatPeer', data.friend);
        break;

      case 'delete_friend':
        appStore.dispatch(deleteFriend(data.friend.nick));
        break;
    }
  }

  handleOnlineFilterClick(online) {
    this.setState(Object.assign({}, this.state, {onlineOnly: online}));
  }

  setActiveAction(action) {
    const newAction = action != this.state.activeAction ? action : '';
    let stateChanges = {activeAction: newAction};
    
    if (action == 'search' && newAction == '') {
      stateChanges.searchText = '';
    }
    this.setState(Object.assign({}, this.state, stateChanges));
  }

  handleActionbarClick(action) {
    this.setActiveAction(action.id);
    if (action.id == 'add') {
      notImplemented(this);
    }
  }

  handleSearchTextChange(text) {
    this.setState(Object.assign({}, this.state, {searchText: text}));
  }

  handleSearchboxDismiss() {
    //this.setActiveAction('');
  }

  render() {
    const actions = [
      {id: 'search', icon: 'search'},
      {id: 'add',    icon: 'plus'},
    ];

    let actionView = null;

    if (this.state.activeAction == 'search') {
      actionView = <div className="action-view">
                    <SearchBox placeholder="Search friend..." actionIcon="comment-o" 
                               onDismiss={this.handleSearchboxDismiss.bind(this)}
                               onTextChange={this.handleSearchTextChange.bind(this)}/>
                   </div>;
    }

    return (
      <div className="friend-list-view">
        <div className="btn-group toolbar" role="group">
          <button type="button" className={"btn btn-default" + (this.state.onlineOnly ? '' : ' active')}
                  onClick={this.handleOnlineFilterClick.bind(this, false)}>All</button>
          <button type="button" className={"btn btn-default" + (this.state.onlineOnly ? ' active' : '')}
                  onClick={this.handleOnlineFilterClick.bind(this, true)}>Online</button>
        </div>
        <FriendList onFriendClick={this.handleFriendClick.bind(this)} 
                    onDropdownClick={this.handleDropdownClick.bind(this)}
                    onlineOnly={this.state.onlineOnly}
                    filterText={this.state.searchText}/>
        <Actionbar items={actions} onClick={this.handleActionbarClick.bind(this)}/>
        {actionView}
      </div>
    );
  }
}
