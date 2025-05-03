const { db } = require("../configs/firebaseConfig");
const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const moment = require("moment");
const fs = require("fs");

let transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "hpets.online@gmail.com",
    pass: "ozsmgcnpmzkbujij",
  },
});

class Order {

  static async placeOrder(cartList, total, email, petId, petclinicId) {
    try {
      const orderId = Math.random().toString(36).substring(2, 9);
      const formattedDate = moment().format("DD-MM-YYYY");
      const formattedTime = moment().format("HH:mm");

      const orderData = {
        OrderId: orderId,
        Price: total,
        State: "WAITING",
        Date: formattedDate,
        Time: formattedTime,
        uuid: petId,
        Details: cartList.map((item) => ({
          Price: item.price,
          ProductId: item.productId,
          ProductImageUrl: item.productImageUrl,
          ProductName: item.productName,
          CartItemQuantity: item.qnt,
          NewProductQuantity: item.newProductQnt,
          _vpetclinic: item.vpetclinic,
          petId: item.petId,
        })),
        remark: "N/A",
        emailId: email,
        _vpetclinic: petclinicId,
      };

      await db.collection("Order").add(orderData);

      const cartSnapshot = await db
        .collection("Cart")
        .where("petId", "==", petId)
        .get();

      const deletePromises = cartSnapshot.docs.map((doc) =>
        db.collection("Cart").doc(doc.id).delete()
      );
      await Promise.all(deletePromises);

      return { message: "Order placed successfully!", orderId };
    } catch (err) {
      throw new Error(err.message);
    }
  }
  
  static async getOrdersByStatus(status, petclinicId) {
    try {
      const snapshot = await db
        .collection("Order")
        .where("State", "==", status)
        .where("_vpetclinic", "==", petclinicId)
        .get();

      if (snapshot.empty) {
        throw new Error("Orders not found.");
      }

      const orders = [];
      snapshot.forEach((doc) => {
        orders.push({ id: doc.id, ...doc.data() });
      });

      return orders;
    } catch (err) {
      console.error("Error getting orders : ", err);
      throw err;
    }
  }

  //get checkout info
  static async getCheckoutInfo(checkoutId) {
    try {
      const snapshot = await db.collection("Checkout").doc(checkoutId).get();

      if (!snapshot.exists) {
        throw new Error("Checkout not found.");
      }

      // const checkoutData = [];
      return { id: snapshot.id, ...snapshot.data() };

      // return checkoutData;
    } catch (err) {
      console.error("Error getting orders : ", err);
      throw err;
    }
  }

  //order confirm mail
  static async sendOrderConfirmMail(email, OrderId, orderPrice) {
    // Load the email template
    const templateFile = fs.readFileSync(
      "src/templates/orderConfirmed.html",
      "utf8"
    );
    const template = handlebars.compile(templateFile);

    // Prepare email content
    const emailContent = template({
      OrderId: OrderId,
      orderPrice: orderPrice,
    });

    // Setup email data
    let mailOptions = {
      from: '"Team Happy Pets" <hpets.online@gmail.com>',
      to: email,
      subject: "YAY!!! Your Order Confirmed - Happy Pets!",
      html: emailContent,
    };

    // Send email
    await transporter.sendMail(mailOptions);
  }

  //order ready to deliver mail
  static async sendOrderDeliverReadyMail(email, OrderId, orderPrice) {
    // Load the email template
    const templateFile = fs.readFileSync(
      "src/templates/orderReadyToDeliver.html",
      "utf8"
    );
    const template = handlebars.compile(templateFile);

    // Prepare email content
    const emailContent = template({
      OrderId: OrderId,
      orderPrice: orderPrice,
    });

    // Setup email data
    let mailOptions = {
      from: '"Team Happy Pets" <hpets.online@gmail.com>',
      to: email,
      subject: "YAY!!! Your Order Ready For Deliver - Happy Pets!",
      html: emailContent,
    };

    // Send email
    await transporter.sendMail(mailOptions);
  }

  //order complete mail
  static async sendOrderCompleteMail(email, OrderId, orderPrice) {
    // Load the email template
    const templateFile = fs.readFileSync(
      "src/templates/orderComplete.html",
      "utf8"
    );
    const template = handlebars.compile(templateFile);

    // Prepare email content
    const emailContent = template({
      OrderId: OrderId,
      orderPrice: orderPrice,
    });

    // Setup email data
    let mailOptions = {
      from: '"Team Happy Pets" <hpets.online@gmail.com>',
      to: email,
      subject: "YAY!!! Your Order Completed - Happy Pets!",
      html: emailContent,
    };

    // Send email
    await transporter.sendMail(mailOptions);
  }

  //order closed mail
  static async sendOrderClosedMail(email, OrderId, orderPrice) {
    // Load the email template
    const templateFile = fs.readFileSync(
      "src/templates/orderClose.html",
      "utf8"
    );
    const template = handlebars.compile(templateFile);

    // Prepare email content
    const emailContent = template({
      OrderId: OrderId,
      orderPrice: orderPrice,
    });

    // Setup email data
    let mailOptions = {
      from: '"Team Happy Pets" <hpets.online@gmail.com>',
      to: email,
      subject: "Oops!!! Order Closed Due to Out of Stock - Happy Pets!",
      html: emailContent,
    };

    // Send email
    await transporter.sendMail(mailOptions);
  }

  static async updateOrderStatus(id, data) {
    try {
      //   const snapshot = await db.collection("Order").doc(id).get();
      //   if (snapshot.empty) {
      //     throw new Error("Order not found.");
      //   }
      //   const doc = snapshot.docs;
      await db.collection("Order").doc(id).update(data);
      return "Order updated successfully.";
    } catch (err) {
      console.error("Error updating order data : ", err);
      throw err;
    }
  }

  static async deleteOrder(id) {
    try {
      await db.collection("Order").doc(id).delete();
      return "Order closed successfully.";
    } catch (err) {
      console.error("Error removing order data : ", err);
      throw err;
    }
  }
}

module.exports = Order;
