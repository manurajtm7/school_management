import bcryptjs from "bcryptjs";

const hashPassword = async (password) => {
  return await bcryptjs.hash(password, 10);
};

const verifyPassword = async (hashedPassword, password) => {
  return await bcryptjs.compare(password, hashedPassword);
};

export { hashPassword, verifyPassword };
