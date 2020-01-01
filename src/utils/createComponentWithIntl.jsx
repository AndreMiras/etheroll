/*
 * https://github.com/formatjs/react-intl/blob/v3.10.0/docs/Testing-with-React-Intl.md#helper-function-2
 */
import React from 'react';
import renderer from 'react-test-renderer';
import { IntlProvider } from 'react-intl';

const createComponentWithIntl = (children, props = { locale: 'en' }) => (
  renderer.create(<IntlProvider {...props}>{children}</IntlProvider>)
);

export default createComponentWithIntl;
