class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'; // startsWith判断字符串是否以某字符串开头
    this.isOperational = true; // 表示是操作错误而不是程序错误，后续判断如果是程序错误就不返回错误

    Error.captureStackTrace(this, this.constructor); //  添加Error堆栈（追溯error）
  }
}

module.exports = AppError;
