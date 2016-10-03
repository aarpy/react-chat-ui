import {PropTypes} from 'react';

export const actionItemType = PropTypes.shape({
  id: PropTypes.string,
  icon: PropTypes.string,
});

export const textActionItemType = PropTypes.shape({
  id: PropTypes.string,
  text: PropTypes.string,
});

export const modalButtonItemType = PropTypes.shape({
  id: PropTypes.string,
  text: PropTypes.string,
  type: PropTypes.oneOf(['default', 'primary', 'danger']),
});
