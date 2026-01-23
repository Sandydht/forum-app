import { http } from './http'

export const registerAction = (username: string, fullname: string, password: string) => {
  return http.post('/users/register-account', { username, fullname, password });
}