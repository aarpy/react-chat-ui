import React, {Component, PropTypes} from 'react';
import SelectableFriendList from './SelectableFriendList';
import {formatName} from '../../helpers/user';
import update from 'react-addons-update';

require('../../styles/components/selectable-friend-view.scss');

export default class SelectableFriendView extends Component {
  constructor() {
    super();
    this.state = {
      friends: [],
    };
  }

  handleItemClick(selected, friend) {
    let newState;

    if (selected) {
      newState = update(this.state, {friends: {$push: [friend]}});
    }
    else {
      const index = this.state.friends.findIndex((recipient) => {
        return recipient.nick == friend.nick;
      });
      if (index >= 0) {
        newState = update(this.state, {friends: {$splice: [[index, 1]]}});
      }
    }

    if (newState) {
      if (this.props.onListChange) {
        this.props.onListChange(newState.friends);
      }
      this.setState(newState);
    }
  }

  render() {
    const selected = this.state.friends.map((friend) => (
      <span key={friend.nick} className="label label-primary">{formatName(friend)}</span>
    ));
    return (
      <div className="selectable-friends-view">
        <div className="selected">
          <label>{this.props.selectionLabel}: {" "}</label>
          {selected}
        </div>
        <SelectableFriendList excludes={this.props.excludes} onItemClick={this.handleItemClick.bind(this)}/>
      </div>
    );
  }

  static propTypes = {
    excludes: PropTypes.arrayOf(PropTypes.string),
    selectionLabel: PropTypes.string,
    onListChange: PropTypes.func,
  };

  static defaultProps = {
    selectionLabel: 'Selected',
    excludes: [],
  }
}
