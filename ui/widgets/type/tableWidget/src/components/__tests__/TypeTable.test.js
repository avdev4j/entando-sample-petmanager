import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import 'components/__mocks__/i18n';
import typeMocks from 'components/__mocks__/typeMocks';
import TypeTable from 'components/TypeTable';

describe('TypeTable', () => {
  it('shows types', () => {
    const { getByText } = render(<TypeTable items={typeMocks} />);
    expect(
      getByText(
        'Ut voluptatem et et quia ut quae necessitatibus est. Et veniam accusamus et voluptatem aut veritatis ipsum voluptatem. Excepturi exercitationem perferendis nemo omnis temporibus nisi.'
      )
    ).toBeInTheDocument();
    expect(
      getByText(
        'Cumque molestiae suscipit maiores qui eveniet saepe. Voluptatem sunt est odit omnis quod sed. Accusantium nobis consequatur voluptatem. Omnis fuga sint voluptatum similique velit et nihil illo.'
      )
    ).toBeInTheDocument();
  });

  it('shows no types message', () => {
    const { queryByText } = render(<TypeTable items={[]} />);
    expect(
      queryByText(
        'Ut voluptatem et et quia ut quae necessitatibus est. Et veniam accusamus et voluptatem aut veritatis ipsum voluptatem. Excepturi exercitationem perferendis nemo omnis temporibus nisi.'
      )
    ).not.toBeInTheDocument();
    expect(
      queryByText(
        'Cumque molestiae suscipit maiores qui eveniet saepe. Voluptatem sunt est odit omnis quod sed. Accusantium nobis consequatur voluptatem. Omnis fuga sint voluptatum similique velit et nihil illo.'
      )
    ).not.toBeInTheDocument();

    expect(queryByText('entities.type.noItems')).toBeInTheDocument();
  });

  it('calls onSelect when the user clicks a table row', () => {
    const onSelectMock = jest.fn();
    const { getByText } = render(<TypeTable items={typeMocks} onSelect={onSelectMock} />);
    fireEvent.click(
      getByText(
        'Ut voluptatem et et quia ut quae necessitatibus est. Et veniam accusamus et voluptatem aut veritatis ipsum voluptatem. Excepturi exercitationem perferendis nemo omnis temporibus nisi.'
      )
    );
    expect(onSelectMock).toHaveBeenCalledTimes(1);
  });
});
