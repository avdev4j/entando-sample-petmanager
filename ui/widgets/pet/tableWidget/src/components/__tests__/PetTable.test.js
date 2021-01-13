import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import 'components/__mocks__/i18n';
import petMocks from 'components/__mocks__/petMocks';
import PetTable from 'components/PetTable';

describe('PetTable', () => {
  it('shows pets', () => {
    const { getByText } = render(<PetTable items={petMocks} />);
    expect(
      getByText(
        'Temporibus eveniet ut harum quia molestiae numquam laborum dolor. Explicabo impedit consequuntur rerum et incidunt. Magnam animi illo maxime quam sunt consectetur veniam velit. Aut rem omnis sint.'
      )
    ).toBeInTheDocument();
    expect(
      getByText(
        'Illum praesentium hic aut quod expedita nobis eum doloremque. Et nihil necessitatibus corporis voluptas qui eius ab illo earum. Autem dolor natus occaecati ipsam eum. Sed numquam quam quaerat hic qui cum inventore qui.'
      )
    ).toBeInTheDocument();
  });

  it('shows no pets message', () => {
    const { queryByText } = render(<PetTable items={[]} />);
    expect(
      queryByText(
        'Temporibus eveniet ut harum quia molestiae numquam laborum dolor. Explicabo impedit consequuntur rerum et incidunt. Magnam animi illo maxime quam sunt consectetur veniam velit. Aut rem omnis sint.'
      )
    ).not.toBeInTheDocument();
    expect(
      queryByText(
        'Illum praesentium hic aut quod expedita nobis eum doloremque. Et nihil necessitatibus corporis voluptas qui eius ab illo earum. Autem dolor natus occaecati ipsam eum. Sed numquam quam quaerat hic qui cum inventore qui.'
      )
    ).not.toBeInTheDocument();

    expect(queryByText('entities.pet.noItems')).toBeInTheDocument();
  });

  it('calls onSelect when the user clicks a table row', () => {
    const onSelectMock = jest.fn();
    const { getByText } = render(<PetTable items={petMocks} onSelect={onSelectMock} />);
    fireEvent.click(
      getByText(
        'Temporibus eveniet ut harum quia molestiae numquam laborum dolor. Explicabo impedit consequuntur rerum et incidunt. Magnam animi illo maxime quam sunt consectetur veniam velit. Aut rem omnis sint.'
      )
    );
    expect(onSelectMock).toHaveBeenCalledTimes(1);
  });
});
