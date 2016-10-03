import * as constants from '../constants/chat';

export function newMessage(from, peer, message) {
  return {
    type: constants.CHAT_NEW_MESSAGE,
    from,
    peer,
    message,
    timestamp: Date.now(),
  };
}

export function deleteMessage(threadIndex, messageIndex) {
  return {
    type: constants.CHAT_DELETE_MESSAGE,
    threadIndex,
    messageIndex,
  };
}

export function deleteThread(threadIndex) {
  return {
    type: constants.CHAT_DELETE_THREAD,
    threadIndex,
  };
}
