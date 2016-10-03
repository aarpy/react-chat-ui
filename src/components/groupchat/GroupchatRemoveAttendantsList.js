import React, {Component, PropTypes} from 'react';
import BasicListItem from '../common/BasicListItem';
import update from 'react-addons-update';
import {friendType} from '../../proptypes/friend';
import UserAvatar from '../common/UserAvatar';
import {formatName} from '../../helpers/user';

export default class GroupchatRemoveAttendantsList extends Component {
  constructor() {
    super();
    this.state = {
      attendants: [],
    };
  }

  componentWillMount() {
    if (this.props.attendants) {
      this.setState({attendants: this.props.attendants});
    }
  }

  handleRemoveAttendant(attendant) {
    const index = this.state.attendants.findIndex((user) => attendant.nick == user.nick);
    if (index >= 0) {
      this.setState(update(this.state, {attendants: {$splice: [[index, 1]]}}));
      if (this.props.onRemoveAttendant) {
        this.props.onRemoveAttendant(attendant);
      }
    }
  }

  render() {
    let attendants = null;

    if (this.state.attendants.length > 0) {
      attendants = this.state.attendants.map((attendant) => { 
        const items = {
          leftItem : <UserAvatar user={attendant}/>,
          bodyItem : <label>{formatName(attendant)}</label>,
          rightItem : (
            <button className="btn btn-default" onClick={this.handleRemoveAttendant.bind(this, attendant)}>
              <i className="fa fa-times"/>
            </button>
          ),
        }
        return <BasicListItem key={attendant.nick} {...items}/>;
      });
    }

    return (
      <div className="list-group">{attendants}</div>
    );
  }

  static propTypes = {
    onRemoveAttendant: PropTypes.func,
    attendants: PropTypes.arrayOf(friendType),
  };
}
