import { catchAsync } from '@/api';
import service from '@/utils/request';

// interface
import { addUserForm, LoginFormObj, updateUserForm } from '@/interface/userApi';

export const userApi = {
  login: catchAsync(async (data: LoginFormObj) => {
    const response = await service.post('/api/users/login', data);
    return Promise.resolve(response);
  }),
  addUser: catchAsync(async (data: addUserForm) => {
    const response = await service.post('/api/users', data);
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
