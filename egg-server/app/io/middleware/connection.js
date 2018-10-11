module.exports = app => async (ctx, next) => {
  ctx.socket.emit('res', 'connected!');
  await next();
  // execute when disconnect.
  console.log('disconnection!');
};
