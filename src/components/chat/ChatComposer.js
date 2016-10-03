import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Navbar from '../common/Navbar';
import ui from 'redux-ui';
import MessageEditor from '../common/MessageEditor';
import MessageList from '../common/MessageList';
import appStore from '../../stores/appStore';
import {newMessage} from '../../actions/chat';
import PictureBrowser from '../common/PictureBrowser';
import {filterMessage} from '../../helpers/message';
import CameraShot from '../common/CameraShot';
import EmoticonBrowser from '../common/EmoticonBrowser';
import PickMapLocation from '../common/PickMapLocation';
import {friendType} from '../../proptypes/friend';
import {groupchatItemType} from '../../proptypes/chat';
import {formatName} from '../../helpers/user';
import {formatTimestamp} from '../../helpers/message';
import {newGroupMessage, addAttendants, removeAttendants, renameGroup} from '../../actions/groupChat';
import {BTN_CLOSE} from '../common/Modal';
import SelectableFriendView from '../common/SelectableFriendView';
import BasicListItem from '../common/BasicListItem';
import UserAvatar from '../common/UserAvatar';
import GroupchatRemoveAttendantsList from '../groupChat/GroupchatRemoveAttendantsList';
import {notImplemented} from '../../helpers/common';

require('../../styles/components/chat-composer.scss');

@ui()
class ChatComposer extends Component {
  constructor() {
    super();
    this.state = {
      activeToolbarAction: '',
      groupAttendants: [],
      newGroupName: '',
    };
  }

  handleDismiss() {
    this.props.updateUI('activeChatPeer', null);
    this.props.updateUI('activeChatGroup', null);
  }

  handleSendMessage(message) {
    this.sendMessage(message);
  }

  handleToolbarAction(action) {
    if (action.id == this.state.activeToolbarAction || action.id == 'message') {
      this.setActiveToolbarAction('');
    }
    else {
      this.setActiveToolbarAction(action.id);
    }
  }

  handleSelectedPictures(pictures) {
    this.dismissChildView();
    pictures.forEach((picture) => {
      this.sendMessage({type: 'image', text: picture});
    });
  }

  sendMessage(message) {
    if (this.props.peer) {
      appStore.dispatch(newMessage('<me>', this.props.peer.nick, message));
    }
    else if (this.props.group) {
      appStore.dispatch(newGroupMessage('<me>', this.props.group, message));
    }
  }

  setActiveToolbarAction(action) {
    const newState = Object.assign({}, this.state, {activeToolbarAction: action});
    this.setState(newState);
  }

  dismissChildView() {
    this.setActiveToolbarAction('');
  }

  handleTakeCameraPicture(pic) {
    this.dismissChildView();
    this.sendMessage({type: 'image', text: pic});
  }

  handleSelectedEmoticon(icon) {
    this.sendMessage({type: 'emoticon', text: icon});
    this.dismissChildView();
    this.setActiveToolbarAction('');
  }

  handleAttendantsListChange(list) {
    this.setState(Object.assign({}, this.state, {groupAttendants: list}));
  }

  handleRemoveAttendant(attendant) {
    const removedAttendants = [attendant.nick];
    appStore.dispatch(removeAttendants(this.props.group, removedAttendants));
    this.sendMessage({
      type: 'system',
      text: `${formatName(attendant)} is removed`,
    });
  }

  handleGroupNameChange(event) {
    this.setState(Object.assign({}, this.state, {newGroupName: event.target.value}));
  }

  handleRenameGroup() {
    if (this.state.newGroupName.length > 0) {
      appStore.dispatch(renameGroup(this.props.group, this.state.newGroupName));
    }
  }

  handleNavbarAction(action) {
    switch (action.id) {
      case 'group_info':
      {
        this.props.updateUI('modal', {
          title: this.props.group.name,
          message: (
            <div className="attendants">
              <div className="input-group">
                <input type="text" className="form-control" onChange={this.handleGroupNameChange.bind(this)} defaultValue={this.props.groupName}/>
                <span className="input-group-btn">
                  <button className="btn btn-default" type="button" onClick={this.handleRenameGroup.bind(this)}>
                    <i className="fa fa-check"/>
                  </button>
                </span>
              </div>
              <GroupchatRemoveAttendantsList attendants={this.props.groupAttendants} onRemoveAttendant={this.handleRemoveAttendant.bind(this)}/>
            </div>
          ),
          size: 'lg',
          buttons: [
            BTN_CLOSE,
          ],
          initiator: this,
          data: {
            group: this.props.group,
          },
          className: 'group-info',
        });
        break;
      }

      case 'add':
      {
        const attendantNicks = this.props.groupAttendants.map((attendant) => attendant.nick);
        const body = (
            <SelectableFriendView selectionLabel="Attendants" 
                                  onListChange={this.handleAttendantsListChange.bind(this)}
                                  excludes={attendantNicks}/>
        );

        this.props.updateUI('modal', {
          title: this.props.group.name,
          message: body,
          size: 'lg',
          buttons: [
            {action: 'add', text: 'Add to group', type: 'primary'},
          ],
          initiator: this,
          data: {
            group: this.props.group,
          }
        });
        break;
      }

      default:
        notImplemented(this);
        break;
    }
  }
  
  onModalResult(button, data) {
    switch (button) {
      case 'add':
        const attendants = this.state.groupAttendants.map((attendant) => attendant.nick);
        appStore.dispatch(addAttendants(this.props.group, attendants));
        this.sendMessage({type: 'system', text: `${attendants.length} new attendants added`});
        break;
    }
  }

  render() {
    let navbarActions;

    if (this.props.peer) {
      navbarActions = [
        {id: 'video_call',  icon: 'video-camera'},
        {id: 'call',        icon: 'phone'},
        {id: 'info',        icon: 'info-circle'},
      ];
    }
    else if (this.props.group) {
      navbarActions = [
        {id: 'add',         icon: 'plus'},
        {id: 'group_info',  icon: 'info-circle'},
      ];
    }

    const {peer} = this.props;
    let popupView = null, slideupView = null;

    switch (this.state.activeToolbarAction) {
      case 'picture':
        popupView = <PictureBrowser onDone={this.handleSelectedPictures.bind(this)}
                                            onCancel={this.dismissChildView.bind(this)}/>;
        break;

      case 'camera':
        popupView = <CameraShot onCancel={this.dismissChildView.bind(this)}
                                        onTakePicture={this.handleTakeCameraPicture.bind(this)}/>;
        break;

      case 'location':
        popupView = <PickMapLocation/>;
        break;

      case 'emoticon':
        slideupView = <EmoticonBrowser onSelect={this.handleSelectedEmoticon.bind(this)}/>;
        break;

      default:
        break;
    }

    let className = "chat-composer";

    if (popupView) {
      popupView = <div className="popup-view">{popupView}</div>;
      className += " with-popup-view";
    }

    if (slideupView) {
      slideupView = <div className="slideup-view">{slideupView}</div>;
      className += " with-slideup-view";
    }
    
    let navbarTitle;
    let navbarSubtitle;

    if (this.props.peer) {
      navbarTitle = formatName(this.props.peer);
      navbarSubtitle = this.props.peer.online ? 'Active now' : ("Last active: " + formatTimestamp(this.props.peer.last_online));
    }
    else if (this.props.group) {
      navbarTitle = this.props.groupName;
    }

    return (
      <div className="chat-composer-wrapper">
        <div className={className}>
          <Navbar actions={navbarActions} 
                  title={navbarTitle}
                  subtitle={navbarSubtitle}
                  onAction={this.handleNavbarAction.bind(this)}
                  onBack={this.handleDismiss.bind(this)}/>
          <MessageList messages={this.props.messages}/>
          <MessageEditor onSend={this.handleSendMessage.bind(this)}
                         activeToolbarAction={this.state.activeToolbarAction}
                         onAction={this.handleToolbarAction.bind(this)}/>
          {slideupView}
        </div>
        {popupView}
      </div>
    );
  }

  static propTypes = {
    peer: friendType,
    group: groupchatItemType,
  };
}

const mapStateToProps = (state, ownProps) => {
  let props;

  if (ownProps.peer) {
    const thread = state.chat.find((item) => {
      return item.peer == ownProps.peer.nick;
    });
    props = {
      messages: thread ? thread.messages : [],
    }
  }
  else if (ownProps.group) {
    const group = state.groupChat.find((group) => group.id == ownProps.group.id);
    const attendants = state.friends.filter((friend) => {
      return group.attendants.indexOf(friend.nick) >= 0 && friend.nick != '<me>';
    });
    props = {
      messages: group.messages,
      groupAttendants: attendants,
      groupName: group.name,
    }
  }

  return props;
};

export default connect(mapStateToProps)(ChatComposer);
