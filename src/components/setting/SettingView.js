import React, {Component} from 'react';
import BasicListItem from '../common/BasicListItem';
import {notImplemented} from '../../helpers/common';
import ui from 'redux-ui';

require('../../styles/components/setting-view.scss');

@ui()
export default class SettingView extends Component {
  handleListItemClick() {
    notImplemented(this);
  }

  render() {
    const items = [
      {icon: 'user', text: 'My profile'},
      {icon: 'bell', text: 'Notifications & Sounds'},
      {icon: 'users', text: 'People'},
      {icon: 'circle-o-notch', text: 'Data & Storage'},
      {icon: 'exclamation-triangle', text: 'Report a problem'},
      {icon: 'question-circle', text: 'Help'},
      {icon: 'info-circle', text: 'Privacy & Terms'},
    ];

    const listItems = items.map((item) => {
      const listItems = {
        leftItem: <i className={"fa fa-" + item.icon}/>,
        bodyItem: <label>{item.text}</label>,
      };

      return <BasicListItem key={item.icon} {...listItems} onClick={this.handleListItemClick.bind(this)}/>;
    });

    return (
      <div className="list-group settings-view">
        {listItems}
      </div>
    );
  }
}
