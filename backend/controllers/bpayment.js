var braintree = require("braintree");

var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "wx33cpy36r3gxpnr",
  publicKey: "rhmccxcbbwhmtv9h",
  privateKey: "c95bbc723884a6dba1093cb548dfb435",
});

exports.getToken = () => {
  gateway.client_token.generate({}, function (err, response) {
    if (err) {
      response.status(500).json(err);
    } else {
      response.send(response);
    }
  });
};

exports.processPayment = (req, res) => {
  let nonceFromTheClient = req.body.paymentMethodNonce;
  let amountFromTheClient = req.body.amount;
  gateway.transaction.sale(
    {
      amount: amountFromTheClient,
      paymentMethodNonce: nonceFromTheClient,

      options: {
        submitForSettlement: true,
      },
    },
    function (err, res) {
      if (err) {
        response.status(500).json(err);
      } else {
        response.send(response);
      }
    }
  );
};
