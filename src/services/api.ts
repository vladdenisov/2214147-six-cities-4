import axios, {AxiosInstance} from 'axios';
import { getToken } from '../const';

const BACKEND_URL = 'https://14.design.htmlacademy.pro/six-cities';
const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use((request) => {
    request.headers.set('x-token', getToken());
    return request;
  });

  return api;
};

export const API = createAPI();
