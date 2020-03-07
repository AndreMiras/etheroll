import React from 'react';
import renderer from 'react-test-renderer';
import IntlContextProvider from '../contexts/IntlContext';
import LanguageUpdate from './LanguageUpdate';

it('renders correctly', () => {
  const tree = renderer.create(
    <IntlContextProvider>
      <LanguageUpdate />
    </IntlContextProvider>,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
