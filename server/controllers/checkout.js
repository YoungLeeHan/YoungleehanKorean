import Order from "../models/order.js";
import braintree from "braintree";
import dotenv from "dotenv";

dotenv.config();

// braintree config
const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

export const getToken = async (req, res) => {
  try {
    await gateway.clientToken.generate({}, function (err, response) {
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
    const { nonce, cart, cartQuantity } = req.body;

    let total = 0;
    for (let i = 0; i < cart.length; i++) {
      total += cart[i].price * cartQuantity[cart[i]._id];
    }
    total = total.toFixed(2);

    let newTransaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true, //immediate settlement
        },
      },
      async function (error, result) {
        if (result) {
          const order = new Order({
            products: cart,
            payment: result,
            buyer: req.user._id,
          });
          console.log(order);
          const savedOrder = await order.save();
          res.json({ ok: true, orderId: savedOrder._id });
        } else {
          res.status(500).send(error);
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
};
