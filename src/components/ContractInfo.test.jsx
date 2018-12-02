import React from 'react';
import renderer from 'react-test-renderer';
import ContractInfo from './ContractInfo';

it('renders correctly', () => {
  const tree = renderer
    .create(<ContractInfo accountAddress="0x0123" contractAddress="0x3210" network={3} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});


it('no account address', () => {
  const tree = renderer
    .create(<ContractInfo contractAddress="0x3210" network={3} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
