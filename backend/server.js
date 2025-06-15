require("dotenv").config();
const express = require("express");
const cookie_parser = require("cookie-parser");
const mysql = require("mysql2");
const cors = require("cors");
const app = express();
const db = require("./db/db");
const HomeRouterWeb = require("./routes/homeroutes/homeWebRoutes");
const symptomAnalystRouter = require("./routes/homeroutes/symptomAnalystRoute");
const session = require("express-session");
const authRouter = require("./routes/authroutes/authroutes");
const dashboardpatientRouter = require("./routes/dashboard_patient_routes/dashboard_patient_router");
const doctor_router = require("./routes/dashbodrd_doctor_routes/dashbodrd_doctor_routes");
const pharmacy_router = require("./routes/pharmacy_routes/pharmacy_routes");
const admin_router = require("./routes/dashboard_admin_routes/dashboard_admin_routes");
const port = process.env.PORT || 5000;

// Server.js
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);
app.use(cookie_parser());
app.use(express.json());
const dbTest = async () => {
  const connection = await db.getConnection();
  if (connection) {
    console.log("Database contacted ..!  🚀 🚀 ");
  }
};

app.use("/api", HomeRouterWeb);
app.use("/api/v1", symptomAnalystRouter);
app.use("/api/auth", authRouter);
app.use("/api/dashboard/patient", dashboardpatientRouter);
app.use("/api/dashboard/doctor", doctor_router);
app.use("/api/dashboard/pharmacy", pharmacy_router);
app.use("/api/dashboard/admin", admin_router);

dbTest();
app.listen(port, () => {
  console.log(`server work to http://localhost:${port} 🚀 🚀 `);
});
