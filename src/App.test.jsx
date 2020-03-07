import React from 'react';
import ReactDOM from 'react-dom';
import IntlContextProvider from './contexts/IntlContext';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<IntlContextProvider><App /></IntlContextProvider>, div);
  ReactDOM.unmountComponentAtNode(div);
});
