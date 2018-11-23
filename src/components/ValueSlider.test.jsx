import React from 'react';
import renderer from 'react-test-renderer';
import ValueSlider from './ValueSlider';

it('renders correctly', () => {
  const tree = renderer
    .create(<ValueSlider value={10} updateValue={() => {}} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
