import React, {PropTypes} from 'react';
import SlideupView from './SlideupView';
import emoticons from '../../mock/emoticons';

require('../../styles/components/emoticon-browser.scss');

export default class EmoticonBrowser extends SlideupView {
  handleSelectIcon(icon) {
    if (this.props.onSelect) {
      this.props.onSelect(icon);
    }
  }

  render() {
    const icons = emoticons.map((icon) => {
      const symbol = Object.keys(icon)[0];
      return (
        <div key={symbol} className="emoticon" onClick={this.handleSelectIcon.bind(this, symbol)}>
          <img src={"/public/images/emoticons/" + icon[symbol] + ".png"}/>
        </div>
      );
    });

    return (
      <div className="emoticon-browser">
        {icons}
      </div>
    );
  }

  static propTypes = {
    onSelect: PropTypes.func,
  };
}
