import { Request, Response, NextFunction } from "express";
import TokenService from "../services/token.service";
import { UserType } from "@prisma/client";

// Extend Express Request type
interface AuthRequest extends Request {
  user?: any;
  isAdmin?: boolean;
  isSuperadmin?: boolean;
}

export default function verifyToken(
  req: AuthRequest,  // ✅ Explicit type
  res: Response,
  next: NextFunction
) {
  console.log(req.headers);

  const token = req.headers.authorization?.startsWith("Bearer ")
    ? req.headers.authorization.split(" ")[1]
    : null;

  if (!token) {
    return res.status(403).json({
      success: false,
      message: "Authorization Token is required",
    });
  }

  const verified = TokenService.verifyToken(token);

  if (!verified) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: Access is denied due to invalid credentials",
    });
  }

  const user = TokenService.decodeToken(token);
  req.user = user;  // ✅ Now TypeScript recognizes `req.user`
  
  console.log(user);

  req.isAdmin = user.userType === UserType.admin;
  req.isSuperadmin = user.userType === UserType.superadmin;

  console.log(req.isSuperadmin); // ✅ Should log correctly now

  next();
}
