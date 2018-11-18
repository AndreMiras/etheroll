import React from 'react';
import ValueSlider from './ValueSlider';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer
    .create(<ValueSlider value={10} updateValue={(function(){})} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
