import React from 'react';
import renderer from 'react-test-renderer';
import BetSize from './BetSize';

it('renders correctly', () => {
  const tree = renderer
    .create(<BetSize betSize={0.1} updateBetSize={() => {}} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
