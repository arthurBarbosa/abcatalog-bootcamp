import { CLIENT_ID, CLIENT_SECRET, getSessionData, logout } from './auth';
import qs from 'qs';
import axios, { AxiosRequestConfig } from "axios";

type LoginData = {
  username: string;
  password: string;
}

const BASE_URL = "http://localhost:8080";

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (error.response.status === 401) {
    logout();
  }
  return Promise.reject(error);
});

export const makeRequest = (params: AxiosRequestConfig) => {
  return axios({
    ...params,
    baseURL: BASE_URL
  });
};

export const makePrivateRequest = (params: AxiosRequestConfig) => {
  const sessionData = getSessionData();

  const headers = {
    'Authorization': `Bearer ${sessionData.access_token}`
  }

  return makeRequest({ ...params, headers });
}

export const makeLogin = (loginData: LoginData) => {
  const token = `${CLIENT_ID}:${CLIENT_SECRET}`;

  const headers = {
    Authorization: `Basic ${window.btoa(token)}`,
    'Content-Type': 'application/x-www-form-urlencoded'
  }

  const payload = qs.stringify({ ...loginData, grant_type: 'password' });

  return makeRequest({ url: '/oauth/token', data: payload, method: 'POST', headers });
}