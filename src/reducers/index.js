import {combineReducers} from 'redux';
import { reducer as uiReducer } from 'redux-ui'

import friends from './friends';
import chat from './chat';
import groupChat from './groupChat';

const rootReducer = combineReducers({
  chat,
  friends,
  groupChat,
  ui: uiReducer,
});

export default rootReducer;
