import React from 'react';
import renderer from 'react-test-renderer';
import RollButton from './RollButton';

it('renders correctly', () => {
  const tree = renderer
    .create(<RollButton onClick={() => {}} text="text" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
