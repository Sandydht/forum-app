import { publicApi, privateApi } from './http'

export const registerAction = (username: string, fullname: string, password: string) => {
  return publicApi.post('/users/register-account', { username, fullname, password });
}

export const getUserProfileAction = () => {
  return privateApi.get('/users/get-profile');
}