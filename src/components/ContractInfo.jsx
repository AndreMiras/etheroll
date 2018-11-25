import React from 'react';
import PropTypes from 'prop-types';
import Address from './Address';

function ContractInfo({ account, contractAddress, network }) {
  if (account === null) {
    return null;
  }
  return (
    <div className="row">
      <div className="col">
        Contract
        &nbsp;
        <Address network={network} address={contractAddress} />
      </div>
      <div className="col">
        Wallet:
        &nbsp;
        <Address network={network} address={account} />
      </div>
    </div>
  );
}
ContractInfo.propTypes = {
  account: PropTypes.string,
  contractAddress: PropTypes.string.isRequired,
  network: PropTypes.number.isRequired,
};
ContractInfo.defaultProps = {
  account: null,
};

export default ContractInfo;
