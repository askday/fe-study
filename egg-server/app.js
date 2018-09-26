module.exports = (app) => {
  /* eslint-disable */
  app.beforeStart(async () => {
    // 应用会等待这个函数执行完成才启动
    console.log('========app start======');
    // 也可以通过以下方式来调用 Service
  });

  app.once('server', (server) => {
    console.log('=====', app.config.keys);
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
