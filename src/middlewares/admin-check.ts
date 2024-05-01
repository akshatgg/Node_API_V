import { NextFunction, Request, Response } from "express";

export default function adminCheck(
  req: Request & { isAdmin?: boolean; isSuperAdmin?: boolean },
  res: Response,
  next: NextFunction
) {
  console.log(
    `user: isAdmin: ${req.isAdmin}, isSuperAdmin: ${req.isSuperAdmin}`
  );
  if (!req.isAdmin && !req.isSuperAdmin) {
    return res.status(401).send({
      success: false,
      message:
        "Unauthorized Access. You must be an admin to perform this operation.",
    });
  }
  next();
}
