const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  
  if (!token) {
    

    return res.status(401).json({
      success: false,
      message: "Unauthorised user!",
    });
  }
  
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    
    return res.status(401).json({
      success: false,
      message: "server error",
    });
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden: Access denied" });
    }
    next();
  };
};

module.exports = {
  authMiddleware,
};
