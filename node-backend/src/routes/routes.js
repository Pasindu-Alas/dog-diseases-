const express = require("express");
const router = express.Router();
const petClinicCtrl = require("../controllers/petClinicCtrl");
const petCtrl = require("../controllers/petCtrl");
const appointmentCtrl = require("../controllers/appointmentCtrl");
const productCtrl = require("../controllers/productCtrl");
const orderCtrl = require("../controllers/orderCtrl");
const vaccineCtrl = require("../controllers/vaccineCtrl");
const eventCtrl = require("../controllers/eventsCtrl");

router.post("/register", petClinicCtrl.createPetClinic);
router.post("/pet-register", petCtrl.registerPet);
router.get("/:petCenterId", petCtrl.getAllPets);
router.get("/pet/:id", petCtrl.getPetById);
router.get("/pet/by/petid/:petId", petCtrl.getPetInfoById);
router.put("/pet-info/update/:id", petCtrl.updatePetData);
router.delete("/pet-info/delete/:id", petCtrl.deletePetData);
router.get("/centers", petCtrl.getAllPetClinics);
router.get("/center-id/:email", petClinicCtrl.getPetClinicIdByEmail);
router.get("/pet-id/:email", petCtrl.getPetIdByEmail);

//appointments
router.post("/appointment/create", appointmentCtrl.createAppointment);
router.get(
  "/appointment/pending/:petclinicId",
  appointmentCtrl.getAllPendingAppointments
);
router.get(
  "/appointment/approved/:petclinicId",
  appointmentCtrl.getAllApprovedAppointments
);
router.put("/appointment/approve/:id", appointmentCtrl.approveAppointment);
router.put("/appointment/reject/:id", appointmentCtrl.rejectAppointment);
router.put("/appointment/complete/:id", appointmentCtrl.completeAppointment);

//products
router.post("/product/create", productCtrl.createProduct);
router.put("/product/update/:id", productCtrl.updateProductData);
router.delete("/product/delete/:id", productCtrl.deleteProductData);
router.get("/products/:petclinicId", productCtrl.getAllProducts);
router.get("/product/:name", productCtrl.getProductByName);

//orders
router.post("/order/place", orderCtrl.placeOrder);
router.get("/orders/:status/:petclinicId", orderCtrl.getOrdersByStatus);
router.get("/checkout/:checkoutId", orderCtrl.getCheckOutData);
router.put("/orders/update/:id", orderCtrl.updateOrderStatus);
router.delete("/orders/delete/:id", orderCtrl.deleteOrderData);
router.post(
  "/order-confirmed/:email/:OrderId/:orderPrice",
  orderCtrl.sendOrderConfirmedMail
);
router.post(
  "/order-deliverReady/:email/:OrderId/:orderPrice",
  orderCtrl.sendOrderDeliverReadyMail
);
router.post(
  "/order-completed/:email/:OrderId/:orderPrice",
  orderCtrl.sendOrderCompletedMail
);
router.post(
  "/order-closed/:email/:OrderId/:orderPrice",
  orderCtrl.sendOrderClosedMail
);

//vaccination
router.post("/vaccination/add", vaccineCtrl.createVaccinationDate);
router.put("/vaccination/update/:id", vaccineCtrl.updateVaccineData);
router.delete("/vaccination/delete/:id", vaccineCtrl.deleteVaccinationDate);
router.get("/vaccination/:petclinicId", vaccineCtrl.getAllVaccination);
router.get(
  "/vaccination/:petclinicId/:petId",
  vaccineCtrl.getAllVaccinationUser
);

//Events
router.post("/event/add", eventCtrl.createEvent);
router.put("/event/update/:id", eventCtrl.updateEvent);
router.delete("/event/delete/:id", eventCtrl.deleteEvent);
router.get("/event/:petclinicId", eventCtrl.getAllEvents);

module.exports = router;
