import React from 'react';
import Wallet from './Wallet';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer
    .create(<Wallet address="0x0123" network={3} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
