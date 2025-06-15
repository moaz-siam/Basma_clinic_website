const express = require("express");
const {
  register,
  login,
  logout,
  personal_information_update,
  change_password,
  reset_password,
  verify_code,
  forget_password,
} = require("../../controller/authcontroller/authController");
const { authMiddleware } = require("../../middleware/middlewares");
const { upload } = require("../../lib/cloudinary/cloudinary");
const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/logout", logout);
authRouter.get("/check-auth", authMiddleware, (req, res) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    message: "Authenticated user!",
    user: user,
  });
});
authRouter.post(
  "/personal_information_update",
  authMiddleware,
  upload.single("file"),
  personal_information_update
);
authRouter.post("/change_password", authMiddleware, change_password);
authRouter.post("/forget_password", forget_password);
authRouter.post("/verify_code", verify_code);
authRouter.put("/reset_password", reset_password);

module.exports = authRouter;
