import React, {Component, PropTypes} from 'react';
import {groupchatItemType} from '../../proptypes/chat';
import GroupchatItem from './GroupchatItem';

export default class GroupchatList extends Component {
  handleClick(group) {
    if (this.props.onClick) {
      this.props.onClick(group);
    }
  }

  render() {
    const groups = this.props.groups.map((group, index) => (
      <GroupchatItem key={index} group={group} onClick={this.handleClick.bind(this)}/>
    ));

    return (
      <div className="group-chat-list">
        {groups}
      </div>
    );
  }

  static propTypes = {
    groups: PropTypes.arrayOf(groupchatItemType),
  }
}
