import Web3 from 'web3';

const getWeb3 = new Promise((resolve, reject) => {
  window.addEventListener('load', async () => {
    let web3;
    if (window.ethereum) { // Modern dapp browsers...
      web3 = new Web3(window.ethereum);
      try {
        // Request account access if needed
        await window.ethereum.enable();
      } catch(error) {
        console.error(error);
      }
    } else if (window.web3) { // Legacy dapp browsers...
      web3 = new Web3(window.web3.currentProvider);
    } else { // Non-dapp browsers...
      reject(new Error('Non-Ethereum browser detected. Is MetaMask running?'));
    }
    const results = { web3 };
    resolve(results);
  });
});


export default getWeb3;
