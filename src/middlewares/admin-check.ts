import { NextFunction, Request, Response } from "express";

export default function adminCheck(
  req: Request & { isAdmin?: boolean; isSuperAdmin?: boolean },
  res: Response,
  next: NextFunction
) {
  if (!req.isAdmin && !req.isSuperadmin) {
    console.log(req.isSuperadmin)
    return res.status(401).send({
      success: false,
      message:
        "Unauthorized Access. You must be an admin to perform this operation.",
    });
  }
  next();
}
