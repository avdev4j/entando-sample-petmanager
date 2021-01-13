import React from 'react';
import { fireEvent, render, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { apiPetGet, apiPetPut } from 'api/pets';
import PetEditFormContainer from 'components/PetEditFormContainer';
import 'i18n/__mocks__/i18nMock';
import petMock from 'components/__mocks__/petMocks';

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

describe('PetEditFormContainer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const errorMessageKey = 'error.dataLoading';
  const successMessageKey = 'common.dataSaved';

  const onErrorMock = jest.fn();
  const onUpdateMock = jest.fn();

  it('loads data', async () => {
    apiPetGet.mockImplementation(() => Promise.resolve(petMock));
    const { queryByText } = render(
      <PetEditFormContainer id="1" onError={onErrorMock} onUpdate={onUpdateMock} />
    );

    await wait(() => {
      expect(apiPetGet).toHaveBeenCalledTimes(1);
      expect(apiPetGet).toHaveBeenCalledWith('', '1');
      expect(queryByText(errorMessageKey)).not.toBeInTheDocument();
      expect(onErrorMock).toHaveBeenCalledTimes(0);
    });
  }, 7000);

  it('saves data', async () => {
    apiPetGet.mockImplementation(() => Promise.resolve(petMock));
    apiPetPut.mockImplementation(() => Promise.resolve(petMock));

    const { findByTestId, queryByText } = render(
      <PetEditFormContainer id="1" onError={onErrorMock} onUpdate={onUpdateMock} />
    );

    const saveButton = await findByTestId('submit-btn');

    fireEvent.click(saveButton);

    await wait(() => {
      expect(apiPetPut).toHaveBeenCalledTimes(1);
      expect(apiPetPut).toHaveBeenCalledWith('', petMock);
      expect(queryByText(successMessageKey)).toBeInTheDocument();
      expect(onErrorMock).toHaveBeenCalledTimes(0);
      expect(queryByText(errorMessageKey)).not.toBeInTheDocument();
    });
  }, 7000);

  it('shows an error if data is not successfully loaded', async () => {
    apiPetGet.mockImplementation(() => Promise.reject());
    const { queryByText } = render(
      <PetEditFormContainer id="1" onError={onErrorMock} onUpdate={onUpdateMock} />
    );

    await wait(() => {
      expect(apiPetGet).toHaveBeenCalledTimes(1);
      expect(apiPetGet).toHaveBeenCalledWith('', '1');
      expect(onErrorMock).toHaveBeenCalledTimes(1);
      expect(queryByText(errorMessageKey)).toBeInTheDocument();
      expect(queryByText(successMessageKey)).not.toBeInTheDocument();
    });
  }, 7000);

  it('shows an error if data is not successfully saved', async () => {
    apiPetGet.mockImplementation(() => Promise.resolve(petMock));
    apiPetPut.mockImplementation(() => Promise.reject());
    const { findByTestId, getByText } = render(
      <PetEditFormContainer id="1" onError={onErrorMock} />
    );

    const saveButton = await findByTestId('submit-btn');

    fireEvent.click(saveButton);

    await wait(() => {
      expect(apiPetGet).toHaveBeenCalledTimes(1);
      expect(apiPetGet).toHaveBeenCalledWith('', '1');

      expect(apiPetPut).toHaveBeenCalledTimes(1);
      expect(apiPetPut).toHaveBeenCalledWith('', petMock);

      expect(onErrorMock).toHaveBeenCalledTimes(1);
      expect(getByText(errorMessageKey)).toBeInTheDocument();
    });
  }, 7000);
});
