import React from 'react';
import Contract from './Contract';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer
    .create(<Contract address="0x0123" network={3} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
