module.exports = {
  keys: 'eggs',
  view: {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.tpl': 'nunjucks',
    },
  },
  middleware: [
    'robot',
  ],
  news: {
    pageSize: 5,
    serverUrl: 'https://hacker-news.firebaseio.com/v0',
  },
  robot: {
    ua: [
      /Baiduspider/i,
    ],
  },
  mysql: {
    client: {
      host: '127.0.0.1',
      port: '3306',
      user: 'root',
      password: '123',
      database: 'nsip',
    },
  },
  security: {
    csrf: {
      enable: false,
    },
  },
  io: {
    init: {},
    namespace: {
      '/': {
        connectionMiddleware: [],
        packetMiddleware: [],
      },
    },
  },
};
