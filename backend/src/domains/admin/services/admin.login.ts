import { Request, Response } from "express";
import { Service } from "typedi";
import { UserModel } from "../../../common/models/UserModel";
import { TokenModel } from "../../../common/models/TokenModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { GetToken } from "../../common/middleware/create-token";
dotenv.config({ path: ".env" });

@Service()
export class AdminLoginService {
  constructor(private createToken: GetToken) {}

  async loginAdmin(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const admin = await UserModel.findOne({ email });

      if (!admin) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const isPasswordValid = await bcrypt.compare(password, admin.password);

      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const token = this.createToken.createToken(admin.email);
      // console.log(`token is ${token}`);
      await TokenModel.create({ token, isActive: true, role: admin.role });

      const responseData = {
        token,
        admin: {
          username: admin.username,
          email: admin.email,
          role: admin.role,
        },
      };

      return res.status(200).json({ responseData });
    } catch (error) {
      console.error("Error during admin login:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
