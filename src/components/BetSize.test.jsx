import React from 'react';
import BetSize from './BetSize';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer
    .create(<BetSize betSize={0.1} updateBetSize={(function(){})} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
