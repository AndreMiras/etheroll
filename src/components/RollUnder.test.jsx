import React from 'react';
import renderer from 'react-test-renderer';
import RollUnder from './RollUnder';

it('renders correctly', () => {
  const tree = renderer
    .create(<RollUnder value={51} betSize={0.1} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
