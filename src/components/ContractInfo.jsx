import React from 'react';
import { number, string } from 'prop-types';
import Address from './Address';

function ContractInfo({
  accountAddress, accountBalance, contractAddress, contractBalance, network,
}) {
  const contractAddr = <Address network={network} address={contractAddress} />;

  const contractBalanceBlock = (
    <div className="col-12 d-none d-sm-block">
      <i className="far fa-file-code" />
      &nbsp;Contract&nbsp;(
      {contractBalance.toFixed(2)}
      &nbsp;ETH)
    </div>
  );

  const contractAddressBlock = (
    <div className="col-12 d-none d-sm-block">
      {contractAddr}
    </div>
  );
  const accountAddr = (accountAddress !== null)
    ? <Address network={network} address={accountAddress} />
    : <span>Not connected, please login to MetaMask</span>;

  const accountBalanceBlock = (
    <div className="col-lg-12">
      <i className="far fa-user" />
      &nbsp;Account&nbsp;(
      {accountBalance.toFixed(2)}
      &nbsp;ETH)
    </div>
  );

  const accountAddressBlock = (
    <div className="col-12">
      {accountAddr}
    </div>
  );

  return (
    <div className="row">
      {accountBalanceBlock}
      {accountAddressBlock}
      {contractBalanceBlock}
      {contractAddressBlock}
    </div>
  );
}
ContractInfo.propTypes = {
  accountAddress: string,
  accountBalance: number.isRequired,
  contractAddress: string.isRequired,
  contractBalance: number.isRequired,
  network: number.isRequired,
};
ContractInfo.defaultProps = {
  accountAddress: null,
};

export default ContractInfo;
