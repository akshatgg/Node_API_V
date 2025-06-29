import { Request, Response } from "express";
import { prisma } from "..";
import {
  PHONE_NUMBER_RGX,
  generateOTP,
  validateEmail,
  validatePhone,
} from "../lib/util";
import bcrypt from "bcrypt";
import EmailService from "../services/email.service";
import TokenService from "../services/token.service";
import { UserGender, UserType } from "@prisma/client";
import { ZodError, z } from "zod";
import { uploadToCloudinary } from "../config/cloudinaryUploader";
import MobileService from "../services/mobile.service";

const UserSchema = z.object({
  firstName: z
    .string({ required_error: "First name is required" })
    .min(1, "First name must be atleast 1 character long"),
  lastName: z.string().optional(),
  middleName: z.string().optional(),
  gender: z.nativeEnum(UserGender),
  email: z.string().toLowerCase().email(),
  password: z.string().min(6, "Password must be atleast 6 characters long"),
  phone: z
    .string()
    .regex(PHONE_NUMBER_RGX, "Enter a valid 10 digit phone number"),
  fatherName: z.string().optional(),
  pin: z.string().optional(),
  address: z.string().optional(),
  aadhaar: z.string().optional(),
  pan: z.string().optional(),
  type: z.nativeEnum(UserType).optional(),
});

const LoginSchema = z.object({
  email: z.string().toLowerCase().email(),
  password: z.string({ required_error: "Please enter your password" }),
});

const UserTypeSchema = z.object({
  email: z.string().toLowerCase().email(),
  type: z.enum(["admin", "normal", "superadmin"]),
});

export default class UserController {
  static SALT_ROUNDS = 10;

  static USERS_PER_PAGE = 10;

  static async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(UserController.SALT_ROUNDS);
    const hash = await bcrypt.hash(password, salt);

    return hash;
  }

  static async sendOtp(email: string, userId: number,mobile_number:number) {
    const otp = generateOTP(); // Assume generateOTP is implemented and returns a string
    console.log(otp);
  
    // Calculate expiry date (5 minutes from now)
    const deletedate = new Date(Date.now() + 5 * 60 * 1000);
  
    // Save OTP and expiry date to the database
    const { id: otp_key } = await prisma.otp.create({
      data: {
        otp,
        userId, // Add expiry date to the database record
        deletedate: deletedate,
      },
    });
  
    // Prepare email content
    const email_subject = "OTP: For Email Verification";
    const email_message =
      `Dear User,\n\n` +
      `Your OTP for email verification is: ${otp}\n\n` +
      `This OTP will expire in 5 minutes.\n\n` +
      `If you did not request this, please ignore this email.\n\n` +
      `Regards,\nItaxeasy\n`;
  
    // Send email with OTP
    await EmailService.sendMail(email, email_subject, email_message);
    await MobileService.sendotp(mobile_number, otp);
    // Return OTP key (for logging/debugging purposes)
    return otp_key;
  }

  static async signUp(req: Request, res: Response) {
    try {
      const {
        firstName,
        middleName,
        lastName,
        gender,
        fatherName,
        aadhaar,
        pan,
        pin,
        email,
        password,
        phone,
      } = UserSchema.parse(req.body);
  
      // Hash password
      const hashedPassword = await UserController.hashPassword(password);
  
      // Upsert user with unverified status
      const user = await prisma.user.upsert({
        where: { email },
        update: {
          firstName,
          middleName,
          lastName,
          gender,
          fatherName,
          aadhaar,
          pan,
          pin,
          phone,
          password: hashedPassword,
          verified: false, // Keep user unverified during signup
        },
        create: {
          firstName,
          middleName,
          lastName,
          gender,
          fatherName,
          aadhaar,
          pan,
          pin,
          email,
          phone,
          password: hashedPassword,
          verified: false, // Mark user as unverified
        },
      });
  
      // Generate and send OTP
      const otp_key = await UserController.sendOtp(email, user.id,Number(user.phone));
  
      return res.status(200).send({
        success: true,
        message:
          `An OTP has been sent to your email "${email}". ` +
          `Please verify your account using the OTP.`,
        data: { otp_key },
      });
    } catch (e) {
      console.error(e);
      if (e instanceof ZodError) {
        return res.status(400).send({ success: false, message: e.message });
      }
      return res
        .status(500)
        .send({ success: false, message: "Something went wrong" });
    }
  }
  static async verifyOtp(req: Request, res: Response) {
    try {
      const { email, otp } = req.body;
  
      // Find the user by email
      const user = await prisma.user.findUnique({
        where: { email },
      });
  
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "User not found.",
        });
      }
  
      if (user.verified) {
        return res.status(400).send({
          success: false,
          message: "User is already verified.",
        });
      }
  
      // Validate the OTP
      const otpRecord = await prisma.otp.findFirst({
        where: {
          userId: user.id,
          otp,
          deletedate: { gte: new Date() }, // Ensure OTP is not expired
        },
      });
  
      if (!otpRecord) {
        return res.status(400).send({
          success: false,
          message: "Invalid or expired OTP.",
        });
      }
  
      // Mark the user as verified
      await prisma.user.update({
        where: { id: user.id },
        data: { verified: true },
      });
  
      // Delete the OTP record
      await prisma.otp.delete({ where: { id: otpRecord.id } });
  
      return res.status(200).send({
        success: true,
        message: "Account successfully verified. Your account is now active.",
      });
    } catch (e) {
      console.error(e);
      return res
        .status(500)
        .send({ success: false, message: "Something went wrong" });
    }
  }
  static async resendotp(req: Request, res: Response) {
    const email = req.body.email;
    console.log(email)
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).send({
        success: false,
        message: "User with this email does not exists",
      });
    }

    const otp_key = await UserController.sendOtp(email, user.id,Number(user.phone));
    console.log(otp_key)

    res.status(200).send({
      success: true,
      message: "succesfully otp send to email",
      otp_key: otp_key,
    });
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = LoginSchema.parse(req.body);
  
      // Find user by email
      const user = await prisma.user.findUnique({
        where: { email },
      });
  
      // Check if user exists
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User with this email does not exist",
        });
      }
  
      // Check if user is verified
      if (!user.verified) {
        return res.status(403).json({
          success: false,
          message: "User is not verified",
        });
      }
  
      // Compare passwords
      const authorized = await bcrypt.compare(password, user.password);
      if (!authorized) {
        return res.status(401).json({
          success: false,
          message: "Invalid credentials",
        });
      }
      console.log(user)
      // Generate token with user data and role flags (isAdmin, isSuperadmin)
      const token = TokenService.generateToken(user);
      
      res.cookie('authToken', token, {
        httpOnly: true,       // Prevents JavaScript from accessing the cookie
        secure: process.env.NODE_ENV === 'production', // Ensures cookie is sent over HTTPS only in production
        maxAge: 24 * 60 * 60 * 1000, // Cookie expiration time (1 day)
        sameSite: 'strict',   // Restricts cookie to same-site requests
      });
  
      // Exclude sensitive data (e.g., password) from the user object
      const { password: _, ...userWithoutPassword } = user;
  
      return res.status(200).json({
        success: true,
        message: "Login successful",
        data: {
          user: userWithoutPassword,
          token
        },
      });
    } catch (error) {
      console.error("Login error:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }

  
  static async changeusertype(req: Request, res: Response) {
    try {
      const { email, type } = UserTypeSchema.parse(req.body);

      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return res.status(401).send({
          success: false,
          message: "User with this email does not exists",
        });
      }

      if (user.verified === false) {
        return res
          .status(301)
          .send({ success: false, message: "User is Not Verified" });
      }

      if (
        user.userType === "superadmin" &&
        type !== "normal" &&
        type !== "admin" &&
        type !== "superadmin"
      ) {
        return res.status(403).send({
          success: false,
          message:
            "Superadmin can only change user type to normal , admin or superadmin",
        });
      }

      // // If the user is an admin, they can only change the user type to 'user' or 'admin'
      // if (user.userType === 'admin' && type !== 'normal' && type !== 'admin') {
      //     return res.status(403).send({ success: false, message: 'Admin can only change user type to user or admin' });
      // }

      // if (user.userType === 'normal' ) {
      //     return res.status(403).send({ success: false, message: 'normal user cant change user type' });
      // }

      const changeuser = await prisma.user.update({
        where: { email },
        data: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          gender: user.gender,
          password: user.password,
          phone: user.phone,
          fatherName: user.fatherName,
          aadhaar: user.aadhaar,
          pan: user.pan,
          pin: user.pin,
          verified: true,
          userType: type,
        },
      });

      return res.status(200).send({
        success: true,
        message: "user status updated succesfully",
        data: {
          changeuser,
        },
      });
    } catch (e) {
      console.error(e);
      return res
        .status(500)
        .send({ success: false, message: "Something went wrong" });
    }
  }

  static async makeadmin(req: Request, res: Response) {
    try {
      const {
        aadhaar,
        email,
        fatherName,
        firstName,
        middleName,
        address,
        gender,
        lastName,
        pan,
        password,
        phone,
        pin,
      } = UserSchema.parse(req.body);

      const { id } = req.user!;
      console.log(id);
      const found = await prisma.user.findFirst({
        where: {
          OR: [{ email }, { phone }],
        },
      });

      if (found) {
        return res.status(409).send({
          success: false,
          message:
            "User with this email address or phone number already exists.",
        });
      }

      const hash = await UserController.hashPassword(password);

      const user = await prisma.user.create({
        data: {
          firstName,
          lastName,
          email,
          gender,
          password: hash,
          phone,
          fatherName,
          middleName,
          address,
          aadhaar,
          pan,
          pin,
          verified: false,
          userType: "admin",
          superadminId: id,
        },
      });

      const otp_key = await UserController.sendOtp(email, user.id,Number(user.phone));

      return res.status(200).send({
        success: true,
        message: `An OTP has been sent to your email.` + `Verify your account.`,
        data: {
          user: {
            id: user.id,
            firstName,
            lastName,
            email,
            phone,
          },
          otp_key,
        },
      });
    } catch (e) {
      console.error(e);
      if (e instanceof ZodError) {
        return res.status(400).send({ success: false, message: e.message });
      }
      return res
        .status(500)
        .send({ success: false, message: "Something went wrong" });
    }
  }

  static async updateadmin(req: Request, res: Response) {
    try {
      const {
        aadhaar,
        pan,
        email,
        phone,
        fatherName,
        firstName,
        middleName,
        lastName,
        gender,
        password,
      } = UserSchema.extend({ password: z.string().optional() }).parse(
        req.body
      );

      const { id: superadminId } = req.user!;
      const { id } = req.params;

      const found = await prisma.user.findFirst({
        where: {
          OR: [{ email }, { phone }],
        },
      });

      if (!found) {
        return res.status(409).send({
          success: false,
          message: "User with this email address or phone number do not exist.",
        });
      }

      let newPassword;
      if (password) {
        const hash = await UserController.hashPassword(password);

        if (found.password === hash) {
          console.log("Password is same");
          newPassword = found.password;
        } else {
          console.log("Password is updated");
          newPassword = hash;
        }
      }

      const user = await prisma.user.update({
        where: {
          id: parseInt(id, 10),
        },
        data: {
          firstName,
          lastName,
          gender,
          password: newPassword,
          fatherName,
          middleName,
          aadhaar,
          pan,
          userType: "admin",
          superadminId,
        },
      });

      // const otp_key = await UserController.sendOtp(email, user.id);

      return res.status(200).send({
        success: true,
        message: `User is updated`,
        data: {
          user: {
            id: user.id,
            firstName,
            lastName,
            email,
            phone,
          },
        },
      });
    } catch (e) {
      console.error(e);
      if (e instanceof ZodError) {
        return res.status(400).send({ success: false, message: e.message });
      }
      return res
        .status(500)
        .send({ success: false, message: "Something went wrong" });
    }
  }

  static async makeagent(req: Request, res: Response) {
    try {
      const { id } = req.user!;
      const {
        firstName,
        lastName,
        gender,
        fatherName,
        aadhaar,
        pan,
        pin,
        email,
        password,
        phone,
      } = UserSchema.parse(req.body);

      const found = await prisma.user.findFirst({
        where: {
          OR: [{ email }, { phone }],
        },
      });

      if (found) {
        return res.status(409).send({
          success: false,
          message:
            "agent with this email address or phone number already exists.",
        });
      }

      const hash = await UserController.hashPassword(password);

      const user = await prisma.user.create({
        data: {
          firstName,
          lastName,
          email,
          gender,
          password: hash,
          phone,
          fatherName,
          aadhaar,
          pan,
          pin,
          verified: false,
          userType: "agent",
          adminId: id,
        },
      });

      const otp_key = await UserController.sendOtp(email, user.id,Number(user.phone));

      return res.status(200).send({
        success: true,
        message:
          `An OTP has been sent to your email "${email}".` +
          `Verify your account by using that OTP`,
        data: {
          user: {
            id: user.id,
            firstName,
            lastName,
            email,
            phone,
          },
          otp_key,
        },
      });
    } catch (e) {
      console.error(e);
      if (e instanceof ZodError) {
        return res.status(400).send({ success: false, message: e.message });
      }
      return res
        .status(500)
        .send({ success: false, message: "Something went wrong" });
    }
  }

  static async gettoken(req: Request, res: Response) {
    const email = req.body.email;
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).send({
        success: false,
        message: "User with this email does not exists",
      });
    }
    const token = TokenService.generateToken(user);

    res.status(200).send({ success: true, token: token, userId: user.id });
  }

  static async forgotPassword(req: Request, res: Response) {
    try {
      const { email } = req.body;

      if (!email && !validateEmail(email)) {
        return res
          .status(400)
          .send({ success: false, message: "Email is required" });
      }

      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return res.status(401).send({
          success: false,
          message: "User with this email does not exists",
        });
      }

      const otp_key = await UserController.sendOtp(email, user.id,Number(user.phone));

      return res.status(200).send({
        success: true,
        message:
          `An OTP has been sent to your email "${email}".` +
          `Verify your account by using that OTP`,
        otp_key,
      });
    } catch (e) {
      console.error(e);
      return res
        .status(500)
        .send({ success: false, message: "Something went wrong" });
    }
  }

  // static async verifyOtp(req: Request, res: Response) {
  //   try {
  //     const { email, otp_key, otp } = req.body;

  //     const id = parseInt(otp_key);

  //     if (!email || !validateEmail(email)) {
  //       return res.status(400).send({
  //         success: false,
  //         message: "Please enter a valid email address",
  //       });
  //     }

  //     if (!otp_key) {
  //       return res.status(400).send({
  //         success: false,
  //         message: "OTP key is required for verification",
  //       });
  //     }

  //     const user = await prisma.user.findUnique({
  //       where: { email },
  //       select: {
  //         id: true,
  //         firstName: true,
  //         lastName: true,
  //         address: true,
  //         aadhaar: true,
  //         pan: true,
  //         email: true,
  //         phone: true,
  //         pin: true,
  //         userType: true,
  //         verified: true,
  //         createdAt: true,
  //       },
  //     });

  //     if (!user) {
  //       return res.status(401).send({
  //         success: false,
  //         message: "User with this email does not exists",
  //       });
  //     }

  //     const otpInstance = await prisma.otp.findFirst({
  //       where: { id, user, otp },
  //     });

  //     if (!otpInstance) {
  //       return res.status(401).send({ success: false, message: "Invalid OTP" });
  //     }

  //     const now = new Date();

  //     const validTill = addMinutesToTime(otpInstance.createdAt, 15);

  //     if (otpInstance?.used || now > validTill) {
  //       return res.status(401).send({
  //         success: false,
  //         message: "This OTP has already been used or expired",
  //       });
  //     }

  //     if (!user.verified) {
  //       await prisma.user.update({
  //         where: { id: user.id },
  //         data: { verified: true },
  //       });
  //     }

  //     await prisma.otp.update({ where: { id }, data: { used: true } });

  //     const token = TokenService.generateToken(user);

  //     return res.status(200).send({
  //       success: true,
  //       message: "OTP Verified",
  //       data: {
  //         user,
  //         token,
  //       },
  //     });
  //   } catch (e) {
  //     console.error(e);
  //     return res
  //       .status(500)
  //       .send({ success: false, message: "Something went wrong" });
  //   }
  // }

  static async sendVerificationOtp(req: Request, res: Response) {
    try {
      const token = TokenService.getTokenFromAuthHeader(
        req
      );

      const { id, email } = TokenService.decodeToken(token!);
      const user = await prisma.user.findFirst({
        where: { id },
      });


      const otp_key = await UserController.sendOtp(email,id,Number(user?.phone));

      return res.status(200).send({
        success: true,
        message:
          `An OTP has been sent to your email "${email}".` +
          `Verify your account by using that OTP`,
        otp_key,
      });
    } catch (e) {
      console.log(e);
      return res
        .status(500)
        .send({ success: false, message: "Something went wrong" });
    }
  }

  static async changePassword(req: Request, res: Response) {
    try {
      const { id } = req.user!;

      const { newPassword } = req.body;

      if (!newPassword && newPassword.length >= 8) {
        return res.status(400).send({
          success: false,
          message: "Please provide a new password of atleast 8 characters",
        });
      }

      const user = await prisma.user.findUnique({
        where: { id },
      });

      if (!user) {
        return res
          .status(401)
          .send({ success: false, message: "User does not exists" });
      }

      const hash = await UserController.hashPassword(newPassword);

      await prisma.user.update({
        where: { id },
        data: {
          password: hash,
        },
      });

      return res
        .status(200)
        .send({ success: true, message: "Password changed" });
    } catch (e) {
      console.log(e);
      return res
        .status(500)
        .send({ success: false, message: "Something went wrong" });
    }
  }

  static async updateProfile(req: Request, res: Response) {
    try {
      const { id } = req.user!;
  
      const {
        firstName,
        middleName,
        lastName,
        fatherName,
        pin,
        gender,
        address,
        aadhaar,
        pan,
        phone,
        inventory,
        ispanlinked
      } = req.body;
      let avatar: string | null = null;
      if (req.file) {
        // Upload the avatar to Cloudinary and get the URL
        const localFilePath = req.file.path;
        const cloudinaryResult = await uploadToCloudinary(localFilePath, "image", req, req.file);
        avatar = cloudinaryResult.secure_url;  // Cloudinary URL for the uploaded image
      }
      const parseBoolean = (val: string | boolean) => val === true || val === 'true';
      if (!firstName.length) {
        return res
          .status(400)
          .send({ success: false, message: "First name cannot be empty" });
      }
  
      if (phone && !validatePhone(phone)) {
        return res.status(400).send({
          success: false,
          message: "Please enter a valid phone number",
        });
      }
  
      const user = await prisma.user.findFirst({ where: { id } });
  
      if (!user) {
        return res
          .status(404)
          .send({ success: false, message: "User does not exist" });
      }
      await prisma.user.update({
        where: {  
          id: user.id,
        },
        data: {
          firstName,
          middleName: middleName ?? "",
          lastName,
          gender: gender ?? user.gender,
          fatherName,
          pin: pin ?? user.pin,
          pan: pan ?? user.pan, 
          aadhaar: aadhaar ?? user.aadhaar,
          address: address ?? user.address,
          phone: phone ?? user.phone,
          avatar: avatar ?? user.avatar,
          ispanlinked: parseBoolean(ispanlinked), // ✅ fixed
          inventory: parseBoolean(inventory), 
        },
      });
      return res
        .status(200)
        .send({ success: true, message: "Profile Updated" });
    } catch (e) {
      console.log(e);
      return res
        .status(500)
        .send({ success: false, message: "Something went wrong" });
    }
  }
  static async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        return res
          .status(400)
          .send({ success: false, message: "User id is required" });
      }

      const token = TokenService.getTokenFromAuthHeader(
        req
      );

      if (!token) {
        return res
          .status(403)
          .send({ success: false, message: "Authorization Token is required" });
      }

      const Superadmin = TokenService.decodeToken(token);

      const foundUser = await prisma.user.findFirst({
        where: {
          id: parseInt(id, 10),
        },
      });

      if (!foundUser) {
        return res
          .status(404)
          .send({ success: false, message: "User not found" });
      }

      await prisma.user.delete({
        where: {
          id: parseInt(id, 10),
          superadminId: Superadmin.id,
        },
      });
    } catch (e) {
      console.log(e);
      return res
        .status(500)
        .send({ success: false, message: "Something went wrong" });
    }
  }

  static async getProfile(req: Request, res: Response): Promise<void> {
    try {
        // Get token from header or cookies
        const token = TokenService.getTokenFromAuthHeader(req);

        if (!token) {
            res.status(401).send("Token is missing");
            return;
        }

        // Decode the token (ensure `decodeToken` handles errors appropriately)
        const { id, email } = TokenService.decodeToken(token);

        if (!id || !email) {
            res.status(401).send("Invalid token payload");
            return;
        }

        // Fetch the user from the database
        const user = await prisma.user.findFirst({
            where: { id }, // Proper format for Prisma query
        });

        if (!user) {
            res.status(403).send("ID is not valid");
            return;
        }

        // Send the user profile as response
        res.status(200).json(user);
    } catch (error) {
        console.error("Error in getProfile:", error);
        res.status(500).send("An unexpected error occurred");
    }
}

  static async getUserById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const user = await prisma.user.findFirst({
        select: {
          id: true,
          createdAt: true,
          email: true,
          firstName: true,
          lastName: true,
          aadhaar: true,
          address: true,
          phone: true,
          pan: true,
          userType: true,
          pin: true,
          ispanlinked: true,
          inventory: true,
        },
        where: {
          id: {
            equals: parseInt(id),
          },
        },
      });

      if (!user) {
        return res
          .status(404)
          .send({ success: false, message: "User not found" });
      }

      return res.status(200).send({ success: true, data: { user } });
    } catch (e) {
      console.error(e);
      return res
        .status(500)
        .send({ success: false, message: "Something went wrong" });
    }
  }

  static async getAllUsers(req: Request, res: Response) {
    try {
      const { page: pageNumber, order = "desc" } = req.query;

      const page = parseInt((pageNumber as string) || "0");

      const users = await prisma.user.findMany({
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
          aadhaar: true,
          address: true,
          pan: true,
          createdAt: true,
          userType: true,
          pin: true,
        },
        orderBy: {
          createdAt: order === "asc" ? "asc" : "desc",
        },
        skip: page * UserController.USERS_PER_PAGE,
        take: UserController.USERS_PER_PAGE,
      });

      const totalusers = await prisma.user.findMany({});

      if (!users || !totalusers) {
        res.status(404).send({ message: "users not found" });
      }

      return res.status(200).send({
        success: true,
        data: {
          page,
          totalusers: totalusers?.length,
          users,
        },
      });
    } catch (e) {
      console.error(e);
      return res
        .status(500)
        .send({ success: false, message: "Something went wrong" });
    }
  }

  static async getallagentsbyadmin(req: Request, res: Response) {
    try {
      const { id } = req.user!;
      const { page: pageNumber, order = "desc" } = req.query;

      const page = parseInt((pageNumber as string) || "0");

      const user = await prisma.user.findMany({
        where: {
          adminId: id,
          userType: "agent",
        },

        orderBy: {
          createdAt: order === "asc" ? "asc" : "desc",
        },
        skip: page * UserController.USERS_PER_PAGE,
        take: UserController.USERS_PER_PAGE,
      });

      if (!user) {
        return res
          .status(200)
          .json({ success: false, message: "Agents not found" });
      }

      return res.json({ success: true, data: user });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }

  static async getalladminsforsuperadmin(req: Request, res: Response) {
    try {
      const token = TokenService.getTokenFromAuthHeader(
        req
      );

      if (!token) {
        return res
          .status(403)
          .send({ success: false, message: "Authorization Token is required" });
      }

      const Superadmin = TokenService.decodeToken(token);

      const { page: pageNumber, order = "desc" } = req.query;

      const page = parseInt((pageNumber as string) || "0");

      const usersCount = await prisma.user.count({
        where: {
          superadminId: Superadmin.id,
          userType: "admin",
        },
      });

      const user = await prisma.user.findMany({
      
        where: {
         
          userType: "admin",
        },
        orderBy: {
          createdAt: order === "asc" ? "asc" : "desc",
        },
        skip: page * UserController.USERS_PER_PAGE,
        take: UserController.USERS_PER_PAGE,
      });

      if (!user) {
        return res
          .status(200)
          .json({ success: false, message: "Agents not found" });
      }

      const filteredUsers = user.map((user) => {
        const newUser = Object.fromEntries(
          Object.entries(user).filter(([entry]) => entry !== "password")
        );
        return newUser;
      });

      return res.json({
        success: true,
        data: filteredUsers,
        totalusers: usersCount,
        page: Math.ceil(usersCount / UserController.USERS_PER_PAGE),
      });
    } catch (error) {
      return res
        .status(404)
        .json({ success: false, message: "internal server error" });
    }
  }

  static async getOwnProfile(req: Request, res: Response) {
    try {
      const { id } = req.user!;

      const user = await prisma.user.findFirst({
        select: {
          id: true,
          createdAt: true,
          email: true,
          gender: true,
          firstName: true,
          middleName: true,
          lastName: true,
          fatherName: true,
          aadhaar: true,
          address: true,
          phone: true,
          pan: true,
          userType: true,
          pin: true,
          dob: true,
          avatar: true,
          ispanlinked: true,
          inventory: true,
          verified: true,
        },
        where: {
          id: {
            equals: id,
          },
        },
      });

      if (!user) {
        return res
          .status(404)
          .send({ success: false, message: "User not found" });
      }
      const buisnessprofile = await prisma.businessProfile.findFirst({
        where: { userId: id },
      });

      return res.status(200).send({
        success: true,
        data: { user },
        buisnessprofile: buisnessprofile ? true : false,
      });
    } catch (e) {
      console.error(e);
      return res
        .status(500)
        .send({ success: false, message: "Something went wrong" });
    }
  }
  static async isadmin(req:Request,res : Response){
    try {
      const { id } = req.user!;
      const user = await prisma.user.findFirst({
        where: {
          id: id
        },
      });
      if (user?.userType !== 'admin' && user?.userType !== 'superadmin') {
        return res.status(200).send({ success: false, message: "User is not admin" });
      }
      return res.status(200).send({ success: true, message: "User is admin" });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
  // static async verifyotpbyphone(req: Request, res: Response) {
    
  // }
}
