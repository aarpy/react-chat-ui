import React, {Component, PropTypes} from 'react';
import ToolbarItem from './ToolbarItem';
import UserAvatar from './UserAvatar';
import {actionItemType} from '../../proptypes/action';

require('../../styles/components/navbar.scss');

export default class Navbar extends Component {
  handleActionClick(action) {
    if (this.props.onAction) {
      this.props.onAction(action);
    }
  }

  handleBackClick(event) {
    if (this.props.onBack) {
      this.props.onBack();
    }
  }

  render() {
    const actions = this.props.actions.map((action) => (
      <li key={action.id}>
        <ToolbarItem action={action} onClick={this.handleActionClick.bind(this, action)}/>
      </li>
    ));
    return (
      <nav className="navbar navbar-default">
        <div className="title-wrapper" onClick={this.handleBackClick.bind(this)}>
          <div className="outer-wrapper">
            <i className="fa fa-chevron-left"></i>
            <div className="inner-wrapper">
              <h4>{this.props.title}</h4>
              <span>{this.props.subtitle}</span>
            </div>
          </div>
        </div>
        <div className="actions-wrapper">
          <div className="inner-wrapper">
            <ul className="actions">
              {actions}
            </ul>
          </div>
        </div>
      </nav>
    );
  }

  static propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    actions: PropTypes.arrayOf(actionItemType),
    onAction: PropTypes.func,
    onBack: PropTypes.func,
  };
}
