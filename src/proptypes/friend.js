import {PropTypes} from 'react';

export const friendType = PropTypes.shape({
  nick: PropTypes.string,
  first_name: PropTypes.string,
  last_name: PropTypes.string,
  avatar: PropTypes.string,
  online: PropTypes.bool,
  last_online: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  online_from: PropTypes.arrayOf(PropTypes.string),
});
