import React, {Component, PropTypes} from 'react';

export default class SelectableListItem extends Component {
  constructor() {
    super();
    this.state = {
      selected: false,
    };
  }

  handleCheckboxClick(event) {
    const selected = !this.state.selected;

    this.setState({
      selected: selected,
    });
    if (this.props.onClick) {
      this.props.onClick(selected, this.props.data);
    }
  }

  render() {
    return (
      <div className="list-group-item" onClick={this.handleCheckboxClick.bind(this)}>
        <div className="media">
          {this.props.children}
          <div className="media-right">
            <input type="checkbox" checked={this.state.selected}/>
          </div>
        </div>
      </div>
    );
  }

  static propTypes = {
    onClick: PropTypes.func,
    data: PropTypes.object,
  }
}
