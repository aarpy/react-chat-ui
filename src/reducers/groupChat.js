import * as constants from '../constants/groupChat';
import update from 'react-addons-update';

function findGroupIndex(state, group) {
  const index = state.findIndex((gr) => group.id == gr.id);
  return index;
}

const groupChat = (state = [], action) => {
  switch (action.type) {
    case constants.GROUP_CHAT_NEW_MESSAGE:
      const message = {
        sender: action.from,
        message: action.message,
        timestamp: action.timestamp,
        seen: true,
      };
      const index = findGroupIndex(state, action.group);
      if (index >= 0) {
        return update(state, {[index]: {messages:{$push: [message]}, last_active: {$set: action.timestamp}}});
      }
      return state;

    case constants.GROUP_CHAT_DELETE_MESSAGE:
      return state;

    case constants.GROUP_CHAT_NEW_GROUP:
      const lastGroup = state[state.length - 1];
      const newGroup = {
        id: lastGroup.id + 1,
        admin: ['<me>'],
        messages: [],
        name: action.name,
        attendants: action.attendants,
        last_active: action.timestamp,
      };

      return update(state, {$push: [newGroup]});

    case constants.GROUP_CHAT_DELETE_GROUP:
    {
      const index = findGroupIndex(state, action.group);
      if (index >= 0) {
        return update(state, {$splice: [[index, 1]]});
      }
      return state;
    }

    case constants.GROUP_CHAT_ADD_ATTENDANTS:
    {
      const index = findGroupIndex(state, action.group);
      if (index >= 0) {
        const attendants = state[index].attendants.concat(action.attendants);
        return update(state, {[index]: {attendants: {$set: attendants}}});
      }
      return state;
    }

    case constants.GROUP_CHAT_REMOTE_ATTENDANTS:
    {
      const index = findGroupIndex(state, action.group);
      if (index >= 0) {
        const newAttendants = state[index].attendants.filter((attendant) => (
          action.attendants.indexOf(attendant) < 0
        ));
        return update(state, {[index]: {attendants: {$set: newAttendants}}});
      }
      return state;
    }

    case constants.GROUP_CHAT_RENAME_GROUP:
    {
      const index = findGroupIndex(state, action.group);
      if (index >= 0) {
        return update(state, {[index]: {name: {$set: action.name}}});
      }
      return state;
    }

    default:
      return state;
  }
};

export default groupChat;
