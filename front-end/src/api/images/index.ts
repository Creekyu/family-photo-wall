import { catchAsync } from '@/api';
import service from '@/utils/request';
import { AddImageObj, updateImage } from '@/interface/imagesApi';
import { ApiFeatures } from '@/interface/apiFeatures';

export const addPhotos = catchAsync(async (imgList: AddImageObj[]) => {
  const response = await service.post('/api/images', imgList);
  return Promise.resolve(response);
});

export const getPhotos = catchAsync(async (features: ApiFeatures) => {
  const { page, limit, fields, sort, options } = features;
  const response = await service.get(
    '/api/images?' +
      (page ? `page=${page}&` : '') +
      (limit ? `limit=${limit}&` : '') +
      (fields ? `fields=${fields}&` : '') +
      (sort ? `sort=${sort}&` : '') +
      (options ? `${options}` : '')
  );
  return Promise.resolve(response);
});

export const delSingle = catchAsync(async (filename: string) => {
  const response = service.delete('/api/images', { data: { filename } });
  return Promise.resolve(response);
});

export const delMany = catchAsync(async (fileList: string[]) => {
  const response = service.delete('/api/images/delMany', {
    data: { fileList },
  });
  return Promise.resolve(response);
});

export const getCount = catchAsync(async (classification: string) => {
  const response = service.get(
    `/api/images/getCount?classification=${classification}`
  );
  return Promise.resolve(response);
});

export const updateImg = catchAsync(async (data: updateImage) => {
  const response = service.patch('/api/images', data);
  return Promise.resolve(response);
});
