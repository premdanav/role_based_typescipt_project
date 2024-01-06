import { Request, Response } from "express";
import { Service } from "typedi";
import { UserModel } from "../../../common/models/UserModel";
import { TokenModel } from "../../../common/models/TokenModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

@Service()
export class UserLoginService {
  secretKey: string = process.env.SECRET_KEY || "secret";

  async loginUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const user = await UserModel.findOne({ email });

      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const token = jwt.sign({ userId: user._id }, this.secretKey, {
        expiresIn: "1h",
      });

      await TokenModel.create({ token, isActive: true, role: user.role });

      const responseData = {
        token,
        admin: {
          username: user.username,
          email: user.email,
          role: user.role,
        },
      };

      return res.status(200).json({ responseData });
    } catch (error) {
      console.error("Error during admin login:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
