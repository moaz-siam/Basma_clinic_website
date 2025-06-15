const express = require("express");
const { authMiddleware } = require("../../middleware/middlewares");
const {
  get_prescriptions,
  get_prescriptions_details,
  add_order_status,
  get_order_details,
  uploadInvoice,
} = require("../../controller/pharmacy_controller/pharmacy_controller");
const { upload } = require("../../lib/cloudinary/cloudinary");
const pharmacy_router = express.Router();

pharmacy_router.get("/prescriptions", authMiddleware, get_prescriptions);
pharmacy_router.get(
  "/prescription_details/:prescriptionid",
  authMiddleware,
  get_prescriptions_details
);
pharmacy_router.post("/add_order_status", authMiddleware, add_order_status);
pharmacy_router.get(
  "/order_details/:prescriptionid",
  authMiddleware,
  get_order_details
);
pharmacy_router.post(
  "/uploadInvoice",
  authMiddleware,
  upload.single("file"),
  uploadInvoice
);

module.exports = pharmacy_router;
