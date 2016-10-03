import React from 'react';

export function notImplemented(component) {
  component.props.updateUI('modal', {
    title: 'Not implemented',
    message: <div>
              <span>Sorry! This feature is not yet available right now {" "}</span>
              <i className="fa fa-smile-o"/>
             </div>,
    size: 'sm',
    buttons: [
      {action: 'ok', text: 'Hmm, Ok', type: 'primary'},
    ],
    initiator: component,
  });
}
