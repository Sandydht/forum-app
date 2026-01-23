import { http } from './http'

export const loginAction = (username: string, password: string) => {
  return http.post('/authentications/login-account', { username, password });
}

export const refreshTokenAction = (refreshToken: string) => {
  return http.post('/authentications/refresh-authentication', { refreshToken });
}

export const logoutAction = () => {
  return http.post('/authentications/logout-account');
}