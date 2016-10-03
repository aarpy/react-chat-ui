import React, {Component, PropTypes} from 'react';
import {friendType} from '../../proptypes/friend';
import UserAvatar from '../common/UserAvatar';
import {formatName} from '../../helpers/user';
import DropdownButton from '../common/DropdownButton';

export default class FriendItem extends Component {
  handleItemClick(event) {
    if (this.props.onFriendClick) {
      this.props.onFriendClick(this.props.friend);
    }
  }

  handleDropdownClick(action) {
    if (this.props.onDropdownClick) {
      this.props.onDropdownClick(action, this.props.friend);
    }
  }

  render() {
    let className="list-group-item friend";
    let {friend} = this.props;

    if (friend.online) {
      className += " online";
    }

    let onlineDevice = null;
    if (friend.online) {
      const devices = friend.online_from.map((device) => (
        <li key={device}>
          <i className="fa fa-circle"/>
          {device}
        </li>
      ));
      onlineDevice = <ul className="online-devices">{devices}</ul>;
      onlineDevice = <span className="online label label-success">Online</span>;
    }

    const dropdownActions = [
      {action: 'chat', text: 'Send message'},
      {action: 'delete', text: 'Delete'},
      {action: 'contact_info', text: 'Contact info'},
    ];

    return (
      <div className={className} onClick={this.handleItemClick.bind(this)}>
        <div className="media">
          <div className="media-left">
            <UserAvatar user={friend} size="medium"/>
          </div>
          <div className="media-body">
            <h4 className="name">
              {formatName(friend)}
            </h4>
            {onlineDevice}
          </div>
          <div className="media-right">
            <DropdownButton icon="ellipsis-v" dropdown={dropdownActions} onClick={this.handleDropdownClick.bind(this)}/>
          </div>
        </div>
      </div>
    );
  }

  static propTypes = {
    friend: friendType,
    onFriendClick: PropTypes.func,
    onDropdownClick: PropTypes.func,
  };
}
