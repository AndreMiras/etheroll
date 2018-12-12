import React from 'react';
import renderer from 'react-test-renderer';
import MetaMaskLink from './MetaMaskLink';

it('renders correctly', () => {
  const tree = renderer
    .create(<MetaMaskLink />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
