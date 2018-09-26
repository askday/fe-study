const Controller = require('egg').Controller;

class NewsController extends Controller {
  async list() {
    // const dataList = {
    //   list: [
    //     { id: 1, title: 'this is news 1', url: '/news/1' },
    //     { id: 2, title: 'this is news 2', url: '/news/2' },
    //   ],
    // };
    const { ctx } = this;
    const { page = 1 } = ctx.query;
    // console.log(ctx.service);
    const newsList = await ctx.service.news.list(page);
    await this.ctx.render('news/list.tpl', { list: newsList });
  }
}

module.exports = NewsController;
