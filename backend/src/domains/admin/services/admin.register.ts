import { Request, Response } from "express";
import { Service } from "typedi";
import { UserModel } from "../../../common/models/UserModel";
import { GetToken } from "../../common/middleware/create-token";
import { TokenModel } from "../../../common/models/TokenModel";
import bcrypt from "bcrypt";

@Service()
export class AdminRegisterService {
  constructor(private createToken: GetToken) {}

  async registerAdmin(req: Request, res: Response) {
    try {
      const { username, email, password, signupCode } = req.body;

      if (signupCode === "admin") {
        const hashPassword = await bcrypt.hash(password, 10);

        const adminObj = {
          username,
          email,
          password: hashPassword,
          role: "admin",
        };

        const registerAdmin = await UserModel.findOne({ email });

        if (registerAdmin) {
          return res.status(409).json({ error: "Admin is already registered" });
        }

        const token = this.createToken.createToken(adminObj.email);

        await TokenModel.create({ token, isActive: true, role: adminObj.role });
        await UserModel.create(adminObj);
        const responseData = {
          token,
          adminObj,
        };
        res
          .status(201)
          .json({ message: "Admin registered successfully", responseData });
      } else {
        res.status(400).json({ error: "Invalid signup code" });
      }
    } catch (error) {
      console.error("Error registering admin:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
