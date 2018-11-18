import React from 'react';
import ContractInfo from './ContractInfo';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer
    .create(<ContractInfo account="0x0123" contractAddress="0x3210" network={3} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
