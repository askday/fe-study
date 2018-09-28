const Controller = require('egg').Controller;

class HomeControllerController extends Controller {
  async index() {
    const { app } = this;
    const sql = 'select * from net_culture_licence_user';
    const values = {};
    await app.mysql.query(sql, values);
    console.log(values);
    this.ctx.body = `Hello Egg!${values}`;
  }
}

module.exports = HomeControllerController;
