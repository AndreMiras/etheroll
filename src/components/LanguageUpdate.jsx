import React from 'react';
import { arrayOf, func, string } from 'prop-types';
import { IntlContext } from '../contexts/IntlContext';
import { locales } from '../utils/locales';

const DropdownItem = ({ text, onClick }) => (
  <button className="dropdown-item" type="button" onClick={() => onClick(text)}>{text}</button>
);
DropdownItem.propTypes = {
  text: string.isRequired,
  onClick: func.isRequired,
};

const DropdownMenu = ({ items, onClick }) => (
  <div className="dropdown-menu" aria-labelledby="navbarDropdown">
    {items.map(item => <DropdownItem text={item} onClick={onClick} key={item} />)}
  </div>
);
DropdownMenu.propTypes = {
  items: arrayOf(string).isRequired,
  onClick: func.isRequired,
};

const LanguageUpdate = () => {
  const [locale, setLocale] = React.useContext(IntlContext);

  return (
    <li className="nav-item dropdown">
      <button
        className="nav-link btn button-link dropdown-toggle"
        id="navbarDropdown"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
        type="button"
      >
        <i className="fas fa-flag" />
        &nbsp;
        {locale.toUpperCase()}
      </button>
      <DropdownMenu
        items={locales}
        onClick={newLocale => setLocale(newLocale)}
      />
    </li>
  );
};

export default LanguageUpdate;
