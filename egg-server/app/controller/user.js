const Controller = require('egg').Controller;


// 定义创建接口的请求参数规则
const createRule = {
  name: { type: 'string', max: 100 },
  pwd: { type: 'string', max: 100 },
};

class UserController extends Controller {
  // GET /user
  async index() {
    const { ctx } = this;
    const results = await ctx.service.user.list();
    ctx.body = {
      results,
    };
    ctx.status = 201;
  }

  // GET /user/new
  async new() { }

  // GET /user/:id
  async show() { }

  // GET /user/:id/edit
  async edit() { }

  // POST /user
  // curl -X POST http://127.0.0.1:7001/user --data '{"name":"test","pwd":"123"}' --header 'Content-Type:application/json'
  async create() {
    const { ctx } = this;
    // 校验 `ctx.request.body` 是否符合我们预期的格式
    // 如果参数校验未通过，将会抛出一个 status = 422 的异常
    // console.log('===============');
    // console.log(ctx.request.body);
    // console.log('===============');

    ctx.validate(createRule, ctx.request.body);
    // 调用 service 创建一个 user
    const id = await ctx.service.user.create(ctx.request.body);
    // 设置响应体和状态码
    ctx.body = {
      userid: id,
    };
    ctx.status = 201;
  }

  // PUT /user/:id
  // curl -X PUT http://127.0.0.1:7001/user/1
  async update() {
    const { ctx } = this;
  }

  // DELETE /user/:id
  // curl -X DELETE http://127.0.0.1:7001/user/1
  async destroy() {
    const { ctx } = this;
    console.log('===', ctx.request.body, ctx.params);
    const { params } = ctx;
    const { id } = params;
    const isSuccess = await ctx.service.user.delete({ userid: parseInt(id, 10) });
    if (isSuccess) {
      ctx.body = {
        retcode: 200,
        retdesc: 'success',
      };
    } else {
      ctx.body = {
        retcode: 201,
        retdesc: 'fail',
      };
    }
    ctx.status = 200;
  }
}

module.exports = UserController;
