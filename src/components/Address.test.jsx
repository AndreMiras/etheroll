import React from 'react';
import Address from './Address';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer
    .create(<Address address="0x0123" network={3} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
