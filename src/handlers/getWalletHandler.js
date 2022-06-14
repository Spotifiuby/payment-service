function schema() {
  return {
    params: {
      type: "object",
      properties: {
        id: {
          type: "string",
        },
      },
    },
    required: ["id"],
  };
}

function handler({ walletService }) {
  return async function (req, reply) {
    await walletService.getWallet(req.params.id)
      .then(wallet => reply.code(200).send(wallet))
      .catch(err => reply.code(400).send(err));
  };
}

module.exports = { handler, schema };
