import React from 'react';
import { element } from 'prop-types';


export const IntlContext = React.createContext();

const IntlContextProvider = ({ children }) => {
  const [locale, setLocale] = React.useState('en');
  return (
    <IntlContext.Provider value={[locale, setLocale]}>
      {children}
    </IntlContext.Provider>
  );
};
IntlContextProvider.propTypes = {
  children: element.isRequired,
};

export default IntlContextProvider;
