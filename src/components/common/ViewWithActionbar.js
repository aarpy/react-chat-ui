import React, {Component, PropTypes} from 'react';
import update from 'react-addons-update';
import Actionbar from './Actionbar';

require('../../styles/components/view-with-actionbar.scss');

export default class ViewWithActionbar extends Component {
  constructor() {
    super();
    this.state = {
      activeAction: '',
    };
  }

  handleActionbarClick(action) {
    const newAction = action.id != this.state.activeAction ? action.id : '';
    const newState = update(this.state, {activeAction: {$set: newAction}});
    this.setState(newState);
  }

  setActiveAction(actionId) {
    this.setState(update(this.state, {$set: {activeAction: actionId}}));
  }

  getActionPopup() {
    return null;
  }

  getActionView() {
    return null;
  }

  getActions() {
    return [];
  }

  getChildView() {
    return null;
  }

  getClassName() {
    return '';
  }

  render() {
    let actionPopup = this.getActionPopup(this.state.activeAction);
    let actionView  = this.getActionView(this.state.activeAction);

    if (actionPopup) {
      actionPopup = <div className={"action-popup " + this.state.activeAction}>{actionPopup}</div>;
    }

    if (actionView) {
      actionView  = <div className={"action-view " + this.state.activeAction}>{actionView}</div>;
    }

    let className = ['view-with-actionbar'];
    className.push(this.getClassName());
    className = className.join(' ');

    return (
      <div className={className}>
        {this.getChildView()}
        <Actionbar items={this.getActions()}
                   onClick={this.handleActionbarClick.bind(this)}/>
        {actionPopup}
        {actionView}
      </div>
    );
  }
}
