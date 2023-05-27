// 对controller做一些统一封装，错误处理的一部分
// fn本身是一个async函数所以会返回一个promise
// 如果有错误catch便可以捕获
// 捕获以后next传给下一个中间件
module.exports = (fn) => (req, res, next) => {
  fn(req, res, next).catch(next);
};
