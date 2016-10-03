import React, {Component, PropTypes} from 'react';

export default class BasicListItem extends Component {
  handleClick(event) {
    if (this.props.onClick) {
      this.props.onClick();
    }
  }

  render() {
    const className = "list-group-item" + (this.props.className ? (' ' + this.props.className) : '');

    let leftItem, bodyItem, rightItem;
    if (this.props.leftItem) {
      leftItem = <div className="media-left">{this.props.leftItem}</div>;
    }

    if (this.props.bodyItem) {
      bodyItem = <div className="media-body">{this.props.bodyItem}</div>;
    }

    if (this.props.rightItem) {
      rightItem = <div className="media-right">{this.props.rightItem}</div>;
    }

    return (
      <div className={className} onClick={this.handleClick.bind(this)}>
        <div className="media">
          {leftItem}
          {bodyItem}
          {rightItem}
        </div>
      </div>
    );
  }

  static propTypes = {
    leftItem: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
    ]),
    bodyItem: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
    ]),
    rightItem: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
    ]),
    className: PropTypes.string,
    onClick: PropTypes.func,
  };
}
