import React, {Component, PropTypes} from 'react';

export default class SearchBox extends Component {
  handleTextChange(event) {
    if (this.props.onTextChange) {
      this.props.onTextChange(event.target.value);
    }
  }

  handleButtonClick(event) {
    if (this.props.onAction) {
      this.props.onAction();
    }
  }

  handleBlur(event) {
    if (this.props.onDismiss) {
      this.props.onDismiss();
    }
  }

  componentDidMount() {
    this.refs.txtSearch.focus();
  }

  render() {
    let action = null;
    if (this.props.actionText) {
      action = <span className="input-group-btn">
        <button className="btn btn-default" type="button" onClick={this.handleButtonClick.bind(this)}>
          {this.props.actionText}
        </button>
      </span>;
    }
    else if (this.props.actionIcon) {
      action = <span className="input-group-btn">
        <button className="btn btn-default" type="button" onClick={this.handleButtonClick.bind(this)}>
          <i className={"fa fa-" + this.props.actionIcon}/>
        </button>
      </span>;
    }
    return (
      <div className="search-box">
        <div className="input-group">
          <input ref="txtSearch" className="form-control" type="text" 
                 onBlur={this.handleBlur.bind(this)}
                 placeholder={this.props.placeholder} onChange={this.handleTextChange.bind(this)}/>
          {action}
        </div>
      </div>
    );
  }

  static propTypes = {
    placeholder: PropTypes.string,
    actionIcon: PropTypes.string,
    actiontext: PropTypes.string,
    onTextChange: PropTypes.func,
    onAction: PropTypes.func,
    onDismiss: PropTypes.func,
  };

  static defaultProps = {
    placeholder: 'Search...',
  }
}
