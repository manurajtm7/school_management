import { verify_token } from "../../utils/jwt_configs/jwt_conf";

function verifier(req, res, next) {
  const user_data = verify_token(req.body.token);

  if (!user_data) {
    res.status(401).json({ message: "unauthorized user" });
    return;
  }

  req.user = user_data;
  next();
}


export default verifier