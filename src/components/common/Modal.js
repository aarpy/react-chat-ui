import React, {Component, PropTypes} from 'react';
import {modalButtonItemType} from '../../proptypes/action';

require('../../styles/components/modal.scss');

export const BTN_CANCEL = {action: 'cancel',  text: 'Cancel'};
export const BTN_NO     = {action: 'no',      text: 'No'};
export const BTN_YES    = {action: 'yes',     text: 'Yes'};
export const BTN_CLOSE  = {action: 'close',   text: 'Close'};
export const BTN_OK     = {action: 'ok',      text: 'Ok'};

export default class Modal extends Component {
  handleDismiss(event) {
    if (this.props.onCancel) {
      this.props.onCancel();
    }
  }

  handleClick(button, event) {
    if (button.action == 'cancel' || button.action == 'no') {
      if (this.props.onCancel) {
        this.props.onCancel();
      }
    }
    else {
      if (this.props.onClick) {
        this.props.onClick(button.action);
      }
    }
  }

  render() {
    console.log(this.props.buttons);
    const buttons = this.props.buttons.map((button) => (
      <button key={button.action} type="button" 
              className={"btn btn-" + (button.type ? button.type : 'default')} 
              onClick={this.handleClick.bind(this, button)}>
        {button.text}
      </button>
    ));

    let modalClass = "modal-dialog";
    if (this.props.size) {
      modalClass += ` modal-${this.props.size}`;
    }

    if (this.props.className) {
      modalClass += ` ${this.props.className}`;
    }

    return (
      <div className="modal fade" tabIndex="-1" role="dialog">
        <div className={modalClass}>
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" onClick={this.handleDismiss.bind(this)}>
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 className="modal-title">{this.props.title}</h4>
            </div>
            <div className="modal-body">
              {this.props.message}
            </div>
            <div className="modal-footer">
              <div className={"btn-group items-count-" + this.props.buttons.length}>
                {buttons}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  static propTypes = {
    title: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
    ]),
    message: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
    ]),
    size: PropTypes.oneOf(['sm', 'lg']),
    buttons: PropTypes.arrayOf(modalButtonItemType),
    onClick: PropTypes.func,
    onCancel: PropTypes.func,
    className: PropTypes.string,
  };
}
