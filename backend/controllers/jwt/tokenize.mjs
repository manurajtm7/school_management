import jwt from "jsonwebtoken";

const generateToken = (data) => {
  return jwt.sign(data, process.env.JWT_KEY);
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_KEY);
};

export { generateToken  , verifyToken};
