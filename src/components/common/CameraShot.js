import React, {Component, PropTypes} from 'react';
import pictures from '../../mock/pictures';
import Actionbar from './Actionbar';
import CameraPicture from './CameraPicture';
import PopupView from './PopupView';

require('../../styles/components/camera-shot.scss');

export default class CameraShot extends PopupView {
  constructor() {
    super();
    this.state = {
      picture: this.getPicture(),
    };
  }

  getPicture() {
    const index = Math.floor(Math.random() * (pictures.length));
    return pictures[index];
  }

  handleAction(action) {
    switch (action.id) {
      case 'back':
        if (this.props.onCancel) {
          this.props.onCancel();
        }
        break;

      case 'send':
        if (this.props.onTakePicture) {
          this.props.onTakePicture(this.state.picture);
        }
        break;

      case 'camera':
        this.setState({
          picture: this.getPicture(),
        });
        break;
    }
  }

  render() {
    const actions = [
      {id: 'back',   icon: 'angle-left'},
      {id: 'send',   icon: 'circle-thin'},
      {id: 'camera', icon: 'camera-retro'},
    ];
    return (
      <div className="camera-shot">
        <CameraPicture src={this.state.picture}/>
        <Actionbar items={actions} onClick={this.handleAction.bind(this)}/>
      </div>
    );
  }

  static propTypes = {
    onTakePicture: PropTypes.func,
    onCancel: PropTypes.func,
  };
}
