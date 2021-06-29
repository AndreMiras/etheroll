import React from 'react';
import { string, number } from 'prop-types';
import { etherscanUrls } from '../utils/etheroll-contract';


const Transaction = ({ hash, network }) => {
  const url = `${etherscanUrls[network]}/tx/${hash}`;
  return <a href={url}>{hash}</a>;
};
Transaction.propTypes = {
  hash: string.isRequired,
  network: number.isRequired,
};

export default Transaction;
