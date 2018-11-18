import React from 'react';
import Address from './Address';

function Contract({ address, network }) {
  return (
    <span>
      Contract:
      <Address address={address} network={network} />
    </span>
  );
}
Contract.propTypes = Address.propTypes;

export default Contract;
