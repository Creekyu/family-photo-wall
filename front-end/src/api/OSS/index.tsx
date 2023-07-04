import service from '@/utils/request';
import { catchAsync } from '@/api';
import { OSSConfig } from '@/interface/OSSApi';

//GetAliOSS Policy-Token
export const getOSSPolicy = catchAsync(async () => {
  const response = await service.get('/api/policy');
  return Promise.resolve(response);
});

export const setOSSObject = catchAsync(async (config: OSSConfig) => {
  const response = await service.post('/api/policy/setConfig', config);
  return Promise.resolve(response);
});

export const getOSSObject = catchAsync(async () => {
  const response = await service.get('/api/policy/getConfig');
  return Promise.resolve(response);
});
