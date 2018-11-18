import React from 'react';
import PropTypes from 'prop-types';
import Contract from './Contract';
import Wallet from './Wallet';

function ContractInfo({ account, contractAddress, network }) {
  if (account === null) {
    return <span>No account connected, connect with MetaMask.</span>;
  }
  return (
    <div className="row">
      <div className="col">
        <Contract network={network} address={contractAddress} />
      </div>
      <div className="col">
        <Wallet network={network} address={account} />
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
