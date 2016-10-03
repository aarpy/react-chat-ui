import React, {Component, PropTypes} from 'react';

export default class PictureItem extends Component {
  constructor() {
    super();
    this.state = {
      selected: false,
    };
  }

  handleSelect(event) {
    const newState = Object.assign({}, this.state, {selected: !this.state.selected});
    this.setState(newState);
    if (this.props.onSelect) {
      this.props.onSelect(!this.state.selected, this.props.src);
    }
  }

  render() {
    const path = '/public/images/pictures/' + this.props.src;
    let className = "picture";
    if (this.state.selected) {
      className += " selected";
    }
    const style = {
      backgroundImage: "url(" + path + ")",
    };
    return (
      <div className={className} style={style} onClick={this.handleSelect.bind(this)}>
        <i className="fa fa-check-circle-o"/>
        <div className="marker"/>
      </div>
    );
  }

  static propTypes = {
    src: PropTypes.string,
    onSelect: PropTypes.func,
  };
}
