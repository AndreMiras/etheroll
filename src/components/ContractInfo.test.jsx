import React from 'react';
import createComponentWithIntl from '../utils/createComponentWithIntl';
import ContractInfo from './ContractInfo';

it('renders correctly', () => {
  const tree = createComponentWithIntl(
    <ContractInfo accountAddress="0x0123" accountBalance={1.123} contractAddress="0x3210" contractBalance={123} network={3} />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});


it('no account address', () => {
  const tree = createComponentWithIntl(
    <ContractInfo contractAddress="0x3210" contractBalance={123} accountBalance={0} network={3} />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
