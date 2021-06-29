import React from 'react';
import {
  arrayOf, func, number, shape,
} from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Address from './Address';
import Transaction from './Transaction';


const MergedLog = ({ network, mergedLog }) => {
  const { logBetEvent, logResultEvent } = mergedLog;
  const playerNumber = Number(logBetEvent.returnValues.PlayerNumber);
  let valueEth = '?';
  let diceResult = '?';
  let sign = '?';
  let alertClass = 'secondary';
  // resolved bet case
  if (typeof logResultEvent !== 'undefined') {
    diceResult = Number(logResultEvent.returnValues.DiceResult);
    const playerWon = diceResult < playerNumber;
    valueEth = (logResultEvent.returnValues.Value * (10 ** (-18))).toFixed(2);
    sign = playerWon ? '<' : '>';
    alertClass = playerWon ? 'success' : 'danger';
  }
  return (
    <div className={`row d-inline-flex list-group-item list-group-item-${alertClass}`}>
      <div className="col-sm-2 d-block">
        <h3>{diceResult}</h3>
      </div>
      <div className="col-10">
        <div className="w-100">
          {valueEth}
          &nbsp;
          ETH
        </div>
        <div className="w-100">
          {diceResult}
          &nbsp;
          {sign}
          &nbsp;
          {playerNumber}
        </div>
        <div className="w-100">
          <FormattedMessage
            id="merged-log.wallet"
            defaultMessage="Wallet:"
          />
          &nbsp;
          <Address address={logBetEvent.returnValues.PlayerAddress.toString()} network={network} />
        </div>
        <div className="w-100">
          <FormattedMessage
            id="merged-log.transaction"
            defaultMessage="Transaction:"
          />
          &nbsp;
          <Transaction hash={logBetEvent.transactionHash} network={network} />
        </div>
      </div>
    </div>
  );
};
MergedLog.propTypes = {
  network: number.isRequired,
  mergedLog: shape({
    // TODO: seems completely ignored
    todo: number,
  }).isRequired,
};

const TransactionsFilterButtons = ({ onClick }) => (
  <nav className="nav">
    <button
      type="button"
      className="btn btn-link active"
      onClick={() => onClick('#all-transactions')}
    >
      <FormattedMessage
        id="transactions-filter-buttons.all-transactions"
        defaultMessage="All transactions"
      />
    </button>
    <button
      type="button"
      className="btn btn-link"
      onClick={() => onClick('#my-transactions')}
    >
      <FormattedMessage
        id="transactions-filter-buttons.my-transactions"
        defaultMessage="My transactions"
      />
    </button>
  </nav>
);
TransactionsFilterButtons.propTypes = {
  onClick: func.isRequired,
};

const Transactions = ({ network, onClick, transactions }) => {
  const reversedTransactions = transactions.slice().reverse();
  const transactionsElems = reversedTransactions.map(transaction => (
    <MergedLog
      key={transaction.logBetEvent.transactionHash}
      network={network}
      mergedLog={transaction}
    />
  ));
  return (
    <div className="card transactions">
      <div className="card-header">
        <TransactionsFilterButtons onClick={onClick} />
      </div>
      <div className="card-body">
        <div className="list-group">{transactionsElems}</div>
      </div>
    </div>
  );
};
Transactions.propTypes = {
  network: number.isRequired,
  onClick: func.isRequired,
  transactions: arrayOf(shape({
    // TODO: seems completely ignored
    // https://github.com/facebook/prop-types/issues/181
    todo: number,
  })).isRequired,
};


export default Transactions;
