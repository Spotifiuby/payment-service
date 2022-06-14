const { logInfo } = require("../utils/log");

function schema() {
    return {
      params: {
        type: "object",
        properties: {
          artistId: {
            type: "string",
          },
        },
      },
      required: ["artistId"],
    };
  }

  function handler({config, walletService, contractInteraction}) {
    return async function (req, reply) {
      Promise.all([walletService.getWallet(req.body.artistId)])
        .then(async ([senderWallet]) => {
          var tx;

          try{
            tx = await contractInteraction.sendMoneyToWallet(senderWallet.address, req.body.amountInEthers, walletService.getDeployerWallet(config));
          } catch (err) {
            logError("Transaction failed with error " + err.message + " for artist " + req.body.senderId);
            reply.code(400).send(err.message)
          }
          logInfo("Transaction succeed!");
          reply.code(201).send(tx);
        })
        .catch(err => reply.code(400).send(err))
    };
  }

module.exports = { handler, schema };