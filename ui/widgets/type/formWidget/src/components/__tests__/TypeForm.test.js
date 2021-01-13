import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, wait } from '@testing-library/react';
import 'i18n/__mocks__/i18nMock';
import typeMock from 'components/__mocks__/typeMocks';
import TypeForm from 'components/TypeForm';
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme();

describe('Type Form', () => {
  it('shows form', () => {
    const { getByLabelText } = render(
      <ThemeProvider theme={theme}>
        <TypeForm type={typeMock} />
      </ThemeProvider>
    );
    expect(getByLabelText('entities.type.label').value).toBe(
      'Ut voluptatem et et quia ut quae necessitatibus est. Et veniam accusamus et voluptatem aut veritatis ipsum voluptatem. Excepturi exercitationem perferendis nemo omnis temporibus nisi.'
    );
  });

  it('submits form', async () => {
    const handleSubmit = jest.fn();
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <TypeForm type={typeMock} onSubmit={handleSubmit} />
      </ThemeProvider>
    );

    const form = getByTestId('type-form');
    fireEvent.submit(form);

    await wait(() => {
      expect(handleSubmit).toHaveBeenCalledTimes(1);
    });
  });
});
