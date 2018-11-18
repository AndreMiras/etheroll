import React from 'react';
import PropTypes from 'prop-types';
import { etherscanUrls } from '../utils/etheroll-contract';


function Address({ address, network }) {
  const url = `${etherscanUrls[network]}/address/${address}`;
  return <a href={url}>{address}</a>;
}
Address.propTypes = {
  address: PropTypes.string.isRequired,
  network: PropTypes.number.isRequired,
};

export default Address;
