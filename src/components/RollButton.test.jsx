import React from 'react';
import RollButton from './RollButton';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer
    .create(<RollButton onClick={(function(){})} text="text" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
