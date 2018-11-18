import React from 'react';
import RollUnder from './RollUnder';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer
    .create(<RollUnder value={51} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
