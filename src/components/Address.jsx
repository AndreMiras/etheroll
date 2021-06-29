import React from 'react';
import { string, number } from 'prop-types';
import { etherscanUrls } from '../utils/etheroll-contract';


const Address = ({ address, network }) => {
  const url = `${etherscanUrls[network]}/address/${address}`;
  return <a href={url} className="text-monospace">{address}</a>;
};
Address.propTypes = {
  address: string.isRequired,
  network: number.isRequired,
};

export default Address;
