const Orders = require("../models/orders");

exports.placeOrder = async (req, res) => {
  const { cartList, total, email, petId, petclinicId } = req.body;

  try {
    const result = await Orders.placeOrder(cartList, total, email, petId, petclinicId);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getOrdersByStatus = async (req, res) => {
  const { status, petclinicId } = req.params;
  try {
    const orders = await Orders.getOrdersByStatus(status, petclinicId);
    res.status(200).json(orders);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

exports.getCheckOutData = async (req, res) => {
  const { checkoutId } = req.params;
  try {
    const checkoutData = await Orders.getCheckoutInfo(checkoutId);
    res.status(200).json(checkoutData);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

exports.sendOrderConfirmedMail = async (req, res) => {
  const { email, OrderId, orderPrice } = req.params;
  try {
    await Orders.sendOrderConfirmMail(email, OrderId, orderPrice);
    res.status(200).json("Successfully Send Mail");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.sendOrderDeliverReadyMail = async (req, res) => {
  const { email, OrderId, orderPrice } = req.params;
  try {
    await Orders.sendOrderDeliverReadyMail(email, OrderId, orderPrice);
    res.status(200).json("Successfully Send Mail");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.sendOrderCompletedMail = async (req, res) => {
  const { email, OrderId, orderPrice } = req.params;
  try {
    await Orders.sendOrderCompleteMail(email, OrderId, orderPrice);
    res.status(200).json("Successfully Send Mail");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.sendOrderClosedMail = async (req, res) => {
  const { email, OrderId, orderPrice } = req.params;
  try {
    await Orders.sendOrderClosedMail(email, OrderId, orderPrice);
    res.status(200).json("Successfully Send Mail");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { Status } = req.body;

  try {
    await Orders.updateOrderStatus(id, {
      Status,
    });
    res.status(200).json({ message: "Order data successfully updated." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteOrderData = async (req, res) => {
  const { id } = req.params;

  try {
    await Orders.deleteOrder(id);

    res.status(200).json({ message: "Order closed successfully." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
