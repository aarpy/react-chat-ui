import React, {Component, PropTypes} from 'react';
import {actionItemType} from '../../proptypes/action';

export default class ToolbarItem extends Component {
  constructor() {
    super();
    this.state = {
      active: false,
    };
  }

  componentWillMount() {
    if (this.props && this.props.active != undefined) {
      this.state = {
        active: this.props.active,
      };
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.active != undefined) {
      this.setState({
        active: nextProps.active,
      });
    }
  }

  handleClick(event) {
    if (this.props.onClick) {
      this.props.onClick(this.props.action);
    }
    this.setState({active: !this.state.active});
  }

  render() {
    const iconClass = "fa fa-" + this.props.action.icon;
    let btnClass = "btn btn-default " + this.props.action.id;

    if (this.state && this.state.active) {
      btnClass += " active";
    }

    return (
      <button type="button" className={btnClass} onClick={this.handleClick.bind(this)}>
        <i className={iconClass}></i>
      </button>
    );
  }

  static propTypes = {
    action: actionItemType,
    onClick: PropTypes.func,
    active: PropTypes.bool,
  };
}

