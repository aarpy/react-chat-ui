import React from 'react';
import Toolbar from './Toolbar';

export default class MessageEditorToolbar extends Toolbar {
  handleClick(action) {
    if (this.props.onClick) {
      this.props.onClick(action);
    }
    const newAction = this.state.activeItem != action.id ? action.id : '';
    const newState = Object.assign({}, this.state, {activeItem: newAction});
    this.setState(newState);
  }
}
