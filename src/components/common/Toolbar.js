import React, {Component, PropTypes} from "react";
import update from 'react-addons-update';
import ui from 'redux-ui';
import ToolbarItem from './ToolbarItem';
import {actionItemType} from '../../proptypes/action';

require('../../styles/components/toolbar.scss');

export default class Toolbar extends Component {
  componentWillMount() {
    this.state = {
      activeItem: this.props.activeItem ? this.props.activeItem : '',
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      activeItem: nextProps.activeItem ? nextProps.activeItem : '',
    });
  }

  handleClick(action) {
    if (this.props.onClick) {
      this.props.onClick(action);
    }
    this.setState({activeItem: action.id});
  }

  getClassNames() {
    return [];
  }

  render() {
    let items, className=['btn-toolbar'];
    if (this.props.items) {
      items = this.props.items.map((action) => (
        <ToolbarItem key={action.id} action={action} active={action.id == this.state.activeItem} onClick={this.handleClick.bind(this)}/>
      ));
      className.push('items-count-' + this.props.items.length);
    }
    className = className.concat(this.getClassNames()).join(' ');
    return (
      <div className={className}>
        <div className="btn-group">
          {items}
        </div>
      </div>
    );
  }

  static propTypes = {
    items: PropTypes.arrayOf(actionItemType),
    activeItem: PropTypes.string,
    onClick: PropTypes.func,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
  }
}
