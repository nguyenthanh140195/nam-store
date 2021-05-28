import axios from 'axios'
import { getToken } from '@/helps/auth'

const { CancelToken } = axios;
let instance = null;

const getInstance = () => {
  if (!instance) {
    instance = axios.create({
      timeout: 20 * 1000,
      withCredentials: false,
    });

    /** Add a request interceptor */
    instance.interceptors.request.use(config => {
      return config;
    }, error => {
      return Promise.reject(error);
    });

    /** Add a response interceptor */
    instance.interceptors.response.use(response => {
      return response;
    }, error => {
      if (axios.isCancel(error)) {
        const newError = new Error('canceled');
        return Promise.reject(newError);
      }
      return Promise.reject(error);
    });
  };
  return instance;
};

function api(requestConfig) {
  const source = CancelToken.source();
  const instance = getInstance();
  const request = {
    ...requestConfig,
    cancelToken: source.token
  };
  if (!configRequest.noAuth) {
    const Authorization = `Bearer ${getToken()}`;
    configRequest.headers = { Authorization };
  }
  const promise = instance(request);
  return { promise, source };
}

export function makeGet(request) {
  return api({
    ...request,
    method: 'get'
  });
}

export function makePost(request) {
  return api({
    ...request,
    method: 'post'
  });
}

export function makePut(request) {
  return api({
    ...request,
    method: 'put'
  });
}

export function makeDelete(request) {
  return api({
    ...request,
    method: 'delete'
  });
}
