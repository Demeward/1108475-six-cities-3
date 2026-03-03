import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosError } from 'axios';
import { getToken } from './token';
import { toast } from 'react-toastify';
import { StatusCode } from '../const';

const BACKEND_URL = 'https://15.design.htmlacademy.pro/six-cities';
const REQUEST_TIMEOUT = 5000;

type Message = {
  errorType: string;
  message: string;
}

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = getToken();

      if (token && config.headers) {
        config.headers['x-token'] = token;
      }

      return config;
    },
  );

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<Message>) => {
      if (error.response) {
        const detailMessage = (error.response.data);

        if(error.response.status === StatusCode.Unauthorized) {
          toast.warn('Not Authorized');
        }

        if(error.response.status === StatusCode.BadRequest) {
          toast.warn(detailMessage.message);
        }
      }

      throw error;
    }
  );

  return api;
};
