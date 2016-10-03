import React, {Component, PropTypes} from 'react';
import {friendType} from '../../proptypes/friend';
import UserAvatar from '../common/UserAvatar';

require('../../styles/components/groupchat-avatar.scss');

export default class GroupchatItemAvatar extends Component {
  render() {
    const reps = this.props.attendants.slice(0, 3);
    let avatar = null;
    const className = `group-chat-avatar items-count-${reps.length} ${this.props.size}`;

    if (reps.length == 1) {
      avatar = (
        <div className={className}>
          <div className="half half-first">
            <UserAvatar user={reps[0]} size={this.props.size}/>
          </div>
        </div>
      );
    }
    else if (reps.length == 2) {
      avatar = (
        <div className={className}>
          <div className="half half-first">
            <UserAvatar user={reps[0]} size={this.props.size}/>
          </div>
          <div className="half half-second">
            <UserAvatar user={reps[1]} size={this.props.size}/>
          </div>
        </div>
      );
    }
    else {
      avatar = (
        <div className={className}>
          <div className="half half-first">
            <UserAvatar user={reps[0]} size={this.props.size}/>
          </div>
          <div className="half half-second">
            <UserAvatar user={reps[1]} size={this.props.size}/>
            <UserAvatar user={reps[2]} size={this.props.size}/>
          </div>
        </div>
      );
    }

    return avatar;
  }

  static propTypes = {
    attendants: PropTypes.arrayOf(friendType),
    size: PropTypes.oneOf(['small', 'medium', 'large']),
  };

  static defaultProps = {
    size: 'medium',
  };
}
