import { catchAsync } from '@/api';
import service from '@/utils/request';

// interface
import {
  addUserForm,
  LoginFormObj,
  updateRoleForm,
  updateUserForm,
  updatePswForm,
  updateMeForm,
} from '@/interface/userApi';
import { ApiFeatures } from '@/interface/apiFeatures';

export const userApi = {
  login: catchAsync(async (data: LoginFormObj) => {
    const response = await service.post('/api/users/login', data);
    return Promise.resolve(response);
  }),
  addUser: catchAsync(async (data: addUserForm) => {
    const response = await service.post('/api/users', data);
    return Promise.resolve(response);
  }),
  getUsers: catchAsync(async (features: ApiFeatures) => {
    const { page, limit, fields, sort, options } = features;
    const response = await service.get(
      '/api/users?' +
        (page ? `page=${page}&` : '') +
        (limit ? `limit=${limit}&` : '') +
        (fields ? `fields=${fields}&` : '') +
        (sort ? `sort=${sort}&` : '') +
        (options ? `${options}` : '')
    );
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
  updateRole: catchAsync(async (data: updateRoleForm) => {
    const response = await service.patch(
      `/api/users/updateRole/${data.id}`,
      data
    );
    return Promise.resolve(response);
  }),
  updatePsw: catchAsync(async (data: updatePswForm) => {
    const response = await service.post('/api/users/updatePsw', data);
    return Promise.resolve(response);
  }),
  updateMe: catchAsync(async (data: updateMeForm) => {
    const response = await service.patch('/api/users/updateMe', data);
    return Promise.resolve(response);
  }),
  getCount: catchAsync(async () => {
    const response = await service.get('/api/users/count');
    return Promise.resolve(response);
  }),
};
