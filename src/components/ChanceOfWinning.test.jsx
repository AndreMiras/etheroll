import React from 'react';
import renderer from 'react-test-renderer';
import ChanceOfWinning from './ChanceOfWinning';

it('renders correctly', () => {
  const tree = renderer
    .create(<ChanceOfWinning chances={50} updateChances={() => {}} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
