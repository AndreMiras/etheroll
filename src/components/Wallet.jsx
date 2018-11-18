import React from 'react';
import Address from './Address';

function Wallet({ address, network }) {
  return (
    <span>
      Wallet:
      <Address address={address} network={network} />
    </span>
  );
}
Wallet.propTypes = Address.propTypes;

export default Wallet;
