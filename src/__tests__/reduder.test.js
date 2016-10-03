import chatReducer from '../reducers/chat';
import friendReducer from '../reducers/friends';
import groupReducer from '../reducers/groupChat';

import * as chatActions from '../actions/chat';
import * as friendActions from '../actions/friends';
import * as groupActions from '../actions/groupChat';
import {expect} from 'chai';

describe('Chat reducers', () => {
  const initialState = [
    {
      peer: 'nick_1',
      messages: [
        {
          sender: 'nick_1',
          message: {
            text: 'Hello!',
            type: 'text',
          },
          timestamp: 1473191423764,
          seen: false,
        },
        {
          sender: '<me>',
          message: {
            text: 'Hello',
            type: 'text',
          },
          timestamp: 1473191421764,
          seen: true,
        }
      ]
    },
    {
      peer: 'nick_2',
      messages: [
        {
          sender: 'nick_2',
          message: {
            text: 'Hello',
            type: 'text',
          },
          timestamp: 1473190421764,
          seen: false,
        },
        {
          sender: '<me>',
          message: {
            text: 'Hello',
            type: 'text',
          },
          timestamp: 1473191021764,
          seen: true,
        }
      ]
    },
  ];

  it('should return initial state', () => {
    expect(chatReducer(initialState, {})).to.equal(initialState);
  });

  it('should handle CHAT_NEW_MESSAGE', () => {
    const message = {
      text: 'Hello! How are you?',
      type: 'text',
    };

    const state = initialState.slice(0);
    const action = chatActions.newMessage('<me>', 'nick_2', message);
    const newState = chatReducer(state, action);
    expect(newState[1].messages[newState[1].messages.length - 1]).to.eql({
      sender: '<me>',
      message: message,
      timestamp: action.timestamp,
      seen: true,
    });
  });

  it('should handle CHAT_DELETE_MESSAGE', () => {
    const state = initialState.slice(0);
    const action = chatActions.deleteMessage(0, 0);
    const newState = chatReducer(state, action);
    expect(newState[0].messages).to.eql([initialState[0].messages[1]]);
  });

  it('should handle CHAT_DELETE_THREAD', () => {
    const state = initialState.slice(0);
    const action = chatActions.deleteThread(1);
    const newState = chatReducer(state, action);
    expect(newState).to.eql([initialState[0]]);
  });
});

describe('Friends reducer', () => {
  const initialState = [
    {
      nick: 'nick_1',
      first_name: 'Albert',
      last_name: 'Hill',
      avatar: '1.jpg',
      online: true,
      last_online: 1403191091333,
      online_from: [
        'mobile',
        'web',
      ]
    },
    {
      nick: 'nick_2',
      first_name: 'Patrick',
      last_name: 'Brooks',
      avatar: '2.jpg',
      online: false,
      last_online: 1470191091333,
      online_from: [
        'web',
      ]
    },
  ];

  it('should handle FRIEND_DELETE', () => {
    const action = friendActions.deleteFriend('nick_1');
    const state = initialState.slice(0);
    const newState = friendReducer(state, action);
    expect(newState).to.eql([{
        nick: 'nick_2',
        first_name: 'Patrick',
        last_name: 'Brooks',
        avatar: '2.jpg',
        online: false,
        last_online: 1470191091333,
        online_from: [
          'web',
        ]
    }]);
  });

  it('should handle FRIEND_ONLINE', () => {
    const action = friendActions.friendOnline('nick_2', 'mobile');
    const state = initialState.slice(0);
    const newState = friendReducer(state, action);

    expect(newState[1]).to.eql({
      nick: 'nick_2',
      first_name: 'Patrick',
      last_name: 'Brooks',
      avatar: '2.jpg',
      online: true,
      last_online: 1470191091333,
      online_from: [
        'web',
        'mobile',
      ]
    });
  });

  it('should handle FRIEND_OFFLINE', () => {
    const action = friendActions.friendOffline('nick_1');
    const state = initialState.slice(0);
    const newState = friendReducer(state, action);

    expect(newState[0]).to.eql({
      nick: 'nick_1',
      first_name: 'Albert',
      last_name: 'Hill',
      avatar: '1.jpg',
      online: false,
      last_online: action.timestamp,
      online_from: [],
    });
  });
});

describe('Groupchat reducer', () => {
  const initialState = [
    {
      id: 1, 
      name: 'Close friends',
      attendants: [
        'nick_1', 
        'nick_2',
        '<me>',
      ],
      admins: [
        '<me>',
      ],
      messages: [
        {
          sender: 'nick_1',
          timestamp: 1473191421764,
          message: {
            text: 'Hello',
            type: 'text',
          },
          seen: false,
        },
        {
          sender: 'nick_2',
          timestamp: 1473191421764,
          message: {
            text: 'Hi there! How are you?',
            type: 'text',
          },
          seen: false,
        },
        {
          sender: '<me>',
          message: {
            text: 'Hi all!',
            type: 'text',
          },
          timestamp: 1473101421764,
          seen: true,
        },
      ],
      last_active: 1473191421764,
    },
    {
      id: 2,
      name: 'Family',
      attendants: [
        'nick_2',
        '<me>',
      ],
      admins: [
        '<me>',
      ],
      messages: [
        {
          sender: 'nick_1',
          timestamp: 1473101401764,
          message: {
            text: 'Hello',
            type: 'text',
          },
          seen: false,
        },
        {
          sender: '<me>',
          message: {
            text: 'Hello',
            type: 'text',
          },
          timestamp: 1473111421764,
          seen: true,
        },
      ],
      last_active: 1473111421764,
    },
  ];

  it('should handle GROUP_CHAT_NEW_MESSAGE', () => {
    const state = initialState.slice(0);
    const message = {
      text: ':)',
      type: 'text',
    };
    const action = groupActions.newGroupMessage('<me>', state[0], message);
    const newState = groupReducer(state, action);
    expect(newState[0].messages).to.have.length(state[0].messages.length + 1);
    expect(newState[0].messages[newState[0].messages.length - 1]).to.eql({
      sender: '<me>',
      message: message,
      timestamp: action.timestamp,
      seen: true,
    });
  });

  it('should handle GROUP_CHAT_DELETE_GROUP', () => {
    const state = initialState.slice(0);
    const state2 = initialState.slice(0);
    const action = groupActions.deleteGroup(state[1]);
    const newState = groupReducer(state, action);
    expect(newState).to.have.length(1);
    expect(newState[0].id).to.equal(1);
  });

  it('should handle GROUP_CHAT_ADD_ATTENDANTS', () => {
    const state = initialState.slice(0);
    const attendants = [
      'nick_3', 'nick_4',
    ];
    const action = groupActions.addAttendants(state[0], attendants);
    const newState = groupReducer(state, action);
    expect(newState[0].attendants).to.eql([
      'nick_1', 'nick_2', '<me>', 'nick_3', 'nick_4',
    ]);
  });

  it('should handle GROUP_CHAT_REMOTE_ATTENDANTS', () => {
    const state = initialState.slice(0);
    const action = groupActions.removeAttendants(state[0], 'nick_2');
    const newState = groupReducer(state, action);
    expect(newState[0].attendants).to.eql(['nick_1', '<me>']);
  });

  it('should handle GROUP_CHAT_RENAME_GROUP', () => {
    const state = initialState.slice(0);
    const action = groupActions.renameGroup(state[1], 'New group name');
    const newState = groupReducer(state, action);
    expect(newState[1].name).to.equal('New group name');
  });
});
