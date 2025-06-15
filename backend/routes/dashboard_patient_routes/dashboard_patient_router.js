const express = require("express");
const {
  getDoctorsdashboard,
  consultation_create,
  getConsultations,
  getConsultationId,
  Book_appointment,
  medical_points,
  get_patient_med,
  order_medicine,
  get_patient_medical_points,
  add_patient_medical_points,
} = require("../../controller/dashboard_patient_controller/dashboard_patient_controller");
const { upload } = require("../../lib/cloudinary/cloudinary");
const { authMiddleware } = require("../../middleware/middlewares");
const {
  get_status_prescriptions,
} = require("../../controller/dashbodrd_doctor_controller/dashbodrd_doctor_controller");
const dashboardpatientRouter = express.Router();

dashboardpatientRouter.get("/getdoctors", getDoctorsdashboard);
dashboardpatientRouter.post(
  "/consultation_create",
  authMiddleware,
  upload.single("file"),
  consultation_create
);
dashboardpatientRouter.get("/consultations", authMiddleware, getConsultations);
dashboardpatientRouter.get(
  "/consultation/:consultationid",
  authMiddleware,
  getConsultationId
);
dashboardpatientRouter.post(
  "/book_appointment",
  authMiddleware,
  Book_appointment
);
dashboardpatientRouter.get("/medical_points", authMiddleware, medical_points);
dashboardpatientRouter.get("/get_medicines", authMiddleware, get_patient_med);
dashboardpatientRouter.post("/add_order", authMiddleware, order_medicine);
dashboardpatientRouter.get(
  "/patient_medical_points",
  authMiddleware,
  get_patient_medical_points
);
dashboardpatientRouter.post(
  "/add_medical_points",
  authMiddleware,
  add_patient_medical_points
);
dashboardpatientRouter.get(
  "/status_prescriptions",
  authMiddleware,
  get_status_prescriptions
);
module.exports = dashboardpatientRouter;
