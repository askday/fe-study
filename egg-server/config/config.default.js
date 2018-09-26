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
};
