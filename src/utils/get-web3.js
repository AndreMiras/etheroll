import Web3 from 'web3';

const getWeb3 = new Promise((resolve, reject) => {
  // wait for loading completion before loading web3, to be sure it's
  // already injected
  window.addEventListener('load', () => {
    let results;
    let web3js;
    // checking if Web3 has been injected by the browser MetaMask
    if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
      // Use MetaMask's provider.
      web3js = new Web3(window.web3.currentProvider);
      results = { web3: web3js };
      console.log('Injected web3 detected.');
      resolve(results);
    } else {
      // user is not running MetaMask?
      console.log('Is MetaMask running?');
    }
  });
});


export default getWeb3;
