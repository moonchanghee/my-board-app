import axios, { AxiosResponse } from 'axios';
import { BASE_URL } from '../constant/ga';

export const get = async ({ url = '/', params = {} }) => {
  return axios({
    method: 'get',
    headers: {
      'Content-Type': 'application/json',
    },
    url: `${BASE_URL}${url}`,
    params,
  }).then((response: AxiosResponse) => response);
};

export const post = async ({ url = '/', params = {}, data = {} }) => {
  return axios({
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    url: `${BASE_URL}${url}`,
    params,
    data,
  }).then((response: AxiosResponse) => response);
};

export const update = async ({ url = '/', data = {} }) => {
  return axios({
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
    },
    url: `${BASE_URL}${url}`,
    data,
  }).then((response: AxiosResponse) => response);
};

export const del = async ({ url = '/', data = {} }) => {
  return axios({
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
    },
    url: `${BASE_URL}${url}`,
    data,
  }).then((response: AxiosResponse) => response);
};
