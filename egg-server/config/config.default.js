exports.keys = 'eggs';

exports.view = {
  defaultViewEngine: 'nunjucks',
  mapping: {
    '.tpl': 'nunjucks',
  },
};

exports.middleware = [
  'robot',
];

exports.news = {
  pageSize: 5,
  serverUrl: 'https://hacker-news.firebaseio.com/v0',
};

exports.robot = {
  ua: [
    /Baiduspider/i,
  ],
};
