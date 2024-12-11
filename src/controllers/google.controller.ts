import { PrismaClient } from "@prisma/client";
import { google } from "googleapis";
import { config } from "dotenv";
import { Request, Response } from "express";
import { oauth2Client } from "../config/google.config";

config();

const prisma = new PrismaClient();

export const googleController = {
  async getUserIdentity({ access_token }: { access_token: string }) {
    if (!access_token) {
      throw new Error("Access token not provided for fetching user profile");
    }

    oauth2Client.setCredentials({ access_token });

    const oauth2 = google.oauth2({
      auth: oauth2Client,
      version: "v2",
    });

    const { data } = await oauth2.userinfo.get();
    return data;
  },

  async signupWithGoogle(req: Request, res: Response) {
    try {
      const { access_token } = req.body;

      if (!access_token) {
        return res.status(400).json({ success: false, message: "Access token is required" });
      }

      const userInfo = await this.getUserIdentity({ access_token });

      let user = await prisma.user.findUnique({
        where: { email: userInfo.email },
      });

      if (!user) {
        user = await prisma.user.create({
          data: {
            email: userInfo.email || "",
            name: userInfo.name || "",
            googleId: userInfo.id,
            avatar: userInfo.picture || "",
          },
        });
      }

      return res.status(200).json({ success: true, data: user });
    } catch (error: any) {
      console.error("Error during Google signup:", error.message);
      return res
        .status(500)
        .json({ success: false, message: "Something went wrong", error: error.message });
    }
  },

  async loginWithGoogle(req: Request, res: Response) {
    try {
      const { access_token } = req.body;

      if (!access_token) {
        return res.status(400).json({ success: false, message: "Access token is required" });
      }

      const userInfo = await this.getUserIdentity({ access_token });

      const user = await prisma.user.findUnique({
        where: { email: userInfo.email },
      });

      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }

      return res.status(200).json({ success: true, data: user });
    } catch (error: any) {
      console.error("Error during Google login:", error.message);
      return res
        .status(500)
        .json({ success: false, message: "Something went wrong", error: error.message });
    }
  },

  async getUserProfile(req: Request, res: Response) {
    try {
      const { access_token } = req.body;

      if (!access_token) {
        return res.status(400).json({ success: false, message: "Access token is required" });
      }

      const userInfo = await this.getUserIdentity({ access_token });
      return res.status(200).json({ success: true, data: userInfo });
    } catch (error: any) {
      console.error("Error fetching user profile:", error.message);
      return res
        .status(500)
        .json({ success: false, message: "Something went wrong", error: error.message });
    }
  },
};

// Graceful Prisma client shutdown
process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});
