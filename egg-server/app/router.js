module.exports = (app) => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/news', controller.news.list);

  /* eslint-disable */
  app.once('server', (server) => {
    console.log('=====', server);
  });

  app.once('error', (err, ctx) => {
    console.log('=====', err);
  });

  app.once('request', (ctx) => {
    console.log('==request===');
  });

  app.once('response', (ctx) => {
    console.log('==response===');
  });
  /* eslint-enable */
};
