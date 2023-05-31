import { catchAsync } from '@/api';

// interface
import { LoginFormObj } from '@/interface/userApi';
import service from '@/utils/request';

export const userApi = {
  login: catchAsync(async (data: LoginFormObj) => {
    const response = await service.post('/api/users/login', data);
    return Promise.resolve(response);
  }),
};
