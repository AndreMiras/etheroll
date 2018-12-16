import React from 'react';
import renderer from 'react-test-renderer';
import RollUnderRecap from './RollUnderRecap';

it('renders correctly', () => {
  const tree = renderer
    .create(<RollUnderRecap value={51} betSize={0.1} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
