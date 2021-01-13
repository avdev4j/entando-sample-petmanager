import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import 'components/__mocks__/i18n';
import TypeDetails from 'components/TypeDetails';
import typeMock from 'components/__mocks__/typeMocks';

describe('TypeDetails component', () => {
  test('renders data in details widget', () => {
    const { getByText } = render(<TypeDetails type={typeMock} />);

    expect(getByText('entities.type.label')).toBeInTheDocument();
  });
});
