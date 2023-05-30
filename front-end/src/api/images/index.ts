import { catchAsync } from '@/api';
import service from '@/utils/request';
import { addImageObj } from '@/interface/imagesApi';
import { apiFeatures } from '@/interface/apiFeatures';

export const addPhotos = catchAsync(async (imgList: addImageObj[]) => {
  const response = await service.post('/api/images', imgList);
  return Promise.resolve(response);
});

export const getPhotos = catchAsync(async (features: apiFeatures) => {
  const { page, limit, fields, sort, options } = features;
  const response = await service.get(
    '/api/images?' +
      (page ? `page=${page}&` : '') +
      (fields ? `fields=${fields}&` : '') +
      (sort ? `sort=${sort}&` : '') +
      (limit ? `limit=${limit}&` : '') +
      (options ? `${options}` : '')
  );
  return Promise.resolve(response);
});
