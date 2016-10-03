import React, {Component, PropTypes} from 'react';
import SelectableListItem from './SelectableListItem';
import UserAvatar from './UserAvatar';
import {formatName} from '../../helpers/user';
import {connect} from 'react-redux';
import update from 'react-addons-update';

class SelectableFriendList extends Component {
  handleItemClick(selected, data) {
    if (this.props.onItemClick) {
      this.props.onItemClick(selected, data);
    }
  }

  render() {
    const items = this.props.friends.map((friend) => (
      <SelectableListItem key={friend.nick} data={friend} onClick={this.handleItemClick.bind(this)}>
        <div className="media-left">
          <UserAvatar user={friend} size="medium"/>
        </div>
        <div className="media-body">
          <h4 className="name">
            {formatName(friend)}
          </h4>
        </div>
      </SelectableListItem>
    ));

    return (
      <div className="selectable-friend-list list-group">
        {items}
      </div>
    );
  }

  static propTypes = {
    onItemClick: PropTypes.func,
    excludes: PropTypes.arrayOf(PropTypes.string),
  }
}

const mapStateToProps = (state, ownProps) => {
  let friends = state.friends;
  if (ownProps.excludes) {
    friends = friends.filter((friend) => {
      return ownProps.excludes.indexOf(friend.nick) < 0;
    });
  }

  const meIndex = friends.findIndex((friend) => friend.nick == '<me>');
  if (meIndex >= 0) {
    friends = update(friends, {$splice: [[meIndex, 1]]});
  }

  return {
    friends: friends,
  }
};

export default connect(mapStateToProps)(SelectableFriendList);
