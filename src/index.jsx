import React from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl';
import messagesEs from './translations/es.json';
import messagesFr from './translations/fr.json';
import setupGA from './utils/analytics';
import setupSentry from './utils/sentry';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import '@fortawesome/fontawesome-free/css/all.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

setupGA();
setupSentry();

const messages = {
  en: null,
  es: messagesEs,
  fr: messagesFr,
};
// language without region code
const language = navigator.language.split(/[-_]/)[0];

ReactDOM.render(
  <IntlProvider locale={language} messages={messages[language]}>
    <App />
  </IntlProvider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
