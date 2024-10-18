import jwt from "jsonwebtoken";

const jwt_key = process.env.JWT_KEY;
const generate_token = (data) => {
  return jwt.sign(data, jwt_key);
};

const verify_token = (token) => {
  return jwt.verify(token, jwt_key);
};

export { generate_token, verify_token };
