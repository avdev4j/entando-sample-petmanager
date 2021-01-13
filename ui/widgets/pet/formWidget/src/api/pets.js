import { getDefaultOptions, request } from 'api/helpers';

const resource = 'api/pets';

export const apiPetGet = async (serviceUrl, id) => {
  const url = `${serviceUrl}/${resource}/${id}`;
  const options = {
    ...getDefaultOptions(),
    method: 'GET',
  };
  return request(url, options);
};

export const apiPetPost = async (serviceUrl, pet) => {
  const url = `${serviceUrl}/${resource}`;
  const options = {
    ...getDefaultOptions(),
    method: 'POST',
    body: pet ? JSON.stringify(pet) : null,
  };
  return request(url, options);
};

export const apiPetPut = async (serviceUrl, pet) => {
  const url = `${serviceUrl}/${resource}`;
  const options = {
    ...getDefaultOptions(),
    method: 'PUT',
    body: pet ? JSON.stringify(pet) : null,
  };
  return request(url, options);
};

export const apiPetDelete = async (serviceUrl, id) => {
  const url = `${serviceUrl}/${resource}/${id}`;
  const options = {
    ...getDefaultOptions(),
    method: 'DELETE',
  };
  return request(url, options);
};
