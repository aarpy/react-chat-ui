import React, {Component, PropTypes} from 'react';
import pictures from '../../mock/pictures';
import PictureItem from './PictureItem';
import Navbar from './Navbar';
import update from 'react-addons-update';
import PopupView from './PopupView';

require('../../styles/components/picture-browser.scss');

export default class PictureBrowser extends PopupView {
  constructor() {
    super();
    this.selectedPictures = [];
  }

  handleNavbarClick(action) {
    if (action.id == 'done') {
      if (this.props.onDone) {
        this.props.onDone(this.selectedPictures);
      }
    }
  }

  handleSelectPicture(selected, src) {
    if (selected) {
      this.selectedPictures.push(src);
    }
    else {
      const index = this.selectedPictures.indexOf(src);
      if (index >= 0) {
        this.selectedPictures.splice(index, 1);
      }
    }
  }

  handleNavbarBack() {
    if (this.props.onCancel) {
      this.props.onCancel();
    }
  }

  render() {
    const items = pictures.map((picture) => (
      <PictureItem key={picture} src={picture} onSelect={this.handleSelectPicture.bind(this)}/>
    ));

    const actions = [
      {id: 'done', icon: 'check'},
    ];

    return (
      <div className="pictures-browser">
        <Navbar actions={actions} title="Cancel" onAction={this.handleNavbarClick.bind(this)}
                onBack={this.handleNavbarBack.bind(this)}/>
        {items}
      </div>
    );
  }

  static propTypes = {
    onDone: PropTypes.func,
    onCancel: PropTypes.func,
  };
}
