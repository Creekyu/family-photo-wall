// 生成六位验证码
module.exports = (digit) => {
  const codeList = [];
  for (let i = 0; i < digit; i += 1) {
    codeList.push(Math.floor(Math.random() * 10));
  }
  return codeList.join('');
};
