import { Router } from "express";
import User_model from "../../schemas/users/users_schema.mjs";
import { verifyPassword } from "../../utils/crypt_pass/hashPassword.mjs";
import { generateToken } from "../../controllers/jwt/tokenize.mjs";
const router = Router();

router.post("/user/sign", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User_model.findOne({ username });
    const validpassword = verifyPassword(password, user.password);
    const token = generateToken(user);
    if (user && validpassword) {
      res
        .cookie("SCH_MNG_AUTH_TOKEN", token)
        .status(200)
        .json({
          message: "user successfully logged in! as" + `${user?.username}`,
        });
    } else throw new Error("unauthorized user while validation");
  } catch (err) {
    res.status(401).json({ message: err });
  }
});

export default router;
