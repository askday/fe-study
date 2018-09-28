module.exports = (app) => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/news', controller.news.list);

  // restful demo
  router.resources('user', '/user', controller.user);
};
