const ethers = require("ethers");
const getDepositHandler = require("../handlers/getDepositHandler");
const { logInfo } = require("../utils/log");

const getContract = (config, wallet) => {
  return new ethers.Contract(config.contractAddress, config.contractAbi, wallet);
};

const deposits = {};

const deposit = ({ config }) => async (senderWallet, amountToSend) => {
  const basicPayments = await getContract(config, senderWallet);
  const tx = await basicPayments.deposit({
    value: await ethers.utils.parseEther(amountToSend).toHexString(),
  });
  tx.wait(1).then(
    receipt => {
      console.log("Transaction mined");
      const firstEvent = receipt && receipt.events && receipt.events[0];
      console.log(firstEvent);
      if (firstEvent && firstEvent.event == "DepositMade") {
        deposits[tx.hash] = {
          senderAddress: firstEvent.args.sender,
          amountSent: firstEvent.args.amount,
        };
      } else {
        console.error(`Payment not created in tx ${tx.hash}`);
      }
    },
    error => {
      const reasonsList = error.results && Object.values(error.results).map(o => o.reason);
      const message = error instanceof Object && "message" in error ? error.message : JSON.stringify(error);
      console.error("reasons List");
      console.error(reasonsList);

      console.error("message");
      console.error(message);
    },
  );
  return tx;
};

const getDepositReceipt = ({}) => async depositTxHash => {
  return deposits[depositTxHash];
};

const sendMoneyToWallet = ({ config }) => async (receiverAddress, amountSent, deployerWallet) => {
  return new Promise(async (resolve, reject) => {
    logInfo("Sending money to wallet with address " + receiverAddress + " from deployer wallet: " + deployerWallet.address);
    const basicPayments = await getContract(config, deployerWallet);

    logInfo("Signer is " + basicPayments.signer.address);

    amountSent = await ethers.utils.parseEther(amountSent).toHexString();
    tx = await basicPayments.sendPayment(receiverAddress, amountSent);

    logInfo("Transaction succeed. Tx hash: " + tx.hash);
    resolve(tx);
  })
}

module.exports = dependencies => ({
  deposit: deposit(dependencies),
  getDepositReceipt: getDepositReceipt(dependencies),
  sendMoneyToWallet: sendMoneyToWallet(dependencies)
});
