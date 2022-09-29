const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  if (!user) {
    return null;
  }
  return jwt.sign(
    user,
    process.env.JWT_SECRET || "s3cre7",
    {
      expiresIn: "2d",
    }
  );
}

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET || "s3cre7", (err, resp) => {
    if (error) {
      return {
        verified: false,
        message: "Invalid token",
        error: error,
      };
    }
    if (res.username !== username) {
      return {
        verified: false,
        message: "Invalid user",
      };
    }

    return {
      verified: true,
      message: "verified",
    };
  });
}