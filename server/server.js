const mongoose = require('mongoose');
const dotenv = require('dotenv');

// 必须放在前面不然初始化时会读取不到
dotenv.config({ path: './config.env' }); // 只需读取一次全局可用

const app = require('./app');
// 其他错误终止服务
// 放在开头以捕获全部错误
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

const DB = process.env.DATABASE_LOCAL; // 本地用这个

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => {
    // console.log(connection.connections); // 查看链接属性
    console.log('DB connection successful!');
  });

// listen
const port = process.env.PORT || 3002; // 使用config中变量
const server = app.listen(port, () => {
  console.log(`server is listening at port ${port}`);
});

// 处理 没有处理的promise rejection错误
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
