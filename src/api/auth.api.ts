import { http } from './http'

export const loginAction = (username: string, password: string) => {
  return http.post('/authentications/login-account', { username, password });
}