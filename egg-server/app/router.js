module.exports = (app) => {
  const { router, controller, io } = app;
  router.get('/', controller.home.index);
  router.get('/news', controller.news.list);

  // restful demo
  router.resources('user', '/user', controller.user);

  // socket.io
  io.of('/').route('server', io.controller.home.server);
};
