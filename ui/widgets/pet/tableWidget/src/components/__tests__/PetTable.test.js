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
        'Voluptas quisquam et sint impedit vitae natus. Et earum aspernatur magnam. Vero sit fugiat. Placeat sapiente dicta ut quia dicta magnam ipsam. Nulla eum pariatur pariatur culpa explicabo. Enim dolor et rem totam.'
      )
    ).toBeInTheDocument();
    expect(
      getByText(
        'Magni harum sunt et autem velit quidem et itaque. Commodi pariatur est dolor maxime qui ea consequatur aut. Error iure laudantium deleniti nostrum omnis et. Provident libero dignissimos vel aliquid blanditiis corporis harum. Animi deserunt porro hic quaerat minus.'
      )
    ).toBeInTheDocument();
  });

  it('shows no pets message', () => {
    const { queryByText } = render(<PetTable items={[]} />);
    expect(
      queryByText(
        'Voluptas quisquam et sint impedit vitae natus. Et earum aspernatur magnam. Vero sit fugiat. Placeat sapiente dicta ut quia dicta magnam ipsam. Nulla eum pariatur pariatur culpa explicabo. Enim dolor et rem totam.'
      )
    ).not.toBeInTheDocument();
    expect(
      queryByText(
        'Magni harum sunt et autem velit quidem et itaque. Commodi pariatur est dolor maxime qui ea consequatur aut. Error iure laudantium deleniti nostrum omnis et. Provident libero dignissimos vel aliquid blanditiis corporis harum. Animi deserunt porro hic quaerat minus.'
      )
    ).not.toBeInTheDocument();

    expect(queryByText('entities.pet.noItems')).toBeInTheDocument();
  });

  it('calls onSelect when the user clicks a table row', () => {
    const onSelectMock = jest.fn();
    const { getByText } = render(<PetTable items={petMocks} onSelect={onSelectMock} />);
    fireEvent.click(
      getByText(
        'Voluptas quisquam et sint impedit vitae natus. Et earum aspernatur magnam. Vero sit fugiat. Placeat sapiente dicta ut quia dicta magnam ipsam. Nulla eum pariatur pariatur culpa explicabo. Enim dolor et rem totam.'
      )
    );
    expect(onSelectMock).toHaveBeenCalledTimes(1);
  });
});
