import React from 'react';
import { render, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import typeMocks from 'components/__mocks__/typeMocks';
import { apiTypesGet } from 'api/types';
import 'i18n/__mocks__/i18nMock';
import TypeTableContainer from 'components/TypeTableContainer';

jest.mock('api/types');

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

describe('TypeTableContainer', () => {
  const errorMessageKey = 'error.dataLoading';

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('calls API', async () => {
    apiTypesGet.mockImplementation(() => Promise.resolve({ types: typeMocks, count: 2 }));
    const { queryByText } = render(<TypeTableContainer />);

    await wait(() => {
      expect(apiTypesGet).toHaveBeenCalledTimes(1);
      expect(queryByText(errorMessageKey)).not.toBeInTheDocument();
    });
  });

  it('shows an error if the API call is not successful', async () => {
    apiTypesGet.mockImplementation(() => {
      throw new Error();
    });
    const { getByText } = render(<TypeTableContainer />);

    wait(() => {
      expect(apiTypesGet).toHaveBeenCalledTimes(1);
      expect(getByText(errorMessageKey)).toBeInTheDocument();
    });
  });
});
