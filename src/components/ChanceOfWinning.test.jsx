import React from 'react';
import ChanceOfWinning from './ChanceOfWinning';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer
    .create(<ChanceOfWinning chances={50} updateChances={(function(){})} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
