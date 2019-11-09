import React from 'react';
import renderer from 'react-test-renderer';
import CoinFlip from './CoinFlip';

it('renders correctly', () => {
  const tree = renderer
    .create(<CoinFlip showMessage={() => {}} showWarningMessage={() => {}} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
