import React from 'react';
import PropTypes from 'prop-types';
import { etherscanUrls } from '../utils/etheroll-contract';


function Transaction({ hash, network }) {
  const url = `${etherscanUrls[network]}/tx/${hash}`;
  return <a href={url}>{hash}</a>;
}
Transaction.propTypes = {
  hash: PropTypes.string.isRequired,
  network: PropTypes.number.isRequired,
};

export default Transaction;
