import React from 'react';
import PropTypes from 'prop-types';
import { etherscanUrls } from '../utils/etheroll-contract';

function Transaction({ hash, network }) {
  const url = `${etherscanUrls[network]}/tx/${hash}`;
  return <a href={url}>{hash}</a>;
}
Transaction.propTypes = {
  hash: PropTypes.string.isRequired,
  network: PropTypes.number.isRequired,
};

function Transactions({ network, transactions }) {
  if (transactions.length === 0) return <span />;
  const transactionsElems = transactions.map(item => (
    <li key={item} className="list-group-item"><Transaction network={network} hash={item} /></li>
  ));
  return (
    <div className="card transactions">
      <div className="card-header">Transactions</div>
      <div className="card-body">
        <ul className="list-group">{transactionsElems}</ul>
      </div>
    </div>
  );
}
Transactions.propTypes = {
  network: PropTypes.number.isRequired,
  transactions: PropTypes.arrayOf(PropTypes.string).isRequired,
};


export default Transactions;
