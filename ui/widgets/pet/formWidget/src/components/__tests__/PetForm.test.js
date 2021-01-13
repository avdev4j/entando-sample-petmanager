import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, wait } from '@testing-library/react';
import 'i18n/__mocks__/i18nMock';
import petMock from 'components/__mocks__/petMocks';
import PetForm from 'components/PetForm';
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme();

describe('Pet Form', () => {
  it('shows form', () => {
    const { getByLabelText } = render(
      <ThemeProvider theme={theme}>
        <PetForm pet={petMock} />
      </ThemeProvider>
    );
    expect(getByLabelText('entities.pet.name').value).toBe(
      'Voluptas quisquam et sint impedit vitae natus. Et earum aspernatur magnam. Vero sit fugiat. Placeat sapiente dicta ut quia dicta magnam ipsam. Nulla eum pariatur pariatur culpa explicabo. Enim dolor et rem totam.'
    );
  });

  it('submits form', async () => {
    const handleSubmit = jest.fn();
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <PetForm pet={petMock} onSubmit={handleSubmit} />
      </ThemeProvider>
    );

    const form = getByTestId('pet-form');
    fireEvent.submit(form);

    await wait(() => {
      expect(handleSubmit).toHaveBeenCalledTimes(1);
    });
  });
});
