import { catchAsync } from '@/api';

// interface
import { LoginFormObj, updateUserForm } from '@/interface/userApi';
import service from '@/utils/request';

export const userApi = {
  login: catchAsync(async (data: LoginFormObj) => {
    const response = await service.post('/api/users/login', data);
    return Promise.resolve(response);
  }),
  getUsers: catchAsync(async () => {
    const response = await service.get('/api/users');
    return Promise.resolve(response);
  }),
  delUser: catchAsync(async (id: string) => {
    await service.delete('/api/users/' + id);
    return Promise.resolve();
  }),
  updateUser: catchAsync(async (data: updateUserForm) => {
    const response = await service.patch(`/api/users/${data.id}`, data);
    return Promise.resolve(response);
  }),
};
