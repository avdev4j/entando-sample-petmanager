import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import 'components/__mocks__/i18n';
import PetDetails from 'components/PetDetails';
import petMock from 'components/__mocks__/petMocks';

describe('PetDetails component', () => {
  test('renders data in details widget', () => {
    const { getByText } = render(<PetDetails pet={petMock} />);

    expect(getByText('entities.pet.name')).toBeInTheDocument();
  });
});
