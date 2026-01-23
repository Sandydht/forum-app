import { publicApi, privateApi } from './http'

export const loginAction = (username: string, password: string, captchaToken: string) => {
  return publicApi.post('/authentications/login-account', { username, password, captchaToken });
}

export const refreshTokenAction = (refreshToken: string) => {
  return publicApi.post('/authentications/refresh-authentication', { refreshToken });
}

export const logoutAction = () => {
  return privateApi.post('/authentications/logout-account');
}