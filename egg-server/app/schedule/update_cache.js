const Subscription = require('egg').Subscription;

class UpdateCache extends Subscription {
  static get schedule() {
    return {
      interval: '10s',
      type: 'all',
    };
  }

  async subscribe() {
    // const res = await this.ctx.curl('http://www.api.com/cache', {
    //   dataType: 'json',
    // });
    if (!this.ctx.app.cache) {
      this.ctx.app.cache = 0;
    }
    this.ctx.app.cache += 1;
    console.log('===============', this.ctx.app.cache);
  }
}

module.exports = UpdateCache;
