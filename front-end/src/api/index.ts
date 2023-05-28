// 封装错误处理
export const catchAsync =
  (fn: any) =>
  (
    values?: unknown, // values就是fn的参数
    success?: (data?: any) => void,
    error?: (content: string) => void,
    effect?: () => void
  ) => {
    // success error分别指定success和error的回调

    fn(values)
      .then((response: any) => {
        if (success) success(response);
        return new Promise(() => {
          // pass
        });
      })
      .catch((err: any) => {
        if (error) {
          // 这里处理一些后端没有传递错误信息的状态码的消息输出
          error(err.data.message);
        }
      })
      .final(() => {
        if (effect) effect();
      });
  };
