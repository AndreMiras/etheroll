import React from 'react';
import renderer from 'react-test-renderer';
import ContractInfo from './ContractInfo';

it('renders correctly', () => {
  const tree = renderer
    .create(<ContractInfo account="0x0123" contractAddress="0x3210" network={3} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
