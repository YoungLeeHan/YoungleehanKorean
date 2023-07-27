import braintree from "braintree";
import dotenv from "dotenv";

dotenv.config();

//config
const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

export const getToken = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response); // token to show the drop-in UI
      }
    });
  } catch (err) {
    console.log(err);
  }
};

export const processPayment = async (req, res) => {
  try {
    console.log(req.body);
    let nonceFromTheClient = req.body.paymentMethodNonce;

    let newTransaction = gateway.transaction.sale(
      {
        amount: "10.00",
        paymentMethodNonce: nonceFromTheClient,
        options: {
          submitForSettlement: true, //immediate settlement
        },
      },
      function (error, result) {
        if (result) {
          res.send(result);
        } else {
          res.status(500).send(error);
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
};
