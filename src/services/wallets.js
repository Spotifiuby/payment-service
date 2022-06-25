const ethers = require("ethers");
const { logInfo, logError } = require("../utils/log");
// const accounts = [];
const databaseConfig = require("../database");

const getDeployerWallet = ({ config }) => () => {
  const provider = new ethers.providers.InfuraProvider(config.network, config.infuraApiKey);
  const wallet = ethers.Wallet.fromMnemonic(config.deployerMnemonic).connect(provider);
  console.log("Deployer wallet" + wallet.address);
  return wallet;
};

const createWallet = (userId) => async (userId) => {
  logInfo("Creating wallet for user " + userId);

  const provider = new ethers.providers.InfuraProvider("kovan", process.env.INFURA_API_KEY);
  // This may break in some environments, keep an eye on it
  const wallet = ethers.Wallet.createRandom().connect(provider);

  var dbClient = databaseConfig.client;

  const queryParams = {
    name: 'Create wallet',
    text: 'INSERT INTO wallets(user_id, wallet_address, wallet_private_key) VALUES($1, $2, $3)',
    values: [userId, wallet.address, wallet.privateKey]
  }

  dbClient.query(queryParams, (err, res) => {
    if (err) {
      logError(err);
    } else {
      logInfo("Wallet created for user " + userId + " with address " + wallet.address + "\n " + res);
    }
  })

  const result = {
    address: wallet.address,
    privateKey: wallet.privateKey,
  };

  dbClient.end;
  return result;
}

const getWalletData = () => index => {
  return accounts[index - 1];
};

const getUserWallet = userId => new Promise((resolve, reject) => {
  var dbClient = databaseConfig.client;

  const queryParams = {
    name: 'Get wallet',
    text: 'SELECT * FROM wallets w  WHERE w.user_id = $1',
    values: [userId],
  }

  dbClient.query(queryParams, (err, res) => {
    if (err) {
      return reject(err);
    } else {
      if (res.rows.length < 1) {
        logInfo("No wallet found for user " + userId);
        return reject(new Error("No wallet found for user " + userId));
      }
      logInfo("Wallet retrieved for user " + userId + " with address " + res.rows[0]['wallet_address']);
      return resolve(res);
    }
  })
})

const getWallet = () => (userId) => {
  logInfo("Getting wallet for userId " + userId);

  const provider = new ethers.providers.InfuraProvider("kovan", process.env.INFURA_API_KEY);

  return new Promise ((resolve, reject) => {
    getUserWallet(userId)
      .then(queryResponse => resolve(new ethers.Wallet(queryResponse.rows[0]['wallet_private_key'], provider)))
      .catch(err => reject(logError(err.message)));
  })
};

module.exports = ({ config }) => ({
  createWallet: createWallet({ config }),
  getDeployerWallet: getDeployerWallet({ config }),
  getWalletData: getWalletData({ config }),
  getWallet: getWallet({ config }),
});
