import React from 'react';
import { number, string } from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Address from './Address';

function ContractInfo({
  accountAddress, accountBalance, contractAddress, contractBalance, network,
}) {
  const contractAddr = <Address network={network} address={contractAddress} />;

  const contractBalanceBlock = (
    <div className="col-12 d-none d-sm-block">
      <i className="far fa-file-code" />
      &nbsp;
      <FormattedMessage
        id="contractinfo.contract"
        defaultMessage={'Contract ({contractBalance} ETH)'}
        values={{ contractBalance: contractBalance.toFixed(2) }}
      />
    </div>
  );

  const contractAddressBlock = (
    <div className="col-12 d-none d-sm-block">
      {contractAddr}
    </div>
  );
  const accountAddr = (accountAddress !== null)
    ? <Address network={network} address={accountAddress} />
    : (
      <span>
        <FormattedMessage
          id="contractinfo.not-connected"
          defaultMessage="Not connected, please login to MetaMask"
        />
      </span>
    );

  const accountBalanceBlock = (
    <div className="col-lg-12">
      <i className="far fa-user" />
      &nbsp;
      <FormattedMessage
        id="contractinfo.account"
        defaultMessage={'Account ({accountBalance} ETH)'}
        values={{ accountBalance: accountBalance.toFixed(2) }}
      />
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
