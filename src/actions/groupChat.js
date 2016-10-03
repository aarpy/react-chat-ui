import * as types from '../constants/groupChat';

export function newGroupMessage(from, group, message) {
  return {
    type: types.GROUP_CHAT_NEW_MESSAGE,
    from,
    group,
    message,
    timestamp: Date.now(),
  };
}

export function newGroup(name, attendants) {
  return {
    type: types.GROUP_CHAT_NEW_GROUP,
    name,
    attendants,
    timestamp: Date.now(),
  };
}

export function deleteGroup(group) {
  return {
    type: types.GROUP_CHAT_DELETE_GROUP,
    group,
  };
}

export function addAttendants(group, attendants) {
  return {
    type: types.GROUP_CHAT_ADD_ATTENDANTS,
    group,
    attendants,
  };
}

export function removeAttendants(group, attendants) {
  return {
    type: types.GROUP_CHAT_REMOTE_ATTENDANTS,
    group,
    attendants,
  };
}

export function renameGroup(group, name) {
  return {
    type: types.GROUP_CHAT_RENAME_GROUP,
    group,
    name
  };
}
