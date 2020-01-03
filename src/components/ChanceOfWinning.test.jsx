import React from 'react';
import createComponentWithIntl from '../utils/createComponentWithIntl';
import ChanceOfWinning from './ChanceOfWinning';

it('renders correctly', () => {
  const tree = createComponentWithIntl(
    <ChanceOfWinning chances={50} updateChances={() => {}} />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
