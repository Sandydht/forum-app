import axios from 'axios'
import SecureStorageImpl from '../service/SecureStorageImpl'

export const publicApi = axios.create({
  baseURL: '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

publicApi.interceptors.response.use(
  res => res,
  err => Promise.reject(err.response?.data || err)
)

export const privateApi = axios.create({
  baseURL: '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

privateApi.interceptors.request.use((config) => {
  const token = SecureStorageImpl.getSecureItem('accessToken')
  if (token) config.headers['Authorization'] = `Bearer ${token}`;
  return config
}, error => {
  return Promise.reject(error)
})

privateApi.interceptors.response.use(
  res => res,
  err => Promise.reject(err.response?.data || err)
)