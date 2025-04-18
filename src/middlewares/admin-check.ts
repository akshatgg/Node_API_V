import { NextFunction, Request, Response } from "express";

export default function adminCheck(
  req: Request & { isAdmin?: boolean; isSuperAdmin?: boolean },
  res: Response,
  next: NextFunction
) {
  console.log("Admin Check => isAdmin:", req.isAdmin);
console.log("Admin Check => isSuperAdmin:", req.isSuperAdmin);

  if (!req.isAdmin && !req.isSuperAdmin) {
    console.log(req.isSuperAdmin)
    return res.status(401).send({
      success: false,
      message:
        "Unauthorized Access. You must be an admin or superadmin to perform this operation.",
    });
  }
  next();
}
