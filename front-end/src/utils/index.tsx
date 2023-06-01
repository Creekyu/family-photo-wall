export const onPreview = (url: string) => {
  const src = url as string;
  const image = new Image();
  image.src = src;
  // 居中
  image.style.position = 'absolute';
  image.style.left = '0';
  image.style.right = '0';
  image.style.bottom = '0';
  image.style.top = '0';
  image.style.margin = 'auto';
  const imgWindow = window.open(src);
  imgWindow?.document.write(image.outerHTML);
};
