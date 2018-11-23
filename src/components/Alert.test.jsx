import React from 'react';
import renderer from 'react-test-renderer';
import Alert from './Alert';

it('renders correctly message', () => {
  const tree = renderer
    .create(<Alert classType="success" message="message" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly no message', () => {
  const tree = renderer
    .create(<Alert classType="success" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
