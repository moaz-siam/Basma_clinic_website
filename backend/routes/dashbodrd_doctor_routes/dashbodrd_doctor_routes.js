const express = require("express");
const { authMiddleware } = require("../../middleware/middlewares");
const {
  getConsultationsDoctor,
  getConsultationIdDoctor,
  getMedicines,
  consultation_replie,
  getConsultationIdDetilesDoc,
  appointment_status_doc,
  Reschedule_Doc,
} = require("../../controller/dashbodrd_doctor_controller/dashbodrd_doctor_controller");
const { upload } = require("../../lib/cloudinary/cloudinary");
const doctor_router = express.Router();

doctor_router.get("/consultations", authMiddleware, getConsultationsDoctor);
doctor_router.get(
  "/consultation/:consultationid",
  authMiddleware,
  getConsultationIdDoctor
);
doctor_router.get("/medicines", getMedicines);
doctor_router.post(
  "/consultation_replie",
  authMiddleware,
  upload.single("file"),
  consultation_replie
);
doctor_router.get(
  "/consultation_detiles/:consultationid",
  authMiddleware,
  getConsultationIdDetilesDoc
);
doctor_router.post(
  "/appointment_status",
  authMiddleware,
  appointment_status_doc
);
doctor_router.post(
  "/reschedule",
  authMiddleware,
  Reschedule_Doc
);
module.exports = doctor_router;
