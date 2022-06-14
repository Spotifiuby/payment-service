const getWalletData = require("./handlers/getWalletHandler");
const createWallet = require("./handlers/createWalletHandler");
const createDeposit = require("./handlers/createDepositHandler");
const getDeposit = require("./handlers/getDepositHandler");
const sendPayment = require("./handlers/sendPaymentHandler");

function getWalletDataRoute({ services, config }) {
  return {
    method: "GET",
    url: "/wallet/:id",
    schema: getWalletData.schema(config),
    handler: getWalletData.handler({ config, ...services }),
  };
}

function createWalletRoute({ services, config }) {
  return {
    method: "POST",
    url: "/wallet",
    schema: createWallet.schema(config),
    handler: createWallet.handler({ config, ...services }),
  };
}

function createDepositRoute({ services, config }) {
  return {
    method: "POST",
    url: "/deposit",
    schema: createDeposit.schema(config),
    handler: createDeposit.handler({ config, ...services }),
  };
}

// function getDepositRoute({ services, config }) {
//   return {
//     method: "GET",
//     url: "/deposit/:txHash",
//     schema: getDeposit.schema(config),
//     handler: getDeposit.handler({ config, ...services }),
//   };
// }

function sendPaymentRoute({services, config}) {
  return {
    method: "POST",
    url: "/payment",
    schema: sendPayment.schema(config),
    handler: sendPayment.handler({ config, ...services }),
  };
}

function health({services, config}) {
  return {
    method: "GET",
    url: "/ping",
    handler: (req, res) => {
      res.send("OK");
    }
  };
}

module.exports = [getWalletDataRoute, createWalletRoute, createDepositRoute, sendPaymentRoute, health];
