import React from 'react';
import createComponentWithIntl from '../utils/createComponentWithIntl';
import BetSize from './BetSize';

it('renders correctly', () => {
  const tree = createComponentWithIntl(
    <BetSize betSize={0.1} updateBetSize={() => {}} />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
