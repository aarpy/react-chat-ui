import {PropTypes} from 'react';

export const chatMessageType = PropTypes.shape({
  text: PropTypes.string,
  type: PropTypes.oneOf(['text', 'image', 'emoticon', 'video', 'system']),
});

export const chatMessageItemType = PropTypes.shape({
  sender: PropTypes.string,
  timestamp: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  message: chatMessageType,
  seen: PropTypes.bool,
});

export const groupchatItemType = PropTypes.shape({
  name: PropTypes.string,
  attendants: PropTypes.arrayOf(PropTypes.string),
  admins: PropTypes.arrayOf(PropTypes.string),
  mesages: PropTypes.arrayOf(chatMessageType),
  last_active: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
});

