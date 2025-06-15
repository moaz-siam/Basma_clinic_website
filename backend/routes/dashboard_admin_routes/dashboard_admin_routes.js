const express = require("express");
const {
  getAllUser,
  add_user,
  activity_status,
  update_user,
  getAllDoctors,
  add_doctor,
  update_data_doctor,
  getAllMD,
  activity_status_Md,
  get_pharmacists,
  add_medical_point,
  update_medical_point,
  dashboard_stats,
} = require("../../controller/dashboard_admin_controller/dashboard_admin_controller");
const { authMiddleware } = require("../../middleware/middlewares");

const admin_router = express.Router();

admin_router.get("/get_users", authMiddleware, getAllUser);
admin_router.post("/add_user", authMiddleware, add_user);
admin_router.post("/activity_status", authMiddleware, activity_status);
admin_router.put("/update_user", authMiddleware, update_user);
admin_router.get("/get_doctors", authMiddleware, getAllDoctors);
admin_router.post("/add_doctor", authMiddleware, add_doctor);
admin_router.put("/update_doctor", authMiddleware, update_data_doctor);
admin_router.get("/medical_points", authMiddleware, getAllMD);
admin_router.put("/activity_status_md", authMiddleware, activity_status_Md);
admin_router.get("/pharmacists", authMiddleware, get_pharmacists);
admin_router.post("/add_medical_point", authMiddleware, add_medical_point);
admin_router.put("/update_medical_point", authMiddleware, update_medical_point);
admin_router.get("/dashboard_stats", authMiddleware, dashboard_stats);
module.exports = admin_router;
