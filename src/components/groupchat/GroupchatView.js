import React, {Component, PropTypes} from 'react';
import ViewWithActionbar from '../common/ViewWithActionbar';
import {connect} from 'react-redux';
import GroupchatList from './GroupchatList';
import ui from 'redux-ui';
import SelectableFriendView from '../common/SelectableFriendView';
import appStore from '../../stores/appStore';
import {newGroup} from '../../actions/groupChat';
import update from 'react-addons-update';
import {notImplemented} from '../../helpers/common';

require('../../styles/components/group-chat-view.scss');

@ui()
class GroupchatView extends ViewWithActionbar {
  constructor() {
    super();
    this.state = {
      newGroup: {
        name: '',
        attendants: [],
      }
    };
  }

  getActions() {
    return [
      {id: 'pin', icon: 'thumb-tack'},
      {id: 'new', icon: 'users'},
    ];
  }

  getClassName() {
    return 'group-chat-view';
  }

  handleClick(group) {
    this.props.updateUI('activeChatGroup', group);
  }

  getChildView() {
    return (
      <GroupchatList groups={this.props.groups} onClick={this.handleClick.bind(this)}/>
    );
  }

  handleAttendantsListChange(list) {
    this.setState(update(this.state, {newGroup: {attendants: {$set: list}}}));
  }

  handleGroupnameChange(event) {
    this.setState(update(this.state, {newGroup: {name: {$set: event.target.value}}}));
  }

  handleActionbarClick(action) {
    super.handleActionbarClick(action);
    switch (action.id) {
      case 'new':
      {
        this.props.updateUI('modal', {
          title: 'Create new group',
          message: <div className="add-new-group">
                     <div className="group-name">
                       <input type="text" onChange={this.handleGroupnameChange.bind(this)} 
                                          className="form-control" placeholder="Type in group name"/>
                     </div>
                     <SelectableFriendView selectionLabel="Attendants"
                                           onListChange={this.handleAttendantsListChange.bind(this)}/>
                   </div>,
          size: 'lg',
          buttons: [
            {action: 'add', text: 'Create group', type: 'primary'},
          ],
          initiator: this,
        });
        break;
      }

      case 'pin':
      {
        notImplemented(this);
        break;
      }
    }
  }

  onModalResult(button, data) {
    switch (button) {
      case 'add':
      {
        const group = this.state.newGroup;
        const attendants = group.attendants.map((attendant) => attendant.nick);
        let name = group.name;
        if (!name || name.length == 0) {
          name = 'No name';
        }
        appStore.dispatch(newGroup(name, attendants));
        break;
      }
    }
  }
}

const mapStateToProps = (state) => ({
  groups: state.groupChat,
});

export default connect(mapStateToProps)(GroupchatView);

