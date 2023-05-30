import { catchAsync } from '@/api';
import service from '@/utils/request';
import { addImageObj } from '@/interface/imagesApi';

export const addPhotos = catchAsync(async (imgList: addImageObj[]) => {
  const response = await service.post('/api/images', imgList);
  return Promise.resolve(response);
});
