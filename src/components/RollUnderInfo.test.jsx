import React from 'react';
import renderer from 'react-test-renderer';
import RollUnderInfo from './RollUnderInfo';

it('renders correctly', () => {
  const tree = renderer
    .create(<RollUnderInfo value={51} betSize={0.1} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
