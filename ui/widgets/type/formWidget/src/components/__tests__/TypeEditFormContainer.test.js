import React from 'react';
import { fireEvent, render, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { apiTypeGet, apiTypePut } from 'api/types';
import TypeEditFormContainer from 'components/TypeEditFormContainer';
import 'i18n/__mocks__/i18nMock';
import typeMock from 'components/__mocks__/typeMocks';

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

describe('TypeEditFormContainer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const errorMessageKey = 'error.dataLoading';
  const successMessageKey = 'common.dataSaved';

  const onErrorMock = jest.fn();
  const onUpdateMock = jest.fn();

  it('loads data', async () => {
    apiTypeGet.mockImplementation(() => Promise.resolve(typeMock));
    const { queryByText } = render(
      <TypeEditFormContainer id="1" onError={onErrorMock} onUpdate={onUpdateMock} />
    );

    await wait(() => {
      expect(apiTypeGet).toHaveBeenCalledTimes(1);
      expect(apiTypeGet).toHaveBeenCalledWith('', '1');
      expect(queryByText(errorMessageKey)).not.toBeInTheDocument();
      expect(onErrorMock).toHaveBeenCalledTimes(0);
    });
  }, 7000);

  it('saves data', async () => {
    apiTypeGet.mockImplementation(() => Promise.resolve(typeMock));
    apiTypePut.mockImplementation(() => Promise.resolve(typeMock));

    const { findByTestId, queryByText } = render(
      <TypeEditFormContainer id="1" onError={onErrorMock} onUpdate={onUpdateMock} />
    );

    const saveButton = await findByTestId('submit-btn');

    fireEvent.click(saveButton);

    await wait(() => {
      expect(apiTypePut).toHaveBeenCalledTimes(1);
      expect(apiTypePut).toHaveBeenCalledWith('', typeMock);
      expect(queryByText(successMessageKey)).toBeInTheDocument();
      expect(onErrorMock).toHaveBeenCalledTimes(0);
      expect(queryByText(errorMessageKey)).not.toBeInTheDocument();
    });
  }, 7000);

  it('shows an error if data is not successfully loaded', async () => {
    apiTypeGet.mockImplementation(() => Promise.reject());
    const { queryByText } = render(
      <TypeEditFormContainer id="1" onError={onErrorMock} onUpdate={onUpdateMock} />
    );

    await wait(() => {
      expect(apiTypeGet).toHaveBeenCalledTimes(1);
      expect(apiTypeGet).toHaveBeenCalledWith('', '1');
      expect(onErrorMock).toHaveBeenCalledTimes(1);
      expect(queryByText(errorMessageKey)).toBeInTheDocument();
      expect(queryByText(successMessageKey)).not.toBeInTheDocument();
    });
  }, 7000);

  it('shows an error if data is not successfully saved', async () => {
    apiTypeGet.mockImplementation(() => Promise.resolve(typeMock));
    apiTypePut.mockImplementation(() => Promise.reject());
    const { findByTestId, getByText } = render(
      <TypeEditFormContainer id="1" onError={onErrorMock} />
    );

    const saveButton = await findByTestId('submit-btn');

    fireEvent.click(saveButton);

    await wait(() => {
      expect(apiTypeGet).toHaveBeenCalledTimes(1);
      expect(apiTypeGet).toHaveBeenCalledWith('', '1');

      expect(apiTypePut).toHaveBeenCalledTimes(1);
      expect(apiTypePut).toHaveBeenCalledWith('', typeMock);

      expect(onErrorMock).toHaveBeenCalledTimes(1);
      expect(getByText(errorMessageKey)).toBeInTheDocument();
    });
  }, 7000);
});
