import { getDefaultOptions, request } from 'api/helpers';

const resource = 'api/types';

export const apiTypeGet = async (serviceUrl, id) => {
  const url = `${serviceUrl}/${resource}/${id}`;
  const options = {
    ...getDefaultOptions(),
    method: 'GET',
  };
  return request(url, options);
};

export const apiTypePost = async (serviceUrl, type) => {
  const url = `${serviceUrl}/${resource}`;
  const options = {
    ...getDefaultOptions(),
    method: 'POST',
    body: type ? JSON.stringify(type) : null,
  };
  return request(url, options);
};

export const apiTypePut = async (serviceUrl, type) => {
  const url = `${serviceUrl}/${resource}`;
  const options = {
    ...getDefaultOptions(),
    method: 'PUT',
    body: type ? JSON.stringify(type) : null,
  };
  return request(url, options);
};

export const apiTypeDelete = async (serviceUrl, id) => {
  const url = `${serviceUrl}/${resource}/${id}`;
  const options = {
    ...getDefaultOptions(),
    method: 'DELETE',
  };
  return request(url, options);
};
