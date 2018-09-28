const Service = require('egg').Service;

class UserService extends Service {
  constructor(ctx) {
    super(ctx);
    this.table = 'net_culture_licence_user';
  }

  async list() {
    const { table, app } = this;
    const results = await app.mysql.select(table);
    return results;
  }

  async create(params) {
    const { table, app } = this;
    // 插入
    const result = await app.mysql.insert(table, params);
    // 判断插入成功
    const insertSuccess = result.affectedRows === 1;
    if (insertSuccess) {
      const user = await app.mysql.get('net_culture_licence_user', params);
      console.log(user);
      return user.userid;
    }
    return '-1';
  }

  async delete(params) {
    const { table, app } = this;
    const result = await app.mysql.delete(table, params);
    return result.affectedRows === 1;
  }
}

module.exports = UserService;
