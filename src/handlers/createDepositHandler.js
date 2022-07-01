const { logInfo, logError } = require("../utils/log");

function schema() {
  return {
    params: {
      type: "object",
      properties: {
        senderId: {
          type: "integer",
        },
        amountInEthers: {
          type: "string",
        },
      },
    },
    required: ["senderId", "amountInEthers"],
  };
}

function handler({ contractInteraction, walletService, suscriptionService }) {
  return function (req, reply) {
    if (req.body.amountInEthers == 0) {
      logInfo("Suscription is free!");
      reply.code(201).send("Suscription is free");
      return
    }

    Promise.all([walletService.getWallet(req.body.senderId)])
      .then(async ([senderWallet]) => {
        var tx

        try{
          tx = await contractInteraction.deposit(senderWallet, req.body.amountInEthers);
        } catch (err) {
          logError("Transaction failed with error " + err.message + " for user " + req.body.senderId);
          reply.code(400).send(err)
        }
        logInfo("Transaction succeed!")
        reply.code(201).send(tx);
      })
      .catch(err => reply.code(400).send(err))
  };
}

module.exports = { schema, handler };
