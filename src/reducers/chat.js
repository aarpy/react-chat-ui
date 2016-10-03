import * as types from '../constants/chat';
import update from 'react-addons-update';

const chat = (state = [], action) => {
  switch (action.type) {
    // New message coming in.
    case types.CHAT_NEW_MESSAGE:
      const index = state.findIndex((item) => {
        return item.peer == action.peer;
      });

      // New message in existing thread.
      if (index >= 0) {
        const newMessage = {
          sender: action.from,
          message: action.message,
          timestamp: action.timestamp,
          seen: true,
        };
        // NOTE: passing just 'index' doesn't work. More info here:
        // http://stackoverflow.com/questions/30899454/dynamic-key-in-immutability-update-helper-for-array.
        return update(state, {[index]: {messages: {$push: [newMessage]}}});
      }
      // Message in a new thread.
      else {
        const thread = {
          peer: action.peer,
          messages: [
            {
              sender: action.from,
              message: action.message,
              timestamp: action.timestamp,
              seen: true,
            }
          ],
        };

        return update(state, {$unshift: [thread]});
      }

    // Delete a message in a thread.
    case types.CHAT_DELETE_MESSAGE:
      const splice = {$splice: [[action.messageIndex, 1]]};
      const threadIndex = action.threadIndex;
      return update(state, {[threadIndex]: {messages: splice}});

    // Delete a whole thread.
    case types.CHAT_DELETE_THREAD:
      return update(state, {$splice: [[action.threadIndex, 1]]});

    default:
      return state;
  }
};

export default chat;
