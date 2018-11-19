import getWeb3 from './get-web3';
import etherollAbi from './etheroll-abi';

const Networks = Object.freeze({ mainnet: 1, morden: 2, ropsten: 3 });

const contractAddresses = {
  [Networks.mainnet]: '0xA52e014B3f5Cc48287c2D483A3E026C32cc76E6d',
  [Networks.ropsten]: '0xe12c6dEb59f37011d2D9FdeC77A6f1A8f3B8B1e8',
};

const etherscanUrls = {
  [Networks.mainnet]: 'https://etherscan.io',
  [Networks.ropsten]: 'https://ropsten.etherscan.io',
};


function getEtherollContractSync(web3) {
  const contractAddress = contractAddresses[web3.version.network];
  return web3.eth.contract(etherollAbi).at(contractAddress);
}

function getEtherollContract() {
  return getWeb3.then(results => (
    getEtherollContractSync(results.web3)
  ));
}


export {
  getEtherollContract, getEtherollContractSync, etherscanUrls, Networks, contractAddresses,
};
