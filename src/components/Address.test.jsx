import React from 'react';
import renderer from 'react-test-renderer';
import Address from './Address';

it('renders correctly', () => {
  const tree = renderer
    .create(<Address address="0x0123" network={3} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
