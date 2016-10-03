import React, {Component, PropTypes} from 'react';
import FriendItem from './FriendItem';
import {friendType} from '../../proptypes/friend';
import {connect} from 'react-redux';
import update from 'react-addons-update';

class FriendList extends Component {
  handleFriendClick(friend) {
    if (this.props.onFriendClick) {
      this.props.onFriendClick(friend);
    }
  }

  handleDropdownClick(action, friend) {
    if (this.props.onDropdownClick) {
      this.props.onDropdownClick(action, friend);
    }
  }

  render() {
    const items = this.props.friends.map((friend) => (
      <FriendItem key={friend.nick} friend={friend} 
                  onDropdownClick={this.handleDropdownClick.bind(this)}
                  onFriendClick={this.handleFriendClick.bind(this)}/>
    ));

    return (
      <div className="friend-list">
        <div className="list-group">
          {items}
        </div>
      </div>
    );
  }

  static propTypes = {
    friends: PropTypes.arrayOf(friendType),
    onlineOnly: PropTypes.bool,
    filterText: PropTypes.string,
    onFriendClick: PropTypes.func,
    onDropdownClick: PropTypes.func,
  };

  static defaultProps = {
    onlineOnly: false,
    filterText: '',
    onDropdownClick: PropTypes.func,
  };
}

const mapStateToProps = (state, ownProps) => {
  let friends = [];
  if (ownProps.onlineOnly) {
    friends = state.friends.filter((friend) => (
      friend.online
    ));
  }
  else {
    friends = state.friends;
  }

  if (ownProps.filterText.length > 0) {
    friends = friends.filter((friend) => {
      const name=friend.first_name + ' ' + friend.last_name;
      return name.toLowerCase().indexOf(ownProps.filterText.toLowerCase()) >= 0;
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

export default connect(mapStateToProps)(FriendList);
