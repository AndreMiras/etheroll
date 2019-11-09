import React from 'react';
import renderer from 'react-test-renderer';
import ContractInfo from './ContractInfo';

it('renders correctly', () => {
  const tree = renderer
    .create(<ContractInfo accountAddress="0x0123" accountBalance={1.123} contractAddress="0x3210" contractBalance={123} network={3} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});


it('no account address', () => {
  const tree = renderer
    .create(<ContractInfo contractAddress="0x3210" contractBalance={123} accountBalance={0} network={3} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
