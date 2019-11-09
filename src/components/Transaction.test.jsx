import React from 'react';
import renderer from 'react-test-renderer';
import Transaction from './Transaction';


it('renders correctly on empty transactions', () => {
  const tree = renderer
    .create(<Transaction hash="0x1234" network={3} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
