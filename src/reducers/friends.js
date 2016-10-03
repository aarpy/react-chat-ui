import * as types from '../constants/friends';
import update from 'react-addons-update';

const friends = (state = [], action) => {
  let friendIndex = -1;

  switch (action.type) {
    case types.FRIEND_DELETE:
      friendIndex = state.findIndex((friend) => {
        return friend.nick == action.nick;
      });
      if (friendIndex >= 0) {
        return update(state, {$splice: [[friendIndex, 1]]});
      }
      return state;

    case types.FRIEND_ONLINE:
      friendIndex = state.findIndex((friend) => {
        return friend.nick == action.nick && !friend.online;
      });
      if (friendIndex >= 0) {
        return update(state, {[friendIndex]: {online: {$set: true}, online_from: {$push: [action.device]}}});
      }
      return state;

    case types.FRIEND_OFFLINE:
      friendIndex = state.findIndex((friend) => {
        return friend.nick == action.nick && friend.online;
      });
      if (friendIndex >= 0) {
        return update(state, {[friendIndex]: {online: {$set: false}, online_from: {$set: []}, last_online: {$set: action.timestamp}}});
      }
      return state;

    default:
      return state;
  }
};

export default friends;
