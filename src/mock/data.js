const mockData = {
  chat: [
    {
      peer: 'nick_1',
      messages: [
        {
          sender: 'nick_1',
          message: {
            text: 'Hello. How are you?',
            type: 'text',
          },
          timestamp: 1473191423764,
          seen: false,
        },
        {
          sender: '<me>',
          message: {
            text: 'Hi there. I am good. And you?',
            type: 'text',
          },
          timestamp: 1473191421764,
          seen: true,
        },
        {
          sender: 'nick_1',
          message: {
            text: 'So so. Any plans for this weekend?',
            type: 'text',
          },
          timestamp: 1473191443864,
          seen: false,
        },
        {
          sender: '<me>',
          message: {
            text: 'Hm, no nothing yet, unless something interestng coming up',
            type: 'text',
          },
          timestamp: 1473191442964,
          seen: true,
        },
        {
          sender: 'nick_1',
          message: {
            text: 'Actually, there is. A blockbuster is coming out this Sunday. You wanna join us?',
            type: 'text',
          },
          timestamp: 1473191453864,
          seen: false,
        },
        {
          sender: '<me>',
          message: {
            text: 'Oh really? I must join you guys',
            type: 'text',
          },
          timestamp: 1473191722964,
          seen: true,
        },
      ]
    },
    {
      peer: 'nick_2',
      messages: [
        {
          sender: '<me>',
          message: {
            text: 'Hi there!',
            type: 'text',
          },
          timestamp: 1473191021764,
          seen: true,
        },
        {
          sender: 'nick_2',
          message: {
            text: 'What\' up?',
            type: 'text',
          },
          timestamp: 1473190421764,
          seen: false,
        },
        {
          sender: '<me>',
          message: {
            text: 'No, just wanna say that have a great day!',
            type: 'text',
          },
          timestamp: 1473191021764,
          seen: true,
        }
      ]
    },
    {
      peer: 'nick_3',
      messages: [
        {
          sender: 'nick_3',
          message: {
            text: 'Am gonna go out tonight with some friends. Do you fancy joining along?',
            type: 'text',
          },
          timestamp: 1423191020764,
          seen: false,
        },
        {
          sender: '<me>',
          message: {
            text: 'Where are you guys going?',
            type: 'text',
          },
          timestamp: 1423191020764,
          seen: true,
        },
        {
          sender: 'nick_3',
          message: {
            text: 'No specific plans yet. Just go out and hang out',
            type: 'text',
          },
          timestamp: 1423191020764,
          seen: false,
        },
        {
          sender: '<me>',
          message: {
            text: 'Alright! I will catch up you guys after I finish this demo',
            type: 'text',
          },
          timestamp: 1423191020764,
          seen: true,
        },
      ]
    },
    {
      peer: 'nick_4',
      messages: [
        {
          sender: '<me>',
          message: {
            text: 'How is the job interview?',
            type: 'text',
          },
          timestamp: 1473191091033,
          seen: true,
        },
        {
          sender: 'nick_4',
          message: {
            text: 'Its fun but quite challenging. I have still 1 more round',
            type: 'text',
          },
          timestamp: 1473191090033,
          seen: false,
        },
        {
          sender: '<me>',
          message: {
            text: 'Cool, what\'s the company Website?',
            type: 'text',
          },
          timestamp: 1473191091033,
          seen: true,
        },
        {
          sender: 'nick_4',
          message: {
            text: 'Its here: http://www.toptal.com',
            type: 'text',
          },
          timestamp: 1473191090033,
          seen: false,
        },
      ]
    },
    {
      peer: 'nick_5',
      messages: [
        {
          sender: 'nick_5',
          message: {
            text: 'What is the best way to test React applications with Redux?',
            type: 'text',
          },
          timestamp: 1473191091133,
          seen: false,
        },
        {
          sender: '<me>',
          message: {
            text: 'For me, I am using Mocha + jsdom + Enzyme, but I thin other combinations work too',
            type: 'text',
          },
          timestamp: 1473191091333,
          seen: true,
        },
        {
          sender: 'nick_5',
          message: {
            text: 'Ok, sounds good. I must give it a try. How about assertion?',
            type: 'text',
          },
          timestamp: 1473191091133,
          seen: false,
        },
        {
          sender: '<me>',
          message: {
            text: 'Chai should be the one to go but expect is good enough :)',
            type: 'text',
          },
          timestamp: 1473191091133,
          seen: false,
        },
      ]
    },
    {
      peer: 'nick_6',
      messages: [
        {
          sender: 'nick_6',
          message: {
            text: 'Are you going to React Europe Conf this year?',
            type: 'text',
          },
          timestamp: 1473191091333,
          seen: false,
        },
        {
          sender: '<me>',
          message: {
            text: 'Still in doubt though I really want to come. Not sure if I have budget for both it and DrupalConf',
            type: 'text',
          },
          timestamp: 1473191091333,
          seen: true,
        },
        {
          sender: 'nick_6',
          message: {
            text: 'But you\'ve been at DrupalConf a few times so this time it must be React',
            type: 'text',
          },
          timestamp: 1473191091333,
          seen: false,
        },
        {
          sender: '<me>',
          message: {
            text: 'Sound reasonable! I\'ll talk with my boss and convince him',
            type: 'text',
          },
          timestamp: 1473191091333,
          seen: true,
        },
      ]
    },
    {
      peer: 'nick_7',
      messages: [
        {
          sender: 'nick_7',
          message: {
            text: 'What a wonderful game of FC Barcelona!',
            type: 'text',
          },
          timestamp: 1473191091333,
          seen: false,
        },
        {
          sender: '<me>',
          message: {
            text: 'Sure, if we continue like this, we\'re gonna win the treble again :D',
            type: 'text',
          },
          timestamp: 1473191091333,
          seen: true,
        },
        {
          sender: 'nick_7',
          message: {
            text: 'Yeah, so excited about that. Neymar should be able to replace Messi if he continues playing like that',
            type: 'text',
          },
          timestamp: 1473191091333,
          seen: false,
        },
      ]
    },
    {
      peer: 'nick_8',
      messages: [
        {
          sender: 'nick_8',
          message: {
            text: 'Hello',
            type: 'text',
          },
          timestamp: 1473191091333,
          seen: false,
        },
        {
          sender: '<me>',
          message: {
            text: 'Hello',
            type: 'text',
          },
          timestamp: 1473191091333,
          seen: true,
        },
        {
          sender: '<me>',
          message: {
            text: 'Have a great weekend :D',
            type: 'text',
          },
          timestamp: 1473191091333,
          seen: true,
        }
      ]
    },
  ],
  friends: [
    {
      nick: '<me>',
      first_name: 'Phi',
      last_name: 'Van Ngoc',
      avatar: '16.jpg',
      online: false,
      last_online: 1473191091333,
      online_from: [
        'mobile',
        'web',
      ]
    },
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
        'mobile',
        'web',
      ]
    },
    {
      nick: 'nick_3',
      first_name: 'Olga',
      last_name: 'King',
      avatar: '3.jpg',
      online: false,
      last_online: 1403191091333,
      online_from: [
        'mobile',
        'web',
      ]
    },
    {
      nick: 'nick_4',
      first_name: 'Bridget',
      last_name: 'Smith',
      avatar: '4.jpg',
      online: true,
      last_online: 1473091001333,
      online_from: [
        'mobile',
      ]
    },
    {
      nick: 'nick_5',
      first_name: 'Santos',
      last_name: 'Perry',
      avatar: '5.jpg',
      online: false,
      last_online: 1470091091333,
      online_from: [
        'mobile',
        'web',
      ]
    },
    {
      nick: 'nick_6',
      first_name: 'Tommi',
      last_name: 'Lloyd',
      avatar: '6.jpg',
      online: true,
      last_online: 1473001091333,
      online_from: [
        'web',
      ]
    },
    {
      nick: 'nick_7',
      first_name: 'Doreen',
      last_name: 'Garza', 
      avatar: '7.jpg',
      online: false,
      last_online: 1273191091333,
      online_from: [
        'mobile',
        'web',
      ]
    },
    {
      nick: 'nick_8',
      first_name: 'Kenneth',
      last_name: 'Curry',
      avatar: '8.jpg',
      online: false,
      last_online: 1403191091333,
      online_from: [
        'mobile',
        'web',
      ]
    },
    {
      nick: 'nick_9',
      first_name: 'Horace',
      last_name: 'Webb',
      avatar: '9.jpg',
      online: true,
      last_online: 1403191091333,
      online_from: [
        'mobile',
        'web',
      ]
    },
    {
      nick: 'nick_10',
      first_name: 'Linda',
      last_name: 'Berry',
      avatar: '10.jpg',
      online: true,
      last_online: 1403191091333,
      online_from: [
        'mobile',
      ]
    },
    {
      nick: 'nick_11',
      first_name: 'Calvin',
      last_name: 'Sutton',
      avatar: '11.jpg',
      online: false,
      last_online: 1413191091333,
      online_from: [
        'web',
      ]
    },
    {
      nick: 'nick_12',
      first_name: 'Joyce',
      last_name: 'May',
      avatar: '12.jpg',
      online: true,
      last_online: 1433191091333,
      online_from: [
        'mobile',
        'web',
      ]
    },
    {
      nick: 'nick_13',
      first_name: 'Steven',
      last_name: 'Caroll',
      avatar: '13.jpg',
      online: true,
      last_online: 1403191091333,
      online_from: [
        'mobile',
        'web',
      ]
    },
    {
      nick: 'nick_14',
      first_name: 'Dean',
      last_name: 'Grant',
      avatar: '14.jpg',
      online: true,
      last_online: 1403191091333,
      online_from: [
        'mobile',
        'web',
      ]
    },
    {
      nick: 'nick_15',
      first_name: 'Heidi',
      last_name: 'Meyer',
      avatar: '15.jpg',
      online: false,
      last_online: 1403191091333,
      online_from: [
        'mobile',
      ]
    },
  ],
  groupChat: [
    {
      id: 1, 
      name: 'Company',
      attendants: [
        'nick_10', 
        'nick_11',
        'nick_12',
        'nick_15',
        '<me>',
      ],
      admins: [
        '<me>',
      ],
      messages: [
        {
          sender: 'nick_10',
          timestamp: 1473191421764,
          message: {
            text: 'Hello',
            type: 'text',
          },
          seen: false,
        },
        {
          sender: 'nick_11',
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
          timestamp: 1473191421764,
          seen: true,
        },
        {
          sender: 'nick_10',
          timestamp: 1473191421764,
          message: {
            text: 'All good! Should we have a meeting now?',
            type: 'text',
          },
          seen: false,
        },
        {
          sender: '<me>',
          message: {
            text: 'Sure! I\'m currently working on the Chat feature. Will handle that out on Friday',
            type: 'text',
          },
          timestamp: 1473191421764,
          seen: true,
        },
        {
          sender: 'nick_11',
          timestamp: 1473191421764,
          message: {
            text: 'For me, now on the REST APIs for the playing time statistics. Almost ready and can be demoed in an hour',
            type: 'text',
          },
          seen: false,
        },
        {
          sender: 'nick_10',
          timestamp: 1473191421764,
          message: {
            text: 'Excellent! Thank you all and keep doing great work',
            type: 'text',
          },
          seen: false,
        },
      ],
      last_active: 1473191421764,
    },
    {
      id: 2,
      name: 'Family',
      attendants: [
        'nick_2',
        'nick_6',
        '<me>',
      ],
      admins: [
        '<me>',
      ],
      messages: [
        {
          sender: 'nick_2',
          timestamp: 1473101401764,
          message: {
            text: 'Hi dad! Should we go out into the wilderness this weekend?',
            type: 'text',
          },
          seen: false,
        },
        {
          sender: '<me>',
          message: {
            text: 'Sure son! But you should tidy up your room first',
            type: 'text',
          },
          timestamp: 1473111421764,
          seen: true,
        },
        {
          sender: 'nick_2',
          timestamp: 1473101401764,
          message: {
            text: 'Hmm, I hate that. It\'s taking a lot of my time',
            type: 'text',
          },
          seen: false,
        },
        {
          sender: '<me>',
          message: {
            text: 'I know and I am sorry but I can\'t do it for you',
            type: 'text',
          },
          timestamp: 1473111421764,
          seen: true,
        },
      ],
      last_active: 1473111421764,
    },
    {
      id: 3,
      name: 'Close friends',
      attendants: [
        'nick_1',
        'nick_3',
        'nick_4',
        'nick_8',
        '<me>',
      ],
      admins: [
        '<me>',
      ],
      messages: [
        {
          sender: 'nick_1',
          timestamp: 1473190021764,
          message: {
            text: 'James is going to have a marriage this weekend. Should we plan a gift for him?',
            type: 'text',
          },
          seen: false,
        },
        {
          sender: '<me>',
          message: {
            text: 'Oh yeah, I almost forgot about that. What do you recommend?',
            type: 'text',
          },
          timestamp: 1473190041764,
          seen: true,
        },
        {
          sender: 'nick_3',
          timestamp: 1473190021764,
          message: {
            text: 'A car? Oh no, that sounds crazy :D',
            type: 'text',
          },
          seen: false,
        },
        {
          sender: 'nick_4',
          timestamp: 1473190021764,
          message: {
            text: 'Or a trip to Bahamas, that would be lovely',
            type: 'text',
          },
          seen: false,
        },
        {
          sender: 'nick_8',
          timestamp: 1473190021764,
          message: {
            text: 'The trip is a good idea. He can enjoy his wonderful honeymoon there',
            type: 'text',
          },
          seen: false,
        },
        {
          sender: '<me>',
          message: {
            text: 'Absolutely agree! So now is the money collection',
            type: 'text',
          },
          timestamp: 1473190091764,
          seen: true,
        },
      ],
      last_active: 1423191421764,
    },
    {
      id: 4,
      name: 'Football team',
      attendants: [
        'nick_4',
        'nick_6',
        'nick_9',
        'nick_1',
        'nick_5',
        'nick_2',
        'nick_7',
        'nick_8',
        'nick_3',
        '<me>',
      ],
      admins: [
        '<me>',
      ],
      messages: [
        {
          sender: 'nick_1',
          timestamp: 1413191421764,
          message: {
            text: 'What a loss! Now it\'s event more difficult to get to the top 4. So sad :(',
            type: 'text',
          },
          seen: false,
        },
        {
          sender: '<me>',
          message: {
            text: 'Sad too but come on, we\'re gonna win all the other matches',
            type: 'text',
          },
          timestamp: 1403191421764,
          seen: true,
        },
        {
          sender: 'nick_1',
          timestamp: 1413191421764,
          message: {
            text: 'Check this one guys, here is the tatical analysis that I put some time ago: http://www.fcbarcelona.com/',
            type: 'text',
          },
          seen: false,
        },
        {
          sender: 'nick_3',
          timestamp: 1413191421764,
          message: {
            text: 'I think we should focus more on the defence. It\'s been terrible so far',
            type: 'text',
          },
          seen: false,
        },
        {
          sender: 'nick_4',
          timestamp: 1413191421764,
          message: {
            text: 'Agree! Conceding 10 goals in 3 games is not acceptable for a team at our level',
            type: 'text',
          },
          seen: false,
        },
        {
          sender: 'nick_4',
          timestamp: 1413191421764,
          message: {
            text: 'I know that there can be good and bad times but we should NOT make misstakes any more',
            type: 'text',
          },
          seen: false,
        },
        {
          sender: 'nick_5',
          timestamp: 1413191421764,
          message: {
            text: 'Should we change the tactic a bit? Like, switching to 4 defenders',
            type: 'text',
          },
          seen: false,
        },
        {
          sender: '<me>',
          timestamp: 1413191421764,
          message: {
            text: 'That is one option but of course we\'ll need to wait for the coach to decide',
            type: 'text',
          },
          seen: false,
        },
        {
          sender: 'nick_7',
          timestamp: 1413191421764,
          message: {
            text: 'Btw, any ideas of where the coach is?',
            type: 'text',
          },
          seen: false,
        },
        {
          sender: '<me>',
          timestamp: 1413191421764,
          message: {
            text: 'Oh ho, I thought he\'s still here :-o. Maybe he\'s chilling out somewhere with his girl',
            type: 'text',
          },
          seen: false,
        },
        {
          sender: 'nick_9',
          timestamp: 1413191421764,
          message: {
            text: 'Oh that explains the defeat :D',
            type: 'text',
          },
          seen: false,
        },
      ],
      last_active: 1413191421764,
    },
    {
      id: 5,
      name: 'Couple',
      attendants: [
        'nick_6',
        '<me>',
      ],
      admins: [
        '<me>',
        'nick_6',
      ],
      messages: [],
      last_active: 1413191421764,
    },
  ]
}

export default mockData;
