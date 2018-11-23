import React from 'react';
import renderer from 'react-test-renderer';
import Wallet from './Wallet';

it('renders correctly', () => {
  const tree = renderer
    .create(<Wallet address="0x0123" network={3} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
