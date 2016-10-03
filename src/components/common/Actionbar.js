import React, {Component, PropTypes} from 'react';
import Toolbar from './Toolbar';

require('../../styles/components/actionbar.scss');

export default class Actionbar extends Toolbar {
  getClassNames() {
    return ['actionbar'];
  }
}
