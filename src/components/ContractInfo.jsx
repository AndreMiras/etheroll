import React from 'react';
import PropTypes from 'prop-types';
import Address from './Address';

function ContractInfo({ accountAddress, contractAddress, network }) {
  const contractAddr = <Address network={network} address={contractAddress} />;
  const contract = (
    <div className="col-lg-6">
      Contract
      &nbsp;
      {contractAddr}
    </div>
  );
  const accountAddr = (accountAddress !== null)
    ? <Address network={network} address={accountAddress} />
    : <span>Not connected, please login to MetaMask</span>;
  const account = (
    <div className="col-lg-6">
      Account
      &nbsp;
      {accountAddr}
    </div>
  );
  return (
    <div className="row">
      {contract}
      {account}
    </div>
  );
}
ContractInfo.propTypes = {
  accountAddress: PropTypes.string,
  contractAddress: PropTypes.string.isRequired,
  network: PropTypes.number.isRequired,
};
ContractInfo.defaultProps = {
  accountAddress: null,
};

export default ContractInfo;
