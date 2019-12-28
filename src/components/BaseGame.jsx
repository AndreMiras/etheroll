import { toWei } from 'web3-utils';

const onRollClick = ({
  accountAddress, rollUnder, contract, betSize,
}) => {
  const value = toWei(betSize.toString(), 'ether');
  contract.web3Contract.methods.playerRollDice(rollUnder).send({
    from: accountAddress,
    value,
  }).then(result => console.log(JSON.stringify(result)));
};

export default onRollClick;
