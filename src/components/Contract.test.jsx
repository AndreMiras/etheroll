import React from 'react';
import renderer from 'react-test-renderer';
import Contract from './Contract';

it('renders correctly', () => {
  const tree = renderer
    .create(<Contract address="0x0123" network={3} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
