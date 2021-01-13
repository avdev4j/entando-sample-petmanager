import React from 'react';
import { render, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import 'components/__mocks__/i18n';
import { apiTypeGet } from 'api/type';
import typeApiGetResponseMock from 'components/__mocks__/typeMocks';
import TypeDetailsContainer from 'components/TypeDetailsContainer';

jest.mock('api/type');

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
  apiTypeGet.mockClear();
});

describe('TypeDetailsContainer component', () => {
  test('requests data when component is mounted', async () => {
    apiTypeGet.mockImplementation(() => Promise.resolve(typeApiGetResponseMock));

    render(<TypeDetailsContainer id="1" />);

    await wait(() => {
      expect(apiTypeGet).toHaveBeenCalledTimes(1);
    });
  });

  test('data is shown after mount API call', async () => {
    apiTypeGet.mockImplementation(() => Promise.resolve(typeApiGetResponseMock));

    const { getByText } = render(<TypeDetailsContainer id="1" />);

    await wait(() => {
      expect(apiTypeGet).toHaveBeenCalledTimes(1);
      expect(getByText('entities.type.label')).toBeInTheDocument();
    });
  });

  test('error is shown after failed API call', async () => {
    const onErrorMock = jest.fn();
    apiTypeGet.mockImplementation(() => Promise.reject());

    const { getByText } = render(<TypeDetailsContainer id="1" onError={onErrorMock} />);

    await wait(() => {
      expect(apiTypeGet).toHaveBeenCalledTimes(1);
      expect(onErrorMock).toHaveBeenCalledTimes(1);
      expect(getByText('common.couldNotFetchData')).toBeInTheDocument();
    });
  });
});
