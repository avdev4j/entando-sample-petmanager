import React from 'react';
import { render, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import 'components/__mocks__/i18n';
import { apiPetGet } from 'api/pet';
import petApiGetResponseMock from 'components/__mocks__/petMocks';
import PetDetailsContainer from 'components/PetDetailsContainer';

jest.mock('api/pet');

jest.mock('auth/withKeycloak', () => {
  const withKeycloak = Component => {
    return props => (
      <Component
        {...props} // eslint-disable-line react/jsx-props-no-spreading
        keycloak={{
          initialized: true,
          authenticated: true,
        }}
      />
    );
  };

  return withKeycloak;
});

beforeEach(() => {
  apiPetGet.mockClear();
});

describe('PetDetailsContainer component', () => {
  test('requests data when component is mounted', async () => {
    apiPetGet.mockImplementation(() => Promise.resolve(petApiGetResponseMock));

    render(<PetDetailsContainer id="1" />);

    await wait(() => {
      expect(apiPetGet).toHaveBeenCalledTimes(1);
    });
  });

  test('data is shown after mount API call', async () => {
    apiPetGet.mockImplementation(() => Promise.resolve(petApiGetResponseMock));

    const { getByText } = render(<PetDetailsContainer id="1" />);

    await wait(() => {
      expect(apiPetGet).toHaveBeenCalledTimes(1);
      expect(getByText('entities.pet.name')).toBeInTheDocument();
      expect(getByText('entities.pet.birth')).toBeInTheDocument();
    });
  });

  test('error is shown after failed API call', async () => {
    const onErrorMock = jest.fn();
    apiPetGet.mockImplementation(() => Promise.reject());

    const { getByText } = render(<PetDetailsContainer id="1" onError={onErrorMock} />);

    await wait(() => {
      expect(apiPetGet).toHaveBeenCalledTimes(1);
      expect(onErrorMock).toHaveBeenCalledTimes(1);
      expect(getByText('common.couldNotFetchData')).toBeInTheDocument();
    });
  });
});
