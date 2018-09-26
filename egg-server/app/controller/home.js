const Controller = require('egg').Controller;

class HomeControllerController extends Controller {
  async index() {
    this.ctx.body = 'Hello Egg!';
  }
}

module.exports = HomeControllerController;
