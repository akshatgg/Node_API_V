import { NextFunction, Request, Response } from "express";
import TokenService from "../services/token.service";

export default function SuperadminCheck(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = TokenService.getTokenFromAuthHeader(req);

  if (!token) {
    return res
      .status(403)
      .send({ success: false, message: "Authorization Token is required" });
  }

  const verified = TokenService.verifyToken(token);

  if (!verified) {
    return res.status(401).send({
      success: false,
      message: "Unauthorized: Access is denied due to invalid credentials",
    });
  }

  const user = TokenService.decodeToken(token);
  console.log(user);
  const superuser = user.Usertype === "superadmin";

  if (!superuser) {
    return res.status(401).send({
      success: false,
      message:
        "Unauthorized Access. You must be an Superadmin to perform this operation.",
    });
  }

  req.user = user;

  next();
}
