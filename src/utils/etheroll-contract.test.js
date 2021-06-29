import {
  mergeLogs, getProfit, EtherollContract,
} from './etheroll-contract';

test('mergeLogs', () => {
  const logBetEvents = [
    {
      address: '0xa52e014b3f5cc48287c2d483a3e026c32cc76e6d',
      transactionHash: '0x669ae171b5951986edb13497c66efd1125d8121894f4ce359c851113e47a2d4e',
      event: 'LogBet',
      returnValues: {
        BetID: '0x30716d2ad03c2f355e1847f3b3e4e140d2f4ea8a70af087e6198b400033c02b7',
        PlayerAddress: '0xd2efbb03e67ed8a17fde6cc32d1f757cffdcf49e',
      },
    },
    {
      address: '0xa52e014b3f5cc48287c2d483a3e026c32cc76e6d',
      transactionHash: '0xc611ca779f2deffe3871e7eeea81dedecf568e58bd7783352b918c4e9c74756d',
      event: 'LogBet',
      returnValues: {
        BetID: '0xdcb9aa58ae316160c03eaf22289eb9dc2382de26d11ba5424b7d8dc852ddd176',
        PlayerAddress: '0xd2efbb03e67ed8a17fde6cc32d1f757cffdcf49e',
      },
    },
    {
      address: '0xa52e014b3f5cc48287c2d483a3e026c32cc76e6d',
      transactionHash: '0x3cff8259824e17edf927fda935ba629db51b002549ccaa06f6cdb7198e94b4fc',
      event: 'LogBet',
      returnValues: {
        BetID: '0x2c4544b6cadc99db972cd79bc8bbb07a5dff95bfcd3166233428ca36525b1c7d',
        PlayerAddress: '0xd2efbb03e67ed8a17fde6cc32d1f757cffdcf49e',
      },
    },
  ];
  const logResultEvents = [
    {
      address: '0xa52e014b3f5cc48287c2d483a3e026c32cc76e6d',
      transactionHash: '0xb1b68a7fda0a88b306abce866a81c7ba4f42b2b02b8bdd43145535814a9b9e90',
      event: 'LogResult',
      returnValues: {
        BetID: '0xdcb9aa58ae316160c03eaf22289eb9dc2382de26d11ba5424b7d8dc852ddd176',
        PlayerAddress: '0xd2efbb03e67ed8a17fde6cc32d1f757cffdcf49e',
      },
    },
    {
      address: '0xa52e014b3f5cc48287c2d483a3e026c32cc76e6d',
      transactionHash: '0x7240c28182f2b90be5622904b76877c2ff0da8b07851926c5a3c3f05ea1d1cad',
      event: 'LogResult',
      returnValues: {
        BetID: '0x2c4544b6cadc99db972cd79bc8bbb07a5dff95bfcd3166233428ca36525b1c7d',
        PlayerAddress: '0xd2efbb03e67ed8a17fde6cc32d1f757cffdcf49e',
      },
    },
  ];
  const expectedMergedLog = [
    {
      logBetEvent: logBetEvents[0],
      logResultEvent: undefined,
    },
    {
      logBetEvent: logBetEvents[1],
      logResultEvent: logResultEvents[0],
    },
    {
      logBetEvent: logBetEvents[2],
      logResultEvent: logResultEvents[1],
    },
  ];
  const mergedLogs = mergeLogs(logBetEvents, logResultEvents);
  expect(mergedLogs).toEqual(expectedMergedLog);
});

describe('getProfit', () => {
  it('computes a net profit', () => {
    const betSize = 10;
    const winningChances = 10;

    const expectedProfit = 89;
    expect(getProfit(betSize, winningChances)).toEqual(expectedProfit);
  });

  it('never returns a negative value', () => {
    const betSize = 10;
    const winningChances = Infinity;

    const expectedProfit = 0;
    expect(getProfit(betSize, winningChances)).toEqual(expectedProfit);
  });

  it('returns 0 when the winning chances are 0', () => {
    const betSize = 10;
    const winningChances = 0;

    const expectedProfit = 0;
    expect(getProfit(betSize, winningChances)).toEqual(expectedProfit);
  });
});


class MockContract {
  constructor(abi, address) {
    this.abi = abi;
    this.address = address;
  }
}

const mockWeb3 = () => (
  {
    eth: {
      Contract: MockContract,
    },
  }
);

describe('EtherollContract', () => {
  it('construct with two parameters', () => {
    const address = '0x1234';
    const web3 = mockWeb3();
    const etherollContract = new EtherollContract(web3, address);
    expect(etherollContract.address).toEqual(address);
  });
});
