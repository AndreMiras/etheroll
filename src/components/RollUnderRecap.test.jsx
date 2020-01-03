import React from 'react';
import createComponentWithIntl from '../utils/createComponentWithIntl';
import RollUnderRecap from './RollUnderRecap';

it('renders correctly', () => {
  const tree = createComponentWithIntl(
    <RollUnderRecap value={51} betSize={0.1} />,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
