import React from 'react';
import { IntlProvider } from 'react-intl';
import { HashRouter as Router } from 'react-router-dom';
import './App.css';
import { IntlContext } from './contexts/IntlContext';
import Headers from './components/Headers';
import Footers from './components/Footers';
import Container from './components/Container';
import { messages } from './utils/locales';


const App = () => {
  const [locale] = React.useContext(IntlContext);
  return (
    <Router>
      <IntlProvider locale={locale} messages={messages[locale]}>
        <div className="App">
          <Headers />
          <Container />
          <Footers />
        </div>
      </IntlProvider>
    </Router>
  );
};

export default App;
