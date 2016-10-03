import * as types from '../constants/friends';

export function deleteFriend(nick) {
  return {
    type: types.FRIEND_DELETE,
    nick,
  };
}

export function friendOnline(nick, device) {
  return {
    type: types.FRIEND_ONLINE,
    nick,
    device,
  };
}

export function friendOffline(nick) {
  return {
    type: types.FRIEND_OFFLINE,
    nick,
    timestamp: Date.now(),
  };
}
