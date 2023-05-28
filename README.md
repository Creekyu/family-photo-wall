# family-photo-wall

- 往事回忆
- 时间轴
- 大事记
- 即时上传

# 前端
1. 改造了一下catchAsync，使得其不返回Promise同时处理成功、失败、副作用回调
```ts
const catchAsync =
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
        }).final(() => {
        if (effect) effect();
      });
    }
;
```