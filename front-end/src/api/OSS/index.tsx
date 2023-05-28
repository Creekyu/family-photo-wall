import service from '@/utils/request';
import { catchAsync } from '@/api';

//GetAliOSS Policy-Token
export const getOSSPolicy = catchAsync(async () => {
  const response = await service.get('/api/policy');
  return Promise.resolve(response);
});
