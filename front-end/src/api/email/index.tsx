import service from '@/utils/request';
import { catchAsync } from '@/api';
import { SMTPConfig } from '@/interface/emailApi';

export const setSMTPConfig = catchAsync(async (config: SMTPConfig) => {
  const response = await service.post('/api/email', config);
  return Promise.resolve(response);
});

export const getSMTPConfig = catchAsync(async () => {
  const response = await service.get('/api/email');
  return Promise.resolve(response);
});
