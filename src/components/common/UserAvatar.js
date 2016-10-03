import React, {Component, PropTypes} from 'react';
import {friendType} from '../../proptypes/friend';

require('../../styles/components/avatar.scss');

export default class UserAvatar extends Component {
  render() {
    const avatarPath = '/public/images/avatar/' + (this.props.user ? this.props.user.avatar : '');
    const className = 'avatar size-' + this.props.size;
    return (
      <div className={className}>
        <img src={avatarPath}/>
      </div>
    );
  }

  static propTypes = {
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    user: friendType,
  };

  static defaultProps = {
    size: 'medium',
  };
}
