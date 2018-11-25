import React from 'react';
import PropTypes from 'prop-types';
import { etherscanUrls } from '../utils/etheroll-contract';

// TODO: retrieve dynamically from ABI
// var evnt = new SolidityEvent(web3, abi, contract.address);
// evnt.signature()
const events = {
  LogBet: '0x56b3f1a6cd856076d6f8adbf8170c43a0b0f532fc5696a2699a0e0cabc704163',
  LogResult: '0x8dd0b145385d04711e29558ceab40b456976a2b9a7d648cc1bcd416161bf97b9',
};

function LogBet({ contract, network, transaction }) {
  const hash = transaction.transactionHash;
  const url = `${etherscanUrls[network]}/tx/${hash}`;
  const txEvent = 'LogBet';
  const decoded = contract.decodeEvent(transaction);
  console.log(decoded);
  // debugger;
  return (
    <a href={url}>
      {hash}
      &nbsp;
      {txEvent}
    </a>
  );
}
LogBet.propTypes = {
  // TODO: be more specific
  contract: PropTypes.object.isRequired,
  network: PropTypes.number.isRequired,
  // TODO: be more specific
  transaction: PropTypes.object.isRequired,
};

function LogResult({ network, transaction }) {
  const hash = transaction.transactionHash;
  const url = `${etherscanUrls[network]}/tx/${hash}`;
  const txEvent = 'LogResult';
  return (
    <a href={url}>
      {hash}
      &nbsp;
      {txEvent}
    </a>);
}
LogResult.propTypes = {
  network: PropTypes.number.isRequired,
  // TODO: be more specific
  transaction: PropTypes.object.isRequired,
};

function Transaction({ contract, network, transaction }) {
  // debugger;
  const topic0 = transaction.topics[0];
  if (topic0 === events.LogBet) {
    return <LogBet contract={contract} network={network} transaction={transaction} />;
  }
  if (topic0 === events.LogResult) {
    return <LogResult network={network} transaction={transaction} />;
  }
}
Transaction.propTypes = {
  // TODO: be more specific
  contract: PropTypes.object.isRequired,
  network: PropTypes.number.isRequired,
  transaction: PropTypes.object.isRequired,
};

function Transactions({ contract, network, transactions }) {
  if (transactions.length === 0) return <span />;
  const transactionsElems = transactions.map(transaction => (
    <li key={transaction.transactionHash} className="list-group-item">
      <Transaction
        contract={contract}
        network={network}
        transaction={transaction}
      />
    </li>
  ));
  return (
    <div className="card transactions">
      <div className="card-header">Transactions (all)</div>
      <div className="card-body">
        <ul className="list-group">{transactionsElems}</ul>
      </div>
    </div>
  );
}
Transactions.propTypes = {
  // TODO: be more specific
  // contract: PropTypes.object.isRequired,
  network: PropTypes.number.isRequired,
  // TODO: be more specific with the array type
  transactions: PropTypes.arrayOf(PropTypes.object).isRequired,
};


export default Transactions;
