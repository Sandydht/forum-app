import { publicApi, privateApi } from './http'

export const registerAction = (username: string, email: string, phoneNumber: string, fullname: string, password: string, captchaToken: string) => {
  return publicApi.post('/users/register-account', { username, email, phoneNumber, fullname, password, captchaToken });
}

export const getUserProfileAction = () => {
  return privateApi.get('/users/get-profile');
}