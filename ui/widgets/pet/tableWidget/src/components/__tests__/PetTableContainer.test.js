import React from 'react';
import { render, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import petMocks from 'components/__mocks__/petMocks';
import { apiPetsGet } from 'api/pets';
import 'i18n/__mocks__/i18nMock';
import PetTableContainer from 'components/PetTableContainer';

jest.mock('api/pets');

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

jest.mock('components/pagination/withPagination', () => {
  const withPagination = Component => {
    return props => (
      <Component
        {...props} // eslint-disable-line react/jsx-props-no-spreading
        pagination={{
          onChangeItemsPerPage: () => {},
          onChangeCurrentPage: () => {},
        }}
      />
    );
  };

  return withPagination;
});

describe('PetTableContainer', () => {
  const errorMessageKey = 'error.dataLoading';

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('calls API', async () => {
    apiPetsGet.mockImplementation(() => Promise.resolve({ pets: petMocks, count: 2 }));
    const { queryByText } = render(<PetTableContainer />);

    await wait(() => {
      expect(apiPetsGet).toHaveBeenCalledTimes(1);
      expect(queryByText(errorMessageKey)).not.toBeInTheDocument();
    });
  });

  it('shows an error if the API call is not successful', async () => {
    apiPetsGet.mockImplementation(() => {
      throw new Error();
    });
    const { getByText } = render(<PetTableContainer />);

    wait(() => {
      expect(apiPetsGet).toHaveBeenCalledTimes(1);
      expect(getByText(errorMessageKey)).toBeInTheDocument();
    });
  });
});
