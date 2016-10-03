import React, {Component, PropTypes} from 'react';

require('../../styles/components/dropdown-button.scss');

export default class DropdownButton extends Component {
  constructor() {
    super();
    this.state = {
      dropdownOpen: false,
    };
  }

  handleClick(event) {
    event.stopPropagation();
    this.setState(Object.assign({}, this.state, {dropdownOpen: !this.state.dropdownOpen}));

    let bound = this.refs.btn.getBoundingClientRect();
    this.refs.menu.style.left = -120 +'px';
    this.refs.menu.style.display = !this.state.dropdownOpen ? 'block' : 'none';
  }

  handleDropdownClick(action, event) {
    event.preventDefault();
    event.stopPropagation();
    this.setState(Object.assign({}, this.state, {dropdownOpen: false}));
    this.refs.menu.style.display = 'none';

    if (this.props.onClick) {
      this.props.onClick(action);
    }
  }

  handleMouseOut(event) {
    this.setState(Object.assign({}, this.state, {dropdownOpen: false}));
    this.refs.menu.style.display = 'none';
  }

  render() {
    const dropdown = this.props.dropdown.map((item) => (
      <li key={item.action}>
        <a href="#" onClick={this.handleDropdownClick.bind(this, item.action)}>{item.text}</a>
      </li>
    ));

    let className = "btn-group dropdown-button";
    if (this.state.dropdownOpen) {
      className += ' open';
    }

    return (
      <div className={className} onMouseLeave={this.handleMouseOut.bind(this)}>
        <button ref="btn" type="button" className="btn btn-default dropdown-toggle" 
                onClick={this.handleClick.bind(this)}>
          <i className={"fa fa-" + this.props.icon}/>
        </button>
        <ul ref="menu" className="dropdown-menu">
          {dropdown}
        </ul>
      </div>
    );
  }

  static propTypes = {
    icon: PropTypes.string.isRequired,
    dropdown: PropTypes.arrayOf(PropTypes.shape({
      action: PropTypes.string,
      text: PropTypes.string,
    })),
    onClick: PropTypes.func,
  };
}
