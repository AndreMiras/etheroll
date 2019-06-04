import etherollAbi from './etheroll-abi';

// TODO require vs import
const SolidityEvent = require('web3/lib/web3/event.js');

const Networks = Object.freeze({ mainnet: 1, morden: 2, ropsten: 3 });

const contractAddresses = {
  [Networks.mainnet]: '0xA52e014B3f5Cc48287c2D483A3E026C32cc76E6d',
  [Networks.ropsten]: '0xe12c6dEb59f37011d2D9FdeC77A6f1A8f3B8B1e8',
};

const etherscanUrls = {
  [Networks.mainnet]: 'https://etherscan.io',
  [Networks.ropsten]: 'https://ropsten.etherscan.io',
};


function getPayout(betSize, winningChances) {
  return 100 / winningChances * betSize;
}

function cutHouseEdge(payout) {
  const houseEdge = 1 / 100.0;
  return payout * (1 - houseEdge);
}

function getProfit(betSize, winningChances) {
  if (winningChances === 0) {
    return 0;
  }
  const rawPayout = getPayout(betSize, winningChances);
  const netPayout = cutHouseEdge(rawPayout);

  return Math.max(netPayout - betSize, 0);
}


// Merges bet logs (LogBet) with bet results logs (LogResult).
function mergeLogs(logBetEvents, logResultEvents) {
  const findLogResultEventBylogBetEvent = logBetEvent => (
    logResultEvents.find(logResultEvent => (
      logResultEvent.args.BetID === logBetEvent.args.BetID
    ))
  );

  return logBetEvents.map(logBetEvent => ({
    logBetEvent,
    logResultEvent: findLogResultEventBylogBetEvent(logBetEvent),
  }));
}

class EtherollContract {
  constructor(web3, address = contractAddresses[web3.version.network]) {
    this.web3 = web3;
    this.address = address;
    this.abi = etherollAbi;
    this.web3Contract = web3.eth.contract(etherollAbi).at(this.address);
  }

  getSolidityEvents() {
    return this.abi
      .filter(definition => definition.type === 'event')
      .map(definition => [definition.name, new SolidityEvent(this.web3, definition, this.address)]);
  }

  // Returns sha3 signature of events, e.g.
  // {'LogResult': '0x6883...5c88', 'LogBet': '0x1cb5...75c4'}
  getEventSignatures() {
    const events = this.getSolidityEvents();
    return events.reduce((signatures, [name, value]) => ({ ...signatures, [name]: value }), {});
  }

  getSolidityEvent(eventSignature) {
    const events = this.getSolidityEvents();
    const [, matchingEvent] = events.find(([, value]) => value.signature() === eventSignature.replace('0x', '')) || [];
    return matchingEvent;
  }

  decodeEvent(_evnt) {
    // SolidityEvent.decode() seems to be mutating the object, hence the copy
    const evnt = { ..._evnt };
    const solidityEvent = this.getSolidityEvent(evnt.topics[0]);
    return solidityEvent.decode(evnt);
  }

  // callback(error, result)
  getTransactionLogs(callback) {
    this.web3.eth.getBlockNumber((error, result) => {
      if (error) {
        console.log(error);
      } else {
        const filter = this.getFilter(result);
        filter.get(callback);
      }
    });
  }

  // callback(error, result)
  watchTransactionLogs(callback) {
    this.web3.eth.getBlockNumber((error, result) => {
      if (error) {
        console.log(error);
      } else {
        const filter = this.getFilter(result);
        filter.watch(callback);
      }
    });
  }

  getFilter(result) {
    const { address } = this;
    const toBlock = result;
    const fromBlock = toBlock - 100;
    const options = {
      address,
      fromBlock,
      toBlock,
    };
    return this.web3.eth.filter(options);
  }

  // callback(error, result)
  getMergedTransactionLogs(callback) {
    this.getTransactionLogs((error, result) => {
      if (error) {
        console.log(error);
      } else {
        const decodedEvents = result.map(evnt => this.decodeEvent(evnt));
        const logBetEvents = decodedEvents.filter(evnt => evnt.event === 'LogBet');
        const logResultEvents = decodedEvents.filter(evnt => evnt.event === 'LogResult');
        const mergedLogs = mergeLogs(logBetEvents, logResultEvents);
        callback(error, mergedLogs);
      }
    });
  }
}


export {
  EtherollContract, etherscanUrls, getProfit, mergeLogs, Networks, contractAddresses,
};
