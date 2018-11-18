import React from 'react';
import { Address } from './PlaceBet';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer
    .create(<Address address="0x0123" network={3} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
