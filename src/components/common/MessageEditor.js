import React, {Component, PropTypes} from 'react';
import MessageEditorToolbar from './MessageEditorToolbar';

require('../../styles/components/message-editor.scss');

export default class MessageEditor extends Component {
  constructor() {
    super();
    this.state = {
      hasMessage: false,
    };
  }

  handleMessageChange(event) {
    this.setState({hasMessage: event.target.value.length > 0});
  }

  componentWillMount() {
    this.state = {
      activeToolbarAction: this.props.activeToolbarAction ? this.props.activeToolbarAction : '',
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      activeToolbarAction: nextProps.activeToolbarAction ? nextProps.activeToolbarAction : '',
    });
  }

  handleMessageKeyPress(event) {
    if (event.key == 'Enter') {
      this.sendMessage();
      event.preventDefault();
    }
  }

  handleToolbarClick(action) {
    if (action.id == 'message') {
      this.refs.txtMessage.focus();
    }
    if (this.props.onAction) {
      this.props.onAction(action);
    }
  }

  sendMessage() {
    if (this.props.onSend) {
      let message = {
        text: this.refs.txtMessage.value,
        type: 'text',
      };
      if (message.text.length == 0) {
        message.type = 'emoticon';
        message.text = '[:thumbsup:]';
      }
      console.log(message);
      this.props.onSend(message);
    }
    this.refs.txtMessage.value = '';
    this.setState({hasMessage: false});
  }

  handleSendButtonClick(event) {
    this.sendMessage();
  }

  render() {
    const toolbarItems = [
      {id: 'message', icon: 'font'},
      {id: 'camera', icon: 'camera'},
      {id: 'picture', icon: 'picture-o'},
      {id: 'emoticon', icon: 'smile-o'},
      {id: 'voice', icon: 'microphone'},
      {id: 'location', icon: 'map-marker'},
    ];

    const buttonIcon = "fa " + (this.state.hasMessage ? "fa-paper-plane" : "fa-thumbs-up");

    return (
      <div className="message-editor">
        <MessageEditorToolbar items={toolbarItems} 
                 activeItem={this.state.activeToolbarAction}
                 onClick={this.handleToolbarClick.bind(this)}/>
        <div className="input-group">
          <textarea className="form-control" 
                    placeholder="Write a message" 
                    ref="txtMessage"
                    onKeyDown={this.handleMessageKeyPress.bind(this)}
                    onChange={this.handleMessageChange.bind(this)}>
          </textarea>
          <div className="input-group-btn">
            <button type="button" className="btn btn-default" onClick={this.handleSendButtonClick.bind(this)}>
              <i className={buttonIcon}/>
            </button>
          </div>
        </div>
      </div>
    );
  }

  static propTypes = {
    onSend: PropTypes.func,
    onAction: PropTypes.func,
  };
}
