import React, {Component, PropTypes} from 'react';
import {groupchatItemType} from '../../proptypes/chat';
import {connect} from 'react-redux';
import GroupchatItemAvatar from './GroupchatItemAvatar';
import {formatName} from '../../helpers/user';
import DropdownButton from '../common/DropdownButton';
import ui from 'redux-ui';
import {BTN_CANCEL} from '../common/Modal';
import {formatTimestamp} from '../../helpers/message';
import {deleteGroup, addAttendants, newGroupMessage} from '../../actions/groupChat';
import appStore from '../../stores/appStore';
import SelectableFriendView from '../common/SelectableFriendView';

@ui()
export default class GroupchatItem extends Component {
  constructor() {
    super();
    this.state = {
      groupNewAttendants: [],
    };
  }

  handleClick(event) {
    if (this.props.onClick) {
      this.props.onClick(this.props.group);
    }
  }

  handleAttendantsListChange(list) {
    this.setState(Object.assign({}, this.state, {groupNewAttendants: list}));
  }

  handleDropdownClick(action) {
    switch (action) {
      case 'delete':
      {
        this.props.updateUI('modal', {
          title: 'Delete group conversation?',
          message: 'Once you delete your copy of the conversation, it cannot be undone',
          size: 'sm',
          buttons: [
            BTN_CANCEL,
            {action: 'delete', text: 'Delete', type: 'danger'},
          ],
          initiator: this,
          data: {
            group: this.props.group,
          }
        });
        break;
      }

      case 'add_attendant':
      {
        const attendantNicks = this.props.attendants.map((attendant) => attendant.nick);

        this.props.updateUI('modal', {
          title: this.props.group.name,
          message: <SelectableFriendView selectionLabel="Attendants" 
                                         onListChange={this.handleAttendantsListChange.bind(this)}
                                         excludes={attendantNicks}/>,
          size: 'lg',
          buttons: [
            {action: 'add', text: 'Add to group', type: 'primary'},
          ],
          initiator: this,
          data: {
            group: this.props.group,
          }
        });
        break;
      }
    }
  }

  onModalResult(button, data) {
    switch (button) {
      case 'delete':
        appStore.dispatch(deleteGroup(data.group));
        break;

      case 'add':
        const attendants = this.state.groupNewAttendants.map((attendant) => attendant.nick);
        appStore.dispatch(addAttendants(this.props.group, attendants));
        appStore.dispatch(newGroupMessage('<me>', this.props.group, {type: 'system', text: `${attendants.length} new attendants added`}));
        break;
    }
  }

  render() {
    const attendants = this.props.attendants.slice(0, 2).map((friend) => (
      <span key={friend.nick} className="label label-primary">{formatName(friend)}</span>
    ));

    const actions = [
      {action: 'delete', text: 'Delete'}, 
      {action: 'add_attendant', text: 'Add attendants'},
    ];

    return (
      <div className="group-chat-item" onClick={this.handleClick.bind(this)}>
        <div className="inner-wrapper">
          <GroupchatItemAvatar attendants={this.props.attendants}/>
          <h4>{this.props.group.name}</h4>
          <span>{this.props.group.attendants.length} attendants</span>
          <div className="attendants">
            {attendants}
          </div>
          <div className="last-active">
            {"Last active: " + formatTimestamp(this.props.group.last_active)}
          </div>
        </div>
        <DropdownButton icon="ellipsis-v" dropdown={actions} onClick={this.handleDropdownClick.bind(this)}/>
      </div>
    );
  }

  static propTypes = {
    group: groupchatItemType,
    onClick: PropTypes.func,
  };
}

const mapStateToProps = (state, ownProps) => {
  const attendant_nicks = ownProps.group.attendants;
  /*const attendants = state.friends.filter((friend) => {
    return attendant_nicks.indexOf(friend.nick) >= 0;
  });*/

  let attendants = [], index = -1;
  state.friends.forEach((friend) => {
    index = attendant_nicks.indexOf(friend.nick);
    if (index >= 0) {
      attendants[index] = Object.assign({}, friend);
    }
  });
console.log(attendants);
  return {
    attendants: attendants,
  }
};

export default connect(mapStateToProps)(GroupchatItem);
