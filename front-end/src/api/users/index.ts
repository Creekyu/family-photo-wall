import { catchAsync } from '@/api';

// interface
import { loginForm } from '@/interface/userApi';
import service from '@/utils/request';

export const userApi = {
  login: catchAsync(async (data: loginForm) => {
    const response = await service.post('/api/users/login', data);
    return Promise.resolve(response);
  }),
  getOSSPolicy: catchAsync(async () => {
    const response = await service.get('/api/policy');
    return Promise.resolve(response);
  }),
};
